import {db} from "./db"
import {query} from "@solidjs/router";


export const getMatchs= query(async ()=> {
  "use server"
  return await db.match.findMany()
}, "getMatchs")