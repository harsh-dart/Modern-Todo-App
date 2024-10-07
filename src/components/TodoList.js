import React from "react";
import Card from "./Card";

const TodoList = ({
  todos,
  deleteTodo,
  isCompletedHandler,
  todosToShow,
  window,
  setWindow,
  clearComletedTodo,
}) => {
  const tasks = todosToShow();
  return (
    <div className="todoList_container">
      {tasks.length > 0
        ? tasks.map((todo) => {
            return (
              <Card
                key={todo.id}
                id={todo.id}
                isCompleted={todo.isCompleted}
                task={todo.task}
                deleteTodo={deleteTodo}
                isCompletedHandler={isCompletedHandler}
              />
            );
          })
        : todos.length !== 0 && (
            <p className="empty">
              {window.charAt(0).toUpperCase() + window.slice(1)} todos is empty
            </p>
          )}
      {todos.length !== 0 && (
        <div className="footer">
          <span>
            {todos.filter((todo) => !todo.isCompleted).length} task left
          </span>
          <p
            style={{ color: window === "all" && "#19A7CE" }}
            onClick={() => {
              setWindow("all");
            }}
          >
            All
          </p>
          <p
            style={{ color: window === "active" && "#19A7CE" }}
            onClick={() => {
              setWindow("active");
            }}
          >
            Active
          </p>
          <p
            style={{ color: window === "completed" && "#19A7CE" }}
            onClick={() => {
              setWindow("completed");
            }}
          >
            Completed
          </p>
          <p
            onClick={() => {
              clearComletedTodo();
            }}
          >
            Clear Completed
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
