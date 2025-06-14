import type {APIEvent} from "@solidjs/start/server";
import {UpdateUser} from "~/lib/user";


export async function POST(event: APIEvent){
  const formData= await event.request.formData();
  const result= await UpdateUser(formData);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
}