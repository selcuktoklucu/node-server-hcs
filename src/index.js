import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models from './models';

import routes from './routes';

const app = express();


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


// Basic routes
// app.get('/', (req, res) => {
//   return res.send('Received a GET HTTP method');
// });
// app.post('/', (req, res) => {
//   return res.send('Received a POST HTTP method');
// });
// app.put('/', (req, res) => {
//   return res.send('Received a PUT HTTP method');
// });
// app.delete('/', (req, res) => {
//   return res.send('Received a DELETE HTTP method');
// });

// ALL MOVED TO ROUTES
// app.get('/session', (req, res) => {
//   return res.send(req.context.models.users[req.context.me.id]);
// });
// // ----USERS
// app.get('/users', (req, res) => {
//   return res.send(Object.values(req.context.models.users));
// });
//
// app.get('/users/:userId', (req, res) => {
//   return res.send(req.context.models.users[req.params.userId]);
// });
// app.post('/users', (req, res) => {
//   return res.send('POST HTTP method on user resource');
// });
// app.put('/users/:userId', (req, res) => {
//   return res.send(
//     `PUT HTTP method on user/${req.params.userId} resource`,
//   );
// });
// app.delete('/users/:userId', (req, res) => {
//   return res.send(
//     `DELETE HTTP method on user/${req.params.userId} resource`,
//   );
// });
//
// // ----Tasks
// app.get('/tasks', (req, res) => {
//   return res.send(Object.values(req.context.models.tasks));
// });
//
// app.get('/tasks/:taskId', (req, res) => {
//   return res.send(req.context.models.tasks[req.params.taskId]);
// });
// app.post('/tasks', (req, res) => {
//   const id = uuidv4();
//   const task = {
//     id,
//     text: req.body.text,
//     userId: req.context.me.id,
//   };
//   req.context.models.tasks[id] = task;
//
//   return res.send(task);
// });
// app.delete('/tasks/:taskId', (req, res) => {
//   const {
//     [req.params.taskId]: task,
//     ...otherTasks
//   } = req.context.models.tasks;
//
//   req.context.models.tasks = otherTasks;
//
//   return res.send(task);
// });

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port${process.env.PORT}!`),
);

const userCredentials = { firstname: 'Robin' };
const userDetails = { nationality: 'German' };

const user = {
  ...userCredentials,
  ...userDetails,
};

console.log(user);

console.log(process.env.SOME_ENV_VARIABLE);
