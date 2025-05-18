import "./button.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "purple";
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  let buttonClass = "btn--primary";

  if (variant === "secondary") {
    buttonClass = "btn--secondary";
  } else if (variant === "outline") {
    buttonClass = "btn--outline";
  } else if (variant === "purple") {
    buttonClass = "btn--purple";
  }

  return (
    <button className={`btn ${buttonClass}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
