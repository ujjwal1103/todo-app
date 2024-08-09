const addTodobtn = document.getElementById("add-todo-btn");
const todoContainer = document.getElementById("todos");
const todoInput = document.getElementById("todo-input");

document.addEventListener("DOMContentLoaded", loadTodos);

const addTodoToLocalStorage = (todo) => {
  const todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const createBtn = () => document.createElement("button");

function startEdit(span, editInput, doneBtn, editBtn) {
  span.style.display = "none";
  editInput.style.display = "inline";
  doneBtn.style.display = "inline";
  editBtn.style.display = "none";
}

function saveEdit(li, editInput, id) {
  const newText = editInput.value.trim();
  console.log(li.children, newText);
  if (newText) {
    const todoSpan = li.children[1];
    todoSpan.innerText = newText;
    todoSpan.style.display = "inline";
    li.children[2].style.display = "none";
    li.children[3].children[1].style.display = "inline";
    li.children[3].children[2].style.display = "none";
    updateTodo(id, newText);
  } else {
    alert("Please enter todo to edit");
  }
}
const deleteTodoFromLocalstorage = (id) => {
  const todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  const newTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(newTodos));
};

const deleteTodo = (e, id) => {
  const li = document.getElementById(id);
  li.remove();
  deleteTodoFromLocalstorage(id);
};

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

const markComplete = (id) => {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  const todoIdx = todos.findIndex((todo) => todo.id === id);
  todos[todoIdx] = {
    ...todos[todoIdx],
    isComplete: todos[todoIdx].isComplete ? false : true,
  };
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodo = (id, newValue) => {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  const todoIdx = todos.findIndex((todo) => todo.id === id);
  todos[todoIdx] = {
    ...todos[todoIdx],
    todo: newValue,
  };
  localStorage.setItem("todos", JSON.stringify(todos));
};
const createTodoElemet = ({ todo, id, isComplete }) => {
  const todoElement = document.createElement("li");
  todoElement.id = id;
  const input = document.createElement("input");
  const editInput = document.createElement("input");
  editInput.value = todo;
  editInput.classList.add("edit-input");
  editInput.style.display = "none";
  editInput.type = "text";
  input.setAttribute("type", "checkbox");
  input.checked = isComplete;
  input.addEventListener("change", () => markComplete(id));

  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
  `;
  doneBtn.style.display = "none";
  doneBtn.classList.add("done-btn");
  doneBtn.addEventListener("click", () => saveEdit(todoElement, editInput, id));
  const todoSpan = document.createElement("span");
  const btnDiv = document.createElement("div");
  btnDiv.classList.add("todo-btns");
  todoSpan.innerText = todo;
  const btnDelete = createBtn();
  btnDelete.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
<path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
</svg>
  `;
  btnDelete.classList.add("btn", "del-btn");
  btnDelete.addEventListener("click", (e) => deleteTodo(e, id));
  const btnEdit = createBtn();
  btnEdit.innerHTML = `
       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 128 128">
    <path d="M 79.335938 15.667969 C 78.064453 15.622266 76.775 15.762109 75.5 16.099609 C 72.1 16.999609 69.299609 19.199219 67.599609 22.199219 L 64 28.699219 C 63.2 30.099219 63.699609 32.000781 65.099609 32.800781 L 82.400391 42.800781 C 82.900391 43.100781 83.400391 43.199219 83.900391 43.199219 C 84.200391 43.199219 84.399219 43.199609 84.699219 43.099609 C 85.499219 42.899609 86.1 42.399219 86.5 41.699219 L 90.199219 35.199219 C 91.899219 32.199219 92.4 28.700781 91.5 25.300781 C 90.6 21.900781 88.400391 19.100391 85.400391 17.400391 C 83.525391 16.337891 81.455078 15.744141 79.335938 15.667969 z M 60.097656 38.126953 C 59.128906 38.201172 58.199219 38.724609 57.699219 39.599609 L 27.5 92 C 24.1 97.8 22.200781 104.30039 21.800781 110.90039 L 21 123.80078 C 20.9 124.90078 21.5 125.99961 22.5 126.59961 C 23 126.89961 23.5 127 24 127 C 24.6 127 25.199219 126.8 25.699219 126.5 L 36.5 119.40039 C 42 115.70039 46.7 110.8 50 105 L 80.300781 52.599609 C 81.100781 51.199609 80.599219 49.3 79.199219 48.5 C 77.799219 47.7 75.899609 48.199609 75.099609 49.599609 L 44.800781 102 C 41.900781 106.9 37.899609 111.20039 33.099609 114.40039 L 27.300781 118.19922 L 27.699219 111.30078 C 27.999219 105.60078 29.699609 100 32.599609 95 L 62.900391 42.599609 C 63.700391 41.199609 63.200781 39.3 61.800781 38.5 C 61.275781 38.2 60.678906 38.082422 60.097656 38.126953 z M 49 121 C 47.3 121 46 122.3 46 124 C 46 125.7 47.3 127 49 127 L 89 127 C 90.7 127 92 125.7 92 124 C 92 122.3 90.7 121 89 121 L 49 121 z M 104 121 A 3 3 0 0 0 101 124 A 3 3 0 0 0 104 127 A 3 3 0 0 0 107 124 A 3 3 0 0 0 104 121 z"></path>
</svg>
    `;
  btnEdit.classList.add("btn", "edit-btn");
  btnEdit.addEventListener("click", () =>
    startEdit(todoSpan, editInput, doneBtn, btnEdit)
  );
  btnDiv.appendChild(btnDelete);
  btnDiv.appendChild(btnEdit);
  btnDiv.appendChild(doneBtn);
  todoElement.appendChild(input);
  todoElement.appendChild(todoSpan);
  todoElement.appendChild(editInput);
  todoElement.appendChild(btnDiv);
  todoContainer.appendChild(todoElement);
};

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  todos.forEach((todo) => createTodoElemet(todo));
}

const addTodo = () => {
  const todo = todoInput.value;
  if (!todo) {
    alert("Please Enter Todo");
    return;
  }
  const todoId = generateUUID();
  const todoObj = { todo, id: todoId, isComplete: false };
  createTodoElemet(todoObj);
  addTodoToLocalStorage(todoObj);
  todoInput.value = "";
};

addTodobtn.addEventListener("click", () => {
  addTodo();
});

function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
