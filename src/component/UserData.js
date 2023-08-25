import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import { Button, FormControl, Table } from "react-bootstrap";
import UpdateModal from './CustomComp/UpdateModal';

function UserData() {
  const [userData, setuserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setopenModal] = useState(false);

  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.isAuth);

  const callUserPage = async () => {
    console.log("callUserPage")
    try {
      const url = "http://localhost:7000/user/details";
      const res = await fetch(url);

      const data = await res.json();
      console.log(data);
      setuserData([...data]);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reload = () => {
    callUserPage();
  };

  const removeUser = async (id) => {
    console.log(id);
    try {
      const res = await axios.post("http://localhost:7000/user/removeUser", {
        id,
      });
      if (!res.data.error) {
        reload();
      }
    } catch (err) {
      console.log(err, "delete error");
    }
  };

  useEffect(() => {
    dispatch(userAction(true));
    callUserPage();
  }, []);

  return (
    <div>

      <form style={{ margin: "70px" }}>
        <Table variant="light" responsive  hover size="sm">
          <thead>
            <FormControl
              type="search"
              placeholder="Search"
              onChange={(e) => {
                // search(e);
                setSearchValue(e.target.value);
              }}
              className="me-2"
              aria-label="Search"
            />
          </thead>

          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Email</th>
              <th>Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Designation </th>
              <th scope="col">Gender</th>
              <th scope="col">Course</th>
                   <th>Edit</th>
                          <th>Delete</th>
            </tr>
          </thead>
          {isLogin && (
            <>
              <tbody>
                {userData &&
                  userData
                    .filter((item, index) =>
                      item?.name?.includes(searchValue.toLowerCase())
                    )
                    .map((val) => {
                      return (
                        <tr style={{ color: "black" }} key={val._id}>
                          <td>{val._id}</td>
                          <td> {val.email} </td>
                          <td> {val.name}</td>
                          <td>{val.mobile}</td>
                          <td> {val.designation} </td>
                          <td> {val.gender}</td>
                          <td> {val.course}</td>
                     

                          <td>
                           
                              <Button
                            onClick={()=>{
                              setopenModal(true)
                              setSelectedUser(val)
                            }}
                                variant="primary"
                              >
                                Edit
                              </Button>
                            
                          </td>
                          <td>
                            
                              <Button
                                onClick={() => {
                                  removeUser(val._id);
                                }}
                                variant="danger"
                              >
                                Delete
                              </Button>
                            
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </>
          )}
        </Table>
      </form>
      <UpdateModal
        reload={reload}
        openModal={openModal}
        setopenModal={setopenModal}
        userData={selectedUser}
      />
  
    </div>
  );
}

export default UserData;
