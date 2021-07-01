import { useEffect, useReducer, createContext, Dispatch } from 'react';

const initialState = {
	status: false,
	grounpListInfo: { content: [], totalElements: 0 }
};

type ACTION_TYPE = {
  type: string;
   // eslint-disable-next-line  @typescript-eslint/no-explicit-any
	payload: any
};

export const dashReducer = (state: typeof initialState, action: ACTION_TYPE) => {
	console.log('dashReducer state', state);
	console.log('dashReducer action', action);
	switch (action.type) {
		case 'CHANGE_STATUS':
			return {
				...state,
				status: action.payload
			};
		case 'FETCH_API':
			return {
        ...state,
        grounpListInfo: action.payload
			};
		case 'FETCH_FAILURE':
			return {
				...state
			};
		default:
			throw new Error();
	}
};


export const useDashApi = (fetchApi?: Function) => {
  const [ state, dispatch ] = useReducer(dashReducer, initialState);

  const fetchData = async () => {
    if(fetchApi){
      const res = await fetchApi();
      if(res.statusCode === 0 && res.success){
        dispatch({type: 'FETCH_API', payload: res.data})
      }
    }
  };

	useEffect(() => {

    fetchData()
	},[]);
	return { ...state, dispatch, fetchData };
};

const dispatch: Dispatch<ACTION_TYPE> = (params: ACTION_TYPE) => {};
export const DashContext = createContext({ ...initialState, dispatch });
