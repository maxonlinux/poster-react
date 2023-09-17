import { useState, useCallback } from 'react';
import axios from 'axios';
import { IArticle } from '../types/article';

export const useArticle = () => {
    // States
    const [article, setArticle] = useState<IArticle | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Get one article
    const getArticle = useCallback(async (id: string) => {
        try {
            const response = await axios.get<IArticle>(
                import.meta.env.VITE_BASE_URL + "/articles/" + id
            );
            setArticle(response.data);
        } catch (error) {
            setError(true);
            console.error("Error in getting article:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { article, loading, error, getArticle };
};
