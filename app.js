const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// // Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodo);


// //  Functions
function addTodo(e){
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    if(todoInput.value != ""){
        newTodo.innerText = todoInput.value;
        saveLocalTodo(todoInput.value);
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-button');
        todoDiv.appendChild(completedButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML   = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('delete-button');
        todoDiv.appendChild(deleteButton);
        
        todoList.appendChild(todoDiv);
        todoInput.value = '';
    }else{
        alert('Please Insert Value');
    }
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === 'delete-button'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocal(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    if(item.classList[0] === 'completed-button'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e) {
  const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
          case "all":
            todo.style.display = "flex";
            break;
            case "completed":
              if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
              break;
              case "uncompleted":
                case "uncompleted":
                  if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                  } else {
                    todo.style.display = "none";
                  }
              }
            });
          }


function saveLocalTodo(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodo(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
 
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('completed-button');
      todoDiv.appendChild(completedButton);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML   = '<i class="fas fa-trash-alt"></i>';
      deleteButton.classList.add('delete-button');
      todoDiv.appendChild(deleteButton);
      
      todoList.appendChild(todoDiv);
  });
}

function removeLocal(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // let index = todos.indexOf(todo);
  let text = todo.children[0].innerText;
  let index = todos.indexOf(text);
  console.log(index);
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}


