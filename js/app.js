const input = document.querySelector('.input')
const wrapper = document.querySelector('.wrapper')
const list = document.querySelector('.list')
const stringEmpty = ''

// ==================================================================================

function checkClass(event) {
  if (event.target.closest('.add')) checkEmpty()
  if (event.target.closest('.done')) doneTask(event)
  if (event.target.closest('.delete')) deleteTask(event)
}

function checkEmpty() {
  return input.value !== stringEmpty ? createTask() : alert('Введите задачу')
}

function createTask() {
  list.insertAdjacentHTML(
    'beforeend',
    `<li class="task">
      <span class="text">${input.value}</span>
      <div>
        <img src="img/1.png" class="done">
        <img src="img/2.png" class="delete">
      </div>
    </li>`
  )
  clearInput()
  inputFocus()
}

function clearInput() {
  return (input.value = stringEmpty)
}

function inputFocus() {
  return input.focus()
}

// ==============================Done task=============================

function doneTask(event) {
  let target = event.target.closest('.done')
  if (target) {
    let task = target.closest('.task')
    task.classList.toggle('completed')
  }
}

// ==============================Delete task=============================

function deleteTask(event) {
  let target = event.target.closest('.delete')
  if (target) {
    let task = target.closest('.task')
    task.remove()
  }
}

// ============================Event======================================================
wrapper.addEventListener('click', checkClass)
