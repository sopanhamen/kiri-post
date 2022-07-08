import {
    Action,
    configureStore,
    getDefaultMiddleware,
    Store,
    ThunkAction,
    ThunkDispatch,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'

// import persistStore from 'redux-persist/lib/persistStore'
import { rootReducer } from './root-reducer'

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), logger],
    devTools: process.env.NODE_ENV === 'development',
})
// export const persister = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export type ThunkActionType<T = Promise<void>> = ThunkAction<
    T,
    RootState,
    null,
    Action<string>
>
export type ThunkDispatchType = ThunkDispatch<RootState, any, Action<string>>
export type StoreType = Store<RootState, Action<string>> & {
    dispatch: ThunkDispatchType
}
