import type {APIEvent} from "@solidjs/start/server";
import {getFriendByIdMobile} from "~/lib/friends";



export async function GET(event: APIEvent){
  const {searchParams, pathname} = new URL(event.request.url);
  const id= pathname.split("/").pop();
  const email= searchParams.get("email");

  if (!id || !email){
    return new Response(JSON.stringify({ error: "ID ou email manquant" }), {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  const friend = await getFriendByIdMobile(parseInt(id, 10), email);
  if (!friend) {
    return new Response(JSON.stringify({ error: "Ami introuvable" }), {
      status: 404,
      headers: {"Content-Type": "application/json"},
    });
  }

  return new Response(JSON.stringify(friend), {
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
}
