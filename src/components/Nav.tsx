import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();

  // Ne rien afficher si on est sur la page "/"
if (location.pathname === "/" || location.pathname === "/register") return null;

  const active = (path: string) => {
    if (path === "/match") {
      return location.pathname === "/match" || location.pathname.startsWith("/match/")
        ? "bg-black text-white px-3 py-1 rounded"
        : "hover:underline";
    }

    return location.pathname === path
      ? "bg-black text-white px-3 py-1 rounded"
      : "hover:underline";
  };

  return (
    <nav class="fixed top-0 left-0 h-screen w-48 bg-[#c5ff36] p-6">
      <ul class="flex flex-col items-center gap-6 text-black text-2xl font-bold w-full">
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
  );
}
