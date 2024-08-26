document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', todo.completed);
            li.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button onclick="toggleComplete(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="deleteTodo(${index})">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    function addTodo(text) {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    window.toggleComplete = toggleComplete;
    window.deleteTodo = deleteTodo;

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodo(todoText);
            todoInput.value = '';
        }
    });

    renderTodos();
});
