import { db } from "~/lib/db";
import { getUserFromSession } from "~/lib/user";
import { z } from "zod";
import { action, query } from "@solidjs/router";

// --- SCHÉMAS DE VALIDATION ---
const friendSchema = z.object({
  friendId: z.string().transform(Number),
});

const guestSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
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

// --- AJOUTER INVITÉ ---
export const addGuest = async (form: FormData) => {
  "use server";
  const user = await getUserFromSession();
  if (!user) throw new Error("Non connecté");
  const data = guestSchema.parse({
    firstname: form.get("firstname"),
    lastname: form.get("lastname"),
  });

  await db.guest.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
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
