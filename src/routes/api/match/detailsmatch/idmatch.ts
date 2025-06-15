import type {APIEvent} from "@solidjs/start/server"
import {EditMatch, getMatchById} from "~/lib/matchs";


export async function GET(event: APIEvent){
  const id= event.request.url.split("id=")[1];
  const match= await getMatchById(id);
  return new Response(JSON.stringify(match),{
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
}


export async function POST({request}: APIEvent){
  const form= await request.formData();
  await EditMatch(form);
  return new Response(JSON.stringify({success: true}));
}