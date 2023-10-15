const env = require("./env");
const db = require("./database");
const { Router } = require("express");
const { readSqlFile, authCheck } = require("./helpers");

const controller = Router();

controller.get('/', (req, res) => {
    res.render('index');
});

controller.post('/login', (req, res) => {
    const { user, pass } = req.body;

    if (!user || !pass) {
        return res.render('index', {
            error: 'Username And Password Are Required'
        });
    }

    if (user != env.USER || pass != env.PASS) {
        return res.render('index', {
            error: 'User Unauthorized'
        });
    }

    db.all(readSqlFile('select_all_projects'), (err, projects) => {
        if (err) {
            return res.render('error', {
                error: 'There Was An Error Getting The Projects.'
            });
        }
        
        return res.render('projects', {
            projects,
            auth: env.AUTH
        });
    });
});

controller
    .route('/add-project')
    .get(authCheck, (req, res) => {
        res.render('add-project', {
            auth: env.AUTH
        });
    })
    .post(authCheck, (req, res) => {
        let {
            id,
            title,
            description,
            contact,
            location,
            date,
        } = req.body;

        date = new Date(date).getTime();
        db.run(readSqlFile('create_project'), [id, title, description, contact, location, date], (err => {
            if (err) {
                console.log(err);
                return res.render('error', {
                    error: 'There Was An Error Creating a Project'
                });
            }

            db.all(readSqlFile('select_all_projects'), (err, projects) => {
                if (err) {
                    return res.render('error', {
                        error: 'There Was An Error Getting The Projects.'
                    });
                }
                
                return res.render('projects', {
                    projects,
                    auth: env.AUTH
                });
            });
        }));
    });

controller.post('/delete-project/:id', authCheck, (req, res) => {
    db.run(readSqlFile('delete_project'), [req.params.id], (err) => {
        if (err) {
            console.log(err);
            return res.render('error', {
                error: 'There Was An Error Deleting This Project'
            });
        }

        db.all(readSqlFile('select_all_projects'), (err, projects) => {
            if (err) {
                return res.render('error', {
                    error: 'There Was An Error Getting The Projects.'
                });
            }
            
            return res.render('projects', {
                projects,
                auth: env.AUTH
            });
        });
    });
});

controller.all('*', (req, res) => {
    res.render('error', {
        error: 'Looks Like You Are Lost...'
    });
});

module.exports = controller;