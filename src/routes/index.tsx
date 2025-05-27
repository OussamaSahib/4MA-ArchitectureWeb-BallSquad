// src/routes/login.tsx
import { Login } from "~/lib/user";

export default function LoginPage() {
  return (
    <main class="p-4">
      <h1 class="text-xl font-bold mb-4">Login</h1>
        <form action={Login} method="post">
          <input name="email" type="email" class="bg-black text-white p-2 rounded" autocomplete="email" required />
          <input name="password" type="password" class="bg-black text-white p-2 rounded" autocomplete="current-password" required />
          <button type="submit" class="mt-2 bg-blue-600 text-white p-2 rounded cursor-pointer">Se connecter</button>
        </form>
    </main>
  );
}