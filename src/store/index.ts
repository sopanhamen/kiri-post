import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/lib/persistStore'
import thunk from 'redux-thunk'

import { rootReducer } from './root-reducer'
import { persistConfig } from './store.persist.config'

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    // reducer: () => {
    //     return typeof window === undefined ? rootReducer : persistedReducer
    // },
    reducer: persistedReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persister = persistStore(store)

// export const makeStore: MakeStore = (_?: RootState): EnhancedStore => store
