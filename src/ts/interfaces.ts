export interface IUser {
    id: number;
    isAdmin: number;
    username: string;
    token: string;
}

export interface IArticle {
    id: number;
    title: string;
    content: string;
}

export interface IComment {
    id: number;
    createdAt: string;
    content: string;
}

export interface ICredentials {
    username: string;
    password: string;
}

export interface IToast {
    message: string | number;
    type: number;
}