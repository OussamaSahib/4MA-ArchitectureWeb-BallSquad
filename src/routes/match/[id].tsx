import { createAsync } from "@solidjs/router";
import { getMatchById } from "~/lib/matchs";
import MatchCard from "~/components/MatchCard";
import { Show } from "solid-js";

export default function MatchPage(props: { params: { id: any; }; }) {
  const match = createAsync(() => getMatchById(props.params.id));

  return (
<main class="ml-48 text-white p-8 relative">
  {/* Bouton retour positionné en haut à gauche */}
  <a href="/" class="absolute top-5 left-14">
    <img src="/images/buttonback.png" alt="Retour" class="w-16 h-16" />
  </a>

  {/* Titre centré */}
  <h1 class="text-5xl font-bold uppercase text-center mb-8">Détails du Match</h1>

  <Show when={match()}>
    {(data) => <MatchCard match={data()} />}
  </Show>
</main>
  );
}