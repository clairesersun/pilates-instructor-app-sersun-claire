import {useContext, createContext, useReducer} from 'react'
import initialState from './state'
import reducer from './reducer'

export const movementContext = createContext()

export const useMovementContext = () => {
  const context = useContext(movementContext)
  if (context === undefined)
    throw new Error('useMovementContext must be used within MovementProvider')
  return context
}

export const MovementProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <movementContext.Provider {...props} value={[state, dispatch]} />
}