import { Todo } from "./todo.class";

export class TodoList{
    constructor (){
        this.loadLocalStorage()
    }

    newTodo(  task  ){
        this.todos.push( task );
        this.saveLocalStorage();
    }

    deleteTodo( idTodo ){
        this.todos = this.todos.filter( todo=> todo.id !== parseInt(idTodo));
        this.saveLocalStorage();
    }

    toggleTodo( idTodo ){
        
    }

    deleteCompleted( ){
        this.todos = this.todos.filter( todo=> !todo.complete );
        this.saveLocalStorage();
    }
    
    selectCompleted(  idTodo ){
        for( const todo of this.todos ){
            //console.log('ID parameter: ', idTodo, 'Todo ID: ',todo.id);
            if(todo.id == parseInt(idTodo)){
                todo.complete = !todo.complete;
                this.saveLocalStorage();
                break;
            }
        }
    }

    saveLocalStorage(){
        localStorage.setItem( 'todo', JSON.stringify(this.todos) );
    }

    loadLocalStorage(){
        this.todos = ( localStorage.getItem('todo') ) 
        ? JSON.parse(localStorage.getItem('todo')) 
        : [];

        this.todos = this.todos.map( Todo.fromJson );
        //console.log(this.todos)
    }

    
}