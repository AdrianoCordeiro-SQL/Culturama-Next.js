interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`min-w-[180px] h-[40px] px-6 bg-black text-white text-lg font-medium rounded-md transition-all hover:bg-yellow-400 ${className}`}
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
      {children}
    </button>
  );
};

export default Button;