import { loadFront } from "yaml-front-matter";

import marked from "marked";
import { pathToFileURL } from "url";

import files from "./files.json";

const actions = {
  expand: date => state => {
    console.log(date);
    return { ...state, expanded: date };
  },
  update: content => state => ({ ...state, content }),
  redirect: url => (state, actions) => {
    console.log(url);

    window.location.hash = url;

    // fetch(
    //   "https://api.github.com/repos/FalkZ/kadetten-zuerich.ch/contents/content/pages"
    // )
    //   .then(response => response.json())
    //   .then(json => {
    let match = false;
    if (url === "") {
      url = "index";
    }
    files.map(({ name, download_url }) => {
      if (name.replace(".md", "") === url) {
        match = true;
        console.log(name.replace(".md", ""), state.current);
        fetch(download_url)
          .then(response => response.text())
          .then(text => loadFront(text))
          .then(({ title, name, __content }) => {
            actions.setTitle(name);
            document.getElementById("content").innerHTML = marked(__content);
          });
      }
    });
    if (!match) {
      actions.redirect("");
    }
    // });

    if (url === "index") {
      url = "";
    }

    return { ...state, current: url };
  },
  setTitle: title => state => ({ ...state, title }),
  toggleMenu: () => state => ({ ...state, menuOpen: !state.menuOpen })
};

export default actions;
