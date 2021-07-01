import {useState, useReducer, createContext} from 'react'

const initialState = {
  status: false
}
type ACTION_TYPE = {
  type: string,
  payload: boolean
}

export const dashReducer = (state: typeof initialState, action: ACTION_TYPE) =>{
  console.log('dashReducer state', state)
  console.log('dashReducer action', action)
  switch (action.type) {
    case 'CHANGE_STATUS':
      return {
        ...state,
        status: action.payload
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,

      };
    case 'FETCH_FAILURE':
      return {
        ...state,

      };
    default:
      throw new Error();
  }
}


export const useDashApi = () =>{
  const [state, dispatch] = useReducer(dashReducer, {
    status: false
  });
  return [state, dispatch]
}

export const DashContext = createContext({
  state: { status: false},
  dispatch: (params: ACTION_TYPE) => {}
})
