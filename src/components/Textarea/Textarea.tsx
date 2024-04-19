import classes from "./Textarea.module.css";

interface TextareaProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
  required?: boolean;
  ref: React.RefObject<HTMLTextAreaElement>;
  maxLength?: number;
  minLength?: number;
  className?: string;
}

const Textarea = ({
  placeholder,
  value,
  onChange,
  required,
  ref,
  maxLength,
  minLength,
  className,
}: TextareaProps) => (
  <textarea
    className={
      className ? className + " " + classes.textarea : classes.textarea
    }
    ref={ref}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    maxLength={maxLength}
    minLength={minLength}
  />
);

export default Textarea;
