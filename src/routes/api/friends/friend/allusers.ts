import type {APIEvent} from "@solidjs/start/server";
import {getAllUsersMobile} from "~/lib/friends";


export async function GET(event: APIEvent){
  const {searchParams}= new URL(event.request.url);
  const email= searchParams.get("email");

  if (!email){
    return new Response(JSON.stringify({error: "Email requis"}), {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  const users= await getAllUsersMobile(email);
  return new Response(JSON.stringify(users), {
    headers: {"Content-Type": "application/json"},
  });
}