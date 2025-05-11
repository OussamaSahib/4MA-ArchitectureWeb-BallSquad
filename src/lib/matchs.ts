import {db} from "./db"
import {query, action} from "@solidjs/router";
import {z} from "zod";
import {redirect} from "@solidjs/router"


export const getMatchs= query(async ()=> {
  "use server"
  return await db.match.findMany()
}, "getMatchs")

export const getMatchById = query(async (id: string) => {
  "use server";
  const matchId = parseInt(id, 10);
  return await db.match.findUnique({
    where: { id: matchId }
  });
}, "getMatchById");





//SCHEMA de validation
const matchSchema = z.object({
  sport: z.string(),
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  place: z.string(),
  field: z.string(),
  price_euros: z.string(),
  price_cents: z.string(),
  quantity_players: z.string(),
});

//POST: crée un nouveau match
export const addMatch= async (form: FormData) => {
  "use server";

  const match = matchSchema.parse({
    sport: form.get("sport"),
    date: form.get("date"),
    start_time: form.get("start_time"),
    end_time: form.get("end_time"),
    place: form.get("place"),
    field: form.get("field"),
    price_euros: form.get("price_euros"),
    price_cents: form.get("price_cents"),
    quantity_players: form.get("quantity_players"),
  });

  const total_price = parseInt(match.price_euros, 10) + parseInt(match.price_cents, 10) / 100;

  const matchToInsert = {
    sport: match.sport,
    date: new Date(match.date),
    start_time: new Date(`${match.date}T${match.start_time}`),
    end_time: new Date(`${match.date}T${match.end_time}`),
    place: match.place,
    field: match.field,
    total_price: total_price,
    quantity_players: parseInt(match.quantity_players, 10),
  };

  await db.match.create({ data: matchToInsert });
  return redirect("/");
};

// Export de l'action
export const addMatchAction= action(addMatch);