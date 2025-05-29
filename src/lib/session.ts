import {action, redirect} from "@solidjs/router"
import {useSession} from "vinxi/http"
import {db} from "./db"



type SessionData= {
  email?: string
}

export function getSession(){
  "use server"
  return useSession<SessionData>({
    password: import.meta.env.VITE_SESSION_SECRET,
  })
}


export const logout = action(async () => {
  "use server"
  const session = await getSession();
  await session.clear();
  console.log("Session avant clear:", session.data);
  return redirect("/"); // redirection immédiate
});

