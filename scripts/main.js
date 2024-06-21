import { 
    saveToServer,
    deleteFromServer,
    getTodosFromServer,
    updateToServer,
    getTodoByIdFromServer
} from "./server-functions.js";

let isEditing = false;
let hasInteractedWithTodo = false;
let currentTodo = null;
const randomColors = ["#ff9f9f", "#9fff9f", "#9f9fff", "#ffff9f", "#9fffff", "#ff9fff"];

const addTodoSvg = document.querySelector(".add-todo-svg");
const todoTemplate = document.querySelector("[data-todo-template]");
const todoContainer = document.querySelector("[data-todo-list]");

function renderTodos() {
    getTodosFromServer()
        .then((todos) => {
            todoContainer.innerHTML = "";
            todos.forEach((todo) => {
                renderTodo(todo);
            });
        })
        .catch(() => console.error("Server error, please try again later"));
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * randomColors.length);
    return randomColors[randomIndex];
}

addTodoSvg.addEventListener("click", addTodo);
function addTodo() {
    const newTodo = {
        id: Math.random().toString(),
        title: "New note",
        description: "Enter text...",
        color: getRandomColor(),
    };
    isEditing = true;
    renderTodoAndFocus(newTodo);
}

function renderTodoAndFocus(todo) {
    renderTodo(todo);
    const titleElement = document.querySelector(`[data-article-container="${todo.id}"] .title`);
    titleElement.contentEditable = true;
    titleElement.focus();
    document.execCommand('selectAll', false, null);
}

function renderTodo(todo) {
    const todoElementClone = todoTemplate.content.cloneNode(true);
    const todoElement = todoElementClone.querySelector("[data-article-container]");
    const titleElement = todoElementClone.querySelector('.title');
    const descriptionElement = todoElementClone.querySelector('.description');
    const deleteTodoSvg = todoElementClone.querySelector('.delete-todo-svg');
    const colorTodoSvg = todoElementClone.querySelector('.color-todo-svg');
    const colorPicker = todoElementClone.querySelector('.color-picker');

    todoElement.dataset.articleContainer = todo.id;
    titleElement.innerText = todo.title;
    descriptionElement.innerText = todo.description;
    todoElement.style.backgroundColor = todo.color;

    colorTodoSvg.addEventListener('click', (event) => {
        colorPicker.click();
    });

    colorPicker.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        todoElement.style.backgroundColor = selectedColor;
        todo.color = selectedColor;
        updateToServer(todo)
            .then(() => console.log("Todo updated"))
            .catch(error => console.error("Update failed", error));
    });

    titleElement.addEventListener('click', (event) => {
        isEditing = true;
        currentTodo = todo;
        event.stopPropagation(); 
        titleElement.contentEditable = true;
        titleElement.focus();
        document.execCommand('selectAll', false, null);
    });

    descriptionElement.addEventListener('click', (event) => {
        isEditing = true;
        currentTodo = todo;
        event.stopPropagation(); 
        descriptionElement.contentEditable = true;
        descriptionElement.focus();
        document.execCommand('selectAll', false, null);
    });

    const saveTodoHandler = () => {
        if(currentTodo && !isEditing) {
            todo = currentTodo;
            getTodoByIdFromServer(todo.id)
                .then(existingTodo => {
                    updateToServer(todo)
                        .then(() => console.log("Todo updated"))
                        .catch(error => {
                            console.error("Update failed", error);
                        });
                })
                .catch(error => {
                    saveToServer(todo)
                        .then(() => console.log("Todo saved"))
                        .catch(error => {
                            console.error("Save failed", error);
                        });
                });
        } else {
            todo.title = titleElement.innerText;
            todo.description = descriptionElement.innerText;
            currentTodo = todo;
        }
        isEditing = false;
        hasInteractedWithTodo = true;
    };
    titleElement.addEventListener('blur', saveTodoHandler);
    descriptionElement.addEventListener('blur', saveTodoHandler);

    document.addEventListener('click', (event) => {
        const isOutsideTodo = !event.target.closest('[data-article-container]');
        if (isOutsideTodo && hasInteractedWithTodo) {
            saveTodoHandler();
            hasInteractedWithTodo = false;  
        }
    });

    deleteTodoSvg.addEventListener('click', () => {
        deleteFromServer(todo.id)
            .then(() => {
                console.log("Todo deleted");
                renderTodos();
            })
            .catch(() => console.error("Delete failed"));
    });
    todoContainer.prepend(todoElementClone);
}
renderTodos();