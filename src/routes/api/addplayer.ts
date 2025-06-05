import type {APIEvent} from "@solidjs/start/server";
import {AddPlayerToMatchACtion} from "~/lib/matchs";

// Route POST = ajouter un joueur à un match
export async function POST(event: APIEvent){
  const form= await event.request.formData();
  return await AddPlayerToMatchACtion(form);
}