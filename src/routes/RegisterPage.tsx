import { ChangeEvent, useState } from "react";
import { IRegister, InitialRegister } from "../types/credentials";
import { useAuth } from "../Hooks/useAuth";
import { Link } from "react-router-dom";

function RegisterPage() {
  // States
  const [user, setRegister] = useState<IRegister>(InitialRegister);

  //Declare hooks
  const { register } = useAuth();

  // Change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-4">
      <h1 className="font-bold text-2xl mb-4">Sign Up</h1>
      <form className="flex flex-col w-full max-w-md gap-4">
        <input
          className="input"
          value={user.username}
          onChange={handleChange}
          type="text"
          name="username"
          autoComplete="username"
          placeholder="Username"
        />
        <input
          className="input"
          value={user.password}
          onChange={handleChange}
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
        />
        <input
          className="input"
          value={user.repeatPassword}
          onChange={handleChange}
          type="password"
          name="repeatPassword"
          autoComplete="new-password"
          placeholder="Pepeat Password"
        />
        <button
          className="button-lg bg-accent text-white disabled:opacity-50"
          disabled={
            !user.username ||
            !user.password ||
            user.repeatPassword !== user.password
          }
          onClick={(e) => {
            e.preventDefault();
            register(user);
          }}
        >
          Sign Up
          <span className="ic">done</span>
        </button>
        <div className="flex w-full items-center gap-4 px-4">
          <span className="h-[1px] w-full bg-gray-300"></span>
          <span className="whitespace-nowrap text-gray-500 text-sm">OR</span>
          <span className="h-[1px] w-full bg-gray-300"></span>
        </div>
        <Link
          className="button-lg bg-gray-50 border border-gray-100"
          to="/login"
        >
          Login
          <span className="ic">east</span>
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
