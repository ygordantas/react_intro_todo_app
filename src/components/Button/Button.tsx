import classes from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  disabled,
  className,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${classes.button_name}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
