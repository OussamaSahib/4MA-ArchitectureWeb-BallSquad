import {JSX} from "solid-js";



export default function SearchBar(props:{
  value: string;
  onInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
  placeholder: string;
}) {
  return (
      <input
        type= "text"
        value= {props.value}
        onInput= {props.onInput}
        placeholder= {props.placeholder}
        class= "w-full md:w-75 px-4 py-2 rounded bg-[#5f6368] text-white"
      />
  );
}