import { Show, createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { getUser, updateUser } from "~/lib/user";

export default function EditProfile() {
  const user = createAsync(() => getUser());
  const [formError, setFormError] = createSignal("");
  const [previewUrl, setPreviewUrl] = createSignal("");
  const [removePhoto, setRemovePhoto] = createSignal(false);

  return (
    <main class="ml-48 text-center mx-auto text-gray-700 p-4 pb-10 ">
      <div class="flex items-center justify-center gap-4 mb-6 ml-1">
        <a href="/profile">
          <img
            src="/images/buttons/back_button.png"
            alt="Retour"
            class="w-16 h-16 hover:opacity-80 transition"
          />
        </a>
        <h1 class="text-4xl text-white font-bold uppercase flex-1 text-center ml-4">
          Modifier mon profil
        </h1>
        <div class="w-22 h-8" /> {/* Espace vide pour équilibrer */}
      </div>

      <Show when={user()} fallback={<p class="text-white">Chargement...</p>}>
        {(u) => (
          <form
            action={updateUser}
            method="post"
            enctype="multipart/form-data"
            class="max-w-md mx-auto text-left space-y-4 bg-white/5 p-8 pt-5 pb-6 rounded-xl border border-white/10 shadow-lg"
          >
            {/* APERÇU DE LA PHOTO */}
            <div class="flex justify-center">
              <img
                src={
                  removePhoto()
                    ? "/images/profile_photos/icone_profile.png"
                    : previewUrl() || u().photo || "/images/profile_photos/icone_profile.png"
                }
                alt="Aperçu photo"
                class="w-32 h-32 rounded-full object-cover shadow"
              />
            </div>

            {/* Bouton supprimer */}
          <Show when={u().photo}>
            <button
              type="button"
              onClick={() => setRemovePhoto(true)}
              class="block mt-2 mx-auto text-sm text-red-500 hover:underline cursor-pointer"
            >
              Supprimer la photo de profile
            </button>
          </Show>

        <input type="hidden" name="removePhoto" value={removePhoto() ? "true" : "false"} />

            {/* INPUT FILE */}
            <div class="mb-4">
              <label
                for="photo-upload"
                class="block w-full text-center bg-[#444] hover:bg-[#555] text-white font-semibold py-2 px-4 rounded cursor-pointer transition"
              >
                Choisir une photo de profile
              </label>
              <input
                id="photo-upload"
                type="file"
                name="photo"
                accept="image/*"
                class="hidden"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    setPreviewUrl(URL.createObjectURL(file));
                    setRemovePhoto(false);
                  }
                }}
              />
            </div>

            {/* FORMULAIRE */}
            <div>
              <label class="text-white block mb-1">Prénom</label>
              <input
                type="text"
                name="firstname"
                value={u().firstname}
                class="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label class="text-white block mb-1">Nom</label>
              <input
                type="text"
                name="lastname"
                value={u().lastname}
                class="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label class="text-white block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={u().email}
                class="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label class="text-white block mb-1">Téléphone</label>
              <input
                type="text"
                name="phone"
                value={u().phone ?? ""}
                class="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label class="text-white block mb-1">IBAN</label>
              <input
                type="text"
                name="iban"
                value={u().iban ?? ""}
                class="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label class="text-white block mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                name="password"
                placeholder="Laisse vide si inchangé"
                class="w-full px-4 py-2 rounded bg-white text-black"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-[#c5ff36] hover:bg-[#b1e835] text-black font-bold py-2 px-4 rounded transition mt-6 cursor-pointer"
            >
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