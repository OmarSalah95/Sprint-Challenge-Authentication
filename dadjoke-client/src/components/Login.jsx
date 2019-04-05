import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  /* This is the state for the user input fields handled with a custom React Hook  */
  /* These are destructed arrays from the Custom react Hook below the Component mapped for use. Order matters*/
  const [usernameInput, updateUsernameInput, setUsernameText] = useInput();
  const [passInput, updatePassInput, setPassText] = useInput();

  /* This object is used as temporary state is a temporary storage unit to be passed to the server for creation of new user or to Authenticate
    the users Credentials against the database
*/
  const user = {
    username: usernameInput,
    password: passInput
  };
  /* This is a dual event handler For both the registration and login axios post requests to the server.
   Toggled by targeted element className <Target parameter> that is used to determine which API endpoint to hit
   and determine whether the user would be registered or checked against the database of users and hashed password as confirmation.
*/
  const loginRegister = (e, target = "") => {
    e.preventDefault();
    return axios
      .post(
        `/api/${
          e.target.className === "register-button" && target !== "login"
            ? "register"
            : "login"
        }`,
        user
      )
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          props.history.push("/jokes");
        } else {
          alert(`${res.data.message}, Now just hit login`);
        }
      })
      .catch(err => {
        alert(`Failed to login. Due to ${err}`);
        setPassText("");
        setUsernameText("");
      });
  };

  return (
    <div className="login">
      <h2>Please Enter Your Username and Password</h2>
      <form onSubmit={e => loginRegister(e)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={usernameInput}
          onChange={e => updateUsernameInput(e)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={passInput}
          onChange={e => updatePassInput(e)}
          required
        />
        <button>Log in</button>
      </form>
      <h4>No Account?</h4>
      <h4>No Problem</h4>
      <h4>Just Submit the Login Creds and We Will Make One For You</h4>
      <button className="register-button" onClick={e => loginRegister(e)}>
        Sign Me Up!
      </button>
    </div>
  );
};
/* Custom Input Hook to be used as Modular input change handling. Apply naming convention when creating variable names, for each input through destructuring returns.
    When used Be sure to Map the variables inputText <which by default is an empty string>, as well as updateInput <which is the change handler>
    these variables should be mapped to custom names, using user preferred naming convention for use in multiple locations on a single form or page.
        * The optional setInputText function is a method that can be used to set or reset the value of the input text without the changeHandler. *
                                         ***  THIS WILL RESET THE WHOLE VALUE OF THE INPUT. NOT MODIFY  ***
*/
const useInput = () => {
  const [inputText, setInputText] = useState("");

  const updateInput = e => {
    setInputText(e.target.value);
  };

  return [
    inputText,
    updateInput,
    /* This method is optional if used will be the same as setInputText taking in a argument used to set the input text to that value.
    it is not necessary to pull and map this when using the hook
*/
    setInputText
  ];
};

export default Login;
