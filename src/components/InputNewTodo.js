import React from "react";

const InputNewTodo = (props) => {
  return (
    <div className="taskinput">
      <input
        type="text"
        placeholder="Create New Todo"
        onChange={(e) => {
          props.setInput(e.target.value);
        }}
        onKeyDown={props.addTodoHandler}
        value={props.input}
      />
    </div>
  );
};

export default InputNewTodo;
