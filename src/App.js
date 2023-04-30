import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
// import Todo from './components/Todos/Todo'
import TodoList from './components/Todos/TodoList'
import TodoForm from './components/Todos/TodoForm'
import TodosActions from './components/Todos/TodosActions'

function App() {
  const [todos, setTodos] = useState([])

  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4(),
    }
    setTodos([...todos, newTodo])
  }
  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      })
    )
  }
  const resetTodosHandler = () => {
    setTodos([])
  }

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted))
  }

  const completeTodosCount = todos.filter((todo) => todo.isCompleted).length
  console.log(completeTodosCount)

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodoHandler={addTodoHandler} />
      {!!todos.length && (
        <TodosActions
          completedTodoExist={!!completeTodosCount}
          resetTodos={resetTodosHandler}
          deleteCompletedTodos={deleteCompletedTodosHandler}
        />
      )}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodoHandler}
        toggleTodo={toggleTodoHandler}
      />

      {completeTodosCount > 0 && (
        <h2>{`You have completed ${completeTodosCount} ${
          completeTodosCount > 1 ? 'todos' : 'todo'
        }`}</h2>
      )}

      {/* <Todo /> */}
    </div>
  )
}

export default App
