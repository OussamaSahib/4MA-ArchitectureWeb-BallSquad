import type {APIEvent} from "@solidjs/start/server";
import {Register} from "~/lib/user";


export async function POST(event: APIEvent) {
  return await Register(await event.request.formData())
}
