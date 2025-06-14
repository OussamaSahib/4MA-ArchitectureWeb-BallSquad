import {db} from "~/lib/db";
import {getUserFromSession} from "~/lib/user";
import {z} from "zod";
import {action, query} from "@solidjs/router";


//WEB
//AMIS
//RÉCUPERER LISTE AMIS (GET)
export const getFriends= query(async()=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) return [];

  return await db.friend.findMany({
    where: {userId: user.id},
    include: {friend: true},
  });
}, "getFriends");


//RÉCUPÉRER DONNÉES D'1 AMI (GET)
export const getFriendById= query(async(id: string)=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) return null;

  const friendId= parseInt(id, 10);

  //Vérifie que le user est bien ami
  const relation= await db.friend.findFirst({
    where: {
      userId: user.id,
      friendId: friendId,
    },
    include: {friend: true},
  });

return relation?.friend ?? null;
}, "getFriendById");



//LISTE DE TT LES USERS TOTAL (GET)
export const getAllUsers= query(async ()=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) return [];

  return await db.user.findMany({
    where:{
      id: {not: user.id},
    },
    take: 100,
  });
}, "getAllUsers");



//AJOUTER UN AMI (POST)
const friendSchema= z.object({
  friendId: z.string().transform(Number),
});

export const AddFriend= async(form: FormData)=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) throw new Error("Non connecté");
  const data= friendSchema.parse({friendId: form.get("friendId")});

  await db.friend.create({
    data:{
      userId: user.id,
      friendId: data.friendId,
    },
  });
}
export const AddFriendAction= action(AddFriend)




//INVITÉS
const guestSchema= z.object({
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
});

//AJOUTER UN INVITÉ (POST)
export const AddGuest= async(form: FormData)=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) throw new Error("Non connecté");
  const data= guestSchema.parse({
    firstname: form.get("firstname"),
    lastname: form.get("lastname"),
    phone: form.get("phone")?.toString(),
  });

  await db.guest.create({
    data:{
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      userId: user.id,
    },
  });
}
export const AddGuestAction= action(AddGuest)



//RÉCUPERER LISTE INVITÉS (GET)
export const getGuests= query(async()=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) return [];

  return await db.guest.findMany({
    where: {userId: user.id},
  });
}, "getGuests");



//RÉCUPÉRER DONNÉES D'1 INVITÉ (GET)
export const getGuestById= query(async(id: string)=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) return null;

  const guestId= parseInt(id, 10);

  return await db.guest.findFirst({
    where:{
      id: guestId,
      userId: user.id,
    },
  });
}, "getGuestById");







//MOBILE
//AMIS
//RÉCUPERER LISTE AMIS (GET)
export async function getFriendsMobile(userId: number) {
  return await db.friend.findMany({
    where: { userId },
    include: { friend: true },
  });
}


//RÉCUPÉRER DONNÉES D'1 AMI (GET)
export async function getFriendByIdMobile(friendId: number, email: string){
  const user= await db.user.findUnique({ where: { email } });
  if (!user) return null;

  const relation= await db.friend.findFirst({
    where:{
      userId: user.id,
      friendId,
    },
    include: {friend: true},
  });

  return relation?.friend ?? null;
}


//LISTE DE TT LES USERS TOTAL (GET)
export async function getAllUsersMobile(email: string){
  const user= await db.user.findUnique({where: {email}});
  if (!user) return [];

  return await db.user.findMany({
    where:{
      id: {not: user.id},
    },
    take: 100,
  });
}


//AJOUTER UN AMI (POST)
export async function addFriendMobile(friendId: number, email: string){
  const user= await db.user.findUnique({where: {email}});
  if (!user) throw new Error("Utilisateur non trouvé");

  await db.friend.create({
    data:{
      userId: user.id,
      friendId,
    },
  });
}




//INVITÉS
//RÉCUPERER LISTE INVITÉS (GET)
export async function getGuestsMobile(userId: number){
  return await db.guest.findMany({
    where: {userId},
  });
}


//RÉCUPÉRER DONNÉES D'1 INVITÉ (GET)
export async function getGuestByIdMobile(guestId: number, email: string){
  const user= await db.user.findUnique({ where: {email}});
  if (!user) return null;

  return await db.guest.findFirst({
    where: {
      id: guestId,
      userId: user.id,
    },
  });
}

//AJOUTER UN INVITÉ (POST)
export async function addGuestMobile(formData: FormData, email: string){
  const user= await db.user.findUnique({where: {email}});
  if (!user) throw new Error("Utilisateur non trouvé");

  const data= guestSchema.parse({
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    phone: formData.get("phone")?.toString(),
  });

  return await db.guest.create({
    data:{
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      userId: user.id,
    },
  });
}
