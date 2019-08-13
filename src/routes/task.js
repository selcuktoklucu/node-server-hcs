import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.tasks));
});

router.get('/:taskId', (req, res) => {
  return res.send(req.context.models.tasks[req.params.taskId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const task = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.tasks[id] = task;

  return res.send(task);
});

router.delete('/:taskId', (req, res) => {
  const {
    [req.params.taskId]: task,
    ...otherTasks
  } = req.context.models.tasks;

  req.context.models.tasks = otherTasks;

  return res.send(task);
});

export default router;
