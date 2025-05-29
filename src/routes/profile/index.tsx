import { createAsync } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import {logout} from "~/lib/session";
import { AuthGuard, getUser } from "~/lib/user";



export default function Profile() {
    //REDIRECTION SI USER PAS CONNECTE
    AuthGuard()

    const user = createAsync(() => getUser());

    const [showImage, setShowImage] = createSignal(false); // ← Pour le zoom

  
  return (
    <main class="ml-48 text-center mx-auto text-gray-700 p-4 overflow-y-scroll h-screen">
      <h1 class="text-6xl text-white font-bold uppercase mt-0 mb-8">PROFILE</h1>

      <div class="flex justify-center">
        <Show when={user()} fallback={<p class="text-white">Chargement...</p>}>
          {(u) => (
            <div class="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl rounded-2xl p-4 w-full max-w-md text-center">
              {/* Avatar */}
              <div class="flex justify-center">
                <img
                  src={u().photo || "/images/profile_photos/icone_profile.png"}
                  alt="Avatar"
                  class="rounded-full w-45 h-45 object-cover shadow cursor-pointer"
                  onClick={() => setShowImage(true)}
                />
              </div>

              {/* Nom complet */}
              <h2 class="text-2xl font-bold text-white">
                {u().firstname} {u().lastname}
              </h2>
              <p class="text-gray-300 mt-1">{u().email}</p>

              {/* Bouton modifier */}
              <a
                href="/profile/edit"
                class="mt-10 inline-block bg-[#c5ff36] hover:bg-[#b1e835] text-black font-semibold py-2 px-6 rounded-lg shadow transition cursor-pointer"
              >
                Modifier mon profil
              </a>
            </div>
          )}
        </Show>
      </div>
      
        <form action={logout} method="post" class="mr-8 flex justify-end">
            <button type="submit" class="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Déconnexion
            </button>
      </form>


      
      {/* Image agrandie*/}
      <Show when={showImage()}>
        <div class="fixed inset-0 bg-black  flex flex-col">
          
          {/* Ligne avec la croix alignée à droite */}
          <div class="flex justify-end">
            <button
              onClick={() => setShowImage(false)}
              class="mr-14 text-white text-6xl font-bold hover:text-gray-300 cursor-pointer"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>

          {/* Image centrée */}
          <div class="flex flex-1 items-start justify-center">
            <img
              src={user()?.photo || "/images/icone_profile.png"}
              alt="Avatar Zoom"
              class="max-w-md rounded-xl shadow-lg cursor-pointer"
            />
          </div>

        </div>
      </Show>
    </main>
  );
}