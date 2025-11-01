const MyConponent = () => {
  const name = "Đức Anh";
  const name2 = 21;
  const name3 = true;
  const arr = [1, 2, 3, 4, 5];
  const obj = { name: "An", age: 22 };
  return (
    <>
      <div>An Đức Anh</div>
      <div>{console.log("hehehe")}</div>
      <div className="child" style={{ borderRadius: "10px", border: "solid" }}>
        {name} {JSON.stringify(arr)} {JSON.stringify(obj)} :2210A03
      </div>
    </>
  );
};

export default MyConponent;
