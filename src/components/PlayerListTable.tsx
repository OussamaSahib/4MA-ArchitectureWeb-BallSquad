import { createSignal, For, Show } from "solid-js";




export default function PlayerListTable(props: { match: any }) {
  return (
    <div class="relative max-w-3xl mx-auto overflow-x-auto mt-4">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-3xl font-bold">Joueurs</h2>
        <a href={`/match/${props.match.id}/addplayers`}>
          <img src="/images/buttons/add_button.png" alt="Ajouter" class="w-12 h-12 cursor-pointer" />
        </a>
      </div>

      <table class="w-full min-w-[400px] border border-black rounded-xl overflow-hidden bg-[#3b3d44] shadow-lg text-white">
        <thead class="bg-[#2d2f36] text-base">
          <tr>
            <th class="p-3 border border-black text-center font-semibold w-12">N°</th>
            <th class="p-3 border border-black text-left font-semibold w-60">Prénom et Nom</th>
            <th class="p-3 border border-black text-center font-semibold w-28">Statut</th>
          </tr>
        </thead>
        <tbody>
          <For each={Array.from({ length: props.match.quantity_players })}>
            {(_, i) => {
              const joueur = props.match.players[i()];
              const invite = props.match.guests?.[i() - props.match.players.length];

              return (
                <tr class="border-t border-black">
                  <td class="p-2 text-sm font-bold text-center bg-[#c5ff36] text-black border border-black">
                    {i() + 1}
                  </td>
                  <td class="p-3 border border-black">
                    {joueur ? (
                      <div class="flex items-center gap-2">
                        <img
                          src={
                            joueur.photo || "/images/profile_photos/icone_profile.png"
                          }
                          alt={`${joueur.firstname} ${joueur.lastname}`}
                          class="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{joueur.firstname} {joueur.lastname}</span>
                      </div>
                    ) : invite ? (
                      <span>{invite.firstname} {invite.lastname} <em class="text-xs">(Invité)</em></span>
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
  );
}
