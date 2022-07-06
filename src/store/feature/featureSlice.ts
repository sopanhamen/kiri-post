import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export enum VisibilityFilter {
    ShowAll = "SHOW_ALL",
    ShowCompleted = "SHOW_COMPLETED",
    ShowActive = "SHOW_ACTIVE",
}
const initialState = VisibilityFilter.ShowAll;

const featureSlice = createSlice({
    name: 'features',
    initialState: initialState,
    reducers: {
        setVisibilityFilter: (state, action: PayloadAction<VisibilityFilter>) => {
            return action.payload;
        }
    }
})

export const  { setVisibilityFilter } = featureSlice.actions;

export default featureSlice.reducer;