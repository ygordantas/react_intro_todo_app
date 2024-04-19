import { useState } from "react";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (confirmPassword !== password) {
      setDoPasswordsMatch(false);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sign Up form submitted");
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.username_section}>
        {username && !username.trim() && (
          <p className={classes.error_msg}>
            Username cannot be empty. Please enter a valid username
          </p>
        )}
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </div>

      <div className={classes.password_section}>
        {!doPasswordsMatch && (
          <p className={classes.error_msg}>
            Passwords don't match. Please verify the values are correct
          </p>
        )}
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          type="password"
        />

        <TextInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter Password"
          required
          type="password"
        />
      </div>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
