import {combineReducers, ReducersMapObject, Reducer, AnyAction} from 'redux'
import history from '../history'
import dashboard from './dashboard'
let reducers: ReducersMapObject = {
    dashboard,
}
export type TypeRootState = {
    [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

let reducer: Reducer<TypeRootState, AnyAction> = combineReducers(reducers)
export default reducer
