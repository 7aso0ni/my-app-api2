const express = require('express');
const bosyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/SignIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    // Enter your own database information here based on what you created
    client : 'pg',
    connection: {
        host : '127.0.0.1',
        user : '',
        password : '',
        database : 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const app = express();
app.use(cors());
app.use(bosyParser.json());


app.get('/', (req, res)=> {
    res.send(database.users);
  })
  
  app.post('/signin', signin.handleSignIn(db, bcrypt))
  
  //This is what we call dependencies injection, we're injecting whatever dependencies this handle register function needs
  app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds, myPlaintextPassword, someOtherPlaintextPassword)});
  app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
  app.put('/image', (req, res) => {image.handleimage(req, res, db)})
  app.put('/imageurl', (req, res) => {image.handleApiCall(req, res)})
  
  app.listen(3000, ()=> {
    console.log('app is running on port 3000');
  });