import { h, app } from "hyperapp"

const event = ({ date, name, place, pictures }) => (
  <tr>
    <td>{date}</td>
    <td>{date}</td>
    <td>{name}</td>
    <td>{place}</td>
  </tr>
)

const view = (state, actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
)

export default view
