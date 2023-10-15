const express = require('express');
const env = require('./utils/env');
const controller = require('./utils/controller');
const db = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', controller);

app.listen(env.PORT, env.HOST, () => {
    console.log(`App Running On http://${env.HOST}:${env.PORT}`);
});