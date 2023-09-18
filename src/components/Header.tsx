import { Link } from "react-router-dom";
import { useUser } from "./Context/UserContext";
import UserDropdown from "./UserDropdown";

function Header() {
  // Context
  const { user } = useUser();

  const UserButtons = () => {
    return (
      <li>
        <UserDropdown />
      </li>
    );
  };

  const AuthButtons = () => {
    return (
      <>
        <li>
          <Link className="lex items-center gap-4 font-medium" to="/register">
            <span className="max-sm:hidden">Register</span>
          </Link>
        </li>
        <li>
          <Link
            className="button-sm border border-gray-100 bg-gray-50"
            to="/login"
          >
            <span className="ic">login</span>
            <span className="max-sm:hidden">Sign In</span>
          </Link>
        </li>
      </>
    );
  };

  const Buttons = () => (user ? <UserButtons /> : <AuthButtons />);

  return (
    <>
      <header
        className="w-full bg-white border-b border-gray-100 z-50 flex justify-between items-center px-10 py-6
      max-sm:px-6"
      >
        <Link to="/">
          <span className="font-bold text-xl">BLOG APP</span>
        </Link>
        <nav>
          <ul className="flex gap-4 items-center">
            <Buttons />
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
