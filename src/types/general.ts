import { AxiosError } from "axios";

export enum ResponseState {
    Loading,
    Error,
    Empty,
    Success
}

export type TError = AxiosError & {
    response: {
        data: {
            error: string;
        };
    };
};