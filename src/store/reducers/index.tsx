import {combineReducers, ReducersMapObject, Reducer, AnyAction} from 'redux'
import {connectRouter} from 'connected-react-router'
import history from '../history'
import dashboard from './dashboard'
let reducers: ReducersMapObject = {
    dashboard,
    router: connectRouter(history)
}
export type TypeRootState = {
    [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

let reducer: Reducer<TypeRootState, AnyAction> = combineReducers(reducers)
export default reducer