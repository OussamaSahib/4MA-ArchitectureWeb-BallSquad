import type {APIEvent} from "@solidjs/start/server"
import {getMatchs} from "~/lib/matchs"

export async function GET(event: APIEvent) {
  return await getMatchs()
}