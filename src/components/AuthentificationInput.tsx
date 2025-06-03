import {createSignal, Show} from "solid-js";



//COMPOSANT INPUT
export default function AuthentificationInput(props:{
  label?: string;
  name: string;
  type: string;
  required?: boolean;
  class?: string;
  showRequiredMark?: boolean; // <- nouvelle prop
}) {
  const [showPassword, setShowPassword]= createSignal(false);
  const passwordField= props.type==="password";

  return (
    <div class={`flex flex-col ${props.class ?? ""}`}>
      {props.label && (
        <label class="mb-1 text-sm">
          {props.label}
          {props.required && props.showRequiredMark && (
            <span class="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      <div class="relative">
        <input
          type={passwordField && showPassword() ? "text" : props.type}
          name={props.name}
          required={props.required}
          placeholder={props.label ?? props.name}
          class="bg-gray-600 text-white p-2 pr-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-lime-400"
        />

        <Show when={passwordField}>
          <img
            src={
              showPassword()
                ? "/images/password/password_visibility_on.png"
                : "/images/password/password_visibility_off.png"
            }
            alt={showPassword() ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            class="absolute top-1/2 right-3 w-5 h-5 transform -translate-y-1/2 cursor-pointer"
            onclick={() => setShowPassword(!showPassword())}
          />
        </Show>
      </div>
    </div>
  );
}