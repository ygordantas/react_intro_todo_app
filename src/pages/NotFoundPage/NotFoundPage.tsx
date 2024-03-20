import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h4>Page not found.</h4>
      <Link to="/">Go back to home page</Link>
    </div>
  );
};

export default NotFoundPage;
