import { Dispatch } from 'redux'

import { decreaseTodo, increaseTodo } from './todo.action-type'
const increaseAction = () => {
    return (dispatch: Dispatch) => {
        dispatch(increaseTodo())
    }
}

const decreaseAction = () => {
    return (dispatch: Dispatch) => {
        dispatch(decreaseTodo())
    }
}

const TodoAction = {
    increaseAction,
    decreaseAction,
}

export default TodoAction
