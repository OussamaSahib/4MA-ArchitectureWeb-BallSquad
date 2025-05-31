import { createAsync, createAsyncStore, useSubmissions } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { addFriendAction, getFriends, getGuests, getAllUsers } from "~/lib/friends";

export default function FriendsPage() {
  const friendsList = createAsync(() => getFriends());
  const guestsList = createAsync(() => getGuests());
  const users = createAsyncStore(() => getAllUsers(), { initialValue: [] });

  const [searchFriend, setSearchFriend] = createSignal("");
  const [searchGuest, setSearchGuest] = createSignal("");
  const [showAddFriend, setShowAddFriend] = createSignal(false);
  const [search, setSearch] = createSignal("");

  const pendingAdd = useSubmissions(addFriendAction);

  return (
    <main class="ml-48 text-white p-6 space-y-12">
      {/* SECTION AMIS */}
      <section>
        <h2 class="text-5xl font-bold mb-4">Mes Amis</h2>
        <input
          type="text"
          value={searchFriend()}
          onInput={(e) => setSearchFriend(e.currentTarget.value)}
          placeholder="Rechercher un ami..."
          class="w-full md:w-96 px-4 py-2 rounded bg-[#5f6368] text-white mb-6"
        />
        <button
          class="ml-4 bg-[#c5ff36] text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#b0e636]"
          onClick={() => setShowAddFriend(true)}
        >
          +
        </button>
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
                      class="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-[#c5ff36]"
                    />
                    <p class="text-[#c5ff36] font-bold uppercase text-sm">{friend.friend.firstname}</p>
                    <p class="text-white text-sm">{friend.friend.lastname}</p>
                  </div>
                </a>
              )}
            </For>
          </div>
        </Show>
      </section>

      {/* SECTION INVITÉS */}
      <section>
        <h2 class="text-5xl font-bold mb-4">Mes Invités</h2>
        <input
          type="text"
          value={searchGuest()}
          onInput={(e) => setSearchGuest(e.currentTarget.value)}
          placeholder="Rechercher un invité..."
          class="w-full md:w-96 px-4 py-2 rounded bg-[#5f6368] text-white mb-6"
        />
        <Show when={guestsList()} fallback={<p>Chargement...</p>}>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <For each={(guestsList() ?? []).filter(guest =>
              `${guest.firstname} ${guest.lastname}`.toLowerCase().includes(searchGuest().toLowerCase())
            )}>
              {(guest) => (
                <div class="bg-[#2e2e2e] p-4 rounded-lg text-center shadow-md">
                  <img
                    src="/images/profile_photos/icone_profile.png"
                    alt="Photo invité"
                    class="w-20 h-20 rounded-full mx-auto mb-3 object-cover opacity-80"
                  />
                  <p class="text-[#c5ff36] font-semibold text-sm">{guest.firstname}</p>
                  <p class="text-white text-sm">{guest.lastname}</p>
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
              class="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-400"
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
              class="w-full p-2 mb-8 rounded bg-gray-800 text-white border border-gray-600"
            />

<Show when={search().length > 0}>
  <Show
    when={users().some(user =>
      !friendsList()?.some(f => f.friend.id === user.id) &&
      `${user.firstname} ${user.lastname}`.toLowerCase().includes(search().toLowerCase())
    )}
    fallback={<p class="text-center text-sm text-gray-400">Aucun utilisateur trouvé</p>}
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
                class="w-10 h-10 rounded-full"
              />
              <span>{user.firstname} {user.lastname}</span>
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
  <button class="bg-[#c5ff36] text-black px-2 py-1 rounded text-sm">
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
    </main>
  );
}
