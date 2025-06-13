export default function InputEditProfile(props:{label: string; name: string; type?: string; value?: string; placeholder?: string;}){
  return (
    <div>
      <label class="text-white block mb-1">{props.label}</label>
      <input
        type={props.type || "text"}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        class="w-full px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#c5ff36]"
      />
    </div>
  );
}