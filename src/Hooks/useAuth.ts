import { useContext } from "react";
import axios, { AxiosError } from "axios";
import { IUserResponse, TUser } from "../ts/user";
import { ICredentials } from "../ts/credentials";
import { ToastStatus } from "../ts/toaster";
import { ToasterContext } from "../components/Context/ToasterContext";
import { UserContext } from "../components/Context/UserContext";

export const useAuth = () => {
    // Context
    const { addToast } = useContext(ToasterContext)
    const {user, setUser} = useContext(UserContext);

    const logIn = async (data: ICredentials) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BASE_URL + "/users/token",
                data,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const { access_token, user_id, status, username }: IUserResponse =
                response.data;

            const userData: TUser = {
                id: user_id,
                username: username,
                token: access_token,
                role: status,
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

    const logOut = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return { user, logIn, logOut };
};
