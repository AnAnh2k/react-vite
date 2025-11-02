const TodoData = (props) => {
  //props là object chứa tất cả các thuộc tính được truyền từ component cha
  const { name, age, data } = props;
  console.log("Props received in TodoData:", props);
  return (
    <>
      <div className="todo-data">
        <div>Learning React {name}</div>
        <div>Watching Youtube</div>
      </div>
    </>
  );
};
export default TodoData;
