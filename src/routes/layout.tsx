import { JSX } from "solid-js";
import { useLocation } from "@solidjs/router";
import Nav from "~/components/Nav";

export default function RootLayout(props: { children: JSX.Element }) {
  const location = useLocation();

  // Ne pas afficher Nav sur / ou /register
  const hideNav = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNav && <Nav />}
      {props.children}
    </>
  );
}
