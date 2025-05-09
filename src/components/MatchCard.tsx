type Match = {
  sport: string;
  date: Date;
  place: string;
  field: string;
  total_price: number;
  quantity_players: number;
};

export default function MatchCard(props: { match: Match }) {
  const match = props.match;

  return (
    <div class="bg-white text-black p-4 rounded-xl shadow-md">
      <h2 class="text-2xl font-bold">{match.sport}</h2>
      <p>Date : {new Date(match.date).toLocaleString("fr-FR")}</p>
      <p>Lieu : {match.place} – {match.field}</p>
      <p>Prix : {match.total_price} € pour {match.quantity_players} joueurs</p>
    </div>
  );
}