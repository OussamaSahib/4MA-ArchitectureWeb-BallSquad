import type { APIEvent } from "@solidjs/start/server";
import { getGuests, addGuest } from "~/lib/friends";

// Liste des invités
export async function GET(event: APIEvent) {
  return await getGuests();
}

// Ajouter un invité
export async function POST(event: APIEvent) {
  return await addGuest(await event.request.formData());
}