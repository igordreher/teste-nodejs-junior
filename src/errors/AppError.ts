class AppError {
    public readonly status: number;
    public readonly message: string;

    constructor(message: string, statusCode: number) {
        this.message = message;
        this.status = statusCode;
    }
}

export default AppError;