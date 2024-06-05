const mongoose = require('mongoose');

module.exports = (err, req, res, next) => {
    console.error(err.message);

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            error: 'Validation Error',
            message: err.message,
            details: err.errors
        });
    }

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            error: 'Invalid ID',
            message: 'The provided ID is not valid.'
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid token.'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Token has expired.'
        });
    }

    res.status(500).json({
        error: 'Server Error',
        message: 'An unexpected error occurred. Please try again later.'
    });
};