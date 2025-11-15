import TodoData from "./TodoData";
import TodoInput from "./TodoInput";
import logo from "../../assets/react.svg";
import { useState } from "react";
import "./todo.css";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name,
    };
    setTodoList([...todoList, newTodo]);
    console.log("New todo added:", setTodoList);
    //array .push
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  //{key:value}
  return (
    <>
      <div className="todo-container">
        <div className="todo-title">
          <h1 className="title">Todo List</h1>
        </div>
        <TodoInput addNewTodo={addNewTodo} />

        {todoList.length === 0 ? (
          <div className="todo-image">
            <img className="logo" src={logo} alt="" />
          </div>
        ) : (
          <TodoData todoList={todoList} handleDeleteTodo={handleDeleteTodo} />
        )}
      </div>
    </>
  );
};
export default TodoApp;
