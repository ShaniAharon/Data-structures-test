const stack = createStack()
const COLOR_KEY = 'color'
var gValue = localStorage.getItem(COLOR_KEY) || '#ffffff'

//Modify the stack sample – let the user select a color,
// use it as the body background, and
//support undo to previous colors

function onUndo() {
  const val = stack.pop()
  localStorage.setItem(COLOR_KEY, val)
  gValue = val
  document.querySelector('.val').innerHTML = gValue
  document.querySelector('body').style.backgroundColor = val
  if (stack.isEmpty()) document.querySelector('.btn-undo').disabled = true
}

function onAdd(ev) {
  ev.preventDefault()
  const el = document.querySelector('[name=diff]')
  const val = el.value
  if (!val) return
  document.querySelector('.val').innerHTML = val
  document.querySelector('body').style.backgroundColor = val
  localStorage.setItem(COLOR_KEY, val)
  el.value = ''
  stack.push(val)
  document.querySelector('.btn-undo').disabled = false
}

function createStack() {
  const items = []

  return {
    push(item) {
      items.push(item)
    },
    pop() {
      return items.pop()
    },
    peek() {
      return items[items.length - 1]
    },
    get length() {
      return items.length
    },
    isEmpty() {
      return items.length == 0
    },
  }
}
