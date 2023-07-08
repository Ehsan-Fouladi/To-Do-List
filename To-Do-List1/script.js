let todo = localStorage.getItem("todo");

try {
  todo = JSON.parse(todo);
  todo = todo.length ? todo : null;
} catch (e) {
  todo = null;
}
if (!todo) {
  todo = [{ content: "To Do List", status: false }];
  localStorage.setItem("todo", JSON.stringify(todo));
}
let CreateTodo = (todo) => {
  let todolist = document.querySelector("#todo-list");
  todolist.innerHTML = "";
  todo.forEach((todos, index) => {
    let list = document.createElement("li");
    list.className = "list-group-item";
    let content = document.createElement("span");
    content.textContent = todos.content;
    content.style.textDecoration = todos.status ? "initial" : "line-through";
    let deleteBtn = document.createElement("img");
    deleteBtn.src = "delete.png";
    deleteBtn.alt = "delete icon";
    deleteBtn.className = "float-right";
    list.append(content);
    list.append(deleteBtn);
    todolist.append(list);

    deleteBtn.addEventListener("click", (e) => {
      todo.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(todo));
      CreateTodo(todo);
    });

    content.addEventListener("click", (e) => {
      todo[index].status = !todo[index].status;
      localStorage.setItem("todo", JSON.stringify(todo));
      CreateTodo(todo);
    });
  });
};
CreateTodo(todo);

let actions = document.querySelector("#actions");
let formWrapper = document.querySelector("#form-wrapper");

Array.from(actions.children).forEach((action) => {
  if (action.dataset.action == "add") {
    action.addEventListener("click", (e) => {
      formWrapper.innerHTML = `
                    <form action="" id="add">
                    <input placeholder="Add ToDoList Enter ..." class="form-control" name="add">
                    </form>`;
      let add = document.querySelector("#add");
      add.addEventListener("submit", (e) => {
        e.preventDefault();
        if (add.add.value) {
          todo.push({ content: add.add.value, status: true });
          add.innerHTML = "";
          localStorage.setItem("todo", JSON.stringify(todo));
          CreateTodo(todo);
        }
      });
    });
  }
});
