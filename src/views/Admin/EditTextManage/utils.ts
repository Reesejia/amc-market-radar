import { useEffect, useReducer, createContext, Dispatch } from "react";

const initialState = {
	status: false,

	tableParams: {
		page: 1,
		size: 20,
		sortField: "",
		direction: "",
	},
	loading: true,
	viewPointList: [],
	viewPointInfo: {
		id: "",
		title: "",
		content: "",
		createByName: "",
		lastModifiedTime: "",
	},
};

type ACTION_TYPE = {
	type: string;
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	payload: any;
};

export const dashReducer = (
	state: typeof initialState,
	action: ACTION_TYPE
) => {
	switch (action.type) {
		case "CHANGE_STATUS":
			return {
				...state,
				status: action.payload,
			};
		case "FETCH_API":
			return {
				...state,
				viewPointList: action.payload,
			};
		case "CHANGE_LOAD":
			return {
				...state,
				loading: action.payload,
			};
		case "INFO_DETAIL":
			return {
				...state,
				viewPointInfo: action.payload,
			};
		default:
			throw new Error();
	}
};

export const useDashApi = (fetchApi: Function) => {
	const [state, dispatch] = useReducer(dashReducer, initialState);
	const { tableParams } = state;

	const fetchData = async () => {
		dispatch({ type: "CHANGE_LOAD", payload: true });
		const params = { ...tableParams, page: tableParams.page - 1 };
		const res = await fetchApi(params);
		if (res.statusCode === 0 && res.success) {
			dispatch({ type: "FETCH_API", payload: res.data });
		}
		dispatch({ type: "CHANGE_LOAD", payload: false });
	};

	useEffect(() => {
		fetchData();
	}, [tableParams]);

	return { ...state, dispatch, fetchData };
};
const dispatch: Dispatch<ACTION_TYPE> = (params: ACTION_TYPE) => { };
const fetchData = () => { };
export const TextContext = createContext({
	...initialState,
	dispatch,
	fetchData,
});
export const labelStyle = { color: "#999", fontSize: "14px" };
export const contentStyle = { color: "#000", fontSize: "18px" };
export const infoLabelStyle = {
	color: "#000",
	fontSize: "14px",
	fontWeight: 500,
};
export const infoContentStyle = { color: "#000", fontSize: "14px" };
