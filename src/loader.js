import { app } from "hyperapp"

import "./redirect"

import state from "./state"
import view from "./view"
import actions from "./actions"

app(state, actions, view, document.body)
