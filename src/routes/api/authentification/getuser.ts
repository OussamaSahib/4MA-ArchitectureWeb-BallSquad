import type {APIEvent} from "@solidjs/start/server";
import {db} from "~/lib/db";


export async function GET(event: APIEvent){
  const url= new URL(event.request.url);
  const email= url.searchParams.get("email");

  if (!email){
    return new Response("Missing email", {status: 400});
  }

  const user= await db.user.findUnique({
    where: {email},
    select:{
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
      iban: true,
      photo: true,
    },
  });

  return new Response(JSON.stringify(user), {
    headers: {"Content-Type": "application/json"},
  });
}
