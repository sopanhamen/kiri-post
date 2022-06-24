import { createAction } from "@reduxjs/toolkit";


export const increaseTodo = createAction('[Increase TODO]');

export const decreaseTodo = createAction('[Decrease TODO]');

export const addedTodo = createAction('[Added TODO]');

export const updateTodo = createAction('[Update TODO');

export const deleteTodo = createAction('[Delete TODO]');