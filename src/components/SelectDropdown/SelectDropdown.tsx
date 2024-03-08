import SelectDropdownOption from "../../models/selectDropdownOption";
import SelectDropdownItem from "../SelectDropdownItem/SelectDropdownItem";
import classes from './SelectDropdown.module.css'

interface SelectDropdownProps {
  options: SelectDropdownOption[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  name?: string;
  placeholder?: string;
}

const SelectDropdown = ({
  options,
  placeholder,
  value,
  name,
  onChange,
}: SelectDropdownProps): JSX.Element => {
  return (
    <select className={classes.select} value={value} onChange={onChange} name={name}>
      {placeholder && <SelectDropdownItem>{placeholder}</SelectDropdownItem>}
      {options.map((option) => (
        <SelectDropdownItem key={option.value} value={option.value}>
          {option.displayValue}
        </SelectDropdownItem>
      ))}
    </select>
  );
};

export default SelectDropdown;
