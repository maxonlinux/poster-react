export enum InitialArticle {
    _id = "",
    title = "",
    description = "",
    content = ""
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