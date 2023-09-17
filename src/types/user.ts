export enum UserRole {
    Guest = -1,
    User = 0,
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