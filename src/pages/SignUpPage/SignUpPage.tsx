import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import PageContainer from "../../components/PageContainer/PageContainer";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

const SignUpPage = () => {
  const footerText = (
    <span>
      Already have an account? Click <Link to="/">here</Link> to login.
    </span>
  );

  return (
    <PageContainer>
      <Card
        title="Sign Up"
        subTitle="Create an account and start tracking your todos!"
        footer={footerText}
        makeFooterTextBold
      >
        <SignUpForm />
      </Card>
    </PageContainer>
  );
};

export default SignUpPage;
