import { useEffect, useReducer, createContext, Dispatch } from 'react';
import { dashboardList, navigationList } from '@/api/group';

const initialState = {
	status: false,
	grounpListInfo: { content: [], totalElements: 0 },
	groupId: { id: '' },
	isCreate: false,
	isEditGroup: false,
	dashList: [],
	showGroup: false,
	groupParams: {
		page: 1,
		size: 20,
		sortField: '',
		direction: ''
	},
	navList: [{
		id: '',
		navigationName: '',
		dashboardGroupName: '',
		dashboardGroupId: '',
		navigationGroups: []
	}]
};

type ACTION_TYPE = {
	type: string;
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	payload: any;
};

export const dashReducer = (state: typeof initialState, action: ACTION_TYPE) => {
	console.log('dashReducer state', state);
	console.log('dashReducer action', action);
	switch (action.type) {
		case 'CHAGE_GROUP_PARAMS':
			return {
				...state,
				groupParams: action.payload
			};
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
		case 'FETCH_DASH_LIST':
			return {
				...state,
				dashList: action.payload
			};
		case 'CHANGE_GROUPID':
			return {
				...state,
				groupId: action.payload
			};
		case 'CHANGE_ISCREATE':
			return {
				...state,
				isCreate: action.payload
			};
		case 'SET_EDIT_GROUP':
			return {
				...state,
				isEditGroup: action.payload
			};
		case 'SHOW_GROUP':
			return {
				...state,
				showGroup: action.payload
			};
		case 'FETCH_NAV_LIST':
			return {
				...state,
				navList: action.payload
			};
		default:
			throw new Error();
	}
};

export const useDashApi = (fetchApi: Function) => {
	const [state, dispatch] = useReducer(dashReducer, initialState);
	const { groupParams } = state

	const fetchData = async () => {
		const params = { ...groupParams, page: groupParams.page - 1 }
		const res = await fetchApi(params);
		if (res.statusCode === 0 && res.success) {
			dispatch({ type: 'FETCH_API', payload: res.data });
		}
	};

	const getDashboardList = async () => {
		const res = await dashboardList();
		if (res.statusCode === 0 && res.success) {
			dispatch({ type: 'FETCH_DASH_LIST', payload: res.data });
		}
	};

	// navigationList
	const getNavigationList = async () => {
		const res = await navigationList();
		if (res.statusCode === 0 && res.success) {
			dispatch({ type: 'FETCH_NAV_LIST', payload: res.data });
		}
	};

	useEffect(() => {
		fetchData();
	}, [groupParams]);

	useEffect(() => {
		getDashboardList();
	}, []);
	return { ...state, dispatch, fetchData, getNavigationList };
};

const dispatch: Dispatch<ACTION_TYPE> = (params: ACTION_TYPE) => { };
const fetchData = () => { };
const getNavigationList = () => { };
export const DashContext = createContext({ ...initialState, dispatch, fetchData, getNavigationList });

export const labelStyle = { color: '#999', fontSize: '14px' };
export const contentStyle = { color: '#000', fontSize: '18px' };
export const infoLabelStyle = { color: '#000', fontSize: '14px', fontWeight: 500 };
export const infoContentStyle = { color: '#000', fontSize: '14px' };
