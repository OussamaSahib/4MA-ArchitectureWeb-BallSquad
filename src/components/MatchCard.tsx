import { JSX } from "solid-js";
type Match = {
  sport: string;
  date: Date;
  place: string;
  field: string;
  total_price: number;
  quantity_players: number;
};

function getSportIcon(sport: string) {
  const name = sport.toLowerCase();
  const known = ["football", "volleyball", "basketball", "badminton"];
  return known.includes(name) ? `/images/${name}.png` : "/images/default.png";
}

function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatHour(date: Date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}


export default function MatchCard(props: { match: Match }): JSX.Element {
  const { match } = props;

  return (
    <div class="bg-[#c5ff36] text-black p-2 rounded-2xl max-w-3xl mx-auto shadow-lg">
      <div class="flex gap-6 items-start">
        {/* Icône */}
        <div>
          <img
            src={getSportIcon(match.sport)}
            alt={match.sport}
            class="w-12 h-12 object-contain"
          />
        </div>

        <div class="flex-1">
          {/* Sport */}
          <h2 class="text-2xl font-bold uppercase">{match.sport}</h2>

          {/* Date + heure + lieu */}
          <div class="flex justify-between items-start mt-4 flex-wrap gap-y-2">
            {/* Date & heure */}
            <div>
              <p class="font-bold text-lg"> {formatDate(match.date)}</p>
              <p class="text-xl mt-1">{formatHour(match.date)}</p>
            </div>

            {/* Lieu */}
            <div class="text-right text-sm leading-tight">
              <p class="underline">Lieu</p>
              <p class="font-medium">{match.place}</p>
              <p>- {match.field}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}