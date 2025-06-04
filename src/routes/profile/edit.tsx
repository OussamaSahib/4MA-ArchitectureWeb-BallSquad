import {createAsyncStore, useNavigate, useSubmissions, type RouteDefinition} from "@solidjs/router";
import {ErrorBoundary, Show, Suspense, createEffect, createSignal} from "solid-js";
import {getUser, UpdateUserAction} from "~/lib/user";
import ProfileInput from "~/components/EditProfileInput";



export const route={
  preload: ()=> getUser(),
} satisfies RouteDefinition;


export default function EditProfilePage(){
  //GET TT LES INFOS DE USER
  const user= createAsyncStore(()=> getUser());

  //PHOTO
  const [previewUrl, setPreviewUrl]= createSignal("");
  const [removePhoto, setRemovePhoto]= createSignal(false);

  //SUBMISSION FORM
  const submissions= useSubmissions(UpdateUserAction);

  //REDIRECTION SI USER PAS CONNECTE
  createEffect(()=>{
    if (user()===null){
      useNavigate()("/");
    }
  });

  
  return (
    <ErrorBoundary fallback={<div class="text-red-500 text-center mt-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-white text-center mt-4">Chargement en cours…</div>}>

        <main class="pt-10 md:pt-4 pb-10 px-4 md:pl-60 md:pr-4 text-center text-gray-700">

          {/*BOUTON BACK +TITRE*/}
          <div class="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <a href="/profile">
              <img
                src="/images/buttons/back_button.png"
                alt="Retour"
                class="w-14 h-14 hover:opacity-80 transition"
              />
            </a>
            <h1 class="text-3xl md:text-4xl text-white font-bold uppercase text-center flex-1">
              Modifier mon profile
            </h1>
            <div class="w-14 h-14"/>
          </div>


          {/*FORMULAIRE*/}
          <Show when={user()} fallback={<p class="text-white">Chargement…</p>}>
            {(u)=>(
              <>
                <form
                  action={UpdateUserAction}
                  method="post"
                  enctype="multipart/form-data"
                  class="w-full max-w-md mx-auto text-left space-y-4 bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg"
                >
                  {/*PHOTO USER*/}
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

                  <Show when={u().photo}>
                    <button
                      type="button"
                      onClick={() => setRemovePhoto(true)}
                      class="block mt-2 mx-auto text-sm text-red-500 hover:underline"
                    >
                      Supprimer la photo de profil
                    </button>
                  </Show>

                  <input
                    type="hidden"
                    name="removePhoto"
                    value={removePhoto() ? "true" : "false"}
                  />

                  <div class="mb-4">
                    <label
                      for="photo-upload"
                      class="block text-center bg-[#444] hover:bg-[#555] text-white font-semibold py-2 px-4 rounded cursor-pointer transition"
                    >
                      Choisir une photo de profil
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


                  {/*FORMULAIRE*/}
                  <ProfileInput label="Prénom" name="firstname" value={u().firstname} />
                  <ProfileInput label="Nom" name="lastname" value={u().lastname} />
                  <ProfileInput label="Email" name="email" type="email" value={u().email} />
                  <ProfileInput label="Téléphone" name="phone" value={u().phone ?? ""} />
                  <ProfileInput label="IBAN" name="iban" value={u().iban ?? ""} />
                  <ProfileInput
                    label="Nouveau mot de passe"
                    name="password"
                    type="password"
                    value=""
                    placeholder="Laisse vide si inchangé"
                  />

                  <button
                    type="submit"
                    class="w-full bg-[#c5ff36] hover:bg-[#b1e835] text-black font-bold py-2 px-4 rounded transition mt-6 cursor-pointer"
                  >
                    Sauvegarder
                  </button>
                </form>

                <Show when={submissions.some((s) => s.pending)}>
                  <p class="text-yellow-500 mt-2 text-sm text-center">
                    Mise à jour en cours...
                  </p>
                </Show>
              </>
            )}
          </Show>
        </main>

      </Suspense>
    </ErrorBoundary>
  );
}
