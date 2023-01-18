const input = document.querySelector('.input')
const list = document.querySelector('.list')
const buttonAdd = document.querySelector('.add')
const stringEmpty = ''

// ==================================================================================
function createTask() {
  if (input.value !== stringEmpty) {
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
    input.value = stringEmpty
    input.focus()
  } else {
    alert('Введите задачу')
  }
}

// ============================Event======================================================
buttonAdd.addEventListener('click', createTask)
document.addEventListener('click', (event) => {
  if (event.target.closest('.done'))
    event.target.closest('.task').classList.toggle('completed')
  else if (event.target.closest('.delete'))
    event.target.closest('.task').remove()
})
