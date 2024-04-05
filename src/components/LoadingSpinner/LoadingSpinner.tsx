import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => (
  <div className={classes.backdrop}>
    <div className={classes.container}>
      <span className={classes.loader}></span>
    </div>
  </div>
);

export default LoadingSpinner;
