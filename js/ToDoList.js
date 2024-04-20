class ToDoList {
  static list = document.querySelector('#list')
  static ButtonAddTask = document.querySelector('#add')
  static input = document.querySelector('#input')
  static notes = []

  static createTask() {
    const task = {
      title: ToDoList.input.value,
      completed: false,
    }
    ToDoList.notes.push(task)
    ToDoList.render()
  }

  static cleanList = () => (ToDoList.list.innerHTML = '')

  static checkNotesToEmpty = () => {
    if (ToDoList.notes.length === 0)
      ToDoList.list.innerHTML = '<p>Нет задач</p>'
  }

  static render = () => {
    ToDoList.cleanList()
    ToDoList.checkNotesToEmpty()
    ToDoList.notes.forEach((note, index) => {
      ToDoList.list.insertAdjacentHTML(
        'beforeend',
        `<li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <span class="${note.completed ? 'text-decoration-line-through' : ''}">${
          note.title
        }</span>
      <span>
      ${
        note.completed
          ? `<span class="btn btn-small btn-warning" data-index="${index}" data-type="toggle">&sup;</span>`
          : `<span class="btn btn-small btn-success" data-index="${index}" data-type="toggle">&check;</span>
          <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>`
      }
      </span>
    </li>
  `
      )
    })
  }

  static checkInputToEmpty() {
    ToDoList.input.value.length === 0 ? undefined : ToDoList.createTask()
  }

  static cleanInput = () => (ToDoList.input.value = '')

  static checkType(event) {
    const type = event.target.dataset.type
    const index = parseInt(event.target.dataset.index)
    if (type === 'toggle') ToDoList.completedTask(index)
    else if (type === 'remove') ToDoList.deleteTask(index)
    ToDoList.render()
  }

  static completedTask = (index) =>
    (ToDoList.notes[index].completed = !ToDoList.notes[index].completed)

  static deleteTask = (index) => ToDoList.notes.splice(index, 1)

  static saveNotesToStorage = () => {
    localStorage.setItem('notes', JSON.stringify(ToDoList.notes))
  }

  static get notesFromStorage() {
    const data = localStorage.getItem('notes')
    const notes = JSON.parse(data)
    return notes
  }

  static pushNotesInArray() {
    const notes = ToDoList.notesFromStorage
    notes.forEach((note) => {
      ToDoList.notes.push(note)
    })
  }
}

ToDoList.ButtonAddTask.addEventListener('click', ToDoList.checkInputToEmpty)
ToDoList.ButtonAddTask.addEventListener('click', ToDoList.cleanInput)
ToDoList.list.addEventListener('click', ToDoList.checkType)
window.addEventListener('beforeunload', ToDoList.saveNotesToStorage)
document.addEventListener('DOMContentLoaded', ToDoList.pushNotesInArray)
document.addEventListener('DOMContentLoaded', ToDoList.render)
