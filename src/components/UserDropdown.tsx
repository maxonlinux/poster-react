import { useAuth } from "../Hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "./Context/UserContext";
import { UserRole } from "../types/user";

function UserDropdown() {
  // Context
  const { user } = useUser();

  // States
  const [isShowUserDropdown, setIsShowUserDropdown] = useState<boolean>(false);

  // Declare hooks
  const { logOut } = useAuth();

  // Handlers
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setIsShowUserDropdown(false);
    }
  };

  const handleToggleUserDropdown = () =>
    setIsShowUserDropdown(!isShowUserDropdown);

  if (!user) return;

  return (
    <>
      <div className="relative flex items-center gap-4">
        <span className="text-gray-500">{user.username}</span>
        <button
          className="rounded-full flex"
          onClick={handleToggleUserDropdown}
        >
          <img
            className="relative z-10 h-8 w-8 bg-gray-500 rounded-full"
            src="https://i.pravatar.cc/300"
            alt=""
          />
        </button>
        {isShowUserDropdown ? (
          <>
            <div
              className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-10"
              onClick={handleBackgroundClick}
            />
            <div className="absolute flex flex-col gap-2 mt-2 p-2 right-0 top-full bg-white rounded-lg whitespace-nowrap shadow-md">
              {user.role >= UserRole.Admin ? (
                <Link
                  className="flex gap-2 items-center px-6 h-12"
                  to={"/admin"}
                  onClick={() => setIsShowUserDropdown(false)}
                >
                  <span className="ic">edit_note</span>
                  Manage articles
                </Link>
              ) : null}
              <button
                className="flex gap-2 rounded-md items-center px-6 h-12 bg-red-50 text-red-400 w-full"
                onClick={() => {
                  logOut();
                  setIsShowUserDropdown(false);
                }}
              >
                <span className="ic">logout</span>
                Log out
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default UserDropdown;
