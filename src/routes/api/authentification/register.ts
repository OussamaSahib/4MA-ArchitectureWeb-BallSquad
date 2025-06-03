import type {APIEvent} from "@solidjs/start/server";
import {RegisterAction} from "~/lib/user";


export async function POST(event: APIEvent){
  return await RegisterAction(await event.request.formData())
}
