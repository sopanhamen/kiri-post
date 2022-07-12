import {
    Action,
    configureStore,
    Store,
    ThunkAction,
    ThunkDispatch,
} from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'

import { rootReducer } from './root-reducer'
import { persistConfig } from './store.persist.config'

// persis config 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
    devTools: process.env.NODE_ENV === 'development',
})
export const persister = persistStore(store)

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
