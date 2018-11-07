const actions = {
  expand: date => state => {
    console.log(date);
    return { ...state, expanded: date };
  },
  redirect: (url, noUpdate) => (state, actions) => {
    console.log(url);
    if (!noUpdate) {
      window.onhashchange = () => null;
      window.location.hash = url;
      window.onhashchange = () =>
        actions.redirect(window.location.hash.replace("#", ""), "noUpdate");
    }

    return { ...state, current: url };
  },
  setTitle: title => state => ({ ...state, title }),
  toggleMenu: () => state => ({ ...state, menuOpen: !state.menuOpen })
};

export default actions;
