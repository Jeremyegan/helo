require('dotenv').config();

const massive = require('massive');
const express = require('express');
const session = require('express-session');
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env


const app = express();
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('DB set!')
    console.log(db.listTables())
    app.listen(SERVER_PORT, () => {
        console.log(`Magic is happening on ${SERVER_PORT}`)
    })
})