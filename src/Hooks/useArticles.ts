import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { IArticles, IBaseArticle } from '../types/article';
import { ToastStatus } from '../types/toaster'
import { useToaster } from '../components/Context/ToasterContext'
import { useUser } from '../components/Context/UserContext';
import { ResponseStatus, TResponseError } from '../types/general';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useArticles = (page: number, limit: number) => {
    // Context
    const { user } = useUser()
    const { addToast } = useToaster()

    // Initial Articles
    const InitialArticles = {
        items: [],
        total: 0
    }
    // States
    const [articles, setArticles] = useState<IArticles>(InitialArticles);
    const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.Loading);

    // Declare hooks
    const navigate = useNavigate()
    const { logOut } = useAuth()

    // Handlers
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

    const handleLogout = useCallback(() => {
        logOut()
        navigate('/login')
    }, [logOut, navigate])

    // Fetch articles
    const getArticles = useCallback(async () => {
        try {
            setStatus(ResponseStatus.Loading);
            const response = await axios.get(
                import.meta.env.VITE_BASE_URL + '/articles',
                {
                    params: { page, limit },
                }
            );

            if (response.data.items.length === 0) {
                return setStatus(ResponseStatus.Empty)
            }

            const { items, total } = response.data

            setArticles({ items, total });
            setStatus(ResponseStatus.Success)
        } catch (error) {
            handleError(error as TResponseError)
        }
    }, [page, limit])

    // Create article
    const createArticle = async (newArticle: IBaseArticle) => {
        if (!newArticle) return;

        try {
            await axios.post(
                import.meta.env.VITE_BASE_URL + '/articles',
                {
                    title: newArticle.title.trim(),
                    description: newArticle.description.trim(),
                    content: newArticle.content.trim(),
                },
                {
                    headers: {
                        Authorization: user?.token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            getArticles()
            addToast('Successfully created article', ToastStatus.Success);
        } catch (error) {
            handleError(error as TResponseError)
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

            getArticles()
            addToast('Successfully deleted article', ToastStatus.Success);
        } catch (error) {
            handleError(error as TResponseError)
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

            const items = articles.items.map((article) =>
                article._id === editedArticle._id ? { ...article, ...editedArticle } : article
            );

            setArticles({ ...articles, items });
            addToast('Successfully updated article', ToastStatus.Success);
        } catch (error) {
            handleError(error as TResponseError)
        }
    };

    return { status, articles, getArticles, createArticle, deleteArticle, editArticle };
};
