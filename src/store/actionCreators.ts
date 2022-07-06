import { todosActions } from './sample-todo';
import { selectedTodoActions } from './selected-todo';
import { counterActions } from './counter';
import { jsonTodosActions } from './jsonTodos';

export default {
  ...todosActions,
  ...selectedTodoActions,
  ...counterActions,
  ...jsonTodosActions,
};