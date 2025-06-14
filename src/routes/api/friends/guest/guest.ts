import type { APIEvent } from "@solidjs/start/server";
import { getGuests, AddGuestAction } from "~/lib/friends";


export async function GET(event: APIEvent) {
  return await getGuests();
}

export async function POST(event: APIEvent) {
  return await AddGuestAction(await event.request.formData());
}