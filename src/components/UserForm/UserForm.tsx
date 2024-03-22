import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import classes from './UserForm.module.css'

const UserForm = () => {
  //--- Custom Hooks ---//
  const navigate = useNavigate();

  //--- States ---//
  const [username, setUsername] = useState("");

  //--- Methods ---//
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate("/todos", { state: { username } });
  };

  //--- JSX ---/
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <TextInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        required
      />

      <Button type="submit">Next</Button>
    </form>
  );
};

export default UserForm;
