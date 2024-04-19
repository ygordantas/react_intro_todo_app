import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import classes from "./LoginForm.module.css";
import todoApiService from "../../services/todoApiService";
import TextInput from "../TextInput/TextInput";

const LoginForm = () => {
  //--- Custom Hooks ---//
  const navigate = useNavigate();

  //--- States ---//
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //--- Methods ---//
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await todoApiService.createNewUser(username);
      navigate("/todos", {
        state: { username: user.username, userId: user._id },
      });
    } catch (error) {
      alert(error);
    }
    setIsSubmitting(false);
  };

  //--- JSX ---/
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <TextInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <TextInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        type="password"
      />

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
