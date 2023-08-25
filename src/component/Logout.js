import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userAction } from "../redux/actions/userAction";

function Logout() {
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    dispatch(userAction(false));
    localStorage.clear();
         history.push("/", { replace: true });
  });

  return (
    <div>
    
    </div>
  );
}
export default Logout;
