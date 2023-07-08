const form = document.getElementById("todoform");
const todoinput = document.getElementById("newtodo");
const todosList = document.getElementById("list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let counts = () => {
  let Count = document.getElementById("count-title");
  Count.innerHTML = todos.length;
};
counts();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveTodo();
  renderTodos();
  counts();
  localStorage.setItem("todos", JSON.stringify(todos));
});

let saveTodo = () => {
  const todoValue = todoinput.value;
  const isEmpty = todoValue === "";
  const isDuplicate = todos.some(
    (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
  );

  if (isEmpty) {
    alert("Todo`s input is empty");
  } else if (isDuplicate) {
    alert("Todo already exists!");
  } else {
    todos.push({
      value: todoValue,
      checked: false,
      text_through: false,
    });
    todoinput.value = "";
  }
};
let renderTodos = () => {
  if (todos.length === 0) {
    todosList.innerHTML =
      '<center style="color: red ;">Nothing To Do!</center>';
    return;
  }
  todosList.innerHTML = "";
  todos.forEach((todo, index) => {
    todosList.innerHTML += `
          <div class="todo" id=${index}>
            <a data-action='check' ${
              todo.text_through ? "style='text-decoration: line-through'" : ""
            }>${todo.value}</a>
            <img ${
              todo.checked ? "src=tick.png" : "src=icons8-circle-64.png"
            } data-action="check" alt="circle" class="icon-circle"/>
          </div>`;
  });
};
renderTodos();
todosList.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;
  if (parentElement.className !== "todo") return;
  const todo = parentElement;
  const todoId = Number(todo.id);
  const action = target.dataset.action;
  action === "check" && checkTodo(todoId);
});
let checkTodo = (todoId) => {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
    text_through: index === todoId ? !todo.text_through : todo.text_through,
  }));
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
};
