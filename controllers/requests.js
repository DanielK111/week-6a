const path = require('path');
const fs = require('fs');

exports.getLogs = (req, res, next) => {
    console.log('Request URL: ' + req.url);
    next();
}

exports.getRandomDecision = (req, res, next) => {
    const randNum = 0.5 - Math.random();

    if (randNum > 0) {
        return next();
    }
    const err = new Error('Bad luck. Try next time');
    err.statusCode = 404;
    next(err);
}

exports.getFile = (req, res, next) => {
    const filePath = path.join(__dirname, '..', 'static', 'images', req.query.file);
    
    fs.stat(filePath, (err, data) => {
        if (err) {
            console.log(err)
            const error = new Error('An error occured in file system');
            error.statusCode = 404;
            return next(error);
        }

        if(data.isFile()) {
            res.sendFile(filePath);
        } else {
            const error = new Error('File not found');
            error.statusCode = 404;
            return next(error);
        }
    })
}