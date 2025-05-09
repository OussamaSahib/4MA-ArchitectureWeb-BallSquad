import type {APIEvent} from "@solidjs/start/server"
import {getMatchs} from "~/lib/matchs"
import {addMatch} from "~/lib/matchs"

export async function GET(event: APIEvent) {
  return await getMatchs()
}

export async function POST(event: APIEvent) {
  return await addMatch(await event.request.formData())
}