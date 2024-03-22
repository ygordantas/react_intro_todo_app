import classes from "./Card.module.css";

interface CardProps {
  title?: string;
  subTitle?: string;
  children?: JSX.Element;
  footerText?: string;
  makeFooterTextBold?: boolean;
}

const Card = ({
  title,
  subTitle,
  children,
  footerText,
  makeFooterTextBold,
}: CardProps): JSX.Element => (
  <div className={classes.card}>
    <div className={classes.header}>
      {title && <h3>{title}</h3>}
      {subTitle && <p>{subTitle}</p>}
    </div>
    <div className={classes.content}>{children}</div>
    <div className={classes.footer}>
      {footerText && (
        <p
          style={{ fontWeight: makeFooterTextBold ? "bold" : "inherit" }}
          className={classes.footerText}
        >
          {footerText}
        </p>
      )}
    </div>
  </div>
);

export default Card;
