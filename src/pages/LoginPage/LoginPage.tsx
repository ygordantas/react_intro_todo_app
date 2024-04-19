import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageContainer from "../../components/PageContainer/PageContainer";

const LoginPage = () => {
  const footerText = (
    <span>
      Don't have an account? Click <Link to="/signup">here</Link> to sign up.
    </span>
  );
  return (
    <PageContainer>
      <Card
        title="Login"
        subTitle="Please enter your username below to proceed."
        footer={footerText}
        makeFooterTextBold
      >
        <LoginForm />
      </Card>
    </PageContainer>
  );
};

export default LoginPage;
