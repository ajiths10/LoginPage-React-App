import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collageReducer = (state, action) => {
  if (action.type === "COLLAGE_INPUT") {
    return { value: action.val, isValid: action.val.includes("collage") };
  }
  if (action.type === "COLLAGE_BLUR") {
    return { value: state.value, isValid: state.value.includes("collage") };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollage , setEnteredCollage] = useState('');
  // const [collageValid,setCollageIsValid]= useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [collageState, dispatchcollage] = useReducer(collageReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  //to uderStand useEffect
  useEffect(() => {
    console.log("Effect Running...");
    return () => {
      console.log("Effect return area...");
    };
  }, []);
  //

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collageIsValid } = collageState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("form validation!");
      setFormIsValid(emailIsValid && collageIsValid && passwordIsValid);
    }, 1000);

    return () => {
      console.log("cleanUp");
      clearTimeout(identifier);
    };
  }, [emailIsValid, collageIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") &&
    //     collageState.isValid &&
    //     passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD_INPUT", val: event.target.value });

    // setFormIsValid(
    //   emailState.isValid &&
    //     collageState.isValid &&
    //     event.target.value.trim().length > 6
    // );
  };

  const collageChangeHandler = (event) => {
    dispatchcollage({ type: "COLLAGE_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.includes("collage") &&
    //     passwordState.isValid
    // );
  };
  const validateCollageHandler = () => {
    dispatchcollage({ type: "COLLAGE_BLUR" });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, collageState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="collage"
          label="collage"
          type="text"
          isValid={collageIsValid}
          value={collageState.value}
          onChange={collageChangeHandler}
          onBlur={validateCollageHandler}
        />
        <Input
          id="password"
          label="password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
