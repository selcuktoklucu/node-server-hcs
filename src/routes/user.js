import { Router } from 'express';
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const router = Router();
const bcryptSaltRounds = 10
const User = require('../models/user')

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

// signIn
router.post('/', (req, res, next) => {
  const pw = req.body.credentials.password
  let user

  // find a user based on the username that was passed
  User.findOne({ username: req.body.credentials.username })
    .then(record => {
      // if we didn't find a user with that username, send 401
      if (!record) {
        throw new BadCredentialsError()
      }
      // save the found user outside the promise chain
      user = record
      // `bcrypt.compare` will return true if the result of hashing `pw`
      // is exactly equal to the hashed password stored in the DB
      return bcrypt.compare(pw, user.hashedPassword)
    })
    .then(correctPassword => {
      // if the passwords matched
      if (correctPassword) {
        // the token will be a 16 byte random hex string
        const token = crypto.randomBytes(16).toString('hex')
        user.token = token
        // save the token to the DB as a property on user
        return user.save()
      } else {
        // throw an error to trigger the error handler and end the promise chain
        // this will send back 401 and a message about sending wrong parameters
        throw new BadCredentialsError()
      }
    })
    .then(user => {
      // return status 201, the username, and the new token
      res.status(201).json({ user: user.toObject() })
    })
    .catch(next)
})

// signup
router.post('/sign-up', (req, res, next) => {
  console.log("------------------")
  console.log('helloooo',req.body)
  console.log("------------------")
  // start a promise chain, so that any errors will pass to `handle`
  Promise.resolve(req.body.credentials)
    // reject any requests where `credentials.password` is not present, or where
    // the password is an empty string
    .then(credentials => {
      if (!credentials ||
          !credentials.password ||
          credentials.password !== credentials.password_confirmation) {
        throw new BadParamsError()
      }
    })
    // generate a hash from the provided password, returning a promise
    .then(() => bcrypt.hash(req.body.credentials.password, bcryptSaltRounds))
    .then(hash => {
      // return necessary params to create a user
      console.log("------------------")
      console.log(hash)
      console.log("------------------")
      return {
        username: req.body.credentials.username,
        hashedPassword: hash
      }
    })
    // create user with provided username and hashed password
    .then(user => User.create(user))
    // send the new user object back with status 201, but `hashedPassword`
    // won't be send because of the `transform` in the User model
    .then(user => res.status(201).json({ user: user.toObject() }))
    // pass any errors along to the error handler
    .catch(next)
})
export default router;
