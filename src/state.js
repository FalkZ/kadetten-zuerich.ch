const state = {
  count: 0,
  current: window.location.hash.replace("#", ""),
  menuOpen: window.innerWidth > 800
};
console.log(state);

export default state;
