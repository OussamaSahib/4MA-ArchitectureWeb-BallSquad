import type {APIEvent} from "@solidjs/start/server";
import {getFriends, AddFriendAction} from "~/lib/friends";


export async function GET(event: APIEvent) {
  return await getFriends();
}

export async function POST(event: APIEvent) {
  return await AddFriendAction(await event.request.formData());
}