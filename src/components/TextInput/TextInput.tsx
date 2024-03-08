import classes from "./TextInput.module.css";

interface TextInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

const TextInput = ({
  placeholder,
  value,
  disabled,
  onChange,
  type = "text",
}: TextInputProps): JSX.Element => {
  return (
    <div className={classes.input_container}>
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
