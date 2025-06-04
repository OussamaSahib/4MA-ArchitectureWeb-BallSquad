import {createAsyncStore, RouteDefinition, useNavigate} from "@solidjs/router";
import {createEffect, ErrorBoundary, Show, Suspense} from "solid-js";
import {AuthGuard, getUser} from "~/lib/user";
import ProfileCard from "~/components/ProfileCard";


//PRELOAD GET
export const route={
  preload: ()=> getUser(),
} satisfies RouteDefinition;


export default function ProfilePage(){
  //GET TT LES INFOS DE USER
  const user= createAsyncStore(()=> getUser());

  //REDIRECTION SI USER PAS CONNECTE
  createEffect(()=>{
    if (user()===null){
      useNavigate()("/");
    }
  });

  
  return (
    <ErrorBoundary fallback={<div class="text-red-500 text-center mt-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-white text-center mt-4">Chargement en cours…</div>}>
      
        <main class="md:ml-48 text-center mx-auto text-gray-700 p-4 overflow-y-scroll h-screen">
          <h1 class="text-5xl text-white font-bold uppercase mt-0 mb-8">PROFILE</h1>

          <div class="flex justify-center">
            <Show when={user()} fallback={<p class="text-white">Chargement...</p>}>
              {(u) => (
                <ProfileCard user={u()}>
                  <a
                    href="/profile/edit"
                    class="bg-[#72777d] hover:bg-[#5f6368] text-white font-semibold py-2 px-6 rounded-lg shadow transition cursor-pointer"
                  >
                    Modifier mon profil
                  </a>
                </ProfileCard>
              )}
            </Show>
          </div>
          
          {/*BOUTON SUPRESSION DU COMPTE*/}
          <form action={""} method="post" class="flex justify-end mt-0 px-4 md:px-8">
              <button type="submit" class="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Supprimer le compte
              </button>
          </form>

        </main>
    </Suspense>
  </ErrorBoundary>
  );
}