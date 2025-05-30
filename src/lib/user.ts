import {db} from "./db";
import bcrypt from "bcryptjs";
import {z} from "zod";
import {getSession} from "./session";
import {action, createAsync, query, redirect, useNavigate} from "@solidjs/router";
import { createEffect } from "solid-js";
import fs from "fs";
import path from "path";




export const RegisterUserSchema= z.object({
  email: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export const LoginUserSchema= z.object({
  email: z.string(),
  password: z.string(),
});


//POST REGISTER
const register = async (form: FormData) => {
  "use server";
  const user = RegisterUserSchema.parse({
    email: form.get("email"),
    password: form.get("password"),
    firstname: form.get("firstname"),
    lastname: form.get("lastname"),
  });

  const hashed = await bcrypt.hash(user.password, 10);

  await db.user.create({
    data: {
      email: user.email, 
      password: hashed,
      firstname: user.firstname,
      lastname: user.lastname,},
  });
  return redirect("/");
};

export const Register = action(register); // ← ici la magie




//GET+SESSION LOGIN
const login = async (form: FormData)=>{
  "use server";
  const user = LoginUserSchema.parse({
    email: form.get("email"),
    password: form.get("password"),
  });

  console.log("Tentative de login pour :", user.email);
  const record = await db.user.findUniqueOrThrow({
    where: { email: user.email },
  });

  const valid = await bcrypt.compare(user.password, record.password);

  const email= user.email
  if (valid) {
    console.log("Utilisateur trouvé");
    const session = await getSession()
    await session.update({email })
    console.log("Session mise à jour pour :", email);
    console.log("YES")
    return redirect("/match");
  }
  if (!valid) {
    console.log("Utilisateur non trouvé");
  throw new Error("Mot de passe incorrect");
}
};

export const Login = action(login);




//Check if the user is connected
export const getUser = query(async () => {
  "use server"
  try {
    const session = await getSession()
    if (!session.data.email) {
      return null
    }
    return await db.user.findUniqueOrThrow({
      where: { email: session.data.email },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        photo: true,
      },
    })
  } catch {
    return null
  }
}, "getUser")


//REDIRECTION VERS "/" SI USER PAS CONNECTE
export function AuthGuard(){
  const user= createAsync(()=>getUser());
  const navigate= useNavigate();

  createEffect(() => {
    if (user()===null){
      navigate("/");
    }
  });

  return user; 
}

//REDIRECTION VERS "/MATCH "SI USER CONNECTE
export function GuestGuard(){
  const user= createAsync(()=>getUser());
  const navigate= useNavigate();

  createEffect(()=>{
    if (user()){
      navigate("/match");
    }
  });

  return user;
}

//RECUPERER DONNES USER
export async function getUserFromSession() {
  "use server";
  const session = await getSession();
  if (!session.data.email) return null;

  return await db.user.findUnique({
    where: { email: session.data.email },
  });
}



//UPDATE USER
export const UpdateUserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
});

export const updateUser = action(async (form: FormData) => {
  "use server";

  const user = await getUserFromSession();
  if (!user) throw new Error("Utilisateur non connecté");

  const data = UpdateUserSchema.parse({
    firstname: form.get("firstname"),
    lastname: form.get("lastname"),
    email: form.get("email"),
  });

  const file = form.get("photo") as File;
  const removePhoto = form.get("removePhoto") === "true";

  let photoPath = user.photo;

  const uploadDir = path.resolve("public/images/profile_photos");

  // Supprimer ancienne photo si demande ou nouvelle image
  if ((removePhoto || (file && file.size > 0)) && user.photo && user.photo !== "/images/profile_photos/icone_profile.png") {
    const oldPhotoPath = path.resolve("public" + user.photo);
    if (fs.existsSync(oldPhotoPath)) {
      fs.unlinkSync(oldPhotoPath);
    }
    photoPath = null; // Réinitialise vers défaut si suppression
  }

  // Gérer nouvelle image si fournie
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

  await db.user.update({
    where: { id: user.id },
    data: {
      ...data,
      photo: photoPath,
    },
  });

  if (data.email !== user.email) {
    const session = await getSession();
    await session.update({ email: data.email });
  }

  return redirect("/profile");
});