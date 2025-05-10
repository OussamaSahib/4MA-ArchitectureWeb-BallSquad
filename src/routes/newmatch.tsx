import {addMatchAction} from "~/lib/matchs";



export default function NewMatch() {
   return (
    <main class="ml-148 text-white p-8 max-w-2xl mx-auto">
      <h1 class="text-5xl font-bold uppercase mb-7 text-center">Nouveau Match</h1>

      <form action={addMatchAction} class="space-y-6 border border-white p-6 rounded-xl text-left" method="post">
        {/* Sport */}
        <div>
          <label class="block font-bold mb-2">Sport :</label>
          <div class="flex gap-2">
            <label>
              <input type="radio" name="sport" value="Football" class="hidden peer" />
              <span class="peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">Football</span>
            </label>
            <label>
              <input type="radio" name="sport" value="Volleyball" class="hidden peer" />
              <span class="peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">Volleyball</span>
            </label>
            <label>
              <input type="radio" name="sport" value="Badminton" class="hidden peer" />
              <span class="peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">Badminton</span>
            </label>   
            <label>
              <input type="radio" name="sport" value="Basketball" class="hidden peer" />
              <span class="peer-checked:bg-[#c5ff36] peer-checked:text-black px-4 py-2 border rounded cursor-pointer">Basketball</span>
            </label>                     
          </div>
        </div>

                <div>
          <label class="block font-bold mb-2">Nombre de Joueurs :</label>

          <div class="space-y-3">
            {/* Ligne 1 */}
            <div class="flex gap-2">
              <label><input type="radio" name="quantity_players" value="1" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">1</span></label>
              <label><input type="radio" name="quantity_players" value="2" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">2</span></label>
              <label><input type="radio" name="quantity_players" value="3" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">3</span></label>
              <label><input type="radio" name="quantity_players" value="4" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">4</span></label>
              <label><input type="radio" name="quantity_players" value="5" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">5</span></label>
              <label><input type="radio" name="quantity_players" value="6" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">6</span></label>
              <label><input type="radio" name="quantity_players" value="7" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">7</span></label>
            </div>

            {/* Ligne 2 */}
            <div class="flex gap-2">
              <label><input type="radio" name="quantity_players" value="8" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">8</span></label>
              <label><input type="radio" name="quantity_players" value="9" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">9</span></label>
              <label><input type="radio" name="quantity_players" value="10" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">10</span></label>
              <label><input type="radio" name="quantity_players" value="11" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">11</span></label>
              <label><input type="radio" name="quantity_players" value="12" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">12</span></label>
              <label><input type="radio" name="quantity_players" value="13" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">13</span></label>
              <label><input type="radio" name="quantity_players" value="14" class="hidden peer" /><span class="inline-block w-12 text-center py-1 border rounded cursor-pointer peer-checked:bg-[#c5ff36] peer-checked:text-black">14</span></label>
            </div>
          </div>
        </div>





        {/* Date et Heure */}
        <div>
          <label class="block font-bold mb-2">Date et Heures :</label>
          <div class="flex gap-2 flex items-center">
            <input
              name="date"
              type="date"
              required
              class="bg-transparent border text-white p-2 rounded w-36 mr-8 cursor-pointer"
              onClick={(e) => e.currentTarget.showPicker?.()}
            />
            <input
              name="start_time"
              type="time"
              required
              class="bg-transparent border text-white p-2 rounded w-26 cursor-pointer"
              placeholder="Début"
              onClick={(e) => e.currentTarget.showPicker?.()}
            />
            <span class="text-white text-xl">→</span>
            <input
              name="end_time"
              type="time"
              required
              class="bg-transparent border text-white p-2 rounded w-26 cursor-pointer"
              placeholder="Fin"
              onClick={(e) => e.currentTarget.showPicker?.()}
            />
          </div>
        </div>


        {/* Lieu + Terrain */}
        <label class="block font-bold mb-2">Lieu et Terrain :</label>
        <div class="flex gap-4">
          <select
            name="place"
            class="bg-transparent border text-white p-2 rounded w-1/2 cursor-pointer"
          >
            <option value="Centre sportif Mounier" class="text-black">Centre sportif Mounier</option>
            <option value="Autre" class="text-black">Fit Five Bockstael</option>
          </select>
          <input
            name="field"
            type="text"
            required
            placeholder="Terrain"
            class="bg-transparent border text-white p-2 rounded w-1/2"
          />
        </div>




        {/* Prix Total */}
        <div>
          <label class="block font-bold mb-2">Prix Total :</label>
          <input name="total_price" type="text" required class="bg-transparent border text-white p-2 rounded w-full" />
        </div>




        <button type="submit" class="bg-[#c5ff36] text-black font-bold px-6 py-2 rounded hover:bg-[#aadd2f] w-full cursor-pointer">
          Créer le Match
        </button>
      </form>
    </main>
  );
}