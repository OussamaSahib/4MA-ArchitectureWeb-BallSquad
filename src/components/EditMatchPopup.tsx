// src/components/EditMatchModal.tsx
import { Match } from "@prisma/client";
import { createEffect, createSignal } from "solid-js";
import { editMatchAction } from "~/lib/matchs";



export default function EditMatchModal(props: { match: Match; onClose: () => void; onPriceChange?: (newPrice: number) => void }) {
  const { match, onClose, onPriceChange } = props;
  const [euros, setEuros] = createSignal(Math.floor(match.total_price));
  const [cents, setCents] = createSignal(Math.round((match.total_price % 1) * 100));
  createEffect(() => {
    onPriceChange?.(euros() + cents() / 100);
  });

  return (
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div class="bg-[#1a1a1a] border border-white text-white p-6 rounded-xl w-full max-w-2xl relative">
        <button class="absolute top-4 right-5 text-2xl cursor-pointer" onClick={onClose}>✕</button>
        <h2 class="text-4xl font-bold text-center mb-6">Modifier le Match</h2>

        <form action={editMatchAction} method="post" class="space-y-6 text-left" onSubmit={() => props.onClose()}>
          <input type="hidden" name="id" value={match.id} />

          {/* Sport */}
          <div>
            <label class="block font-bold mb-2">Sport :</label>
            <div class="flex gap-2">
              {["Football", "Volleyball", "Badminton", "Basketball"].map((sport) => (
                <label>
                  <input type="radio" name="sport" value={sport} checked={match.sport === sport} class="hidden peer" />
                  <span class="peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">{sport}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Joueurs */}
          <div>
            <label class="block font-bold mb-2">Nombre de Joueurs :</label>

            <div class="space-y-3">
              {/* Ligne 1 */}
              <div class="flex gap-2">
                <label><input type="radio" name="quantity_players" value="1" checked={match.quantity_players === 1} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">1</span></label>
                <label><input type="radio" name="quantity_players" value="2" checked={match.quantity_players === 2} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">2</span></label>
                <label><input type="radio" name="quantity_players" value="3" checked={match.quantity_players === 3} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">3</span></label>
                <label><input type="radio" name="quantity_players" value="4" checked={match.quantity_players === 4} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">4</span></label>
                <label><input type="radio" name="quantity_players" value="5" checked={match.quantity_players === 5} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">5</span></label>
                <label><input type="radio" name="quantity_players" value="6" checked={match.quantity_players === 6} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">6</span></label>
                <label><input type="radio" name="quantity_players" value="7" checked={match.quantity_players === 7} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">7</span></label>
              </div>

              {/* Ligne 2 */}
              <div class="flex gap-2">
                <label><input type="radio" name="quantity_players" value="8" checked={match.quantity_players === 8} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">8</span></label>
                <label><input type="radio" name="quantity_players" value="9" checked={match.quantity_players === 9} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">9</span></label>
                <label><input type="radio" name="quantity_players" value="10" checked={match.quantity_players === 10} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">10</span></label>
                <label><input type="radio" name="quantity_players" value="11" checked={match.quantity_players === 11} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">11</span></label>
                <label><input type="radio" name="quantity_players" value="12" checked={match.quantity_players === 12} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">12</span></label>
                <label><input type="radio" name="quantity_players" value="13" checked={match.quantity_players === 13} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">13</span></label>
                <label><input type="radio" name="quantity_players" value="14" checked={match.quantity_players === 14} class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">14</span></label>
              </div>
            </div>
          </div>

          {/* Date & Heure */}
          <div>
            <label class="block font-bold mb-2">Date et Heures :</label>
            <div class="flex gap-2 items-center">
              <input name="date" type="date" required value={match.date.toISOString().substring(0, 10)} class="bg-transparent border text-white p-2 rounded w-36 mr-8 cursor-pointer" onClick={(e) => e.currentTarget.showPicker?.()} />
              <input name="start_time" type="time" required value={match.start_time.toLocaleTimeString("fr-BE", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} class="bg-transparent border text-white p-2 rounded w-26 cursor-pointer" onClick={(e) => e.currentTarget.showPicker?.()} />
              <span class="text-white text-xl">→</span>
              <input name="end_time" type="time" required value={match.end_time.toLocaleTimeString("fr-BE", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} class="bg-transparent border text-white p-2 rounded w-26 cursor-pointer" onClick={(e) => e.currentTarget.showPicker?.()} />
            </div>
          </div>

          {/* Lieu + Terrain */}
          <label class="block font-bold mb-2">Lieu et Terrain :</label>
          <div class="flex gap-4">
            <select name="place" class="bg-transparent border text-white p-2 rounded w-1/2 cursor-pointer">
              <option value="Centre sportif Mounier" selected={match.place === "Centre sportif Mounier"} class="text-black">Centre sportif Mounier</option>
              <option value="Fit Five Bockstael" selected={match.place === "Fit Five Bockstael"} class="text-black">Fit Five Bockstael</option>
            </select>
            <input name="field" type="text" required value={match.field} class="bg-transparent border text-white p-2 rounded w-1/4" />
          </div>

          {/* Prix */}
          <div>
            <label class="block font-bold mb-2">Prix Total :</label>
            <div class="flex items-center gap-2">
              <input name="price_euros" type="number" value={euros()} required class="bg-transparent border text-white p-2 rounded w-14 text-left" />
              <span class="text-white text-xl">,</span>
              <input name="price_cents" type="number" value={cents().toString().padStart(2, "0")} required class="bg-transparent border text-white p-2 rounded w-14 text-left" />
              <span class="text-white text-xl">€</span>
            </div>
          </div>

          <button type="submit" class="bg-[#c5ff36] text-black font-bold px-6 py-2 rounded hover:bg-[#aadd2f] w-full cursor-pointer">
            Sauver
          </button>
        </form>
      </div>
    </div>
  );
}