// Select elements
const form = document.querySelector("form");
const titleInput = form.querySelector('input[type="text"]');
const descInput = form.querySelector("textarea");
const dateInput = form.querySelector('input[type="date"]');
const personSelect = form.querySelector("select");
const todoList = document.querySelector(".card-body");

// --- A list to store all todos ---
let todos = [];

// --- When the form is submitted ---
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the page from reloading

  // Create a new todo object
    const newTodo = {
      title: titleInput.value,
      description: descInput.value,
      dueDate: dateInput.value,
      person:
        personSelect.value === "-- Select Person (Optional) --"
          ? ""
          : personSelect.value,
      createdDate: new Date().toISOString().split("T")[0],
    };

     // Only add if the title is not empty
  if (newTodo.title.trim() === "") {
    alert("Please enter a title for your task!");
    return;
  }

  // Add the new todo to the list
  todos.push(newTodo);

  // Update what we see on the page
  showTodos();

  // Clear the form
  form.reset();
});

// Show all todos
function showTodos() {
  // Clear what is already there
  todoList.innerHTML = "";

  // Loop through the list
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    // Make a container div
    const item = document.createElement("div");
    item.className = "border rounded p-3 mb-3";

    // Create inner HTML
    item.innerHTML =
      '<div class="d-flex justify-content-between align-items-center mb-2">' +
      "<h5 class='mb-0 fw-semibold'>" + todo.title + "</h5>" +
      "<small class='text-muted'>Created: " + todo.createdDate + "</small>" +
      "</div>" +
      "<p class='text-muted mb-2'>" + todo.description + "</p>" +
      "<div class='mb-2'>" +
      "<span class='badge bg-light text-dark border me-2'>" +
      "<i class='bi bi-calendar-date me-1'></i> Due: " + todo.dueDate +
      "</span>" +
      (todo.person && todo.person !== "-- Select Person (Optional) --"
        ? "<span class='badge bg-primary'><i class='bi bi-person me-1'></i> " + todo.person + "</span>"
        : "") +
      "</div>" +
      "<div class='text-end'>" +
      "<button class='btn btn-sm btn-outline-success me-1' data-index='" + i + "'>Done</button>" +
      "<button class='btn btn-sm btn-outline-danger' data-index='" + i + "'>Delete</button>" +
      "</div>";

      // Add event listeners for buttons
    const buttons = item.querySelectorAll("button");
    buttons[0].addEventListener("click", function () {
      markDone(i);
    });
    buttons[1].addEventListener("click", function () {
      deleteTodo(i);
    });

    // Add it to the list
    todoList.appendChild(item);
  }
}

// Delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  showTodos();
}

// Mark as done
function markDone(index) {
  todos[index].title = "✅ " + todos[index].title;
  showTodos();
}