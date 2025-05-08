import {A} from "@solidjs/router";


export default function Home() {
  return (
    <main class="ml-48 text-center mx-auto text-gray-700 p-4">
      <h1 class="text-6xl text-white font-bold uppercase mt-0 mb-8">MATCHS</h1>

      <div class="flex justify-center gap-35 text-3xl text-white font-semibold">
        <span class="border-b-4 pb-1" style="border-color: #c5ff36">Prochains</span>
        <A href="/oldmatchs" class="hover:opacity-80">Anciens</A>
      </div>
      

    </main>
  );
}
