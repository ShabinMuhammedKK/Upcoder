import React, { useEffect, useState } from "react";
import DashMenu from "../../components/admin/DashMenu";
import Header from "../../components/admin/Header";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  _id: string;
  name: string;
  email: string;
  phone: number;
  isActive: boolean;
  phoneNumber: number;
}

const UserManagement: React.FC = () => {
  const [isMenu, setMenu] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleMenuShow = () => {
    setMenu(!isMenu);
  };

  const toggleBlock = async (userID: string,userStatus:boolean) => {
    try {
      const changeUserStatus = await axios.post(
        "http://localhost:3000/auth/admin/useraction",
        { id: userID,status:userStatus }
      );
      if(changeUserStatus){

        getAllUsers();
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/admin/getusers"
      );
      setUsers(response.data);
    } catch (error) {
      console.log("no user data found");
    }
  };

  return (
    <div className="relative dashBoard">
      <div className="adminHeader">
        <Header title={"User Management"} />
        <DashMenu isMenu={isMenu} handleMenuShow={handleMenuShow} />
        <div className="container mx-auto p-4">
          {users.length === 0 ? (
            <h1>No user found</h1>
          ) : (
            <table className="w-full table-auto h-fit">
              <thead className="bg-purple-800 text-white">
                <tr>
                  <th className=" p-3 rounded-tl-2xl border-none">Name</th>
                  <th className=" p-3">Email</th>
                  <th className=" p-3">Phone</th>
                  <th className=" p-3 rounded-tr-2xl border-none">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 text-black"
                        : "bg-white text-black"
                    }
                  >
                    <td className="p-3 text-center ">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-3 text-center">{user.email}</td>
                    <td className="p-3 text-center">{user.phoneNumber}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleBlock(user._id,!user.isActive)}
                        className={`px-4 w-40 h-10 rounded ${
                          user.isActive === true
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {user.isActive === true ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
