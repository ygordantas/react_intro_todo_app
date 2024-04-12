import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import classes from "./UserForm.module.css";
import todoApiService from "../../services/todoApiService";

const UserForm = () => {
  //--- Custom Hooks ---//
  const navigate = useNavigate();

  //--- States ---//
  const [username, setUsername] = useState("");
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
        placeholder="username"
        required
      />

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Next"}
      </Button>
    </form>
  );
};

export default UserForm;
