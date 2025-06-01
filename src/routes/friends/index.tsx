import { createAsync, createAsyncStore, useSubmissions } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { addFriendAction, getFriends, getGuests, getAllUsers, addGuestAction } from "~/lib/friends";

export default function FriendsPage() {
  const friendsList = createAsync(() => getFriends());
  const guestsList = createAsync(() => getGuests());
  const users = createAsyncStore(() => getAllUsers(), { initialValue: [] });

  const [searchFriend, setSearchFriend] = createSignal("");
  const [searchGuest, setSearchGuest] = createSignal("");
  const [showAddFriend, setShowAddFriend] = createSignal(false);
  const [showAddGuest, setShowAddGuest] = createSignal(false);
  const [search, setSearch] = createSignal("");

  const pendingAdd = useSubmissions(addFriendAction);

  return (
    <main class="ml-55 mr-10 mb-10 text-white p-6 space-y-12">
      {/* SECTION AMIS */}
      <section>
        <h2 class="text-4xl font-bold mb-4">Mes Amis</h2>
        <div class="flex items-center mb-6">
          <input
            type="text"
            value={searchFriend()}
            onInput={(e) => setSearchFriend(e.currentTarget.value)}
            placeholder="Rechercher un ami..."
            class="w-full md:w-75 px-4 py-2 rounded bg-[#5f6368] text-white"
          />
          <img
            src="\images\buttons\add_button.png"  // ← Remplace par le bon chemin vers ton image
            alt="Ajouter un ami"
            class="ml-4 w-10 h-10 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setShowAddFriend(true)}
          />
        </div>
        <Show when={friendsList()} fallback={<p>Chargement...</p>}>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <For each={(friendsList() ?? []).filter(friend =>
              `${friend.friend.firstname} ${friend.friend.lastname}`.toLowerCase().includes(searchFriend().toLowerCase())
            )}>
              {(friend) => (
                <a href={`/friends/${friend.friend.id}`}>
                  <div class="bg-[#2e2e2e] p-4 rounded-lg text-center shadow-md hover:opacity-90 transition">
                    <img
                      src={friend.friend.photo || "/images/profile_photos/icone_profile.png"}
                      alt="Photo de profil"
                      class="w-22 h-22 rounded-full mx-auto mb-1 object-cover opacity-80"
                    />
                    <p class="text-white text-lg">{friend.friend.firstname}</p>
                    <p class="text-white text-lg">{friend.friend.lastname}</p>
                  </div>
                </a>
              )}
            </For>
          </div>
        </Show>
      </section>

      {/* SECTION INVITÉS */}
      <section>
        <h2 class="text-4xl font-bold mb-4">Mes Invités</h2>
        <div class="flex items-center mb-6">
          <input
            type="text"
            value={searchGuest()}
            onInput={(e) => setSearchGuest(e.currentTarget.value)}
            placeholder="Rechercher un invité..."
            class="w-full md:w-75 px-4 py-2 rounded bg-[#5f6368] text-white"
          />
          <img
            src="\images\buttons\add_button.png" // mets ton image ici
            alt="Ajouter un invité"
            class="ml-4 w-10 h-10 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setShowAddGuest(true)}
          />
        </div>
        <Show when={guestsList()} fallback={<p>Chargement...</p>}>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <For each={(guestsList() ?? []).filter(guest =>
              `${guest.firstname} ${guest.lastname}`.toLowerCase().includes(searchGuest().toLowerCase())
            )}>
              {(guest) => (
                <div class="bg-[#2e2e2e] p-3 rounded-lg text-center shadow-md">
                  <img
                    src="/images/profile_photos/icone_profile.png"
                    alt="Photo invité"
                    class="w-22 h-22 rounded-full mx-auto mb-1 object-cover opacity-80"
                  />
                  <p class="text-white text-lg">{guest.firstname}</p>
                  <p class="text-white text-lg">{guest.lastname}</p>
                </div>
              )}
            </For>
          </div>
        </Show>
      </section>

      {/* POPUP AJOUT AMI */}
      <Show when={showAddFriend()}>
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-start pt-20">
          <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-xl w-full max-w-md text-white relative">
            <button
              class="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-400 cursor-pointer"
              onClick={() => setShowAddFriend(false)}
            >
              ✕
            </button>
            <h2 class="text-2xl font-bold mb-4 text-center">Ajouter un ami</h2>

            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={search()}
              onInput={(e) => setSearch(e.currentTarget.value)}
              class="w-full p-2 mb-8 rounded bg-[#5f6368] text-white border border-gray-600"
            />

            <Show when={search().length > 0}>
              <Show
                when={users().some(user =>
                  !friendsList()?.some(f => f.friend.id === user.id) &&
                  `${user.firstname} ${user.lastname}`.toLowerCase().includes(search().toLowerCase())
                )}
                fallback={<p class="text-center text-lg text-gray-400">Aucun utilisateur trouvé</p>}
              >
                <ul class="space-y-2 max-h-120 overflow-y-auto">
                  <For each={users().filter(user =>
                    !friendsList()?.some(f => f.friend.id === user.id) &&
                    `${user.firstname} ${user.lastname}`.toLowerCase().includes(search().toLowerCase())
                  )}>
                    {(user) => (
                      <li class="bg-gray-700 p-2 rounded flex justify-between items-center">
                        <div class="flex items-center gap-3">
                          <img
                            src={user.photo || "/images/profile_photos/icone_profile.png"}
                            class="w-15 h-15 rounded-full"
                          />
                          <span class="text-xl">{user.firstname} {user.lastname}</span>
                        </div>

                        <form
                          method="post"
                          action={addFriendAction}
                          onSubmit={() => {
                            // Optionnel : délai pour laisser la soumission s’enregistrer
                            setTimeout(() => {
                              setShowAddFriend(false);
                              setSearch(""); // Reset du champ
                            }, 200); // ou 300ms si nécessaire
                          }}
                        >
                          <input type="hidden" name="friendId" value={user.id} />
                          <button class="bg-[#c5ff36] hover:bg-[#b0e636] text-black px-2 py-2 mr-2 rounded text-xl cursor-pointer">
                            Ajouter
                          </button>
                        </form>
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </Show>


            <For each={pendingAdd}>
              {(sub) => (
                <Show when={sub.pending}>
                  <p class="text-sm text-gray-400 mt-2 italic">
                    Ajout en cours...
                  </p>
                </Show>
              )}
            </For>
          </div>
        </div>
      </Show>


      <Show when={showAddGuest()}>
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-start pt-20">
          <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-xl w-full max-w-md text-white relative">
            <button
              class="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-400 cursor-pointer"
              onClick={() => setShowAddGuest(false)}
            >
              ✕
            </button>
            <h2 class="text-2xl font-bold mb-6 text-center">Ajouter un invité</h2>

            <form method="post" action={addGuestAction} class="space-y-4">
              {/* Prénom (obligatoire) */}
              <div>
                <label class="block mb-1">
                  Prénom <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  required
                  class="w-full p-2 rounded bg-[#5f6368] text-white border border-gray-600"
                />
              </div>

              {/* Nom (optionnel) */}
              <div>
                <label class="block mb-1">Nom <span class="text-gray-400 text-sm">(optionnel)</span></label>
                <input
                  type="text"
                  name="lastname"
                  class="w-full p-2 rounded bg-[#5f6368] text-white border border-gray-600"
                />
              </div>

              {/* Téléphone (optionnel) */}
              <div>
                <label class="block mb-1">Numéro GSM <span class="text-gray-400 text-sm">(optionnel)</span></label>
                <input
                  type="tel"
                  name="phone"
                  class="w-full p-2 rounded bg-[#5f6368] text-white border border-gray-600"
                />
              </div>

              <button type="submit" class="bg-[#c5ff36] hover:bg-[#b0e636] transition-colors text-black px-4 py-2 rounded w-full font-bold  mt-5 cursor-pointer">
                Ajouter l'invité
              </button>
            </form>
          </div>
        </div>
      </Show>

    </main>
  );
}
