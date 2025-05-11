import { A } from "@solidjs/router";

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



export default function MatchCard(props: { match: Match }) {
  const { match } = props;

  return (
    <A href={`/match/${match.id}`}>
      <div class="bg-[#c5ff36] text-black p-4 rounded-2xl max-w-3xl mx-auto shadow-lg mb-4">
        {/* Icône + sport */}
        <div class="flex items-center gap-4 mb-2">
          <img src={getSportIcon(match.sport)} alt="" class="w-10 h-10" />
          <h2 class="text-3xl font-bold uppercase">{match.sport}</h2>
        </div>

        {/* Date + Lieu */} 
        <div class="flex justify-between items-center text-2xl font-semibold mt-6 mb-2 mr-6 flex-wrap gap-y-2">
          <span>🗓️ {formatDate(match.date)}</span>
          <span>📍 {match.place}</span>
        </div>

        {/* Heure + Terrain */}
        <div class="flex justify-between items-center text-2xl font-semibold mb-2 mr-6 flex-wrap gap-y-2">
          <span>🕒 {formatHour(match.start_time)} → {formatHour(match.end_time)}</span>
          <span>🏟️ {match.field}</span>
        </div>

      </div>
    </A>
  );
}