import { useState, useCallback } from 'react';
import axios from 'axios';
import { IArticle } from '../types/article';
import { ResponseStatus } from '../types/general';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useArticle = () => {
    // States
    const [article, setArticle] = useState<IArticle | null>(null);
    const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.Loading);

    // Get one article
    const getArticle = useCallback(async (id: string) => {
        try {
            setStatus(ResponseStatus.Loading);
            const response = await axios.get<IArticle>(
                `${BASE_URL}/articles/${id}`
            );
            setArticle(response.data);
            setStatus(ResponseStatus.Success);
        } catch (error) {
            setStatus(ResponseStatus.Error);
            console.error("Error in getting article:", error);
        }
    }, []);

    return { article, status, getArticle };
};