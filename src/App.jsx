import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoFooter from "./components/todo/TodoFooter";
import TodoInput from "./components/todo/TodoInput";
import logo from "./assets/react.svg";

const App = () => {
  const ducanh = "Duc Anh";
  const age = 21;
  const data = {
    address: "Hanoi",
    phone: "0123456789",
  };

  const addNewTodo = (data) => {
    alert(`data received: ${data}`);
  };
  //{key:value}
  return (
    <>
      <div className="todo-container">
        <div className="todo-title">
          <h1 className="title">Todo List</h1>
        </div>
        <TodoInput addNewTodo={addNewTodo} />
        <TodoData name={ducanh} age={age} data={data} />
        <div className="todo-image">
          <img className="logo" src={logo} alt="" />
        </div>
        <TodoFooter />
      </div>
    </>
  );
};

export default App;
