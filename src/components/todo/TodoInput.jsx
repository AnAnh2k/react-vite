import { useState } from "react";

const TodoInput = (props) => {
  const { addNewTodo } = props;

  //useState trả về mảng gồm 2 phần tử
  //phần tử 1: giá trị hiện tại
  //phần tử 2: hàm dùng để cập nhật giá trịs
  const [valueInput, setValueInput] = useState("xin chào");

  const handleClick = () => {
    addNewTodo(valueInput);
  };

  const handleOnchange = (value) => {
    setValueInput(value);
  };
  return (
    <div className="todo-input">
      <input
        className="input"
        type="text"
        placeholder="Enter your task"
        value={valueInput}
        onChange={(event) => {
          handleOnchange(event.target.value);
        }}
      />
      <button
        className="btn"
        onClick={() => {
          handleClick();
          setValueInput("");
        }}
      >
        Add
      </button>
      <div>My text input is = {valueInput}</div>
    </div>
  );
};

export default TodoInput;
