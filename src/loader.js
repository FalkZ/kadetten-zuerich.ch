import { app } from "hyperapp"

import "./redirect"
import "./style.styl"

import state from "./state"
import view from "./view"
import actions from "./actions"

app(state, actions, view, document.body)
