const TodoData = (props) => {
  //props là object chứa tất cả các thuộc tính được truyền từ component cha
  const { todoList, handleDeleteTodo } = props;
  console.log("Props received in TodoData:", todoList);
  const handleClick = (id) => {
    handleDeleteTodo(id);
  };
  return (
    <>
      <div className="todo-data">
        {todoList.map((item) => {
          console.log("Rendering item:", item);
          return (
            <div key={item.id} className="todo-item">
              <div>{item.name}</div>
              <div className="btn-row ">
                <button className="btn-edit">Sửa</button>
                <button
                  className="btn-del"
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TodoData;
