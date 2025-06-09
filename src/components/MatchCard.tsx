import { A } from "@solidjs/router";
import { Show } from "solid-js";

type Match = {
  id: any;
  sport: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  place: string;
  field: string;
  total_price: number;
  quantity_players: number;
  id_creator: number;
};

function getSportIcon(sport: string) {
  const name = sport.toLowerCase();
  const known = ["football", "volleyball", "basketball", "badminton"];
  return known.includes(name) ? `/images/sporticons/${name}.png` : "/images/sporticons/default.png";
}

function formatDate(date: Date) {
  const str = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatHour(date: Date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MatchCard(props: { match: Match; user?: any }) {
  const { match, user } = props;
  const isCreator = user?.id === match.id_creator;

  return (
    <A href={`/match/${match.id}`} class="block w-full max-w-4xl px-2">
      <div class="relative bg-[#c5ff36] text-black px-4 py-3 rounded-2xl shadow-lg w-full space-y-3">

        {/* Icône créateur */}
        <Show when={isCreator}>
          <img
            src="/images/creator_icon.png"
            alt="Créateur"
            class="absolute top-2 right-2 w-8 h-8"
          />
        </Show>

        {/* SPORT */}
        <div class="flex items-center gap-4">
          <img src={getSportIcon(match.sport)} alt="" class="w-10 h-10" />
          <h2 class="text-2xl sm:text-3xl font-bold uppercase">{match.sport}</h2>
        </div>

        {/* DATE + LIEU */}
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center font-semibold w-full text-base sm:text-2xl gap-y-1">
          <span class="sm:truncate">📅 {formatDate(match.date)}</span>
          <span class="sm:truncate sm:text-right">📍 {match.place}</span>
        </div>

        {/* HEURE + TERRAIN */}
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center font-semibold w-full text-base sm:text-2xl gap-y-1">
          <span class="sm:truncate">⏰ {formatHour(match.start_time)} → {formatHour(match.end_time)}</span>
          <span class="sm:truncate sm:text-right">🏟️ {match.field}</span>
        </div>

      </div>
    </A>
    
  );
}