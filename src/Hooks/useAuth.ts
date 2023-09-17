import { useContext } from "react";
import axios, { AxiosError } from "axios";
import { IUser, TUser } from "../types/user";
import { ICredentials } from "../types/credentials";
import { ToastStatus } from "../types/toaster";
import { ToasterContext } from "../components/Context/ToasterContext";
import { UserContext } from "../components/Context/UserContext";

export const useAuth = () => {
    // Context
    const { addToast } = useContext(ToasterContext)
    const { user, setUser } = useContext(UserContext);

    // Login
    const logIn = async (data: ICredentials) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BASE_URL + "/auth/signin",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const { token, id, role, username }: IUser =
                response.data.user;

            const userData: TUser = {
                id,
                username,
                token,
                role,
            };

            setUser(userData);
            addToast("Success", ToastStatus.Success);
            localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            const err = error as AxiosError;
            addToast(err.message || "Unexpected error", ToastStatus.Error);
            console.error("Error while authorization: ", error);
        }
    };

    // Logout
    const logOut = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return { user, logIn, logOut };
};
