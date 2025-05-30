import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { getFriendById } from "~/lib/friends";

export default function FriendProfile(props: { params: { id: string } }) {
  const friend = createAsync(() => getFriendById(props.params.id));

  return (
    <main class="ml-48 text-white min-h-screen flex justify-center items-center p-8">
      <div class="bg-[#282828] p-10 rounded-xl shadow-xl text-center max-w-sm w-full">
        <Show when={friend()} fallback={<p>Chargement...</p>}>
          {(f) => (
            <>
              <img
                src={f().photo || "/images/profile_photos/icone_profile.png"}
                alt="Photo de profil"
                class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#c5ff36] mb-6"
              />
              <h2 class="text-3xl font-bold">{f().firstname} {f().lastname}</h2>
              <p class="text-gray-400 mb-6">{f().email}</p>
              <a
                href="/friends"
                class="inline-block bg-[#c5ff36] text-black font-semibold px-6 py-2 rounded hover:bg-[#b8f02e] transition"
              >
                Retour
              </a>
            </>
          )}
        </Show>
      </div>
    </main>
  );
}
