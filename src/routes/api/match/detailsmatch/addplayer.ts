import type {APIEvent} from "@solidjs/start/server";
import {AddPlayerToMatchMobile} from "~/lib/matchs";



export async function POST(event: APIEvent){
  const formData= await event.request.formData();
  const email= formData.get("email")?.toString();

  if (!email) {
    return new Response(JSON.stringify({error: "Email manquant"}),{
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  try {
    const result= await AddPlayerToMatchMobile(formData, email);

    return new Response(JSON.stringify(result),{
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } catch (err){
    return new Response(JSON.stringify({ error: "Erreur lors de l'ajout"}),{
      status: 500,
      headers: {"Content-Type": "application/json"},
    });
  }
}