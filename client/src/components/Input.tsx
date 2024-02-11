import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Input = ({
  label,
  id,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full relative">
      <input
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full outline-none px-4 pt-5 pb-1 rounded-md peer text-base`}
        id={id}
        placeholder=" "
        type={type === "password" ? (showPassword ? "text" : "password") : type}
      />
      <label
        htmlFor={id}
        className="
          absolute top-1/2 left-4 font-medium -translate-y-5 text-xs text-gray-400
          peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
          peer-focus:-translate-y-5 peer-focus:text-xs 
          transition-all
        "
      >
        {label}
      </label>
      {type === "password" && (
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 scale-100 peer-placeholder-shown:scale-0 transition duration-300 text-gray-400"
          onClick={togglePassword}
        >
          {showPassword ? <HiEyeOff /> : <HiEye />}
        </button>
      )}
    </div>
  );
};

export default Input;
