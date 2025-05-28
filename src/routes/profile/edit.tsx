import { Show, createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { getUser, updateUser } from "~/lib/user";

export default function EditProfile() {
  const user = createAsync(() => getUser());
  const [formError, setFormError] = createSignal("");

  return (
    <main class="ml-48 text-center mx-auto text-gray-700 p-4 h-screen">
      <h1 class="text-4xl text-white font-bold uppercase mb-6">Modifier mon profil</h1>

      <Show when={user()} fallback={<p class="text-white">Chargement...</p>}>
        {(u) => (
          <form action={updateUser} method="post" class="max-w-md mx-auto text-left space-y-4 bg-white/5 p-8 rounded-xl border border-white/10 shadow-lg">
            <div>
              <label class="text-white block mb-1">Prénom</label>
              <input type="text" name="firstname" value={u().firstname} class="w-full px-4 py-2 rounded bg-white text-black" />
            </div>

            <div>
              <label class="text-white block mb-1">Nom</label>
              <input type="text" name="lastname" value={u().lastname} class="w-full px-4 py-2 rounded bg-white text-black" />
            </div>

            <div>
              <label class="text-white block mb-1">Email</label>
              <input type="email" name="email" value={u().email} class="w-full px-4 py-2 rounded bg-white text-black" />
            </div>

            <button type="submit" class="w-full bg-[#c5ff36] hover:bg-[#b1e835] text-black font-bold py-2 px-4 rounded transition cursor-pointer">
              Sauvegarder
            </button>

            <Show when={formError()}>
              <p class="text-red-500 mt-2">{formError()}</p>
            </Show>
          </form>
        )}
      </Show>
    </main>
  );
}
