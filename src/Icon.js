import { h } from "hyperapp";

import { icons } from "feather-icons";

const svg = ({ attrs, contents } = { attrs: {} }) => (
  <svg
    {...attrs}
    oncreate={element => {
      element.innerHTML = contents;
    }}
  />
);

const Icon = ({ name }) => svg(icons[name]);

export default Icon;
