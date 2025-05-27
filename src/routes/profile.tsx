import { logout } from "~/lib/session";

export default function Profile() {
  return (
    <main class="ml-48 text-center mx-auto text-gray-700 p-4 overflow-y-scroll h-screen">
      <h1 class="text-6xl text-white font-bold uppercase mt-0 mb-8">PROFILE</h1>

        <form action={logout} method="post">
            <button type="submit" class="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Déconnexion
            </button>
      </form>
    </main>
  );
}