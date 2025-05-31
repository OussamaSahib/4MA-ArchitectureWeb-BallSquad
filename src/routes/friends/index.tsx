import { createAsync, useSubmissions } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { addFriendAction, getFriends, getGuests } from "~/lib/friends";


export default function FriendsPage() {
  const friendsList = createAsync(() => getFriends());
  const guestsList = createAsync(() => getGuests());

  const [searchFriend, setSearchFriend] = createSignal("");
  const [searchGuest, setSearchGuest] = createSignal("");

  const [showAddFriend, setShowAddFriend] = createSignal(false);
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
        <Show when={friendsList() !== undefined} fallback={<p>Chargement...</p>}>
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
        <Show when={guestsList() !== undefined} fallback={<p>Chargement...</p>}>
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


      <Show when={showAddFriend()}>
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-xl w-full max-w-md text-white relative">
            <button
              class="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-400"
              onClick={() => setShowAddFriend(false)}
            >
              ✕
            </button>
            <h2 class="text-2xl font-bold mb-4 text-center">Ajouter un ami</h2>

            <form method="post" action={addFriendAction} class="flex flex-col gap-4">
              <input
                type="hidden"
                name="type"
                value="friend"
              />
              <input
                type="number"
                name="friendId"
                placeholder="ID de l'ami"
                required
                class="p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              <button
                type="submit"
                class="bg-[#c5ff36] text-black px-4 py-2 rounded font-semibold hover:bg-[#b0e636]">
                Ajouter
              </button>
            </form>

            <For each={pendingAdd}>
              {(sub) => (
                <Show when={sub.pending}>
                  <p class="text-sm text-gray-400 mt-2 italic">
                    Ajout de l’ami ID {(sub.input[0].get("friendId") as string) ?? "?"}...
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
