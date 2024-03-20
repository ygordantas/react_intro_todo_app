import UserForm from "../../components/UserForm/UserForm";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <UserForm />
    </div>
  );
};

export default HomePage;
