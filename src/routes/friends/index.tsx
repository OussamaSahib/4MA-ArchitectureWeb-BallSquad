import {createAsyncStore, RouteDefinition, useNavigate, useSubmissions} from "@solidjs/router";
import {createEffect, createSignal, ErrorBoundary, For, Show, Suspense} from "solid-js";
import {AddFriendAction, getFriends, getGuests, getAllUsers, AddGuestAction} from "~/lib/friends";
import {getUser} from "~/lib/user";
import SearchBar from "~/components/SearchBar";
import UserCard from "~/components/UserCard";



export const route={
  preload: ()=>{
    getUser();
    getFriends();
    getGuests();
    getAllUsers();
  },
} satisfies RouteDefinition;


export default function FriendsPage(){
  const user= createAsyncStore(()=> getUser());
  const friendsList= createAsyncStore(()=> getFriends(), {initialValue: []});
  const guestsList= createAsyncStore(()=> getGuests(), {initialValue: []});
  const users= createAsyncStore(()=> getAllUsers(), {initialValue: []});

  const [searchFriend, setSearchFriend]= createSignal("");
  const [searchGuest, setSearchGuest]= createSignal("");
  const [showAddFriend, setShowAddFriend]= createSignal(false);
  const [showAddGuest, setShowAddGuest]= createSignal(false);
  const [search, setSearch]= createSignal("");

  const submissionsAddFriend= useSubmissions(AddFriendAction);
  const submissionsAddGuest= useSubmissions(AddGuestAction);

  createEffect(()=>{
    if (user()===null) {
      useNavigate()("/");
    }
  });


  return (
    <ErrorBoundary fallback={<div class="text-red-500 text-center mt-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-white text-center mt-4">Chargement en cours…</div>}>

        <main class="pt-18 md:pt-6 pb-10 px-4 md:pl-60 md:pr-4 text-white space-y-12">

          {/*SECTION AMIS*/}
          <section>
            <h2 class="text-4xl font-bold mb-4">Mes Amis</h2>
            <div
              class={`flex items-center ${
                (friendsList() ?? []).some(friend =>
                  `${friend.friend.firstname} ${friend.friend.lastname}`.toLowerCase().includes(searchFriend().toLowerCase())
                ) ? "mb-6" : "mb-4"
              }`}
            >
              <SearchBar
                value={searchFriend()}
                onInput={(e) => setSearchFriend(e.currentTarget.value)}
                placeholder="Rechercher un ami..."
              />

              <img
                src="\images\buttons\add_button.png"
                alt="Ajouter un ami"
                class="ml-4 w-10 h-10 cursor-pointer hover:scale-105 transition-transform"
                onClick={()=> setShowAddFriend(true)}
              />
            </div>
            

            <Show when={friendsList()} fallback={<p>Chargement...</p>}>
              <Show
                when={(friendsList() ?? []).some(friend=>
                  `${friend.friend.firstname} ${friend.friend.lastname}`.toLowerCase().includes(searchFriend().toLowerCase())
                )}
                fallback={<p class="text-lg text-gray-400">Aucun ami</p>}
              >
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <For each={(friendsList() ?? []).filter(friend =>
                    `${friend.friend.firstname} ${friend.friend.lastname}`.toLowerCase().includes(searchFriend().toLowerCase())
                  )}>
                    {(friend)=> (
                      <UserCard
                        href={`/friends/friend/${friend.friend.id}`}
                        photo={friend.friend.photo ?? undefined}
                        firstname={friend.friend.firstname}
                        lastname={friend.friend.lastname}
                      />
                    )}
                  </For>
                </div>
              </Show>
            </Show>
          </section>


          {/*SECTION INVITÉS*/}
          <section>
            <h2 class="text-4xl font-bold mb-4">Mes Invités</h2>
            <div
              class={`flex items-center ${
                (guestsList() ?? []).some(guest =>
                  `${guest.firstname} ${guest.lastname}`.toLowerCase().includes(searchGuest().toLowerCase())
                ) ? "mb-6" : "mb-4"
              }`}
            >
              <SearchBar
                value={searchGuest()}
                onInput={(e) => setSearchGuest(e.currentTarget.value)}
                placeholder="Rechercher un invité..."
              />
              <img
                src="\images\buttons\add_button.png"
                alt="Ajouter un invité"
                class="ml-4 w-10 h-10 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setShowAddGuest(true)}
              />
            </div>

            <Show when={guestsList()} fallback={<p>Chargement...</p>}>
              <Show
                when={(guestsList() ?? []).some(guest =>
                  `${guest.firstname} ${guest.lastname}`.toLowerCase().includes(searchGuest().toLowerCase())
                )}
                fallback={<p class="text-lg text-gray-400">Aucun invité</p>}
              >
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <For each={(guestsList() ?? []).filter(guest=>
                    `${guest.firstname} ${guest.lastname}`.toLowerCase().includes(searchGuest().toLowerCase())
                  )}>
                    {(guest)=>(
                      <UserCard
                        href={`/friends/guest/${guest.id}`}
                        firstname={guest.firstname}
                        lastname={guest.lastname ?? ""}
                      /> 
                    )}
                  </For>
                </div>
              </Show>
            </Show>
          </section>




          {/*POPUP AJOUT AMI*/}
          <Show when={showAddFriend()}>
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-start p-6 px-2">
              <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-xl w-full max-w-md text-white relative">
                <button
                  class="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-400 cursor-pointer"
                  onClick={()=> setShowAddFriend(false)}
                >
                  ✕
                </button>
                <h2 class="text-2xl font-bold mb-4 text-center">Ajouter un ami</h2>

                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={search()}
                  onInput={(e)=> setSearch(e.currentTarget.value)}
                  class="w-full p-2 mb-8 rounded bg-[#5f6368] text-white border border-gray-600"
                />

                <Show when={search().length>0}>
                  <Show
                    when={users().some(user=>
                      !friendsList()?.some(f=> f.friend.id===user.id) &&
                      `${user.firstname} ${user.lastname}`.toLowerCase().includes(search().toLowerCase())
                    )}
                    fallback={<p class="text-center text-lg text-gray-400">Aucun utilisateur trouvé</p>}
                  >
                    <ul class="space-y-2 max-h-120 overflow-y-auto">
                      <For each={users().filter(user=>
                        !friendsList()?.some(f=> f.friend.id===user.id) &&
                        `${user.firstname} ${user.lastname}`.toLowerCase().includes(search().toLowerCase())
                      )}>
                        {(user)=>(
                          <li class="bg-gray-700 p-2 rounded flex justify-between items-center">
                            <div class="flex items-center gap-3">
                              <img
                                src={user.photo || "/images/profile_photos/icone_profile.png"}
                                class="w-15 h-15 rounded-full"
                              />
                              <span class="text-xl">{user.firstname} {user.lastname}</span>
                            </div>

                            <form method="post" action={AddFriendAction}>
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


                <For each={submissionsAddFriend}>
                  {(sub)=> (
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


          {/*POPUP AJOUT INVITÉ*/}
          <Show when={showAddGuest()}>
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-start pt-30 sm:pt-20 px-2">
              <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-xl w-full max-w-md text-white relative">
                <button
                  class="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-400 cursor-pointer"
                  onClick={()=> setShowAddGuest(false)}
                >
                  ✕
                </button>
                <h2 class="text-2xl font-bold mb-6 text-center">Ajouter un invité</h2>

                <form method="post" action={AddGuestAction} class="space-y-4">
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

                  <div>
                    <label class="block mb-1">Nom <span class="text-gray-400 text-sm">(optionnel)</span></label>
                    <input
                      type="text"
                      name="lastname"
                      class="w-full p-2 rounded bg-[#5f6368] text-white border border-gray-600"
                    />
                  </div>

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

          <For each={submissionsAddGuest}>
            {(sub) => (
              <Show when={sub.pending}>
                <p class="text-sm text-gray-400 mt-2 italic">
                  Ajout en cours...
                </p>
              </Show>
            )}
          </For>


        </main>
      </Suspense>
    </ErrorBoundary>
  );
}
