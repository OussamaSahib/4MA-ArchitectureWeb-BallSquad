import {useNavigate, useSubmissions} from "@solidjs/router";
import {createEffect, ErrorBoundary, Show, Suspense} from "solid-js";
import {GuestGuard, RegisterAction} from "~/lib/user";
import InputAuthentification from "~/components/InputAuthentification";



export default function RegisterPage(){
  //REDIRECTION SI USER DEJA CONNECTE
  GuestGuard();

  //REDIRECTION SI CREATION COMPTE RÉUSSI
  const navigate= useNavigate();
  createEffect(()=>{
    if (last()?.result?.success){
      navigate("/");
    }
  });

  //SUBMISSION FORM
  const submissions= useSubmissions(RegisterAction);
  const last= ()=> submissions[submissions.length -1];


  return (
    <ErrorBoundary fallback={<div class="text-red-500 p-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-gray-500 p-4">Chargement en cours …</div>}>

        <main class="min-h-screen bg-black text-white flex flex-col items-center gap-0 p-4">

          {/*BOUTON BACK*/}
          <div class="w-full flex justify-start">
            <a
              href="/"
              title="Retour"
              class="bg-black hover:opacity-80 transition"
            >
              <img
                src="/images/buttons/back_button.png"
                alt="Retour"
                class="w-12 h-12"
              />
            </a>
          </div>


          {/*FORMULAIRE*/}
          <div class="bg-[#1a1a1a] rounded-lg shadow-md border border-white/20 flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
            {/*LOGO*/}
            <div class="w-full md:w-1/3 flex items-center justify-center p-6">
              <img
                src="/images/ballsquad_logo/ballsquad_logo_green.png"
                alt="BallSquad Logo"
                class="h-auto max-w-[150px] md:max-w-full"
              />
            </div>

            {/*FORM*/}
            <div class="w-full md:w-2/3 p-6">
              <h2 class="text-3xl font-bold mb-6 text-center">Création du compte</h2>
              <form
                action={RegisterAction}
                method="post"
                class="flex flex-col gap-4"
              >
              <div class="flex flex-col sm:flex-row gap-4">
                <InputAuthentification label="Prénom" name="firstname" type="text" class="w-full sm:w-1/2" required showRequiredMark={true}/>
                <InputAuthentification label="Nom" name="lastname" type="text" class="w-full sm:w-1/2" required showRequiredMark={true}/>
              </div>

                <InputAuthentification label="Numéro GSM" name="phone" type="tel" required showRequiredMark={true}/>
                <InputAuthentification label="IBAN" name="iban" type="text" required showRequiredMark={true}/>
                <div class="flex flex-col gap-1">
                  <InputAuthentification label="Email" name="email" type="email" required showRequiredMark={true}/>
                  <Show when={last()?.result?.error==="EMAIL_EXISTS"}>
                    <span class="text-red-500 text-sm">Mail déjà existant</span>
                  </Show>
                </div>
                <InputAuthentification label="Mot de passe" name="password" type="password" required showRequiredMark={true}/>

                <button
                  type="submit"
                  class="bg-[#c5ff36] hover:bg-[#b0e636] text-black font-semibold p-3 mt-4 rounded transition cursor-pointer"
                >
                  Créer le compte
                </button>
              </form>

              <Show when={submissions.some((s)=> s.pending)}>
                <p class="text-yellow-500 mt-2">Inscription en cours...</p>
              </Show>
            </div>
          </div>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}