import { h } from "hyperapp";

import { item } from "../content/navigation.yml";

const content = [
  { name: "Programm", url: "" },
  { name: "Über Uns", url: "ueber" }
];
const Nav = ({ redirect }) => (
  <nav>
    {item.map(({ title, url }) => (
      <a onclick={() => redirect(url)}>{title}</a>
    ))}
  </nav>
);

export default Nav;
