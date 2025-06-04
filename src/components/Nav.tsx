import {useLocation} from "@solidjs/router";
import {Show, createSignal, createEffect} from "solid-js";
import {LogoutAction} from "~/lib/user";



export default function Nav(){
  const location= useLocation();

  //PAS DE NAVBAR POUR LOGIN ET REGISTER
  const [visible, setVisible]= createSignal(false);
  createEffect(()=>{
    const currentPath= location.pathname;
    const shouldShow= currentPath!=="/" && currentPath!=="/register";
    setVisible(shouldShow);
  });

  //INDICATION DE LA PAGE ACTIVE
  const active= (path: string) =>
    location.pathname === path || location.pathname.startsWith(path +"/")
      ? "bg-black text-white px-3 py-1 rounded"
      : "hover:underline";
  
  //POUR MOBILE: OUVERTURE ET FERMETURE DU NAVBAR
  const [isOpen, setIsOpen]= createSignal(false);


  return (
    <Show when={visible()}>
      <>
        {/*NAVIGATION DESKTOP*/}
        <nav class="hidden md:flex fixed top-0 left-0 h-screen w-48 bg-[#c5ff36] p-6 pt-4 z-40 flex-col">
          {/*LOGO*/}
          <div class="mb-8">
            <img src="/images/ballsquad_logo/ballsquad_logo_black.png" alt="Ballsquad Logo" class="w-24 h-auto mx-auto" />
          </div>

          {/*ÉlÉMENTS DU MENU*/}
          <ul class="flex flex-col items-center gap-4 text-black text-xl font-bold w-full">
            <li class={active("/match")}>
              <a href="/match" class="w-full text-center px-3 py-2 block">MES MATCHS</a>
            </li>
            <li class={active("/newmatch")}>
              <a href="/newmatch" class="w-full text-center px-3 py-2 block">NOUVEAU MATCH</a>
            </li>
            <li class={active("/money")}>
              <a href="/money" class="w-full text-center px-3 py-2 block">ARGENT</a>
            </li>
            <li class={active("/friends")}>
              <a href="/friends" class="w-full text-center px-3 py-2 block">AMIS</a>
            </li>
            <li class={active("/profile")}>
              <a href="/profile" class="w-full text-center px-3 py-2 block">PROFILE</a>
            </li>
          </ul>

          {/*BOUTON DECONNEXION EN BAS*/}
          <form action={LogoutAction} method="post" class="mt-auto w-full pt-6">
            <button
              type="submit"
              class="group flex items-center justify-center gap-2 w-full text-black text-xl font-semibold cursor-pointer hover:text-red"
            >
              <img
                src="/images/buttons/logout_button_black.png"
                alt="Déconnexion"
                class="w-6 h-6 group-hover:hidden"
              />
              <img
                src="/images/buttons/logout_button_red.png"
                alt="Déconnexion"
                class="w-6 h-6 hidden group-hover:inline"
              />
              <span class="group-hover:text-red-600">Déconnexion</span>
            </button>
          </form>
        </nav>



        {/*NAVIGATION MOBILE*/}
        {/*BOUTON D'OUVERTURE MENU*/}
        <button
          class="fixed top-4 left-4 z-50 bg-[#c5ff36] p-2 rounded md:hidden"
          onClick={() => setIsOpen(!isOpen())}
          aria-label="Menu"
        >
          <img src="/images/buttons/menu_button.png" alt="Menu" class="w-6 h-6" />
        </button>


        <div
          class={`fixed top-0 left-0 h-full w-64 bg-[#c5ff36] transform transition-transform duration-300 z-40
          ${isOpen() ? "translate-x-0" : "-translate-x-full"} md:hidden flex flex-col`}
        >
          {/*LOGO*/}
          <div class="flex justify-center p-4">
            <img
              src="/images/ballsquad_logo/ballsquad_logo_black.png"
              alt="Ballsquad Logo"
              class="h-20"
            />
          </div>

          {/*ÉlÉMENTS DU MENU*/}
          <ul class="flex flex-col items-start gap-6 text-black text-xl font-bold p-6">
            <li class={active("/match")}>
              <a href="/match" class="w-full px-3 py-2 block" onClick={() => setIsOpen(false)}>MES MATCHS</a>
            </li>
            <li class={active("/newmatch")}>
              <a href="/newmatch" class="w-full px-3 py-2 block" onClick={() => setIsOpen(false)}>NOUVEAU MATCH</a>
            </li>
            <li class={active("/money")}>
              <a href="/money" class="w-full px-3 py-2 block" onClick={() => setIsOpen(false)}>ARGENT</a>
            </li>
            <li class={active("/friends")}>
              <a href="/friends" class="w-full px-3 py-2 block" onClick={() => setIsOpen(false)}>AMIS</a>
            </li>
            <li class={active("/profile")}>
              <a href="/profile" class="w-full px-3 py-2 block" onClick={() => setIsOpen(false)}>PROFILE</a>
            </li>
          </ul>

          {/*BOUTON DECONNEXION*/}
          <form action={LogoutAction} method="post" class="mt-auto p-6">
            <button
              type="submit"
              class="flex items-center gap-2 text-black hover:text-red-900 text-lg font-semibold"
            >
              <img src="/images/buttons/logout_button_black.png" alt="Déconnexion" class="w-6 h-6" />
              Déconnexion
            </button>
          </form>
        </div>
      </>
    </Show>
  );
}
