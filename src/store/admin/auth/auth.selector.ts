import { createSelector } from '@reduxjs/toolkit'
import { StoreState } from '@store/root-reducer'

export const authRequestSelected = (state: StoreState) => state.auth
export const authRequestSelector = createSelector( authRequestSelected,  (state) => state)

