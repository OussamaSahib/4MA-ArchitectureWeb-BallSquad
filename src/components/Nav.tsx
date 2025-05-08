import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path === location.pathname
  ? "bg-black text-white px-3 py-1 rounded"
  : "hover:underline";

  return (
    <nav class="fixed top-0 left-0 h-screen w-48 bg-[#c5ff36] p-6">
    <ul class="flex flex-col items-center gap-6 text-black text-2xl font-bold w-full">
      <li class={active("/")}>
        <a href="/" class="w-full text-center px-3 py-2 block">MATCHS</a>
      </li>
      <li class={active("/oldmatchs")}>
        <a href="/oldmatchs" class="w-full text-center px-3 py-2 block">ARGENT</a>
      </li>
      <li class={active("/profile")}>
        <a href="/profile" class="w-full text-center px-3 py-2 block">PROFILE</a>
      </li>
    </ul>
    </nav>
  );
}
