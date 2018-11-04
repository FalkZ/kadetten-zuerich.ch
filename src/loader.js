import { app } from "hyperapp";

import "./redirect";
import "./style.styl";

import state from "./state";
import view from "./view";
import actions from "./actions";

const main = app(state, actions, view, document.body);

window.onhashchange = () =>
  main.actions.redirect(window.location.hash.replace("#", ""), "noUpdate");
