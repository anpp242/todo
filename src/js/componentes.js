import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');
const btnDeleteAll = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

export const crateTodoHtml = ( todo )=>{
  const htmlTodo = `
      <li class="${ (todo.complete) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${ (todo.complete) ? 'checked' : '' }>
          <label>${todo.task}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      </li>
  `
  const div = document.createElement('div');
  div.innerHTML = htmlTodo;

  divTodoList.append( div.firstElementChild );

  return div.firstElementChild;
}

input.addEventListener('keyup', ( event )=>{
  if( event.keyCode === 13 && input.value.length > 0 ){
    const newTodo = new Todo( input.value );
    todoList.newTodo( newTodo );
    crateTodoHtml( newTodo );
    input.value = '';
  }
})



divTodoList.addEventListener( 'click', (event)=>{
  console.log(event.target.localName)
  const nameElement = event.target.localName; //It could be input, label, button
  const todoElement = event.target.parentElement.parentElement;
  const todoId = todoElement.getAttribute('data-id');

  if( nameElement.includes('input') ){
    todoList.selectCompleted( todoId );
    todoElement.classList.toggle( 'completed' );
  }
  
  else if( nameElement.includes('button') ){
    todoList.deleteTodo( todoId );
    divTodoList.removeChild( todoElement );
  }
  
  console.log( todoList )
} );

btnDeleteAll.addEventListener( 'click', (event)=>{
  todoList.deleteCompleted();
  for(let i = divTodoList.children.length - 1; i >= 0; i--){
    const element = divTodoList.children[i];

    if( element.classList.contains( 'completed' ) ){
       divTodoList.removeChild(  element  );
    }
  }
} );

ulFilters.addEventListener( 'click', (event)=>{
  console.log(event.target.text)
  const filter = event.target.text;
  if( !filter ){return}

  anchorFilters.forEach( element => element.classList.remove('selected') );
  event.target.classList.add('selected')

  for(const element of divTodoList.children){
    element.classList.remove('hidden');
    const completed = element.classList.contains('completed');

    switch( filter ){
      case 'Pendientes':
        if(completed){
          element.classList.add( 'hidden' );
        }
      break;

      case 'Completados':
        if(!completed){
          element.classList.add( 'hidden' );
        }
      break;
    }
  }
} );