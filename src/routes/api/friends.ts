import type { APIEvent } from "@solidjs/start/server";
import { getFriends, addFriend } from "~/lib/friends";

// Liste des amis
export async function GET(event: APIEvent) {
  return await getFriends();
}

// Ajouter un ami
export async function POST(event: APIEvent) {
  return await addFriend(await event.request.formData());
}