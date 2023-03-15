export default class Model {
  view;
  todos;
  currentId;
  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem('todos'));
    if( this.todos.length < 1 ) {
      this.todos = [{
        id: 0,
        title: 'Learn Js',
        description: 'Watch JS Tutorials ',
        completed: false,
      }];
      this.currentId = 1; 
    }
    this.currentId = this.todos[this.todos.length - 1].id + 1;
  }

  setView(view) {
    this.view = view;
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  editTodo( id, values ) {
    const index = this.findIndex(id);
    console.log(this.todos[index])
    this.todos[index] = Object.assign(this.todos[index], values)
    console.log(this.todos[index])
    this.save();
  }

  getTodos() {
    return this.todos.map(todo => ({...todo}))
  }

  addTodo( title, description ) {
    const todo = {
      id: this.currentId++,
      title,
      description,
      completed: false,
    }
    this.todos.push(todo);
    console.log(this.todos)
    this.save();
    return { ...todo };
  }

  toggleCompleted(id) {
    const index = this.findIndex(id);
    const todos = this.getTodos()
    todos[index].completed = !todos[index].completed;
    this.todos = [...todos];
    console.log(id)
    this.save();
  }

  removeTodo(id) {
    const index = this.findIndex(id);
    this.todos.splice(index, 1);
    this.save();
  }

  findIndex(id) {
    return this.todos.findIndex(todo => todo.id === id);
  }

  

}