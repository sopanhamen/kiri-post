import { createSelector } from '@reduxjs/toolkit'
import { StoreState } from '@store/root-reducer'

export const selectCount = (state: StoreState) => state.counter.value

export const countSelector = createSelector(selectCount, (state) => state)
