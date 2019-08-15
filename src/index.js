import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { connectDb } from './models';
import routes from './routes';
const auth = require('../lib/auth')
const bodyParser = require('body-parser')


const app = express();
const eraseDatabaseOnSync = false;

// Default middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// register passport authentication middleware
app.use(auth)

app.use(async(req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('selcuk'),
  };
  next();
});

// user cors
app.use(cors());
// app.use(cors({ origin: 'http://localhost:7165' }))
// user body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Modular Routes
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/tasks', routes.task);

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Task.deleteMany({}),
    ]);
    createUsersWithMessages();
  }
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

// DB seeding
const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'selcuk',
  });
  const user2 = new models.User({
    username: 'Toklucu',
  });
  const task1 = new models.Task({
  description: 'Lorem ipsum something goes',
  owner: user1.id,
  });
  const task2 = new models.Task({
    description: 'its a task',
    owner: user2.id,
  });
  // await task1.save();
  // await task2.save();
  // await user1.save();
  // await user2.save();
};
