import classes from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  type: "page" | "component";
}

const LoadingSpinner = ({ type }: LoadingSpinnerProps) => {
  const spinner = <span className={classes.loader} />;

  return type === "page" ? (
    <div className={classes.backdrop}>
      <div className={classes.container}>{spinner}</div>
    </div>
  ) : (
    <div className={classes.component_container}>{spinner}</div>
  );
};

export default LoadingSpinner;
