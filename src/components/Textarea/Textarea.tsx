import { forwardRef } from "react";
import classes from "./Textarea.module.css";

interface TextareaProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder,
      value,
      onChange,
      required,
      maxLength,
      minLength,
      className,
    }: TextareaProps,
    ref
  ) => (
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
  )
);

export default Textarea;
