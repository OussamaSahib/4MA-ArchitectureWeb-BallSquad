import {useSubmissions} from "@solidjs/router";
import {ErrorBoundary, Show, Suspense} from "solid-js";
import {GuestGuard, LoginAction} from "~/lib/user";
import AuthentificationInput from "~/components/AuthentificationInput";



export default function LoginPage(){
  //REDIRECTION SI USER DEJA CONNECTE
  GuestGuard();

  const submissions= useSubmissions(LoginAction);
  const last= ()=> submissions[submissions.length -1];

  return (
    <ErrorBoundary fallback={<div class="text-red-500 p-4">Une erreur est survenue !</div>}>
      <Suspense fallback={<div class="text-gray-500 p-4">Chargement en cours…</div>}>

        <main class="min-h-screen bg-black text-white flex flex-col items-center gap-0 p-4">

          {/*BOUTON ALLANT A LA PAGE REGISTER POUR CRÉER UN COMPTE*/}
          <div class="w-full flex justify-end mb-4 mr-10">
            <a
              href="/register"
              class="bg-[#72777d] hover:bg-[#5f6368] text-white px-4 py-2 rounded cursor-pointer"
            >
              Créer un compte
            </a>
          </div>

          {/*FORMULAIRE*/}
          <div class="bg-[#1a1a1a] rounded-lg shadow-md border border-white/20 flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
            {/*LOGO*/}
            <div class="w-full md:w-1/3 flex items-center justify-center p-6">
              <img src="/images/ballsquad_logo/ballsquad_logo_green.png" alt="BallSquad Logo" class="h-auto max-w-[150px] md:max-w-full" />
            </div>

            {/*FORM*/}
            <div class="w-full md:w-2/3 p-6">
              <h2 class="text-3xl font-bold mb-6 text-center">Connexion</h2>
                <form action={LoginAction} method="post" class="flex flex-col gap-4">

                  <div class="flex flex-col gap-1">
                    <AuthentificationInput label="Email" name="email" type="email" required showRequiredMark={false} />
                      <Show when={last()?.result?.error === "EMAIL_NOT_FOUND"}>
                        <span class="text-red-500 text-sm">Ce compte n'existe pas</span>
                      </Show>
                  </div>

                  <div class="flex flex-col gap-1">
                    <AuthentificationInput label="Mot de passe" name="password" type="password" required showRequiredMark={false} />
                      <Show when={last()?.result?.error==="WRONG_PASSWORD"}>
                        <span class="text-red-500 text-sm">Mot de passe incorrect</span>
                      </Show>
                  </div>

                  <button
                    type="submit"
                    class="bg-[#c5ff36] hover:bg-[#b0e636] text-black font-semibold p-3 mt-4 rounded transition cursor-pointer"
                  >
                    Se connecter
                  </button>
                </form>

              <Show when={submissions.some((s)=> s.pending)}>
                <p class="text-yellow-500 mt-2">Connexion en cours...</p>
              </Show>
            </div>
          </div>
        </main>

      </Suspense>
    </ErrorBoundary>
  );
}