import { db } from "~/lib/db";
import { getUserFromSession } from "~/lib/user";
import { z } from "zod";
import { action, query } from "@solidjs/router";

// --- SCHÉMA DE VALIDATION ---
const friendSchema = z.object({
  friendId: z.string().transform(Number),
});



// --- AJOUTER UN AMI ---
export const addFriend = async (form: FormData) => {
  "use server";
  const user = await getUserFromSession();
  if (!user) throw new Error("Non connecté");
  const data = friendSchema.parse({ friendId: form.get("friendId") });

  await db.friend.create({
    data: {
      userId: user.id,
      friendId: data.friendId,
    },
  });
};
export const addFriendAction = action(addFriend);

// --- LISTER AMIS ---
export const getFriends = query(async () => {
  "use server";
  const user = await getUserFromSession();
  if (!user) return [];

  return await db.friend.findMany({
    where: { userId: user.id },
    include: { friend: true },
  });
}, "getFriends");





// --- SCHÉMA DE VALIDATION ---
const guestSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
});


// --- AJOUTER INVITÉ ---
export const addGuest = async (form: FormData) => {
  "use server";
  const user = await getUserFromSession();
  if (!user) throw new Error("Non connecté");
  const data = guestSchema.parse({
    firstname: form.get("firstname"),
    lastname: form.get("lastname"),
    phone: form.get("phone")?.toString(),
  });

  await db.guest.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      userId: user.id,
    },
  });
};
export const addGuestAction = action(addGuest);

// --- LISTER INVITÉS ---
export const getGuests = query(async () => {
  "use server";
  const user = await getUserFromSession();
  if (!user) return [];

  return await db.guest.findMany({
    where: { userId: user.id },
  });
}, "getGuests");


// Détail d’un ami
export const getFriendById = query(async (id: string) => {
  "use server";
  const user = await getUserFromSession();
  if (!user) return null;

  const friendId = parseInt(id, 10);

// Vérifie que le user est bien ami avec cette personne
const relation = await db.friend.findFirst({
  where: {
    userId: user.id,
    friendId: friendId,
  },
  include: { friend: true },
});

return relation?.friend ?? null;
}, "getFriendById");



// --- RECHERCHER DES UTILISATEURS ---
export const getAllUsers = query(async () => {
  "use server";
  const user = await getUserFromSession();
  if (!user) return [];

  return await db.user.findMany({
    where: {
      id: { not: user.id },
    },
    take: 100, // tu peux adapter
  });
}, "getAllUsers");


