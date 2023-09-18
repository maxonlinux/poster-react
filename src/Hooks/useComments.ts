import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { ToastStatus } from "../types/toaster";
import { useToaster } from "../components/Context/ToasterContext";
import { useUser } from "../components/Context/UserContext";
import { IBaseComment, IComment } from "../types/comment";
import { ResponseStatus, TResponseError } from "../types/general";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useComments = () => {
    // Context
    const { addToast } = useToaster()
    const { user } = useUser()

    // States
    const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.Loading);
    const [comments, setComments] = useState<IComment[]>([]);

    // Declare hooks
    const navigate = useNavigate()
    const { logOut } = useAuth()

    // Handlers
    const handleLogout = () => {
        logOut()
        navigate('/login')
    }

    const handleError = (error: TResponseError) => {
        setStatus(ResponseStatus.Error);
        console.error('Error:', error);

        if (error.response.status === 401) {
            handleLogout()
            addToast(error.response.data.error, ToastStatus.Error);
        } else {
            addToast((error as AxiosError).message, ToastStatus.Error);
        }
    };

    // Get comments
    const getComments = useCallback(async (articleId: string) => {
        try {
            setStatus(ResponseStatus.Loading)
            const response = await axios.get<IComment[]>(
                `${BASE_URL}/comments/article/${articleId}`
            );

            if (response.data.length === 0) {
                return setStatus(ResponseStatus.Empty)
            }

            setComments(response.data);
            setStatus(ResponseStatus.Success)
        } catch (error) {
            handleError(error as TResponseError)
        }
    }, []);

    // Leave comment
    const createComment = async (comment: IBaseComment) => {
        try {
            await axios.post(
                `${BASE_URL}/comments`,
                comment,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: user?.token,
                    },
                }
            );
            addToast("Successfully commented", ToastStatus.Success);
        } catch (error) {
            handleError(error as TResponseError)
        }
    };

    // Delete comment
    const deleteComment = async (id: string) => {
        try {
            await axios.delete(`${BASE_URL}/comments/${id}`, {
                headers: {
                    Authorization: user?.token,
                    "Content-Type": "application/json",
                },
            });
            addToast("Successfully deleted comment", ToastStatus.Success);
        } catch (error) {
            handleError(error as TResponseError)
        }
    };

    return { status, comments, getComments, deleteComment, createComment };
};
