import {db} from "./db"
import {query, action} from "@solidjs/router";
import {z} from "zod";
import { redirect } from "@solidjs/router"


export const getMatchs= query(async ()=> {
  "use server"
  return await db.match.findMany()
}, "getMatchs")




//SCHEMA de validation
const matchSchema = z.object({
  sport: z.string(),
  date: z.string(),
  time: z.string(),
  place: z.string(),
  field: z.string(),
  total_price: z.string(),
  quantity_players: z.string(),
});

//POST: crée un nouveau match
export const addMatch= async (form: FormData) => {
  "use server";

  const match = matchSchema.parse({
    sport: form.get("sport"),
    date: form.get("date"),
    time: form.get("time"),
    place: form.get("place"),
    field: form.get("field"),
    total_price: form.get("total_price"),
    quantity_players: form.get("quantity_players"),
  });
  // 🛠️ Conversion de date + time en Date (pour Prisma)
  const fullDate = new Date(`${match.date}T${match.time}`);

  // Conversion des champs string → number
  const matchToInsert = {
      sport: match.sport,
      date: fullDate,
      place: match.place,
      field: match.field,
      total_price: parseFloat(match.total_price),
      quantity_players: parseInt(match.quantity_players, 10),
    };

  await db.match.create({ data: matchToInsert });
  return redirect("/");
};

// Export de l'action
export const addMatchAction= action(addMatch);