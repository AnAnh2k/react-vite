import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoFooter from "./components/todo/TodoFooter";
import TodoInput from "./components/todo/TodoInput";
import logo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Learn React" },
    { id: 2, title: "Learn JavaScript" },
    { id: 3, title: "Learn HTML/CSS" },
  ]);

  const addNewTodo = (todoList) => {
    setTodoList(todoList);
  };

  //{key:value}
  return (
    <>
      <div className="todo-container">
        <div className="todo-title">
          <h1 className="title">Todo List</h1>
        </div>
        <TodoInput addNewTodo={addNewTodo} />
        <TodoData todoList={todoList} />
        <div className="todo-image">
          <img className="logo" src={logo} alt="" />
        </div>
        <TodoFooter />
      </div>
    </>
  );
};

export default App;
