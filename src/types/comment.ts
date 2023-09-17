export interface IBaseComment {
    articleId: number;
    content: string;
}

export interface IComment extends IBaseComment {
    id: number;
    created_at: string;
}