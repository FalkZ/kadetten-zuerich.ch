import { app } from 'hyperapp';

import './redirect';
import './style.styl';

import state from './state';
import view from './view';
import actions from './actions';

const main = app(state, actions, view, document.body);

console.log(window.location.hash);

if (!window.location.hash) {
  main.redirect('');
}

window.onhashchange = () =>
  main.redirect(window.location.hash.replace('#', ''));
