import { useState, useEffect } from "react";
import "./App.css";
import InputNewTodo from "./components/InputNewTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [window, setWindow] = useState("all");

  const getTheme = localStorage.getItem("theme") === "true";
  const [theme, setTheme] = useState(getTheme); // false ---> Dark & true ----> Light

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

  const togleThemeHandler = () => {
    localStorage.setItem("theme", !theme);
    setTheme(!theme);
  };

  return (
    <div className={theme ? "light" : "dark"}>
      <header>
        <h2>TODO APP</h2>
        {!theme ? (
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            onClick={() => {
              togleThemeHandler();
            }}
            style={{ cursor: "pointer" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" />

            <g id="SVGRepo_tracerCarrier" />

            <g id="SVGRepo_iconCarrier">
              <g stroke="#ffffff">
                <path
                  d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05"
                  //   stroke-linecap="round"
                />
                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#fff" />
                <path d="M12 19v4M12 1v4" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#ffffff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </g>
          </svg>
        ) : (
          <svg
            fill="#000000"
            width="32px"
            height="32px"
            onClick={() => {
              togleThemeHandler();
            }}
            style={{ cursor: "pointer" }}
            viewBox="0 0 35 35"
            data-name="Layer 2"
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z" />
          </svg>
        )}
      </header>
      <InputNewTodo
        setInput={setNewTodo}
        addTodoHandler={addTodoHandler}
        input={newTodo}
      />
      {todos.length > 0 && (
        <TodoList
          todos={todos}
          deleteTodo={deleteTodoHandler}
          isCompletedHandler={isCompleteHandler}
          todosToShow={todoWindowToShow}
          window={window}
          setWindow={setWindow}
          clearComletedTodo={clearComletedTodo}
        />
      )}
    </div>
  );
}
export default App;
