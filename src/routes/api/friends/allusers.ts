import type { APIEvent } from "@solidjs/start/server";
import { getAllUsers } from "~/lib/friends";


export async function GET(event: APIEvent) {
  return await getAllUsers()
}