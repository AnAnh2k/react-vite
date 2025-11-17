import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useState, useEffect } from "react";
import { fetchAllUserApi } from "../services/api.service";

const UserPage = () => {
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    console.log(">>> run effect 111");
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetchAllUserApi();
    setDataUser(res.data);
  };
  return (
    <>
      <UserForm loadUser={loadUser} />
      <UserTable dataUser={dataUser} />
    </>
  );
};
export default UserPage;
