import {db} from "./db"
import {query, action} from "@solidjs/router";
import {z} from "zod";
import {redirect} from "@solidjs/router"
import {getUserFromSession} from "./user";


//WEB
//NEW MATCH (POST)
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

export const AddMatch= async(form: FormData)=>{
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
}
export const AddMatchAction= action(AddMatch)



//RÉCUPÈRE MATCHS (créés ou rejoints par l'utilisateur connecté) (GET)
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



//RÉCUPÈRE DETAILS MATCH (GET)
export const getMatchById= query(async(id: string)=>{
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





//UPDATE EDIT MATCH (-->POST)
export const EditMatch= async (form: FormData)=>{
  "use server";
  const id= parseInt(form.get("id") as string, 10);

  await db.match.update({
    where: {id},
    data:{
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
}
export const EditMatchAction= action(EditMatch)




//AJOUT JOUEUR AU MATCH (POST)
const addPlayerSchema= z.object({
  matchId: z.string().transform(Number),
  userId: z.string().transform(Number),
});

export const AddPlayerToMatch= async(form: FormData)=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) throw new Error("Non connecté");

  const data= addPlayerSchema.parse({
    matchId: form.get("matchId"),
    userId: form.get("userId"),
  });

  await db.matchPlayer.create({
    data:{
      matchId: data.matchId,
      userId: data.userId,
      status: "NOT_ASKED", 
    },
  });
}
export const AddPlayerToMatchACtion= action(AddPlayerToMatch)


//AJOUT INVITÉ AU MATCH (POST)
const addGuestToMatchSchema = z.object({
  matchId: z.string().transform(Number),
  guestId: z.string().transform(Number),
});

export const AddGuestToMatchAction= action(async(form: FormData)=>{
  "use server";
  const user= await getUserFromSession();
  if (!user) throw new Error("Non connecté");

  const data= addGuestToMatchSchema.parse({
    matchId: form.get("matchId"),
    guestId: form.get("guestId"),
  });

  // On relie l'invité au match
  await db.matchGuest.create({
      data:{
        matchId: data.matchId,
        guestId: data.guestId,
        status: "NOT_ASKED",
        },
      }
    )
  }
)







//MOBILE
//RÉCUPÈRE MATCHS (créés ou rejoints par l'utilisateur connecté) (GET)
export async function getMatchsMobile(email: string){
  const user= await db.user.findUnique({where: {email}});
  if (!user) return [];

  return await db.match.findMany({
    where:{
      OR:[
        {id_creator: user.id},
        {matchPlayers: {some: {userId: user.id}}},
      ],
    },
    distinct: ["id"],
    include:{
      creator: true,
      matchPlayers: true,
    },
  });
}


//NEW MATCH (POST)
export async function AddMatchMobile(formData: FormData, email: string){
  const user= await db.user.findUnique({where: {email}});
  if (!user) throw new Error("Utilisateur non trouvé");

  const parsed= matchSchema.parse({
    sport: formData.get("sport"),
    date: formData.get("date"),
    start_time: formData.get("start_time"),
    end_time: formData.get("end_time"),
    place: formData.get("place"),
    field: formData.get("field"),
    price_euros: formData.get("price_euros"),
    price_cents: formData.get("price_cents"),
    quantity_players: formData.get("quantity_players"),
  });

  const total_price= parseInt(parsed.price_euros, 10) + parseInt(parsed.price_cents, 10)/100;

  return await db.match.create({
    data:{
      sport: parsed.sport,
      date: new Date(parsed.date),
      start_time: new Date(`${parsed.date}T${parsed.start_time}`),
      end_time: new Date(`${parsed.date}T${parsed.end_time}`),
      place: parsed.place,
      field: parsed.field,
      total_price,
      quantity_players: parseInt(parsed.quantity_players, 10),
      id_creator: user.id,
      matchPlayers:{
        create:{
          userId: user.id,
          status: "CONFIRMED",
        },
      },
    },
  });
}



//AJOUT JOUEUR AU MATCH (POST)
export async function AddPlayerToMatchMobile(form: FormData, email: string){
  const user= await db.user.findUnique({where: {email}});
  if (!user) throw new Error("Utilisateur non connecté");

  const data= addPlayerSchema.parse({
    matchId: form.get("matchId"),
    userId: form.get("userId"),
  });

  return await db.matchPlayer.create({
    data:{
      matchId: data.matchId,
      userId: data.userId,
      status: "NOT_ASKED",
    },
  });
}


//AJOUT INVITÉ AU MATCH (POST)
export async function AddGuestToMatchMobile(form: FormData, email: string){
  const user= await db.user.findUnique({where: {email}});
  if (!user) throw new Error("Utilisateur non connecté");

  const data= addGuestToMatchSchema.parse({
    matchId: form.get("matchId"),
    guestId: form.get("guestId"),
  });

  return await db.matchGuest.create({
    data:{
      matchId: data.matchId,
      guestId: data.guestId,
      status: "NOT_ASKED",
    },
  });
}