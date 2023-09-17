import { useState, useContext, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { IArticle, IBaseArticle } from '../types/article';
import { ToastStatus } from '../types/toaster'
import { ToasterContext } from '../components/Context/ToasterContext'
import { UserContext } from '../components/Context/UserContext';
import { TError } from '../types/general';

export const useArticles = () => {
    // Context
    const { user } = useContext(UserContext)
    const { addToast } = useContext(ToasterContext);

    // States
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [totalArticles, setTotalArticles] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Fetch articles
    const getArticles = useCallback(
        async (page: number, limit: number) => {
            try {
                setLoading(true);
                const response = await axios.get(
                    import.meta.env.VITE_BASE_URL + '/articles',
                    {
                        params: { page, limit },
                    }
                );
                setArticles(response.data.items);
                setTotalArticles(response.data.total);
            } catch (error) {
                setError(true);
                console.error('Error in getting articles:', error);
                const err = error as AxiosError;
                addToast(err.message, ToastStatus.Error);
            } finally {
                setLoading(false);
            }
        }, [])

    // Create article
    const createArticle = async (newArticle: Partial<IBaseArticle>) => {
        if (!newArticle) return;

        try {
            await axios.post(
                import.meta.env.VITE_BASE_URL + '/articles',
                {
                    title: newArticle.title?.trim(),
                    description: newArticle.description?.trim(),
                    content: newArticle.content?.trim(),
                },
                {
                    headers: {
                        Authorization: user?.token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            addToast('Successfully created article', ToastStatus.Success);
        } catch (error) {
            const err = error as TError;
            addToast(err.response.data.error, ToastStatus.Error);
            console.error('Error while creating article:', error);
        }
    };

    // Delete article
    const deleteArticle = async (id: string) => {
        try {
            await axios.delete(import.meta.env.VITE_BASE_URL + '/articles/' + id, {
                headers: {
                    Authorization: user?.token,
                },
            });

            setTotalArticles(totalArticles - 1)
            addToast('Successfully deleted article', ToastStatus.Success);
        } catch (error) {
            const err = error as AxiosError;
            addToast(err.message, ToastStatus.Error);
            console.error('Error in deleting article:', error);
        }
    };

    // Edit article
    const editArticle = async (editedArticle: IBaseArticle) => {
        try {
            await axios.put(
                import.meta.env.VITE_BASE_URL + '/articles/' + editedArticle._id,
                editedArticle,
                {
                    headers: {
                        Authorization: user?.token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setArticles((prevArticles) =>
                prevArticles.map((article) =>
                    article._id === editedArticle._id
                        ? { ...article, ...editedArticle }
                        : article
                )
            );
            addToast('Successfully updated article', ToastStatus.Success);
        } catch (error) {
            const err = error as AxiosError;
            addToast(err.message, ToastStatus.Error);
            console.error('Error in updating article:', error);
        }
    };

    return { articles, totalArticles, loading, error, getArticles, createArticle, deleteArticle, editArticle };
};
