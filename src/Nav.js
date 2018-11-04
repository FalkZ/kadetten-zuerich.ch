import { h } from "hyperapp";

const content = [
  { name: "Programm", url: "" },
  { name: "Über Uns", url: "über-uns" }
];
const Nav = ({ redirect }) => (
  <nav>
    {content.map(({ name, url }) => (
      <a onclick={() => redirect(url)}>{name}</a>
    ))}
  </nav>
);

export default Nav;
