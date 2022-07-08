import { bindActionCreators } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './index'
import actionCreators from './actionCreators'

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(actionCreators, dispatch)
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
