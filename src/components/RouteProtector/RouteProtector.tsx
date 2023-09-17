import { useNavigate } from "react-router-dom";
import { ReactNode, useContext, useEffect } from "react";
import { UserRole } from "../../types/user";
import { UserContext } from "../Context/UserContext";

interface IProps {
  onlyForRoles: UserRole[];
  children: ReactNode;
}

function RouteProtector({ onlyForRoles, children }: IProps) {
  // Context
  const { user } = useContext(UserContext);

  // Declare hooks
  const navigate = useNavigate();

  // Hooks
  useEffect(() => {
    if (!user && !onlyForRoles.includes(UserRole.Guest)) {
      return navigate("/login");
    }
    if (user && !onlyForRoles.includes(user.role)) {
      return navigate("/");
    }
  }, [navigate, user, onlyForRoles]);

  return children;
}

export default RouteProtector;
