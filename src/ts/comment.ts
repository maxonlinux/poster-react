export interface IBaseComment {
    content: string;
}

export interface IComment extends IBaseComment {
    id: number;
    created_at: string;
}