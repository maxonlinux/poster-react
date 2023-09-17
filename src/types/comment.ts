export enum InitialComment {
    articleId = "",
    content = "",
}

export interface IBaseComment {
    articleId: string;
    content: string;
}

export interface IComment extends IBaseComment {
    _id: string;
    createdAt: string;
    username: string;
}