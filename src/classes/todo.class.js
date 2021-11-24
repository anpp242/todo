export class Todo{
    constructor(  task  ){
        this.task = task;
        this.id = new Date().getTime();
        this.complete = false;
        this.created = new Date();
    }

    static fromJson( {id, task, complete, created} ){
        const tempTodo = new Todo( task );
        tempTodo.id = id;
        tempTodo.complete = complete;
        tempTodo.created = created;

        return tempTodo;
    }
}