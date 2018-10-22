const actions = {
  expand: date => state => {
    console.log(date)
    return { ...state, expanded: date }
  }
}

export default actions
