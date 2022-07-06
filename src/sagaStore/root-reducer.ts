import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import dashboardReducer from './features/dashboard/dashboardSlice'
import studentReducer from './features/student/studentSlice'
import cityReducer from './features/city/citySlice'


export const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
    city: cityReducer,
})
