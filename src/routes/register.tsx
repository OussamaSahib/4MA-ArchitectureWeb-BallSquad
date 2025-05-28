// src/routes/register.tsx
import {GuestGuard, Register } from "~/lib/user";

export default function RegisterPage() {
  //REDIRECTION VERS "/MATCH "SI USER CONNECTE
  GuestGuard();

  return (
    <main class="p-4">
      <h1 class="text-xl font-bold mb-4">Register</h1>
      <form action={Register} method="post" class="flex flex-col gap-2">
        <input type="text" name="firstname" placeholder="Prénom" required />
        <input type="text" name="lastname" placeholder="Nom" required />
        <input name="email" type="email" required class="bg-black text-white p-2 rounded" />
        <input name="password" type="password" required class="bg-black text-white p-2 rounded" />
        <button type="submit" class="mt-2 bg-blue-600 text-white p-2 rounded cursor-pointer">S'inscrire</button>
      </form>

    </main>
  );
}