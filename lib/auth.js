// require authentication related packages
const passport = require('passport')
const bearer = require('passport-http-bearer')

// user model will be used to set `req.user` in
// authenticated routes
const User = require('../src/models/user')
// const Task = require('../src/models/task')

// this strategy will grab a bearer token from the HTTP headers and then
// run the callback with the found token as `token`
const strategy = new bearer.Strategy(
  function (token, done) {
    // look for a user whose token matches the one from the header
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err) }
      // if we found a user, pass it along to the route files
      // if we didn't, `user` will be `null`
      return done(null, user, { scope: 'all' })
    })
  }
)

// const strategyTask = new bearer.Strategy(
//   function (token, done) {
//     // look for a user whose token matches the one from the header
//     Task.findOne({ token: token }, function (err, task) {
//       if (err) { return done(err) }
//       // if we found a task, pass it along to the route files
//       // if we didn't, `task` will be `null`
//       return done(null, task, { scope: 'all' })
//     })
//   }
// )

// serialize and deserialize functions are used by passport under
// the hood to determine what `req.user` should be inside routes
passport.serializeUser((user, done) => {
  // we want access to the full Mongoose object that we got in the
  // strategy callback, so we just pass it along with no modifications
  done(null, user)
})


passport.deserializeUser((user, done) => {
  done(null, user)
})
// passport.serializeTask((task, done) => {
//   // we want access to the full Mongoose object that we got in the
//   // strategy callback, so we just pass it along with no modifications
//   done(null, task)
// })
// passport.deserializeTask((task, done) => {
//   done(null, task)
// })
// // register this strategy with passport
passport.use(strategy)
// passport.use(strategyTask)

// create a passport middleware based on all the above configuration
module.exports = passport.initialize()
