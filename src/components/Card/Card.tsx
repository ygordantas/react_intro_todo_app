import classes from "./Card.module.css";

interface CardProps {
  title?: string;
  subTitle?: string;
  children?: JSX.Element;
  footer?: string | JSX.Element;
  makeFooterTextBold?: boolean;
}

const Card = ({
  title,
  subTitle,
  children,
  footer,
  makeFooterTextBold,
}: CardProps): JSX.Element => (
  <div className={classes.card}>
    <div className={classes.header}>
      {title && <h3>{title}</h3>}
      {subTitle && <p>{subTitle}</p>}
    </div>
    <div className={classes.content}>{children}</div>
    <div className={classes.footer}>
      {footer && (
        <p
          style={{ fontWeight: makeFooterTextBold ? "bold" : "inherit" }}
          className={classes.footerText}
        >
          {footer}
        </p>
      )}
    </div>
  </div>
);

export default Card;
