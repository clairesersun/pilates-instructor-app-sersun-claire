import * as actions from './actions'

export default function reducer(state, {action, payload}) {
  switch(action) {
    case actions.SEARCH_MOVEMENTS:
      return {...state, movementSearchResults: payload}
    case actions.SHOWALL_MOVEMENTS:
      return {...state, allMovements: payload}
    default:
      return state
  }
}