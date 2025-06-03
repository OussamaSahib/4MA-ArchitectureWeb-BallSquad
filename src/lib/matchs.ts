import {db} from "./db"
import {query, action} from "@solidjs/router";
import {z} from "zod";
import {redirect} from "@solidjs/router"
import {getUserFromSession} from "./user";


//GET MATCHS(créés ou rejoints par l'utilisateur connecté)
export const getMatchs= query(async ()=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) return [];

  return await db.match.findMany({
    where: {
      OR: [
        {id_creator: user.id},
        {matchPlayers: {some: { userId: user.id}}},
      ],
    },
    distinct: ['id'],
    include:{
      creator: true,
      matchPlayers: true,
    },
  });
}, "getMatchs");

//GET DETAILS MATCH
export const getMatchById= query(async (id: string)=>{
  "use server";
  const matchId= parseInt(id, 10);
  return await db.match.findUnique({
    where: {id: matchId},
    include: {
      creator: true, 
      matchPlayers: {include: {user: true}}, 
      matchGuests: { include: { guest: true } },}, 
  });
}, "getMatchById");




//POST NEW MATCH
//Schéma de validation
const matchSchema= z.object({
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


//POST: Crée un nouveau match
export const addMatch= async (form: FormData)=>{
  "use server";

  const user= await getUserFromSession();
  if (!user) throw new Error("User not connected");

  const match= matchSchema.parse({
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

  const total_price= parseInt(match.price_euros, 10) +parseInt(match.price_cents, 10)/100;

  await db.match.create({
      data:{
        sport: match.sport,
        date: new Date(match.date),
        start_time: new Date(`${match.date}T${match.start_time}`),
        end_time: new Date(`${match.date}T${match.end_time}`),
        place: match.place,
        field: match.field,
        total_price,
        quantity_players: parseInt(match.quantity_players, 10),
        id_creator: user.id,
        matchPlayers: {
          create: {
            userId: user.id,
            status: "CONFIRMED",
          },
        },
      },
    });
  return redirect("/match");
};

//Export de l'action
export const addMatchAction= action(addMatch);




//UPDATE EDIT MATCH (-->POST)
export const editMatch = async (form: FormData) => {
  "use server";
  const id = parseInt(form.get("id") as string, 10);

  await db.match.update({
    where: {id},
    data: {
      sport: form.get("sport") as string,
      place: form.get("place") as string,
      field: form.get("field") as string,
      quantity_players: parseInt(form.get("quantity_players") as string, 10),
      total_price:
        parseInt(form.get("price_euros") as string, 10) +
        parseInt(form.get("price_cents") as string, 10) / 100,
      date: new Date(form.get("date") as string),
      start_time: new Date(`${form.get("date")}T${form.get("start_time")}`),
      end_time: new Date(`${form.get("date")}T${form.get("end_time")}`),
    },
  });

  return redirect(`/match/${id}`);
};

export const editMatchAction = action(editMatch);



//POST PLAYER OFTHE MATCH
const addPlayerSchema = z.object({
  matchId: z.string().transform(Number),
  userId: z.string().transform(Number),
});

export const addPlayerToMatch = action(async (form: FormData) => {
  "use server";
  const user = await getUserFromSession();
  if (!user) throw new Error("Non connecté");

  const data = addPlayerSchema.parse({
    matchId: form.get("matchId"),
    userId: form.get("userId"),
  });

  await db.matchPlayer.create({
    data: {
      matchId: data.matchId,
      userId: data.userId,
      status: "NOT_ASKED", 
    },
  });

    
  });




const addGuestToMatchSchema = z.object({
  matchId: z.string().transform(Number),
  guestId: z.string().transform(Number),
});

export const addGuestToMatch = action(async (form: FormData) => {
  "use server";
  const user = await getUserFromSession();
  if (!user) throw new Error("Non connecté");

  const data = addGuestToMatchSchema.parse({
    matchId: form.get("matchId"),
    guestId: form.get("guestId"),
  });

  // On relie l'invité au match
  await db.matchGuest.create({
      data: {
        matchId: data.matchId,
        guestId: data.guestId,
        status: "NOT_ASKED",
        },
      }
    )
  }
)
