import classes from "./TextInput.module.css";

interface TextInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  maxLength?: number;
  minLength?: number;
}

const TextInput = ({
  placeholder,
  value,
  disabled,
  onChange,
  required,
  inputRef,
  type = "text",
  maxLength,
  minLength,
}: TextInputProps): JSX.Element => {
  return (
    <div className={classes.input_container}>
      <input
        maxLength={maxLength}
        minLength={minLength}
        ref={inputRef}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default TextInput;
