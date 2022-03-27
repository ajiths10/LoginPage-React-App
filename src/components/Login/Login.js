import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValis: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.val, isValis: action.val.trim().length > 6 };
  }
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collageReducer = (state, action) => {
  if (action.type === "COLLAGE_INPUT") {
    return { value: action.val, isValis: action.val.includes("collage") };
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

  //to uderStand useEffect
  useEffect(() => {
    console.log("Effect Running...");
    return () => {
      console.log("Effect return area...");
    };
  }, []);
  //

  // useEffect(()=>{
  //   const identifier = setTimeout(() => {
  //     console.log('form validation!')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredCollage.includes('collage') && enteredPassword.trim().length > 6
  //       );
  //   }, 2000);

  //   return () => {
  //     console.log('cleanUp');
  //     clearTimeout(identifier);
  //   };

  // },[enteredEmail, enteredCollage ,enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") &&
        collageState.isValid &&
        passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        collageState.isValid &&
        event.target.value.trim().length > 6
    );
  };

  const collageChangeHandler = (event) => {
    dispatchcollage({ type: "COLLAGE_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.isValid &&
        event.target.value.includes("collage") &&
        passwordState.isValid
    );
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
    props.onLogin(emailState.value, collageState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collageState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">Collage</label>
          <input
            type="text"
            id="collage"
            value={collageState.value}
            onChange={collageChangeHandler}
            onBlur={validateCollageHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
