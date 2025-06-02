import {createAsync, createAsyncStore, RouteDefinition} from "@solidjs/router";
import {getMatchById} from "~/lib/matchs";
import {createResource, createSignal, For, Show} from "solid-js";
import MatchCardDetails from "~/components/MatchCardDetails";
import EditMatchPopup from "~/components/EditMatchPopup";
import {AuthGuard, getUser} from "~/lib/user";
import PlayerListPopup from "~/components/PlayerListTable";
import PlayerListTable from "~/components/PlayerListTable";


export const route = {
  preload({ params }) {
    return getMatchById(params.id);
  },
} satisfies RouteDefinition;


export default function MatchPage(props: { params: { id: any; }; }) {
  const match = createAsyncStore(() => getMatchById(props.params.id));
  const [showEdit, setShowEdit] = createSignal(false);
  const [priceTotal, setPriceTotal] = createSignal<number | null>(null);
  const user = createAsync(() => getUser());
  

  //REDIRECTION SI USER PAS CONNECTE
  AuthGuard()


  return (
    <main class="ml-0 md:ml-48 text-white p-4 sm:p-0 md:p-8 md:pt-5 md:pl-4">

      <Show when={match()}>
        {(data) => (
          <Show when={user()}>
            {(currentUser) => (
              <>
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                  {/* Bouton retour */}
                  <div class="mt-2 self-start">
                    <a href="/match">
                      <img
                        src="/images/buttons/back_button.png"
                        alt="Retour"
                        class="w-12 mr-14 h-12 sm:w-14 sm:h-14"
                      />
                    </a>
                  </div>

                  {/* MatchCardDetails */}
                  <div class="flex-grow">
                    <MatchCardDetails match={data()} user={currentUser()} />
                  </div>

                  {/* Bouton modifier */}
                  <div class="mt-2 self-start ml-0">
                    <button onClick={() => setShowEdit(true)}>
                      <img
                        src="/images/buttons/edit_button.png"
                        alt="Modifier"
                        class="w-12 h-12 ml-5 sm:w-14 sm:h-14 cursor-pointer"
                      />
                    </button>
                  </div>
                </div>

                {/* Popup d’édition */}
                <Show when={showEdit()}>
                  <EditMatchPopup
                    match={data()}
                    onClose={() => setShowEdit(false)}
                    onPriceChange={setPriceTotal}
                  />
                </Show>

                {/* Liste des joueurs */}
                <PlayerListTable match={data()} />
              </>
            )}
          </Show>
        )}
      </Show>
    </main>

      );
    }