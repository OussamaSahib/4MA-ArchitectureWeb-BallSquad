import { createSignal, For, Show } from "solid-js";
import { createAsyncStore } from "@solidjs/router";
import { getMatchById, addPlayerToMatch, addGuestToMatch } from "~/lib/matchs";
import { getFriends, getGuests } from "~/lib/friends";

export default function AddPlayersPage(props: { params: { id: string } }) {
  const match = createAsyncStore(() => getMatchById(props.params.id));
  const friends = createAsyncStore(() => getFriends(), { initialValue: [] });
  const guests = createAsyncStore(() => getGuests(), { initialValue: [] });

  const [searchFriend, setSearchFriend] = createSignal("");
  const [searchGuest, setSearchGuest] = createSignal("");

  const isAlreadyPlayer = (userId: number) =>
    match()?.players?.some((p: any) => p.id === userId);

  const isAlreadyGuest = (guestId: number) =>
    match()?.guests?.some((g: any) => g.id === guestId);

  return (
    <main class="ml-46 mt-1 mr-10 mb-10 text-white p-6 space-y-12">
      <Show when={match()}>
        {(data) => (
          <>
            {/* TITRE + BOUTON RETOUR */}
            <div class="flex items-center gap-4 mb-6">
              <a href={`/match/${data().id}`}>
                <img
                  src="/images/buttons/back_button.png"
                  alt="Retour"
                  class="w-14 h-14 hover:opacity-80 transition"
                />
              </a>
              <h1 class="text-5xl font-bold underline">
                Ajouter des joueurs
              </h1>
            </div>

            {/* AMIS */}
            <section class="ml-18">
              <h2 class="text-3xl font-semibold mb-4">Amis</h2>

              <div class="flex items-center mb-6">
                <input
                  type="text"
                  placeholder="Rechercher un ami..."
                  value={searchFriend()}
                  onInput={(e) => setSearchFriend(e.currentTarget.value)}
                  class="w-full md:w-80 px-4 py-2 rounded bg-[#5f6368] text-white"
                />
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <For each={friends().filter(f =>
                  `${f.friend.firstname} ${f.friend.lastname}`
                    .toLowerCase()
                    .includes(searchFriend().toLowerCase())
                )}>
                  {(f) => (
                    <div class="bg-[#2e2e2e] p-4 rounded-lg text-center shadow-md">
                      <img
                        src={f.friend.photo || "/images/profile_photos/icone_profile.png"}
                        alt="Photo de profil"
                        class="w-22 h-22 rounded-full mx-auto mb-2 object-cover opacity-80"
                      />
                      <p class="text-white text-lg">{f.friend.firstname}</p>
                      <p class="text-white text-lg mb-2">{f.friend.lastname}</p>

                      <Show when={!isAlreadyPlayer(f.friend.id)} fallback={
                        <p class="text-sm text-green-400">✔ Ajouté</p>
                      }>
                        <form action={addPlayerToMatch} method="post">
                          <input type="hidden" name="matchId" value={data().id} />
                          <input type="hidden" name="userId" value={f.friend.id} />
                          <button type="submit" class="bg-[#c5ff36] text-black px-3 py-1 rounded font-bold text-sm">
                            Ajouter
                          </button>
                        </form>
                      </Show>
                    </div>
                  )}
                </For>
              </div>
            </section>

            {/* INVITÉS */}
            <section class="ml-18">
              <h2 class="text-3xl font-semibold mb-4">Invités</h2>

              <div class="flex items-center mb-6">
                <input
                  type="text"
                  placeholder="Rechercher un invité..."
                  value={searchGuest()}
                  onInput={(e) => setSearchGuest(e.currentTarget.value)}
                  class="w-full md:w-80 px-4 py-2 rounded bg-[#5f6368] text-white"
                />
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <For each={guests().filter(g =>
                  `${g.firstname} ${g.lastname}`
                    .toLowerCase()
                    .includes(searchGuest().toLowerCase())
                )}>
                  {(g) => (
                    <div class="bg-[#2e2e2e] p-4 rounded-lg text-center shadow-md">
                      <img
                        src="/images/profile_photos/icone_profile.png"
                        alt="Photo invité"
                        class="w-22 h-22 rounded-full mx-auto mb-2 object-cover opacity-80"
                      />
                      <p class="text-white text-lg">{g.firstname}</p>
                      <p class="text-white text-lg mb-2">{g.lastname}</p>

                      <Show when={!isAlreadyGuest(g.id)} fallback={
                        <p class="text-sm text-green-400">✔ Ajouté</p>
                      }>
                        <form action={addGuestToMatch} method="post">
                          <input type="hidden" name="matchId" value={data().id} />
                          <input type="hidden" name="guestId" value={g.id} />
                          <button type="submit" class="bg-[#c5ff36] text-black px-3 py-1 rounded font-bold text-sm">
                            Ajouter
                          </button>
                        </form>
                      </Show>
                    </div>
                  )}
                </For>
              </div>
            </section>
          </>
        )}
      </Show>
    </main>
  );
}
