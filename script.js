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