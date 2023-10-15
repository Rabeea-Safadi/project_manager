const { readFileSync } = require('fs');
const env = require('./env');

function readSqlFile(fileName) {
    const sql = readFileSync(__dirname + '/../sql/' + fileName + '.sql', 'utf-8');

    return sql;
}

function authCheck(req, res, next) {
    let auth = req.query.auth || req.body.auth;

    if (!auth || auth != env.AUTH) {
        return res.render('error', {
            error: 'User Unauthorized'
        });
    }

    next();
}

module.exports = {
    readSqlFile,
    authCheck
};