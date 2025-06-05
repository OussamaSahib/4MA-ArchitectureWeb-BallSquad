import type {APIEvent} from "@solidjs/start/server";
import {EditMatchAction} from "~/lib/matchs";


export async function POST(event: APIEvent){
  const form= await event.request.formData();
  return await EditMatchAction(form);
}