import {createSignal, Show} from "solid-js";


type Match= {
  sport: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  place: string;
  field: string;
  total_price: number;
  quantity_players: number;
  id_creator: number; 
  creator: {
    firstname: string;
    lastname: string;
    iban: string;
  }
};

function getSportIcon(sport: string) {
  const name= sport.toLowerCase();
  const known= ["football", "volleyball", "basketball", "badminton"];
  return known.includes(name)
    ? `/images/sporticons/${name}.png`
    : "/images/sporticons/default.png";
}

function formatDate(date: Date) {
  const str= date.toLocaleDateString("fr-FR", {
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



export default function MatchCardDetails(props: { match: Match; overridePrice?: number; user?: any }) {
  const { match, overridePrice, user } = props;
  const isCreator = user?.id === match.id_creator;
  const pricePerPlayer = () => ((overridePrice ?? match.total_price) / match.quantity_players).toFixed(2);

  const [showModal, setShowModal]= createSignal(false);
  const iban = match.creator.iban;
  const copyIBAN= () => {
    navigator.clipboard.writeText(iban);
    alert("IBAN copié !");
  };

  return (
    <div class="bg-[#c5ff36] text-black p-4 pt-3 rounded-sm max-w-5xl mx-auto shadow-lg relative">
      {/* SPORT + QUANTITÉ JOUEURS */}
      <div class="flex flex-col sm:flex-row items-center gap-4 mb-4 text-center sm:text-left">
        <img src={getSportIcon(match.sport)} alt="" class="w-12 h-12" />
        <h2 class="text-2xl sm:text-3xl font-bold uppercase">
          {match.sport} - {match.quantity_players} joueurs
        </h2>
      </div>

      {/* DATE + LIEU */}
      <div class="flex flex-col sm:flex-row justify-between text-xl sm:text-2xl font-semibold mt-6 mb-2 gap-y-2">
        <span>📅 <span class="font-bold">{formatDate(match.date)}</span></span>
        <span>📍 <span class="font-bold">{match.place}</span></span>
      </div>

      {/* HEURE + TERRAIN */}
      <div class="flex flex-col sm:flex-row justify-between text-xl sm:text-2xl font-semibold mb-2 gap-y-2">
        <span>⏰ <span class="font-bold">{formatHour(match.start_time)} → {formatHour(match.end_time)}</span></span>
        <span>🏟️ <span class="font-bold">{match.field}</span></span>
      </div>

      {/* PRIX + ORGANISATEUR */}
      <div class="flex flex-col sm:flex-row justify-between text-xl sm:text-2xl font-semibold mt-4 gap-y-4">
        <span class="flex items-center">
          💰 <span class="font-bold text-red-600 ml-1">{pricePerPlayer()} € / joueur</span>
          <img
            src="/images/buttons/info_button.png"
            alt="Info"
            class="inline w-6 h-6 ml-3 cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        </span>
        <span class="flex items-center gap-2">
          Organisé par <span class="underline">{match.creator.firstname} {match.creator.lastname}</span>
          <Show when={isCreator}>
            <img src="/images/creator_icon.png" alt="Créateur" class="w-5 h-5" />
          </Show>
        </span>
      </div>

        {/*POPUP PAYEMENT*/}
        {showModal() && (
            <div class="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-start pt-24 z-50">
                <div class="bg-[#1a1a1a] text-white p-8 border border-white/8 rounded-xl shadow-2xl w-full max-w-lg relative animate-fade-in translate-x-25">
                    <button
                    class="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black cursor-pointer"
                    onClick={() => setShowModal(false)}
                    >
                    ✕
                    </button>
                    <h3 class="text-3xl font-bold mb-6 text-center">Détails du paiement</h3>

                    <p class="mb-3 text-lg">💰 <strong>Prix par joueur</strong> : {pricePerPlayer()} €</p>
                    <p class="mb-3 text-lg">
                      👤 <strong>Organisateur</strong> : {match.creator.firstname} {match.creator.lastname}
                    </p>
                    <p class="mb-3 text-lg">
                    🏦 <strong>IBAN</strong> : 
                    <span class="ml-2 font-mono text-black bg-gray-100 px-2 py-1 rounded">{iban}</span>
                    <button
                        onClick={copyIBAN}
                        class="ml-3 px-3 py-1 text-base bg-[#c5ff36] text-black rounded hover:bg-[#b5e932] transition cursor-pointer">
                        Copier
                    </button>
                    </p>
                </div>
            </div>
        )}
    </div>
  );
}