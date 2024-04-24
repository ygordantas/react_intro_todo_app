import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";
import todoApiService from "../../services/todoApiService";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  //--- Custom Hooks ---//
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  //--- States ---//
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //--- Methods ---//
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await todoApiService.login(username, password);
      setUser(user);
      navigate("/todos");
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
