import { h } from "hyperapp"

import { icons } from "feather-icons"

const svg = ({ attrs, contents }) => (
  <svg
    {...attrs}
    oncreate={element => {
      element.innerHTML = contents
    }}
  />
)

const Icon = ({ name }) => svg(icons[name])

export default Icon
