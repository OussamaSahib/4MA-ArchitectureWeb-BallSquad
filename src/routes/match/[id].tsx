import { createAsync } from "@solidjs/router";
import { getMatchById } from "~/lib/matchs";
import MatchCard from "~/components/MatchCard";
import { Show } from "solid-js";

export default function MatchPage(props: { params: { id: any; }; }) {
  const match = createAsync(() => getMatchById(props.params.id));

  return (
    <main class="ml-48 text-white p-8">
      <h1 class="text-5xl font-bold uppercase mb-8 text-center">Détails du Match</h1>

      <Show when={match()}>
        {(data) => <MatchCard match={data()} />}
      </Show>
    </main>
  );
}