import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

function UserData() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const pageVisited = currentPage * itemsPerPage;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    getUsersDetails();
  }, []);

  const getUsersDetails = () => {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleDeleteUser = (delUser) => {
    const newUsers = users.filter((user) => user.id !== delUser);
    setUsers(newUsers);
  };

  const handleUserEdit  = (user) => {

  };

  return (
    <div className="container">
      <br />
      <input
        type="text"
        name="name"
        placeholder="Type a user name to search"
        onChange={(e) => setSearchUser(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              if (searchUser === "") return user;
              return (
                user.name.includes(searchUser) ||
                user.email.includes(searchUser) ||
                user.role.includes(searchUser)
              );
            })
            .slice(pageVisited, pageVisited + itemsPerPage)
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="btn">
                  <button onClick={handleUserEdit}>
                    <AiTwotoneEdit />
                  </button>
                  <button className="btnDel" onClick={() => handleDeleteUser(user.id)}>
                    <AiTwotoneDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <br />

      <ReactPaginate
        className="pagination"
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default UserData;
