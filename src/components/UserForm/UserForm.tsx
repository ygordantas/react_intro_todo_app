import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "../TextInput/TextInput";
import classes from "./UserForm.module.css";
import Button from "../Button/Button";

const UserForm = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate("/todos", { state: { username } });
  };

  return (
    <div className={classes.card}>
      <h3>Welcome to your TODO app</h3>
      <p>Please enter your username below to proceed.</p>
      <form onSubmit={onSubmitHandler}>
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />

        <Button type="submit">Next</Button>
      </form>
    </div>
  );
};

export default UserForm;
