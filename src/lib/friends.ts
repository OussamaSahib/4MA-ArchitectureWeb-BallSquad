import {db} from "~/lib/db";
import {getUserFromSession} from "~/lib/user";
import {z} from "zod";
import {action, query} from "@solidjs/router";



//AMIS
const friendSchema= z.object({
  friendId: z.string().transform(Number),
});

//AJOUTER UN AMI (POST)
export const AddFriendAction= action(async(form: FormData)=>{
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
})


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







//INVITÉS
const guestSchema= z.object({
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
});

//AJOUTER UN INVITÉ (POST)
export const AddGuestAction= action(async(form: FormData)=>{
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
})


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


