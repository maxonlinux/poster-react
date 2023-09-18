import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { UserRole } from "../../types/user";
import { useUser } from "../Context/UserContext";

interface IProps {
  onlyForRoles: UserRole[];
  children: ReactNode;
}

function RouteProtector({ onlyForRoles, children }: IProps) {
  // Context
  const { user } = useUser();

  // Declare hooks
  const navigate = useNavigate();

  // Hooks
  useEffect(() => {
    if (!user && !onlyForRoles.includes(UserRole.Guest)) {
      navigate("/login");
    } else if (user && !onlyForRoles.includes(user.role)) {
      navigate("/");
    }
  }, [navigate, user, onlyForRoles]);

  return children;
}

export default RouteProtector;
