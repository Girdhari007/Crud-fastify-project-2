export const success = (message: string, data?: any) => ({
    status: "success",
    message,
    data,
});

export const error = (message: string, data?: any) => ({
    status: "error",
    message,
    data,
});
