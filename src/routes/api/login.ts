import type { APIEvent } from "@solidjs/start/server";
import { getUser, Login } from "~/lib/user";


export async function POST(event: APIEvent) {
  return await Login(await event.request.formData())
}

export async function GET(event: APIEvent) {
    return await getUser();
}