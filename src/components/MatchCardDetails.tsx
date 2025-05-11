type Match = {
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
  return known.includes(name)
    ? `/images/sporticons/${name}.png`
    : "/images/sporticons/default.png";
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

export default function MatchCardDetails(props: {match: Match}){
  const {match}= props;
  const pricePerPlayer= (match.total_price / match.quantity_players).toFixed(2);

  return (
    <div class="bg-[#c5ff36] text-black p-5 rounded-none max-w-5xl mx-auto shadow-lg relative">

      {/* Sport + VS */}
      <div class="flex items-center gap-4 mb-2">
        <img src={getSportIcon(match.sport)} alt="" class="w-12 h-12" />
        <h2 class="text-3xl font-bold uppercase">
          {match.sport} - {match.quantity_players} joueurs
        </h2>
      </div>

      {/* Date + Lieu */}
      <div class="flex justify-between items-center text-2xl font-semibold mt-6 mb-2 mr-6 flex-wrap gap-y-2">
        <span>📅 <span class="font-bold">{formatDate(match.date)}</span></span>
        <span>📍 <span class="font-bold">{match.place}</span></span>
      </div>

      {/* Heure + Terrain */}
      <div class="flex justify-between items-center text-2xl font-semibold mb-2 mr-6 flex-wrap gap-y-2">
        <span>⏰ <span class="font-bold">{formatHour(match.start_time)} → {formatHour(match.end_time)}</span></span>
        <span>🏟️ <span class="font-bold">{match.field}</span></span>
      </div>

      

    {/* Prix par personne +Organisateur */}
    <div class="flex justify-between items-center text-2xl font-semibold mt-4 mr-6">
        <span>
            💰 <span class="font-bold text-red-600">{pricePerPlayer} € / joueur</span>
            <img src="/images/buttons/info_button.png" alt="Info" class="inline w-7 h-7 ml-3" />
        </span>
        <span>
            Organisé par <span class="underline">Oussama Sahib</span>
        </span>
    </div>


    </div>
  );
}
