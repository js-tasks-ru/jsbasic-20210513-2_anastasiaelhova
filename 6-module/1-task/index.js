export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.render(rows);
    this.bindEvents();
  }

  render(rows) {

    let rowsInTable = rows.map((row) => `
      <tr>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      </tr>
    `).join('');

    this.elem.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${rowsInTable}
      </tbody>
    `;
  }

  bindEvents() {
    let buttons = this.elem.getElementsByTagName('button');

    for(let button of buttons) {
      button.onclick = function() {
        let row = button.parentNode.parentNode;
        row.remove();
      }
    }
  }

}