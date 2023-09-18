import { AxiosError } from "axios";

export enum ResponseStatus {
    Loading,
    Error,
    Empty,
    Success
}

export type TResponseError = AxiosError & {
    response: {
        data: {
            error: string;
        };
    };
};