import IconOptions from "../../enums/IconOptions";

interface IconProps {
  iconType: IconOptions;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: (event: unknown) => void;
}

const Icon = ({ className, style, id, iconType, onClick }: IconProps) => (
  <span
    onClick={onClick}
    id={id}
    style={style}
    className={
      className
        ? className + " material-symbols-outlined"
        : " material-symbols-outlined"
    }
  >
    {iconType}
  </span>
);

export default Icon;
