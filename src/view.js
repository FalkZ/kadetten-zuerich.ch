import { h } from "hyperapp";

import Icon from "./Icon";
import Html from "./Html";

import { event } from "../dist/content/events.yml";
import { runMain } from "module";

import schnuppernachmittag from "../content/schnuppernachmittag.md";

import marked from "marked";

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
  Programm: ({ state, actions }) => (
    <table>
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
  ),
  Schnuppernachmittag: () => (
    <div
      oncreate={element => {
        fetch(schnuppernachmittag)
          .then(response => response.text())
          .then(text => marked(text))
          .then(html => {
            element.innerHTML = html;
          });
      }}
    />
  )
};

const Content = ({ state, actions }, [child]) => {
  let Current = child.Programm;
  let title = "Programm";
  Object.keys(child).forEach(key => {
    if ("#" + key === window.location.hash) {
      Current = child[key];
      title = key;
    }
  });

  return (
    <main>
      <h1>{title}</h1>
      <div id="content">
        <Current {...{ state, actions }} />
      </div>
    </main>
  );
};
const view = (state, actions) => (
  <div>
    <div id="titlebar">Kadetten Zürich</div>
    <img
      id="background"
      alt="background"
      src="https://images.unsplash.com/photo-1507041957456-9c397ce39c97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc3500fa9354b6bca48783b36e59c4e0&auto=format&fit=crop&w=934&q=80'); // images.unsplash.com/photo-1507041957456-9c397ce39c97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc3500fa9354b6bca48783b36e59c4e0&auto=format&fit=crop&w=934&q=80"
    />

    <nav>
      <a>Programm</a>
      <a>Über Uns</a>
      <a>set</a>
    </nav>
    <Content {...{ state, actions }}>{content}</Content>
  </div>
);

export default view;
