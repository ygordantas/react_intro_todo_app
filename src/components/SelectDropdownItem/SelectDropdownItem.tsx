interface SelectDropdownItemProps {
  children: React.ReactNode;
  value?: string | number;
}
const SelectDropdownItem = ({
  children,
  value,
}: SelectDropdownItemProps): JSX.Element => {
  return <option value={value}>{children}</option>;
};

export default SelectDropdownItem;
