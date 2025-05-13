import { createAsync } from "@solidjs/router";
import { getMatchById } from "~/lib/matchs";
import { createSignal, Show } from "solid-js";
import MatchCardDetails from "~/components/MatchCardDetails";
import EditMatchPopup from "~/components/EditMatchPopup";



export default function MatchPage(props: { params: { id: any; }; }) {
  const match = createAsync(() => getMatchById(props.params.id));
  const [showEdit, setShowEdit] = createSignal(false);

  return (
<main class="ml-48 text-white p-8 relative">
  {/* Bouton retour positionné en haut à gauche */}
  <a href="/" class="absolute top-5 left-16">
    <img src="/images/buttons/back_button.png" alt="Retour" class="w-18 h-18" />
  </a>

  {/* Bouton Edit */}
  <button onClick={() => setShowEdit(true)} class="absolute top-7 right-30">
    <img src="/images/buttons/edit_button.png" alt="Modifier" class="w-16 h-16 cursor-pointer" />
  </button>



  <Show when={match()}>
    {(data) => (
      <>
        <MatchCardDetails match={data()} />
        <Show when={showEdit()}>
          <EditMatchPopup match={data()} onClose={() => setShowEdit(false)} />
        </Show>
      </>
    )}
  </Show>
</main>
  );
}