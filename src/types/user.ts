export enum UserRole {
    Guest = 0,
    Admin = 1,
}

export interface IUser {
    id: number;
    role: UserRole;
    username: string;
    token: string;
}

export type TUser = IUser | null

export interface IUserContext {
    user: TUser;
    setUser: (user: TUser) => void;
}

export interface IUserResponse {
    user_id: number;
    username: string;
    access_token: string;
    status: number;
}