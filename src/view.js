import { h } from "hyperapp";

import Icon from "./Icon";
import Html from "./Html";
import Nav from "./Nav";

import { event } from "../content/events.yml";

import { runMain } from "module";

import { loadFront } from "yaml-front-matter";

console.log(loadFront);
//import schnuppernachmittag from "../content/schnuppernachmittag.md";

import marked from "marked";
import { pathToFileURL } from "url";

const Chevron = ({ up }) =>
  up ? <Icon name="chevron-up" /> : <Icon name="chevron-down" />;

const Event = ({
  date,
  dateEnd,
  index,
  title,
  place,
  pictures,
  expand,
  expanded
}) => [
  <tr
    class={index % 2 === 0 ? "even" : "odd"}
    onclick={() => (date === expanded ? expand(null) : expand(date))}
  >
    <td>{date.toLocaleDateString()}</td>
    <td>
      {" "}
      <strong>{title}</strong>
    </td>
    <td>
      {date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())}
    </td>

    <td>
      <a class={date === expanded ? "rotate" : ""}>
        <Icon name="chevron-down" />
      </a>
    </td>
  </tr>,
  <tr
    class={
      "second " +
      (index % 2 === 0 ? "even" : "odd") +
      (date === expanded ? "" : " hide")
    }
    onclick={() => (date === expanded ? expand(null) : expand(date))}
  >
    <td>- {date.toLocaleDateString()}</td>
    <td>
      <a href={place}>
        <Icon name="map" />
        {" Strassenverkehrsamt"}
      </a>
    </td>
    <td>
      {"- " +
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())}
    </td>
    <td />
  </tr>
];

const content = {
  programm: ({ state, actions }) => {
    return (
      <table oncreate={() => actions.setTitle("Programm")}>
        <tbody>
          {event.sort((a, b) => b - a).map((props, index) => (
            <Event
              index={index}
              expand={actions.expand}
              expanded={state.expanded}
              {...props}
            />
          ))}
        </tbody>
      </table>
    );
  },
  default: ({ state, actions }) => (
    <div
      oncreate={element => {
        fetch(
          "https://api.github.com/repos/FalkZ/kadetten-zuerich.ch/contents/content/pages"
        )
          .then(response => response.json())
          .then(json => {
            let match = false;
            json.map(({ name, download_url }) => {
              if (name.replace(".md", "") === state.current) {
                match = true;
                console.log(name.replace(".md", ""), state.current);
                fetch(download_url)
                  .then(response => response.text())
                  .then(text => loadFront(text))
                  .then(({ title, name, __content }) => {
                    actions.setTitle(name);
                    element.innerHTML = marked(__content);
                  });
              }
            });
            if (!match) {
              actions.redirect("");
            }
          });
      }}
    />
  )
};

const Content = ({ state, actions }, [child]) => {
  let Current;
  if (state.current === "") {
    Current = child.programm;
  } else {
    Current = child.default;
  }

  let title = "Programm";
  Object.keys(child).forEach(key => {
    if (key === state.current) {
      Current = child[key];
    }
  });

  return (
    <main data-current={state.current}>
      <h1>{state.title}</h1>
      <div id="content">
        <Current {...{ state, actions }} />
      </div>
    </main>
  );
};
const view = (state, actions) => (
  <div>
    <div id="titlebar">KADETTEN ZÜRICH</div>
    <img
      id="background"
      alt="background"
      src="https://images.unsplash.com/photo-1507041957456-9c397ce39c97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc3500fa9354b6bca48783b36e59c4e0&auto=format&fit=crop&w=934&q=80'); // images.unsplash.com/photo-1507041957456-9c397ce39c97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc3500fa9354b6bca48783b36e59c4e0&auto=format&fit=crop&w=934&q=80"
    />

    <Nav redirect={actions.redirect} />
    <Content {...{ state, actions }}>{content}</Content>
  </div>
);

export default view;
