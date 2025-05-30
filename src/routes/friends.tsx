import { createAsync } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { getFriends, getGuests } from "~/lib/friends";


export default function FriendsPage() {
  const friendsList = createAsync(() => getFriends());
  const guestsList = createAsync(() => getGuests());

  const [searchFriend, setSearchFriend] = createSignal("");
  const [searchGuest, setSearchGuest] = createSignal("");



  return (
    <main class="ml-48 text-white p-6 space-y-12">

      {/* SECTION AMIS */}
      <section>
        <h2 class="text-4xl font-bold mb-4">Mes Amis</h2>
        <input
          type="text"
          value={searchFriend()}
          onInput={(e) => setSearchFriend(e.currentTarget.value)}
          placeholder="Rechercher un ami..."
          class="w-full md:w-96 px-4 py-2 rounded bg-gray-800 text-white mb-6"
        />
        <Show when={friendsList() !== undefined} fallback={<p>Chargement...</p>}>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <For each={(friendsList() ?? []).filter(friend =>
              `${friend.friend.firstname} ${friend.friend.lastname}`.toLowerCase().includes(searchFriend().toLowerCase())
            )}>
              {(friend) => (
                <div class="bg-[#2e2e2e] p-4 rounded-lg text-center shadow-md">
                  <img
                    src={friend.friend.photo || "/images/profile_photos/icone_profile.png"}
                    alt="Photo de profil"
                    class="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-[#c5ff36]"
                  />
                  <p class="text-[#c5ff36] font-bold uppercase text-sm">{friend.friend.firstname}</p>
                  <p class="text-white text-sm">{friend.friend.lastname}</p>
                </div>
              )}
            </For>
          </div>
        </Show>
      </section>


      {/* SECTION INVITÉS */}
      <section>
        <h2 class="text-4xl font-bold mb-4">Mes Invités</h2>
        <input
          type="text"
          value={searchGuest()}
          onInput={(e) => setSearchGuest(e.currentTarget.value)}
          placeholder="Rechercher un invité..."
          class="w-full md:w-96 px-4 py-2 rounded bg-gray-800 text-white mb-6"
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
                  <p class="text-white font-semibold text-sm">{guest.firstname}</p>
                  <p class="text-white text-sm">{guest.lastname}</p>
                </div>
              )}
            </For>
          </div>
        </Show>
      </section>

    </main>
  );
}
