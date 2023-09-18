export const InitialArticle = {
    _id: "",
    title: "",
    description: "",
    content: ""
}

export interface IBaseArticle {
    _id: string;
    title: string;
    description: string;
    content: string;
}

export interface IArticle extends IBaseArticle {
    createdAt: string;
    updatedAt: string;
}

export interface IArticles {
    items: IArticle[];
    total: number;
}

export type TCreateArticle = (article: IBaseArticle) => Promise<void>
export type TEditArticle = (article: IBaseArticle) => Promise<void>;
export type TDeleteArticle = (id: string) => Promise<void>;