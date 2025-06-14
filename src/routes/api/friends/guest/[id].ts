import type {APIEvent} from "@solidjs/start/server";
import {getGuestByIdMobile} from "~/lib/friends"; 


export async function GET(event: APIEvent){
  const {searchParams, pathname}= new URL(event.request.url);
  const id= pathname.split("/").pop();
  const email= searchParams.get("email");

  if (!id || !email){
    return new Response(JSON.stringify({error: "ID ou email manquant"}),{
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  const guest= await getGuestByIdMobile(parseInt(id, 10), email);
  if (!guest){
    return new Response(JSON.stringify({error: "Invité introuvable"}),{
      status: 404,
      headers: {"Content-Type": "application/json"},
    });
  }

  return new Response(JSON.stringify(guest),{
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
}
