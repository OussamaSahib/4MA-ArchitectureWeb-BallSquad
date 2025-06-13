import { createEffect, createSignal, ErrorBoundary, For, Show, Suspense } from "solid-js";
import { createAsyncStore, RouteDefinition, useNavigate, useSubmissions } from "@solidjs/router";
import { getMatchById, AddPlayerToMatchACtion, AddGuestToMatchAction } from "~/lib/matchs";
import { getFriends, getGuests } from "~/lib/friends";
import { getUser } from "~/lib/user";


export const route = {
  preload: ({ params }) => {
    getMatchById(params.id);
    getFriends();
    getGuests();
  },
} satisfies RouteDefinition;


export default function AddPlayersPage(props: { params: { id: string } }) {
  const match = createAsyncStore(() => getMatchById(props.params.id));
  const user = createAsyncStore(() => getUser());
  const friends = createAsyncStore(() => getFriends(), { initialValue: [] });
  const guests = createAsyncStore(() => getGuests(), { initialValue: [] });

  const [searchFriend, setSearchFriend] = createSignal("");
  const [searchGuest, setSearchGuest] = createSignal("");

  const playerSubmissions = useSubmissions(AddPlayerToMatchACtion);
  const guestSubmissions = useSubmissions(AddGuestToMatchAction);

  const navigate = useNavigate();
  createEffect(() => {
    if (user() === null) navigate("/");
  });

  const isAlreadyPlayer = (userId: number) => {
    return match()?.matchPlayers?.some((p: any) => p.user?.id === userId);
  };

  const isAlreadyGuest = (guestId: number) => {
    return match()?.matchGuests?.some((g: any) => g.guest?.id === guestId);
  };

  const isBeingAddedPlayer = (userId: number) =>
    playerSubmissions.some((sub) => sub.input[0].get("userId") === String(userId));

  const isBeingAddedGuest = (guestId: number) =>
    guestSubmissions.some((sub) => sub.input[0].get("guestId") === String(guestId));

  return (
    <ErrorBoundary fallback={<div class="text-red-500 text-center mt-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-white text-center mt-4">Chargement…</div>}>
        <main class="text-white mt-12 md:mt-0 p-4 md:p-8 md:ml-48 space-y-12">

          <Show when={match()}>
            {(data) => (
              <>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <a href={`/match/${data().id}`}>
                    <img
                      src="/images/buttons/back_button.png"
                      alt="Retour"
                      class="w-12 h-12 sm:w-14 sm:h-14 hover:opacity-80 transition"
                    />
                  </a>
                  <h1 class="text-3xl sm:text-5xl font-bold underline">Ajouter des joueurs</h1>
                </div>

                {/* AMIS */}
                <section class="md:ml-10 lg:ml-18">

                  <h2 class="text-2xl sm:text-3xl font-semibold mb-4">Amis</h2>
                  <div class="mb-6">
                    <input
                      type="text"
                      placeholder="Rechercher un ami..."
                      value={searchFriend()}
                      onInput={(e) => setSearchFriend(e.currentTarget.value)}
                      class="w-full md:w-80 px-4 py-2 rounded bg-[#5f6368] text-white"
                    />
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    <For each={friends().filter(f => `${f.friend.firstname} ${f.friend.lastname}`.toLowerCase().includes(searchFriend().toLowerCase()))}>
                      {(f) => (
                        <div class="bg-[#2e2e2e] p-4 rounded-lg text-center shadow-md">
                          <img
                            src={f.friend.photo || "/images/profile_photos/profile_icon.png"}
                            alt="Photo de profil"
                            class="w-20 h-20 sm:w-22 sm:h-22 rounded-full mx-auto mb-2 object-cover opacity-80"
                          />
                          <p class="text-white text-base sm:text-lg">{f.friend.firstname}</p>
                          <p class="text-white text-base sm:text-lg mb-2">{f.friend.lastname}</p>

                          <Show
                            when={!isAlreadyPlayer(f.friend.id) && !isBeingAddedPlayer(f.friend.id)}
                            fallback={<p class="text-sm text-green-400">✔ Ajouté</p>}
                          >
                            <form action={AddPlayerToMatchACtion} method="post">
                              <input type="hidden" name="matchId" value={data().id} />
                              <input type="hidden" name="userId" value={f.friend.id} />
                              <button
                                type="submit"
                                class="bg-[#c5ff36] hover:bg-[#aadd2f] text-black px-3 py-1 rounded font-bold text-sm cursor-pointer"
                              >
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
                <section class="md:ml-10 lg:ml-18">
                  <h2 class="text-2xl sm:text-3xl font-semibold mb-4">Invités</h2>
                  <div class="mb-6">
                    <input
                      type="text"
                      placeholder="Rechercher un invité..."
                      value={searchGuest()}
                      onInput={(e) => setSearchGuest(e.currentTarget.value)}
                      class="w-full md:w-80 px-4 py-2 rounded bg-[#5f6368] text-white"
                    />
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    <For each={guests().filter(g => `${g.firstname} ${g.lastname}`.toLowerCase().includes(searchGuest().toLowerCase()))}>
                      {(g) => (
                        <div class="bg-[#2e2e2e] p-4 rounded-lg text-center shadow-md">
                          <img
                            src="/images/profile_photos/profile_icon.png"
                            alt="Photo invité"
                            class="w-20 h-20 sm:w-22 sm:h-22 rounded-full mx-auto mb-2 object-cover opacity-80"
                          />
                          <p class="text-white text-base sm:text-lg">{g.firstname}</p>
                          <p class="text-white text-base sm:text-lg mb-2">{g.lastname}</p>

                          <Show
                            when={!isAlreadyGuest(g.id) && !isBeingAddedGuest(g.id)}
                            fallback={<p class="text-sm text-green-400">✔ Ajouté</p>}
                          >
                            <form action={AddGuestToMatchAction} method="post">
                              <input type="hidden" name="matchId" value={data().id} />
                              <input type="hidden" name="guestId" value={g.id} />
                              <button
                                type="submit"
                                class="bg-[#c5ff36] hover:bg-[#aadd2f] text-black px-3 py-1 rounded font-bold text-sm cursor-pointer"
                              >
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

      </Suspense>
    </ErrorBoundary>
  );
}
