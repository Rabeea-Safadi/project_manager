const { Database } = require('sqlite3');
const { readSqlFile } = require('./helpers');
const { DB_PATH } = require('./env');

const db = new Database(DB_PATH, (err) => {
    if (err) {
        console.log('Error Connecting To Database.');
        return process.exit(1);
    }

    console.log('Connected To Database');
    db.run(readSqlFile('init_db'), (err) => {
        if (err) {
            console.log('Error Creating Projects Table.');
            return process.exit(1);
        }
    
        console.log('Synced Projects Table.');
    });
});

module.exports = db;