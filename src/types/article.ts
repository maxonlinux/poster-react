export enum InitialArticle {
    id = NaN,
    title = "",
    description = "",
    content = ""
}

export interface IBaseArticle {
    id: number;
    title: string;
    description: string;
    content: string;
}

export interface IArticle extends IBaseArticle {
    created_at: string;
    updated_at: string;
}