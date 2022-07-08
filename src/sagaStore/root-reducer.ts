import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import cityReducer from './features/city/citySlice'
import dashboardReducer from './features/dashboard/dashboardSlice'
import studentReducer from './features/student/studentSlice'

export const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
    city: cityReducer,
})
