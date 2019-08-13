import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { connectDb } from './models';

import routes from './routes';

const app = express();
const eraseDatabaseOnSync = true;

// Default middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// user cors
app.use(cors());

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
  text: 'Lorem ipsum something goes',
  user: user1.id,
  });
  const task2 = new models.Task({
    text: 'its a task',
    user: user2.id,
  });
  await task1.save();
  await task2.save();
  await user1.save();
  await user2.save();
};

const userCredentials = { firstname: 'Robin' };
const userDetails = { nationality: 'German' };

const user = {
  ...userCredentials,
  ...userDetails,
};

console.log(user);

console.log(process.env.SOME_ENV_VARIABLE);
