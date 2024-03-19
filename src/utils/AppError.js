class AppError {
    message;
    statusCode;

    // toda a vez que instanciamos a classe AppError, devemos passar como parâmetro uma mensagem e um statusCode
    constructor (message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;