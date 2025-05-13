import {createAsyncStore} from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import { getMatchs } from "~/lib/matchs";
import MatchCard from "~/components/MatchCard";



export default function MatchListPage() {
  const matchs = createAsyncStore(() => getMatchs(), { initialValue: [] });
  const [activeTab, setActiveTab] = createSignal<"prochains" | "anciens">("prochains");

  
  return (
    <main class="ml-48 text-center mx-auto text-gray-700 p-4 overflow-y-scroll h-screen">
      <h1 class="text-6xl text-white font-bold uppercase mt-0 mb-8">MATCHS</h1>

      {/* Onglets */}
      <div class="flex justify-center gap-35 text-3xl text-white font-semibold mb-8">
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

      {/* Contenu */}
      <div>
        <Show when={activeTab() === "prochains"}>
          <For each={matchs()
            .filter(m => new Date(m.end_time).getTime() + 60 * 60 * 1000 > Date.now())
            .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
          }>
            {(match) => <MatchCard match={match} />}
          </For>
        </Show>

        <Show when={activeTab() === "anciens"}>
          <For each={matchs()
            .filter(m => new Date(m.end_time).getTime() + 60 * 60 * 1000 <= Date.now())
            .sort((a, b) => new Date(b.end_time).getTime() - new Date(a.end_time).getTime())
          }>
            {(match) => <MatchCard match={match} />}
          </For>
        </Show>
      </div>
    </main>
  );
}