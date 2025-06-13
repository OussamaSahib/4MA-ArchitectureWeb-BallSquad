import {db} from "./db";
import bcrypt from "bcryptjs";
import {z} from "zod";
import {getSession} from "./session";
import {action, createAsync, query, redirect, useNavigate} from "@solidjs/router";
import {createEffect} from "solid-js";
import fs from "fs";
import path from "path";



//REGISTER (POST)
export const RegisterUserSchema= z.object({
  email: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
  iban: z.string(),
});

export const Register= async(form: FormData)=>{
  "use server";
  const user= RegisterUserSchema.parse({
    email: form.get("email"),
    password: form.get("password"),
    firstname: form.get("firstname"),
    lastname: form.get("lastname"),
    phone: form.get("phone"),
    iban: form.get("iban"),
  });

  //Check si Mail existe
  const existing= await db.user.findUnique({where: {email: user.email}});
  if (existing){
    return {
      success: false,
      error: "EMAIL_EXISTS",
    };
  }

  //Mot de passe haché
  const hashed= await bcrypt.hash(user.password, 10);

  await db.user.create({
    data:{
      email: user.email,
      password: hashed,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      iban: user.iban,
    },
  });
  
  return {success: true};
}
export const RegisterAction= action(Register)



//LOGIN SESSION (POST)
export const LoginUserSchema= z.object({
  email: z.string(),
  password: z.string(),
});

export const Login=async(form: FormData)=>{
  "use server";
  const user= LoginUserSchema.parse({
    email: form.get("email"),
    password: form.get("password"),
  });

  //MAIL
  const record= await db.user.findUnique({
    where: {email: user.email},
  });

  //Check si Mail existe
  if (!record) {
    console.log("Compte introuvable");
    return {
      success: false,
      error: "EMAIL_NOT_FOUND",
    };
  }

  //MOT DE PASSE
  const valid= await bcrypt.compare(user.password, record.password);

   //Check si Bon Mot de passe
  if (!valid){
    console.log("Mot de passe incorrect");
    return {
      success: false,
      error: "WRONG_PASSWORD",
    };
  }

  const email= user.email
  if (valid) {
    console.log("Utilisateur trouvé");
    const session= await getSession()
    await session.update({email})
    console.log("Session mise à jour pour :", email);
    return {
      success: true,
      email: user.email,
    };
  }
  if (!valid) {
    console.log("Utilisateur non-trouvé");
    throw new Error("Mot de passe incorrect");
  }
}
export const LoginAction= action(Login)





//LOGOUT SESSION (POST)
export const LogoutAction= action(async()=>{
  "use server"
  const session= await getSession();
  await session.clear();
  console.log("Session avant clear:", session.data);

  return redirect("/");
});



//CHECK SI USER CONNECTE +RÉCUPÈRE DONNÉES USER (GET) 
export const getUser= query(async()=>{
  "use server"
  try {
    const session= await getSession()
    if (!session.data.email){
      return null
    }
    return await db.user.findUniqueOrThrow({
      where: {email: session.data.email},
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        photo: true,
        phone: true,
        iban: true,
      },
    })
  } catch {
    return null
  }
}, "getUser")


//RÉCUPÈRE DONNÉES USER (Á UTILISER DANS D'AUTRES ACTION, QUERY) (GET)
export async function getUserFromSession(){
  const session= await getSession();
  if (!session.data.email) return null;

  return await db.user.findUnique({
    where: {email: session.data.email},
    select:{
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      photo: true,
      phone: true,
      iban: true,
    },
  });
}


//POUR REGISTER ET LOGIN: VIA GET USER, REDIRECTION VERS "/MATCH "SI USER CONNECTE
export function GuestGuard(){
  const user= createAsync(()=> getUser());
  const navigate= useNavigate();

  createEffect(()=>{
    if (user()){
      navigate("/match");
    }
  });

  return user;
}





//UPDATE USER (POST)
export const UpdateUserSchema= z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  iban: z.string(),
  password: z.string().optional(),
});



export const UpdateUser = async (form: FormData) => {
  "use server";

  // Tentative session (web)
  let user = await getUser();

  // Fallback mobile : récupérer par email
  if (!user) {
    const email = form.get("email")?.toString();
    if (!email) throw new Error("Email requis");
    user = await db.user.findUnique({where: { email } });
    if (!user) throw new Error("Utilisateur introuvable");
  }

  const rawPassword = form.get("password");
  const data = UpdateUserSchema.parse({
    firstname: form.get("firstname"),
    lastname: form.get("lastname"),
    email: form.get("email"),
    phone: form.get("phone"),
    iban: form.get("iban"),
    password: rawPassword ? String(rawPassword) : undefined,
  });

  const file = form.get("photo") as File;
  const removePhoto = form.get("removePhoto") === "true";

  let photoPath = user.photo;
  const uploadDir = path.resolve("public/images/profile_photos");

  if ((removePhoto || (file && file.size > 0)) && user.photo && user.photo !== "/images/profile_photos/profile_icon.png") {
    const oldPhotoPath = path.resolve("public" + user.photo);
    if (fs.existsSync(oldPhotoPath)) {
      fs.unlinkSync(oldPhotoPath);
    }
    photoPath = null;
  }

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name);
    const filename = `${data.firstname}_${data.lastname}_${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filepath, buffer);
    photoPath = `/images/profile_photos/${filename}`;
  }

  const updateData: any = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    iban: data.iban,
    photo: photoPath,
  };

  if (data.password && data.password.trim() !== "") {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  await db.user.update({
    where: { id: user.id },
    data: updateData,
  });

  // Maj session uniquement si getUser() initial était valide
  if (user && data.email !== user.email) {
    const session = await getSession();
    await session.update({ email: data.email });
  }

  return { success: true };
};

export const UpdateUserAction= action(UpdateUser)