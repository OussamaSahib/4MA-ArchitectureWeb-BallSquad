import {createAsyncStore, RouteDefinition, useNavigate} from "@solidjs/router";
import {createEffect, createSignal, ErrorBoundary, For, Show, Suspense} from "solid-js";
import {getMatchs} from "~/lib/matchs";
import MatchCard from "~/components/MatchCard";
import {getUser} from "~/lib/user";


export const route={
  preload: ()=>{
    getUser();
    getMatchs();

  },
} satisfies RouteDefinition;


export default function MatchListPage() {
  const matchs = createAsyncStore(() => getMatchs(), { initialValue: [] });
  const user = createAsyncStore(() => getUser());
  const [activeTab, setActiveTab] = createSignal<"prochains" | "anciens">("prochains");

  createEffect(()=>{
    if (user()===null) {
      useNavigate()("/");
    }
  });

  const filtered = () =>
    matchs()
      .filter((m) =>
        activeTab() === "prochains"
          ? new Date(m.end_time).getTime() > Date.now()
          : new Date(m.end_time).getTime() <= Date.now()
      )
      .sort((a, b) =>
        activeTab() === "prochains"
          ? new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
          : new Date(b.end_time).getTime() - new Date(a.end_time).getTime()
      );

  return (
    <ErrorBoundary fallback={<div class="text-red-500 text-center mt-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-white text-center mt-4">Chargement des matchs…</div>}>

        <main class="text-white px-4 mt-10 md:mt-0 py-6 pb-12 md:ml-48 md:px-10 lg:px-28 min-h-screen">

          <div class="flex items-center justify-center mb-8">
            <h1 class="text-5xl font-bold uppercase text-center flex-1">MATCHS</h1>

            <a
              href="/match/newmatch"
              aria-label="Ajouter un match"
              class="ml-auto"
            >
              <img
                src="/images/buttons/add_button.png"
                alt="Ajouter un match"
                class="w-14 h-14 hover:scale-110 transition-transform duration-200"
              />
            </a>
          </div>

          {/* Onglets */}
          <div class="flex justify-center gap-8 sm:gap-12 text-xl sm:text-2xl md:text-3xl font-semibold mb-8">
            <button
              onClick={() => setActiveTab("prochains")}
              class={`pb-1 border-b-4 transition cursor-pointer ${
                activeTab() === "prochains"
                  ? "border-[#c5ff36]"
                  : "border-transparent hover:border-gray-400"
              }`}
            >
              Prochains
            </button>
            <button
              onClick={() => setActiveTab("anciens")}
              class={`pb-1 border-b-4 transition cursor-pointer ${
                activeTab() === "anciens"
                  ? "border-[#c5ff36]"
                  : "border-transparent hover:border-gray-400"
              }`}
            >
              Anciens
            </button>
          </div>

          {/* Liste des matchs */}
          <Show when={user()} fallback={<p class="text-gray-400 text-center">Chargement de l'utilisateur…</p>}>
            <Show
              when={filtered().length > 0}
              fallback={<p class="text-gray-400 text-center text-xl">Aucun match</p>}
            >
              <div class="flex flex-col gap-6 items-center w-full">
                <For each={filtered()}>
                  {(match) => <MatchCard match={match} user={user()} />}
                </For>
              </div>

            </Show>
          </Show>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}