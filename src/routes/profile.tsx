import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import {logout} from "~/lib/session";
import { AuthGuard, getUser } from "~/lib/user";



export default function Profile() {
    //REDIRECTION SI USER PAS CONNECTE
    AuthGuard()

     const user = createAsync(() => getUser());

  
  return (
    <main class="ml-48 text-center mx-auto text-gray-700 p-4 overflow-y-scroll h-screen">
      <h1 class="text-6xl text-white font-bold uppercase mt-0 mb-8">PROFILE</h1>

      <Show when={user()} fallback={<p class="text-white">Chargement...</p>}>
        {(userr) => (
          <div class="bg-[#c5ff36] p-6 rounded shadow-md max-w-md mx-auto text-left text-black">
            <p><strong>Prénom :</strong> {userr().firstname}</p>
            <p><strong>Nom :</strong> {userr().lastname}</p>
            <p><strong>Email :</strong> {userr().email}</p>
          </div>
        )}
      </Show>

        <form action={logout} method="post">
            <button type="submit" class="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Déconnexion
            </button>
      </form>
    </main>
  );
}