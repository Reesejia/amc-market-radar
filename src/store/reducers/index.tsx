import {combineReducers, ReducersMapObject, Reducer, AnyAction} from 'redux'
import history from '@/Router/history'
import dashboard from './dashboard'
import {connectRouter} from 'connected-react-router'
let reducers: ReducersMapObject = {
    dashboard,
    router: connectRouter(history)
}
export type TypeRootState = {
    [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

let reducer: Reducer<TypeRootState, AnyAction> = combineReducers(reducers)
export default reducer
