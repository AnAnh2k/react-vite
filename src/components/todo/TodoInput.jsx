const TodoInput = (props) => {
  const { addNewTodo } = props;

  const handleClick = (value) => {
    addNewTodo(value);
  };

  const handleOnchange = (value) => {
    console.log("Input changed:", value);
  };
  return (
    <div className="todo-input">
      <input
        className="input"
        type="text"
        placeholder="Enter your task"
        onChange={(event) => {
          handleOnchange(event.target.value);
        }}
      />
      <button
        className="btn"
        onClick={() => {
          handleClick(data);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
