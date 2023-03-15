const alert = document.querySelector('#alert');

export default class Alert {
  alert;
  constructor(alertId) {
    this.alert = document.querySelector(alertId);
  }

  show(message) {
    this.alert.classList.remove('d-none');
    this.alert.innerText = message;
  }

  hide() {
    this.alert.classList.add('d-none');
  }
}