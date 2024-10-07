import { useState, useEffect } from "react";
import "./App.css";
import InputNewTodo from "./components/InputNewTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [window, setWindow] = useState("all");

  useEffect(() => {
    fetchTodoList();
  }, []);

  const addTodoHandler = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      const id = Date.now().toString();
      setTodos([
        ...todos,
        {
          task: newTodo,
          id: id,
          isCompleted: false,
        },
      ]);
      const addToStorage = JSON.stringify([
        ...todos,
        {
          task: newTodo,
          id: id,
          isCompleted: false,
        },
      ]);
      localStorage.setItem("todoList", addToStorage);
      setNewTodo("");
    }
  };

  const deleteTodoHandler = (id) => {
    const filteredTodo = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todoList", JSON.stringify(filteredTodo));
    setTodos(filteredTodo);
  };

  const todoWindowToShow = () => {
    const filteredTodo =
      window === "all"
        ? todos
        : window === "active"
        ? todos.filter((todo) => !todo.isCompleted)
        : todos.filter((todo) => todo.isCompleted);
    return filteredTodo;
  };

  const isCompleteHandler = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id)
        return {
          id: id,
          task: todo.task,
          isCompleted: !todo.isCompleted ? true : false,
        };
      else {
        return todo;
      }
    });
    localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const clearComletedTodo = () => {
    const filteredTodo = todos.filter((todo) => !todo.isCompleted);
    localStorage.setItem("todoList", JSON.stringify(filteredTodo));
    setTodos(filteredTodo);
  };

  const fetchTodoList = () => {
    const todoList = localStorage.getItem("todoList");
    todoList && setTodos(JSON.parse(todoList));
  };

  return (
    <div>
      <header>
        <h2>Todo App</h2>
      </header>
      <InputNewTodo
        setInput={setNewTodo}
        addTodoHandler={addTodoHandler}
        input={newTodo}
      />
      {todos.length > 0 && (
        <TodoList
          todos={todos}
          deleteTodo={()=>{}}
          isCompletedHandler={isCompleteHandler}
          todosToShow={todoWindowToShow}
          window={window}
          setWindow={setWindow}
          clearComletedTodo={()=>{}}
        />
      )}
    </div>
  );
}
export default App;
