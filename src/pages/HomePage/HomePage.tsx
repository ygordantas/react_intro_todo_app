import Card from "../../components/Card/Card";
import UserForm from "../../components/UserForm/UserForm";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <Card
        title="Welcome to your TODO app"
        subTitle="Please enter your username below to proceed."
        footerText={`Copyright ${new Date().getFullYear()}`}
        makeFooterTextBold
      >
        <UserForm />
      </Card>
    </div>
  );
};

export default HomePage;
