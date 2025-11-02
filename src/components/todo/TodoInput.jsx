const TodoInput = (props) => {
  const { addNewTodo } = props;
  return (
    <div className="todo-input">
      <input className="input" type="text" placeholder="Enter your task" />
      <button
        className="btn"
        onClick={() => {
          addNewTodo("hẹ hẹ");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
