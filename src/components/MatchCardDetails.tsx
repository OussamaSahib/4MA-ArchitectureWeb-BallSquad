import {createSignal} from "solid-js";


type Match= {
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



export default function MatchCardDetails(props: {match: Match}){
  const {match}= props;
  const pricePerPlayer= (match.total_price/match.quantity_players).toFixed(2);
  const [showModal, setShowModal]= createSignal(false);
  const iban= "BE71 0961 2345 6769";

  const copyIBAN= () => {
    navigator.clipboard.writeText(iban);
    alert("IBAN copié !");
  };

  return (
    <div class="bg-[#c5ff36] text-black p-5 rounded-none max-w-5xl mx-auto shadow-lg relative">

        {/*SPORT +QUANTITÉ JOUEURS */}
        <div class="flex items-center gap-4 mb-2">
            <img src={getSportIcon(match.sport)} alt="" class="w-12 h-12" />
            <h2 class="text-3xl font-bold uppercase">
            {match.sport} - {match.quantity_players} joueurs
            </h2>
        </div>

        {/*DATE +LIEU*/}
        <div class="flex justify-between items-center text-2xl font-semibold mt-6 mb-2 mr-6 flex-wrap gap-y-2">
            <span>📅 <span class="font-bold">{formatDate(match.date)}</span></span>
            <span>📍 <span class="font-bold">{match.place}</span></span>
        </div>

        {/*HEURE +TERRAIN*/}
        <div class="flex justify-between items-center text-2xl font-semibold mb-2 mr-6 flex-wrap gap-y-2">
            <span>⏰ <span class="font-bold">{formatHour(match.start_time)} → {formatHour(match.end_time)}</span></span>
            <span>🏟️ <span class="font-bold">{match.field}</span></span>
        </div>

      

        {/*PRIX PAR JOUEURPrix +ORGANISATEUR*/}
        <div class="flex justify-between items-center text-2xl font-semibold mt-4 mr-6">
            <span>
                💰 <span class="font-bold text-red-600">{pricePerPlayer} € / joueur</span>
                    <img
                        src="/images/buttons/info_button.png"
                        alt="Info"
                        class="inline w-7 h-7 ml-3 cursor-pointer"
                        onClick={() => setShowModal(true)}
                    />
            </span>
            <span>
                Organisé par <span class="underline">Oussama Sahib</span>
            </span>
        </div>

        {/*POPUP PAYEMENT*/}
        {showModal() && (
            <div class="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-start pt-24 z-50">
                <div class="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-lg relative animate-fade-in translate-x-25">
                    <button
                    class="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black cursor-pointer"
                    onClick={() => setShowModal(false)}
                    >
                    ✕
                    </button>
                    <h3 class="text-3xl font-bold mb-6 text-center">Détails du paiement</h3>

                    <p class="mb-3 text-lg">💰 <strong>Prix par joueur</strong> : {pricePerPlayer} €</p>
                    <p class="mb-3 text-lg">👤 <strong>Organisateur</strong> : Oussama Sahib</p>
                    <p class="mb-3 text-lg">
                    🏦 <strong>IBAN</strong> : 
                    <span class="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">{iban}</span>
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