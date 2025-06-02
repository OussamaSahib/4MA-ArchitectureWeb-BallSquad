import { addMatchAction } from "~/lib/matchs";
import { AuthGuard } from "~/lib/user";

export default function NewMatch() {
  AuthGuard();

  return (
    <main class="ml-48 text-white px-4 py-6 md:px-10 lg:px-32 pb-12">
      <h1 class="text-5xl font-bold uppercase mb-6 text-center">Nouveau Match</h1>

      <div class="w-full max-w-4xl mx-auto ">
        <form
          action={addMatchAction}
          method="post"
          class="space-y-6 border border-white/7 border-2 bg-white/5 p-6 pt-3 pb-4 rounded-xl"
        >
          {/* Sport */}
          <div>
            <label class="block font-bold mb-2">Sport :</label>
            <div class="flex flex-wrap gap-2 justify-start">
              <label>
                <input type="radio" name="sport" value="Football" class="hidden peer" />
                <span class="min-w-[120px] text-center block peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">
                  Football
                </span>
              </label>
              <label>
                <input type="radio" name="sport" value="Volleyball" class="hidden peer" />
                <span class="min-w-[120px] text-center block peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">
                  Volleyball
                </span>
              </label>
              <label>
                <input type="radio" name="sport" value="Badminton" class="hidden peer" />
                <span class="min-w-[120px] text-center block peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">
                  Badminton
                </span>
              </label>
              <label>
                <input type="radio" name="sport" value="Basketball" class="hidden peer" />
                <span class="min-w-[120px] text-center block peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">
                  Basketball
                </span>
              </label>
            </div>
          </div>

          {/* Nombre de joueurs */}
          <div>
            <label class="block font-bold mb-2">Nombre de Joueurs :</label>
            <div class="space-y-2">
              <div class="flex flex-wrap gap-2">
                {[...Array(14)].map((_, i) => {
                  const value = (i + 1).toString();
                  return (
                    <label>
                      <input type="radio" name="quantity_players" value={value} class="hidden peer" />
                      <span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">
                        {value}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Date et heures */}
          <div>
            <label class="block font-bold mb-2">Date et Heures :</label>
            <div class="flex flex-wrap gap-2 items-center">
              <input
                name="date"
                type="date"
                required
                class="bg-transparent border text-white p-2 rounded w-36 cursor-pointer"
                onClick={(e) => e.currentTarget.showPicker?.()}
              />
              <input
                name="start_time"
                type="time"
                required
                class="bg-transparent border text-white p-2 rounded w-28 ml-7 cursor-pointer"
                placeholder="Début"
                onClick={(e) => e.currentTarget.showPicker?.()}
              />
              <span class="text-white text-xl">→</span>
              <input
                name="end_time"
                type="time"
                required
                class="bg-transparent border text-white p-2 rounded w-28 cursor-pointer"
                placeholder="Fin"
                onClick={(e) => e.currentTarget.showPicker?.()}
              />
            </div>
          </div>

          {/* Lieu + terrain */}
          <div class="flex flex-wrap gap-4">
            <select
              name="place"
              class="bg-transparent border text-white p-2 rounded w-auto max-w-xs cursor-pointer"
            >
              <option value="Centre sportif Mounier" class="text-black">Centre sportif Mounier</option>
              <option value="Fit Five Bockstael" class="text-black">Fit Five Bockstael</option>
            </select>

            <input
              name="field"
              type="text"
              required
              placeholder="Terrain"
              class="bg-transparent border text-white p-2 rounded w-auto max-w-[150px]"
            />
          </div>


          {/* Prix */}
          <div>
            <label class="block font-bold mb-2">Prix Total :</label>
            <div class="flex flex-wrap items-center gap-2">
              <input
                name="price_euros"
                type="number"
                required
                min="0"
                placeholder="00"
                class="bg-transparent border text-white p-2 rounded w-16"
              />
              <span class="text-white text-xl">,</span>
              <input
                name="price_cents"
                type="number"
                required
                min="0"
                placeholder="00"
                class="bg-transparent border text-white p-2 rounded w-16"
              />
              <span class="text-white text-xl">€</span>
            </div>
          </div>

          <button
            type="submit"
            class="bg-[#c5ff36] text-black font-bold px-6 py-2 rounded hover:bg-[#aadd2f] w-full cursor-pointer"
          >
            Créer le Match
          </button>
        </form>
      </div>
    </main>
  );
}
