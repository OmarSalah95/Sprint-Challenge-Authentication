const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
    let {password } = req.body;
  
    req.body.password = bcrypt.hashSync(password, 10);
  
    db('users')
      .insert(req.body)
      .then(ids => {
        const id = ids[0];
        db('users')
          .where({ id })
          .first()
          .then(user => {
            res.status(200).json(user);
          });
      })
      .catch(error => {
        res.status(500).json(error);
      });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  // JWT config data
  db('users')
    .where({ username })
    .first()
    .then(user => {
      const payload = {
        subject: user.username,
      }
      const secret = "this is secret"
      const options = {
        expiresIn: '1d'
      }
      const token = jwt.sign(payload, secret, options)

      if (bcrypt.compareSync(password, user.password)){
        res.status(200).json({ message: `Hello ${user.username}`, token })
      } else {
        res
          .status(401)
          .json({ message: 'Username or Password do not match out records' });
      }
    })
    .catch(error => {
      res.status(500).json({error});
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
