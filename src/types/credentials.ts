export interface ICredentials {
    username: string;
    password: string;
}

export interface IRegister extends ICredentials {
    repeatPassword: string;
}

export const InitialCredentials: ICredentials = {
    username: "",
    password: "",
}

export const InitialRegister: IRegister = {
    username: "",
    password: "",
    repeatPassword: "",
}