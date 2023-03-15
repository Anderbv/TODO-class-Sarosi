import Alert from "./alert.js";

export default class AddTodo {
  btnAdd;
  inputDescription;
  inpuTitle;
  alert;
  constructor() {
    this.btnAdd = document.querySelector("#add");
    this.inputDescription = document.getElementById("description");
    this.inpuTitle = document.querySelector("#title");
    this.alert = new Alert('#alert');
  }

  onClick(callback) {
    this.debugging();
    this.btnAdd.onclick = () => {
      if(!this.inpuTitle.value || !this.inputDescription.value) {
        // alert.classList.remove('d-none')    
        // alert.innerText = 'Title and descriptions are required'
        // return;
        this.alert.show('Title and descriptions are required');
      } else {
        this.alert.hide();
        console.log(this.inputDescription.value)
        callback( this.inpuTitle.value, this.inputDescription.value );
        // * la funcion que llame a este funcion recibira el title y description
      }
    }
  }

  debugging() {
    console.log('debuggeando desde addTodo')
  }
}