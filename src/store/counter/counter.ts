import { createSlice } from '@reduxjs/toolkit';
import { todosSlice } from '../sample-todo/sample-todo';
import { FeatureKey } from '../FeatureKey';

export const counterSlice = createSlice({
    name: FeatureKey.COUNTER,
    initialState: 0,
    reducers: {},
    extraReducers: {
        [todosSlice.actions.createTodoActionCreator.type]: (state) => state + 1,
        [todosSlice.actions.editTodoActionCreator.type]: (state) => state + 1,
        [todosSlice.actions.toggleTodoActionCreator.type]: (state) => state + 1,
        [todosSlice.actions.removeTodoActionCreator.type]: (state) => state + 1,
    },
});

export const counterActions = {
    ...counterSlice.actions,
};

