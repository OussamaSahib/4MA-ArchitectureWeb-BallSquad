import type {APIEvent} from "@solidjs/start/server"
import {AddMatchMobile, getMatchsMobile} from "~/lib/matchs"


export async function GET(event: APIEvent){
  const url= new URL(event.request.url);
  const email= url.searchParams.get("email");

  if (!email){
    return new Response(JSON.stringify({error: "Email manquant"}),{
      status: 400,
      headers:{"Content-Type": "application/json"},
    });
  }

  const matchs= await getMatchsMobile(email);

  return new Response(JSON.stringify(matchs),{
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
    const match= await AddMatchMobile(formData, email);

    return new Response(JSON.stringify(match),{
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } catch (err){
    console.error("Erreur ajout match mobile:", err);
    return new Response(JSON.stringify({ error: "Erreur lors de l'ajout" }),{
      status: 500,
      headers: {"Content-Type": "application/json"},
    });
  }
}