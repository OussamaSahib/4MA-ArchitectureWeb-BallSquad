import {JSX} from "solid-js";

export default function ConfirmDeletePopup(props:{onCancel: ()=> void; friendId: string; message: string;}): JSX.Element{

  return (
    <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-2">
      <div class="bg-[#1a1a1a] border border-white/10 p-6 rounded-xl max-w-sm w-full text-center">
        <h2 class="text-2xl font-bold mb-4">Êtes-vous sûr ?</h2>
        <p class="mb-6">{props.message}</p>
        <div class="flex justify-center gap-4">
          <button class="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 cursor-pointer" onClick={props.onCancel}>
            Annuler
          </button>
          <form method="post" action="/friends/delete">
            <input type="hidden" name="friendId" value={props.friendId} />
            <button type="submit" class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer">
              Confirmer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}