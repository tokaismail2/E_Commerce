const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // Default to 500 if not set
    err.status = err.status || 'error'; // Default status

    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorForProd(err, res);
    }
};

const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorForProd = (err, res) => {
    // Operational errors (e.g., invalid inputs, known cases)
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // Programming or unknown errors
    console.error('ERROR 💥:', err);
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
};

module.exports = globalError;
