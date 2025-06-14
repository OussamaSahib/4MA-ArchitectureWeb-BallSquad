import type {APIEvent} from "@solidjs/start/server";
import {db} from "~/lib/db";
import {addFriendMobile, getFriendsMobile} from "~/lib/friends";
import {getUserFromSession} from "~/lib/user";



export async function GET(event: APIEvent){
  let user= await getUserFromSession();

  if (!user){
    const url = new URL(event.request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Email requis" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    user= await db.user.findUnique({ where: {email}});

    if (!user){
      return new Response(JSON.stringify({error: "Utilisateur introuvable"}), {
        status: 404,
        headers: {"Content-Type": "application/json"},
      });
    }
  }

  const result= await getFriendsMobile(user.id);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
}






export async function POST(event: APIEvent){
  const form= await event.request.formData();
  const friendId= Number(form.get("friendId"));
  const email= String(form.get("email"));

  if (!friendId || !email) {
    return new Response(JSON.stringify({ error: "Données manquantes" }), {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  const result= await addFriendMobile(friendId, email);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
}