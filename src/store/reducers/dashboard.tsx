import { TypeAction } from '@/typings/common';
import * as types from '../action-types';

export interface TypeRadar {
}

let initialState: TypeRadar = {
	boardOrigin: {}
};

export default function (state: TypeRadar = initialState, action: any ) {
	switch (action.type) {
		case types.SET_DASHBOARD_GRID_DATA:
			const {dashboardId, gridPositionData} = action.payload
			console.log('dashboardId, gridPositionData', dashboardId, gridPositionData)
			return { ...state, boardOrigin: {[dashboardId]: gridPositionData } };
		default:
			return state;
	}
}
