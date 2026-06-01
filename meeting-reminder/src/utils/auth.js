export const isTokenExpired = (
    error
) => {
    return (
        error?.response?.status === 401
    );
};