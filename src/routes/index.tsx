import {A} from "@solidjs/router";
import {createAsyncStore, type RouteDefinition,} from "@solidjs/router";
import {For} from "solid-js";
import {getMatchs} from "~/lib/matchs";
import MatchCard from "~/components/MatchCard";

export const route = {
  preload() {
    getMatchs();
  },
} satisfies RouteDefinition;



export default function Home() {
   const matchs= createAsyncStore(()=> getMatchs(), {
    initialValue: [],
  }
);


  return (
    <main class="ml-48 text-center mx-auto text-gray-700 p-4">
      <h1 class="text-6xl text-white font-bold uppercase mt-0 mb-8">MATCHS</h1>

      <div class="flex justify-center gap-35 text-3xl text-white font-semibold">
        <span class="border-b-4 pb-1" style="border-color: #c5ff36">Prochains</span>
        <A href="/oldmatchs" class="hover:opacity-80">Anciens</A>
      </div>

      <div class="mt-8 space-y-4">
        <For each={matchs()}>
          {(match) => <MatchCard match={match} />}
        </For>
      </div>
      

    </main>
  );
}
