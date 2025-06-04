import {useSession} from "vinxi/http"


//FCT POUR SESSION
type SessionData= {
  email?: string
}

export function getSession(){
  "use server"
  return useSession<SessionData>({
    password: import.meta.env.VITE_SESSION_SECRET,
  })
}
