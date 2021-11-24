import { Todo, TodoList } from './classes';
import { crateTodoHtml } from './js/componentes';
import './style.css';

export const todoList = new TodoList();

todoList.todos.forEach(todo => crateTodoHtml( todo ));
// todoList.todos.forEach( crateTodoHtml ); Abreviado solo cuando hay un argumento
