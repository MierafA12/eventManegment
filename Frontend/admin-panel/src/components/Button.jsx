// src/components/Button.jsx
export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-1 border border-secondary text-secondary 
                  hover:bg-secondary hover:text-white transition rounded-sm ${className}`}
    >
      {children}
    </button>
  );
}
