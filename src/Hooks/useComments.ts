import { useCallback, useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { ToastStatus } from "../types/toaster";
import { ToasterContext } from "../components/Context/ToasterContext";
import { UserContext } from "../components/Context/UserContext";
import { IComment } from "../types/comment";

export const useComments = () => {
    // Context
    const { addToast } = useContext(ToasterContext)
    const { user } = useContext(UserContext);

    // States
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [comments, setComments] = useState<IComment[]>([]);

    // Get comments
    const getComments = useCallback(async (articleId: number | string) => {
        try {
            const response = await axios.get<IComment[]>(
                import.meta.env.VITE_BASE_URL + "/comments/article/" + articleId
            );
            setComments(response.data);
        } catch (error) {
            setError(error);
            console.error("Error in getting comments:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Leave comment
    const leaveComment = async (comment: string, articleId: number) => {
        console.log(comment)
        try {
            await axios.post(
                import.meta.env.VITE_BASE_URL + "/comments",
                {
                    article_id: articleId,
                    content: comment
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            addToast("Successfully commented", ToastStatus.Success);
        } catch (error) {
            const err = error as AxiosError;
            addToast(err.message, ToastStatus.Error);
            console.error("Error in getting comments:", error);
        }
    };

    // Delete comments
    const deleteComment = async (id: number) => {
        try {
            await axios.delete(import.meta.env.VITE_BASE_URL + "/comments/" + id, {
                headers: {
                    Authorization: "Bearer " + user?.token,
                    "Content-Type": "application/json",
                },
            });
            addToast("Successfully deleted comment", ToastStatus.Success);
        } catch (error) {
            const err = error as AxiosError;
            addToast(err.message, ToastStatus.Error);
            console.error("Error in deleting article:", error);
        }
    };

    return { comments, error, loading, getComments, deleteComment, leaveComment };
};
