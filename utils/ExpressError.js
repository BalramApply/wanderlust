// <<<<<<<<<< express_error <<<<<<<<<<
class ExpressError extends Error{
    constructor(statusCode,  message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

// ========== export_express_error ==========
module.exports = ExpressError;