import classes from "./PageContainer.module.css";

interface PageContainerProps {
  children: JSX.Element | JSX.Element[];
}
const PageContainer = ({ children }: PageContainerProps) => (
  <div className={classes.container}>{children}</div>
);

export default PageContainer;
