import type {APIEvent} from "@solidjs/start/server";
import {db} from "~/lib/db";
import {getGuestsMobile, addGuestMobile} from "~/lib/friends";
import {getUserFromSession} from "~/lib/user";



export async function GET(event: APIEvent){
  let user= await getUserFromSession();

  if (!user){
    const url= new URL(event.request.url);
    const email= url.searchParams.get("email");

    if (!email){
      return new Response(JSON.stringify({error: "Email requis"}),{
        status: 400,
        headers: {"Content-Type": "application/json"},
      });
    }

    user= await db.user.findUnique({where: { email }});

    if (!user){
      return new Response(JSON.stringify({error: "Utilisateur introuvable"}),{
        status: 404,
        headers: {"Content-Type": "application/json"},
      });
    }
  }

  const result= await getGuestsMobile(user.id);

  return new Response(JSON.stringify(result),{
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
}




export async function POST(event: APIEvent){
  const formData= await event.request.formData();
  const email= formData.get("email")?.toString();

  if (!email){
    return new Response(JSON.stringify({error: "Email manquant"}),{
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  try{
    const guest= await addGuestMobile(formData, email);

    return new Response(JSON.stringify(guest),{
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } 
  catch (err){
    console.error("Erreur ajout invité:", err);
    return new Response(JSON.stringify({ error: "Erreur lors de l'ajout" }),{
      status: 500,
      headers: {"Content-Type": "application/json"},
    });
  }
}
