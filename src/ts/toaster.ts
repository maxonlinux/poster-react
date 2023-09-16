export enum ToastStatus {
    Error = -1,
    Success = 1,
}

export interface IToast {
    message: string | number;
    type: ToastStatus;
}

export interface IToasterContext {
    toasts: IToast[];
    setToasts: (toasts: IToast[]) => void;
    addToast: (message: string, type: number) => void;
}