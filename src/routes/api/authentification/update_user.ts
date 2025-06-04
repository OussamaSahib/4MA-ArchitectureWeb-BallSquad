import type {APIEvent} from "@solidjs/start/server";
import {UpdateUserAction} from "~/lib/user";


export async function POST(event: APIEvent){
  return await UpdateUserAction(await event.request.formData())
}