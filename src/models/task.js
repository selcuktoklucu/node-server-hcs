import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  // connection to the user.
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Task', taskSchema)

// const Task = mongoose.model('Task', taskSchema);
//
// export default Task;
