import type {APIEvent} from "@solidjs/start/server";
import {LogoutAction} from "~/lib/user";


export async function POST(event: APIEvent){
  return await LogoutAction()
}

