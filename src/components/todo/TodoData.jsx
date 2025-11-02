const TodoData = (props) => {
  //props là object chứa tất cả các thuộc tính được truyền từ component cha
  const { todoList } = props;
  console.log("Props received in TodoData:", props);
  return (
    <>
      <div className="todo-data">
        <div>Learning React </div>
        <div>Watching Youtube</div>
        <div>{JSON.stringify(todoList)}</div>
      </div>
    </>
  );
};
export default TodoData;
