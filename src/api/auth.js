import { ContactSupportOutlined } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const login = (data, setError, setFilter) => {
  setFilter(true);
  client
    .post("/login", data)
    .then((res) => {
      console.log(res);
      if (res.data == "Successfully Authenticated") {
        console.log("pass");
        navigate("/home");
      } else {
        setError(true);
        setFilter(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const register = (data, setError, setDisabled) => {
  client.post("/signup", data).then((res) => {
    console.log(res);
    if (res.data === "user Already Exists") {
      setError(true);
      setDisabled(false);
    } else if (res.data == "New user created") {
      alert("New account is successfully created!");
      navigate("/");
    }
  });
};

export const loginWithGoogle = () => {
  client
    .get("/google")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = () => {
  client
    .get("/logout")
    .then((res) => {
      console.log(res);
      if (res.data == "Successful logout") {
        console.log("logging out");
        navigate("/");
      } else {
        alert("Something is wrong!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
