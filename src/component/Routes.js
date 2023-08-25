import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Route, Switch } from "react-router-dom";
import { userAction } from "../redux/actions/userAction";
import Errorpage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Navbar from "./Navbar";
import Registration from "./Registration";
import UserData from "./UserData";
import RegistrationForm from './RegistrationForm';

function Routes() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isAuth);
  let id;
  useEffect(async () => {
     id = await localStorage.getItem("id");
    if(id) {
      dispatch(userAction(true));
    } else {
      dispatch(userAction(false));
    }
  }, []);
  return (
    <>
{ isLogin &&  <Navbar />}
      {!isLogin ? (
        <>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
              <Registration />
            </Route>
        </>
      ) : (
        <>
          <Switch>
          <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/employee-list">
              <UserData />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route path="/create-employee">
              <RegistrationForm />
            </Route>
            <Route>
              <Errorpage />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default Routes;
