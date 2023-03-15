import AddTodo from "./components/addTodo.js";
import Modal from "./components/modal.js";

export default class View {
  model;
  table;
  addTodoForm;
  modal;
  constructor() {
    this.model = null;
    this.table = document.querySelector("#table");
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    this.addTodoForm.onClick( ( title, description ) => this.addTodo( title, description ) )
    this.modal.onClick( ( id, values ) => this.editTodo( id, values ) )
  }

  render() {
    const copyArr = [...this.model.getTodos()];
    copyArr.forEach(todo => this.createRow({...todo}));
  }

  setModel( model ) {
    this.model = model;
  }

  addTodo( title, description ) {
    const todo = this.model.addTodo( title, description );
    console.log(todo)
    this.createRow(todo)
  }

  removeTodo(id) {
    document.getElementById(id).remove();
    this.model.removeTodo(id)
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id)
  }

  editTodo( id, values ) {
    this.model.editTodo( id, values )
    console.log( id, values )
    const row = document.getElementById( id );
    console.log(row)
    row.children[0].innerText = values.title;
    row.children[1].innerText = values.description;
    row.children[2].children[0].checked = values.completed;
  }

  createRow( todo ) {
    //creando el row
    const row = table.insertRow();
    row.id = todo.id
    const template = `
    <td>
      ${todo.title}
    </td>
    <td>
      ${todo.description}
    </td>
    <td class="text-center">
    </td>
    <td class="text-right">
    </td>
    `;
    row.innerHTML = template;

    const elementSecond = row.getElementsByTagName('td')[2];
    const elementThree = row.getElementsByTagName('td')[3];

    const inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    inputCheck.checked = todo.completed;
    elementSecond.appendChild(inputCheck);
    inputCheck.onclick = () => {
      this.toggleCompleted(todo.id)
    }

    //editbtn
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-primary', 'mb-1');
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.setAttribute('data-toggle', 'modal');
    editBtn.setAttribute('data-target', '#modal');
    row.children[3].appendChild(editBtn);

    //creando un boton y asignandolo al td respectivo del row
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    button.innerHTML = `
    <i class="fa fa-trash"></i>`;
    elementThree.appendChild(button);

    // cada botton va a poder eliminar el padre general "tr"
    button.addEventListener('click', () => {
      // row.parentElement.removeChild(row)
      // this.model.xd(index)
      this.removeTodo(todo.id)
    })

    console.log(row.children[2].children[0])

    editBtn.onclick = () => {
      this.modal.setValues( {
        id: todo.id,
        title: row.children[0].innerText,
        description: row.children[1].innerText,
        completed: row.children[2].children[0].checked,
      } )
    }

  }

}