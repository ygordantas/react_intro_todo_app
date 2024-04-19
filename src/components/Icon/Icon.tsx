interface IconProps {
  iconType: string;
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: (event: unknown) => void;
}

const Icon = ({
  className,
  style,
  id,
  iconType,
  tooltip,
  onClick,
}: IconProps) => (
  <span
    title={tooltip ?? ""}
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
