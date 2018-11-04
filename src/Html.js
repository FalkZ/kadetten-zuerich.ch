import { h } from "hyperapp";

const Html = (attrs, children) => (
  <div
    {...attrs}
    oncreate={element => {
      element.innerHTML = children.join();
    }}
  />
);

export default Html;
