const url = "http://localhost:3001/todos";

export function saveToServer(todo) {
  return fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo),
  })
  .then((response) => response.json())
}

export function deleteFromServer(listItemId) {
  return fetch(`${url}/${listItemId}`, {
    method: 'DELETE'
  }) 
  .then((response) => response.json())
}
  
export function getTodosFromServer() {
  return fetch(`${url}`)
  .then((response) => {
    const body = response.json();
    return body;
  });
}

export function updateToServer(updatedTodo) {
  return fetch(`${url}/${updatedTodo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTodo)
  })
}

export function getTodoByIdFromServer(todoId) {
  return fetch(`${url}/${todoId}`)
  .then((response) => response.json())
}
