import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/lib/persistStore'

import { rootReducer } from './root-reducer'
import { persistConfig } from './store.persist.config'

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-anonymous-default-export
// const state =
//     typeof window === undefined
//         ? createStore(
//               rootReducer,
//               composeWithDevTools(applyMiddleware(thunkMiddleware)),
//           )
//         : createStore(
//               persistedReducer,
//               composeWithDevTools(applyMiddleware(thunkMiddleware)),
//           )

// const store = {
//     persistor: persistStore(state),
//     state,
// }

export const store = configureStore({
    reducer: () => {
        return typeof window === undefined ? rootReducer : persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persister = persistStore(store)
