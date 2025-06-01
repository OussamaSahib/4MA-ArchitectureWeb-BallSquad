import { useLocation } from "@solidjs/router";
import { Show, createSignal, createEffect } from "solid-js";

export default function Nav() {
  const location = useLocation();
  const [visible, setVisible] = createSignal(false);

  createEffect(() => {
    const currentPath = location.pathname;
    // Afficher Nav uniquement si on n'est pas sur "/" ou "/register"
    const shouldShow = currentPath !== "/" && currentPath !== "/register";
    setVisible(shouldShow);
  });

  const active = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
      ? "bg-black text-white px-3 py-1 rounded"
      : "hover:underline";
  };

  return (
    <Show when={visible()}>
      <nav class="fixed top-0 left-0 h-screen w-45 bg-[#c5ff36] p-6">
        <ul class="flex flex-col items-center gap-6 text-black text-xl font-bold w-full">
          <li class={active("/match")}>
            <a href="/match" class="w-full text-center px-3 py-2 block">MY MATCHS</a>
          </li>
          <li class={active("/newmatch")}>
            <a href="/newmatch" class="w-full text-center px-3 py-2 block">NEW MATCH</a>
          </li>
          <li class={active("/money")}>
            <a href="/money" class="w-full text-center px-3 py-2 block">MONEY</a>
          </li>
          <li class={active("/friends")}>
            <a href="/friends" class="w-full text-center px-3 py-2 block">FRIENDS</a>
          </li>
          <li class={active("/profile")}>
            <a href="/profile" class="w-full text-center px-3 py-2 block">PROFILE</a>
          </li>
        </ul>
      </nav>
    </Show>
  );
}
