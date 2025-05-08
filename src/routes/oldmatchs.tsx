import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

export default function About() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">

      <h1 class="text-6xl text-white font-bold uppercase mt-0 mb-10">MATCHS</h1>

      <div class="flex justify-center gap-35 text-3xl text-white font-semibold">
        <A href="/" class="hover:opacity-80">Prochains</A>
        <span class="border-b-4 pb-1" style="border-color: #c5ff36">Anciens</span>
        
      </div>
      
    </main>
  );
}
