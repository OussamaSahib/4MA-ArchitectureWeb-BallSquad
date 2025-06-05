import {createAsyncStore, RouteDefinition, useNavigate} from "@solidjs/router";
import {ErrorBoundary, Show, Suspense, createEffect, createSignal} from "solid-js";
import {getGuestById} from "~/lib/friends";
import {getUser} from "~/lib/user";
import ProfileCardGuest from "~/components/ProfileCardGuest";
import ConfirmDeletePopup from "~/components/ConfirmDeletePopup";



export const route={
  preload: ({params})=>{
    getGuestById(params.id);
    getUser();
  },
} satisfies RouteDefinition;


export default function GuestProfilePage(props: {params: {id: string}}){
  const user= createAsyncStore(()=> getUser());
  const guest= createAsyncStore(()=> getGuestById(props.params.id));
  const [confirmDelete, setConfirmDelete]= createSignal(false);

  createEffect(()=>{
    if (user()===null) {
      useNavigate()("/");
    }
  });


  return (
    <ErrorBoundary fallback={<div class="text-red-500 text-center mt-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-white text-center mt-4">Chargement en cours…</div>}>
        <main class="pt-16 md:pt-4 px-4 md:pl-60 pb-10 min-h-screen bg-[#1a1a1a] text-white">
          <div class="mb-2 md:mb-0">
            <a href="/friends">
              <img
                src="/images/buttons/back_button.png"
                alt="Retour"
                class="w-16 h-16 hover:opacity-80 transition"
              />
            </a>
          </div>


          <div class="max-w-4xl mx-auto flex flex-col items-center">
            <Show when={guest()} fallback={<p class="text-center">Chargement...</p>}>
              {(g)=>(
                <ProfileCardGuest
                  user={{
                    firstname: g().firstname,
                    lastname: g().lastname ?? "",
                    phone: g().phone ?? "",
                    photo: undefined,
                  }}
                >
                  <button
                    class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition cursor-pointer"
                    onClick={() => setConfirmDelete(true)}
                  >
                    Supprimer cet invité
                  </button>
                </ProfileCardGuest>
              )}
            </Show>



            <Show when={confirmDelete()}>
              <ConfirmDeletePopup
                friendId={props.params.id}
                message="Cette action supprimera cet invité de votre liste."
                onCancel={() => setConfirmDelete(false)}
              />
            </Show>
          </div>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}
