import {createAsyncStore, RouteDefinition, useNavigate} from "@solidjs/router";
import {getMatchById} from "~/lib/matchs";
import {createEffect, ErrorBoundary, Show, Suspense} from "solid-js";
import MatchCardDetails from "~/components/MatchCardDetails";
import {getUser} from "~/lib/user";
import PlayerListTable from "~/components/PlayerListTable";


// PRELOAD
export const route = {
  preload({ params }) {
    getUser();
    return getMatchById(params.id);
  },
} satisfies RouteDefinition;



export default function MatchPage(props: { params: { id: string } }) {
  const match = createAsyncStore(() => getMatchById(props.params.id));
  const user = createAsyncStore(() => getUser());

  createEffect(()=>{
    if (user()===null) {
      useNavigate()("/");
    }
  });

  return (
    <ErrorBoundary fallback={<div class="text-red-500 text-center mt-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-white text-center mt-4">Chargement du match…</div>}>
       <main class="text-white p-4 mt-12 md:mt-0 md:p-8 md:ml-48">


          <Show when={match()} fallback={<div>Chargement des données du match…</div>}>
            {(data) => (
              <Show when={user()} fallback={<div>Chargement de l'utilisateur…</div>}>
                {(currentUser) => (
                  <>
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                      {/* Retour */}
                      <div class="mt-2 self-start">
                        <a href="/match">
                          <img
                            src="/images/buttons/back_button.png"
                            alt="Retour"
                            class="w-12 h-12 sm:w-14 sm:h-14 hover:opacity-80 transition"
                          />
                        </a>
                      </div>

                      {/* Détails match */}
                      <div class="flex-grow">
                        <MatchCardDetails match={data()} user={currentUser()} />
                      </div>

                      {/* Modifier */}
                      <div class="mt-2 self-start">
                        <a href={`/match/${data().id}/editmatch`} aria-label="Modifier le match">
                          <img
                            src="/images/buttons/edit_button.png"
                            alt="Modifier"
                            class="w-12 h-12 sm:w-14 sm:h-14 hover:opacity-80 transition"
                          />
                        </a>
                      </div>
                    </div>


                    {/* Liste joueurs */}
                    <PlayerListTable match={data()} />
                  </>
                )}
              </Show>
            )}
          </Show>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}