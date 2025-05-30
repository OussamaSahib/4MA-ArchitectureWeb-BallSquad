import {createAsync, createAsyncStore, RouteDefinition} from "@solidjs/router";
import {getMatchById} from "~/lib/matchs";
import {createResource, createSignal, For, Show} from "solid-js";
import MatchCardDetails from "~/components/MatchCardDetails";
import EditMatchPopup from "~/components/EditMatchPopup";
import {AuthGuard, getUser} from "~/lib/user";


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
<main class="ml-48 text-white p-8 relative">
  {/* Bouton retour positionné en haut à gauche */}
  <a href="/match" class="absolute top-5 left-16">
    <img src="/images/buttons/back_button.png" alt="Retour" class="w-18 h-18" />
  </a>

  {/* Bouton Edit */}
  <button onClick={() => setShowEdit(true)} class="absolute top-7 right-30">
    <img src="/images/buttons/edit_button.png" alt="Modifier" class="w-16 h-16 cursor-pointer" />
  </button>



<Show when={match()}>
  {(data) => (
    <Show when={user()}>
      {(currentUser) => (
        <>
          <MatchCardDetails match={data()} user={currentUser()} />
          <Show when={showEdit()}>
            <EditMatchPopup match={data()} onClose={() => setShowEdit(false)} onPriceChange={setPriceTotal} />
          </Show>

          <div class="max-w-3xl mx-auto overflow-x-auto">
            <h2 class="text-3xl font-bold mt-10 mb-2">Joueurs inscrits</h2>
            <table class="w-full min-w-[400px] border border-black rounded-xl overflow-hidden bg-[#3b3d44] shadow-lg text-white">
              <thead class="bg-[#2d2f36] text-base">
                <tr>
                  <th class="p-3 border border-black text-center font-semibold w-12">N°</th>
                  <th class="p-3 border border-black text-left font-semibold w-60">Prénom et Nom</th>
                  <th class="p-3 border border-black text-center font-semibold w-28">Statut</th>
                </tr>
              </thead>
              <tbody>
                <For each={Array.from({ length: data().quantity_players })}>
                  {(_, i) => {
                    const joueur = data().players[i()];
                    return (
                      <tr class="border-t border-black">
                        <td class="p-2 text-sm font-bold text-center bg-[#c5ff36] text-black border border-black">
                          {i() + 1}
                        </td>
                        <td class="p-3 border border-black">
                          {joueur ? (
                            <div class="flex items-center gap-2">
                              <img
                                src={joueur.photo || "/images/profile_photos/icone_profile.png"}
                                alt={`${joueur.firstname} ${joueur.lastname}`}
                                class="w-8 h-8 rounded-full object-cover"
                              />
                              <span>{joueur.firstname} {joueur.lastname}</span>
                            </div>
                          ) : "-"}
                        </td>
                        <td class="p-2 border border-black text-center">
                          <img src="/images/status/pending.png" alt="Statut" class="h-6 w-6 mx-auto" />
                        </td>
                      </tr>
                    );
                  }}
                </For>
              </tbody>
            </table>
          </div>
        </>
      )}
    </Show>
  )}
</Show>

  
</main>
  );
}