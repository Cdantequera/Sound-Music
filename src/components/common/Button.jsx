const Button = ({
  children,
  onClick,
  variant = "default",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default:
      "group relative px-2 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-2xl text-white",

    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 hover:bg-gray-100/10 py-3",

    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
