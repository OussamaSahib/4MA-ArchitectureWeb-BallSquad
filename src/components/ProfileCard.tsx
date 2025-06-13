import {Show, createSignal} from "solid-js";



export default function ProfileCard(props: {user: any; children?: any;}){
  const [showImage, setShowImage]= createSignal(false);


  return (
    <>
      <div class="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl rounded-2xl p-6 pt-4 w-full max-w-md text-left">
        {/*PHOTO USER*/}
        <div class="flex justify-center mb-0">
          <img
            src={props.user.photo || "/images/profile_photos/profile_icon.png"}
            alt="Avatar"
            class="rounded-full w-45 h-45 object-cover cursor-pointer"
            onClick={() => setShowImage(true)}
          />
        </div>

        {/*PRÉNOM + NOM*/}
        <h2 class="text-3xl font-bold text-center text-white mb-6 mt-1">
          {props.user.firstname} {props.user.lastname}
        </h2>

        {/*INFOS*/}
        <div class="text-white">
          <p class="font-semibold underline text-xl mb-2">Informations :</p>

          <div class="flex justify-between border-b border-gray-500 py-2">
            <span class="text-white">Mail :</span>
            <span class="text-[#c5ff36]">{props.user.email}</span>
          </div>

          <div class="flex justify-between border-b border-gray-500 py-2">
            <span class="text-white">Téléphone :</span>
            <span class="text-[#c5ff36]">{props.user.phone}</span>
          </div>

          <div class="flex justify-between items-center border-b border-gray-500 py-2">
            <span class="text-white">IBAN :</span>
            <div class="flex items-center gap-2">
              <img
                src="/images/buttons/copy_button.png"
                alt="Copier"
                class="w-5 h-5 cursor-pointer hover:opacity-80"
                onClick={() => {
                  navigator.clipboard.writeText(props.user.iban);
                  alert("IBAN copié !");
                }}
              />
              <span class="text-[#c5ff36]">{props.user.iban}</span>
            </div>
          </div>
        </div>

        {/*BOUTON PERSONNALISÉ*/}
        <div class="flex justify-center mt-8">
          {props.children}
        </div>
      </div>

      {/*ZOOM IMAGE*/}
      <Show when={showImage()}>
        <div class="fixed inset-0 bg-black flex flex-col z-50">
          {/*Bouton pour Fermer */}
          <div class="flex justify-end">
            <button
              onClick={() => setShowImage(false)}
              class="mr-14 text-white text-6xl font-bold hover:text-gray-300 cursor-pointer"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>

          {/*Photo +grand centrée*/}
          <div class="flex flex-1 items-start justify-center">
            <img
              src={props.user.photo || "/images/profile_photos/profile_icon.png"}
              alt="Avatar Zoom"
              class="max-w-md rounded-xl shadow-lg cursor-pointer"
            />
          </div>
        </div>
      </Show>
    </>
  );
}
