import axios from "axios";
import { IUser, TUser } from "../types/user";
import { ICredentials, IRegister } from "../types/credentials";
import { ToastStatus } from "../types/toaster";
import { useToaster } from "../components/Context/ToasterContext";
import { useUser } from "../components/Context/UserContext";
import { TResponseError } from "../types/general";

// Constants
const BASE_URL = import.meta.env.VITE_BASE_URL;
const SIGNUP_URL = "/auth/signup";
const SIGNIN_URL = "/auth/signin";

export const useAuth = () => {
    // Context
    const { addToast } = useToaster()
    const { user, setUser } = useUser()

    // Handlers
    const handleSuccess = (response: any) => {
        const { token, id, role, username }: IUser = response.data.user;

        const userData: TUser = {
            id,
            username,
            token,
            role,
        };

        setUser(userData);
        addToast("Success", ToastStatus.Success);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const handleError = (error: TResponseError) => {
        const message = error.response.data.error ?? error.message;
        if (user && error.response.status === 401) {
            logOut();
        }

        addToast(message, ToastStatus.Error);
        console.error("Error while authorization: ", error);
    };

    // Register
    const register = async (data: IRegister) => {
        try {
            const response = await axios.post(`${BASE_URL}${SIGNUP_URL}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            handleSuccess(response);
        } catch (error) {
            handleError(error as TResponseError);
        }
    };

    // Login
    const logIn = async (data: ICredentials) => {
        try {
            const response = await axios.post(`${BASE_URL}${SIGNIN_URL}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            handleSuccess(response);
        } catch (error) {
            handleError(error as TResponseError);
        }
    };

    // Logout
    const logOut = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return { user, register, logIn, logOut };
};
