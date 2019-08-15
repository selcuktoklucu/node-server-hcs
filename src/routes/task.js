import uuidv4 from 'uuid/v4';
import { Router } from 'express';
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const router = Router();
const Task = require('../models/task')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
// regular get method
// router.get('/', async (req, res) => {
//   const tasks = await req.context.models.Task.find();
//   return res.send(tasks);
// });
router.get('/', requireToken, (req, res, next) => {
  console.log('assssssssssssssssss')
  Task.find({owner: req.user._id})
    .populate('owner')
    .then(tasks => {
      return tasks.map(task => task.toObject())
    })
    .then(tasks => {
      res.json({tasks})
    })
    .catch(next)
})


router.get('/:taskId', async (req, res) => {
  console.log('--show--------')
  console.log(req.params)
  console.log('----------')
  const task = await req.context.models.Task.findById(
    req.params.taskId,
  );
  return res.send(task);
});

router.post('/', requireToken, async (req, res) => {

  const task = await req.context.models.Task.create({
    description: req.body.task.description,
    dueDate: req.body.task.dueDate,
    owner: req.user._id
    // owner: req.context.me.id,
  });
  return res.send(task);
});

// UPDATE(PUT)
router.put('/:taskId', requireToken, async (req, res, next) => {
    delete req.body.task.owner
    Task.findById(req.params.taskId)
      .then(handle404)
      .then(task => {
        requireOwnership(req, task)

        return task.update(req.body.task)
      })
      .then(() => res.sendStatus(204))
      .catch(next)
  })

router.delete('/:taskId', requireToken,async (req, res) => {
  console.log('-Delete---------------')
  console.log('req', req)
  console.log('----------------')
  const task = await req.context.models.Task.findById(
    req.params.taskId,
  );

  let result = null;
  if (task) {
    result = await task.remove();
  }

  return res.send(result);
});

export default router;
