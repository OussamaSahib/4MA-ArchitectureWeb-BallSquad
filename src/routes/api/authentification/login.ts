import type {APIEvent} from "@solidjs/start/server";
import {getUserFromSession, LoginAction} from "~/lib/user";


export async function POST(event: APIEvent){
  return await LoginAction(await event.request.formData())
}

export async function GET(event: APIEvent){
    return await getUserFromSession();
}