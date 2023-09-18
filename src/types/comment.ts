export interface IBaseComment {
    articleId: string;
    content: string;
}

export interface IComment extends IBaseComment {
    _id: string;
    createdAt: string;
    username: string;
}

export const InitialComment: IBaseComment = {
    articleId: "",
    content: "",
}