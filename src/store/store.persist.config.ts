// defaults to localStorage for web
import storage from 'redux-persist/lib/storage'

// redux persist config
export const persistConfig = {
    key: 'root',
    whitelist: ['AuthReducer'],
    storage,
}
