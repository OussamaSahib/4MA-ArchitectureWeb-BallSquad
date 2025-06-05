import {createAsyncStore, RouteDefinition, useNavigate, useSubmissions,} from "@solidjs/router";
import {createEffect, ErrorBoundary, Show, Suspense, For,} from "solid-js";
import {EditMatchAction, getMatchById} from "~/lib/matchs";
import {getUser} from "~/lib/user";



export const route= {
  preload: ({params})=>{
    getUser();
    return getMatchById(params.id);
  },
} satisfies RouteDefinition;


export default function EditMatchPage(props: {params: {id: string}}){
  const match= createAsyncStore(()=> getMatchById(props.params.id));
  const user= createAsyncStore(()=> getUser());
  const submission = useSubmissions(EditMatchAction);

  createEffect(()=> {
    if (user()===null) {
      useNavigate()("/");
    }
  });


  return (
    <ErrorBoundary fallback={<div class="text-red-500 text-center mt-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-white text-center mt-4">Chargement du match…</div>}>
        <main class="text-white px-4 pt-4 pb-12 md:ml-48 md:px-10 lg:px-28 mt-10 md:mt-0">
          <div class="flex items-center justify-between mb-6">
            {/* Bouton retour */}
            <div class="ml-2 md:-ml-10 lg:-ml-16">
              <a href={`/match/${props.params.id}`} aria-label="Retour" class="inline-block">
                <img
                  src="/images/buttons/back_button.png"
                  alt="Retour"
                  class="w-16 h-16 hover:scale-110 transition-transform duration-200"
                />
              </a>
            </div>

            {/* Titre */}
            <h1 class="text-4xl sm:text-5xl font-bold uppercase text-center flex-1">
              Modifier Match
            </h1>

            <div class="w-16 h-16 invisible" />
          </div>

          <Show when={match()}>
            {(m) => {
              const euros = Math.floor(m().total_price);
              const cents = Math.round((m().total_price % 1) * 100);

              return (
                <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
                  <form
                    action={EditMatchAction}
                    method="post"
                    class="space-y-6 border border-white/7 border-2 bg-white/5 p-6 pt-3 pb-4 rounded-xl"
                  >
                    <input type="hidden" name="id" value={m().id} />

                    {/* Sport */}
                    <div>
                      <label class="block font-bold mb-2">Sport :</label>
                      <div class="flex flex-wrap gap-2">
                        {["Football", "Volleyball", "Badminton", "Basketball"].map((sport) => (
                          <label>
                            <input
                              type="radio"
                              name="sport"
                              value={sport}
                              class="hidden peer"
                              checked={m().sport === sport}
                            />
                            <span class="min-w-[120px] text-center block peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">
                              {sport}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Joueurs */}
                    <div>
                      <label class="block font-bold mb-2">Nombre de Joueurs :</label>
                      <div class="flex flex-wrap gap-2">
                        <For each={[...Array(14)]}>
                          {(_, i) => {
                            const val = (i() + 1).toString();
                            return (
                              <label>
                                <input
                                  type="radio"
                                  name="quantity_players"
                                  value={val}
                                  class="hidden peer"
                                  checked={m().quantity_players === parseInt(val)}
                                />
                                <span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">
                                  {val}
                                </span>
                              </label>
                            );
                          }}
                        </For>
                      </div>
                    </div>

                    {/* Date et heures */}
                    <div>
                      <label class="block font-bold mb-2">Date et Heures :</label>
                      <div class="flex flex-wrap gap-2 items-center">
                        <input
                          name="date"
                          type="date"
                          required
                          value={m().date.toISOString().substring(0, 10)}
                          class="bg-transparent border text-white p-2 rounded w-36 cursor-pointer"
                          onClick={(e) => e.currentTarget.showPicker?.()}
                        />
                        <input
                          name="start_time"
                          type="time"
                          required
                          value={m().start_time.toLocaleTimeString("fr-BE", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                          class="bg-transparent border text-white p-2 rounded w-28 ml-7 cursor-pointer"
                          onClick={(e) => e.currentTarget.showPicker?.()}
                        />
                        <span class="text-white text-xl">→</span>
                        <input
                          name="end_time"
                          type="time"
                          required
                          value={m().end_time.toLocaleTimeString("fr-BE", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                          class="bg-transparent border text-white p-2 rounded w-28 cursor-pointer"
                          onClick={(e) => e.currentTarget.showPicker?.()}
                        />
                      </div>
                    </div>

                    {/* Lieu + terrain */}
                    <div class="flex flex-wrap gap-4">
                      <select
                        name="place"
                        class="bg-transparent border text-white p-2 rounded w-auto max-w-xs cursor-pointer"
                      >
                        <option
                          value="Centre sportif Mounier"
                          selected={m().place === "Centre sportif Mounier"}
                          class="text-black"
                        >
                          Centre sportif Mounier
                        </option>
                        <option
                          value="Fit Five Bockstael"
                          selected={m().place === "Fit Five Bockstael"}
                          class="text-black"
                        >
                          Fit Five Bockstael
                        </option>
                      </select>
                      <input
                        name="field"
                        type="text"
                        required
                        value={m().field}
                        class="bg-transparent border text-white p-2 rounded w-auto max-w-[150px]"
                      />
                    </div>

                    {/* Prix */}
                    <div>
                      <label class="block font-bold mb-2">Prix Total :</label>
                      <div class="flex flex-wrap items-center gap-2">
                        <input
                          name="price_euros"
                          type="number"
                          required
                          min="0"
                          value={euros}
                          class="bg-transparent border text-white p-2 rounded w-16"
                        />
                        <span class="text-white text-xl">,</span>
                        <input
                          name="price_cents"
                          type="number"
                          required
                          min="0"
                          value={String(cents).padStart(2, "0")}
                          class="bg-transparent border text-white p-2 rounded w-16"
                        />
                        <span class="text-white text-xl">€</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="bg-[#c5ff36] text-black font-bold px-6 py-2 rounded hover:bg-[#aadd2f] w-full cursor-pointer"
                    >
                      Sauver
                    </button>

                    <Show when={submission.some((s) => s.pending)}>
                      <div class="text-white text-center mt-2">Sauvegarde en cours…</div>
                    </Show>
                  </form>
                </div>
              );
            }}
          </Show>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}
