import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
});

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ username: login });
  }

  return user;
};

// in case of user deleted, all tasks would be deleted as well.
userSchema.pre('remove', function(next) {
  this.model('Task').deleteMany({ user: this._id }, next);
});

module.exports = mongoose.model('User', userSchema)

// const User = mongoose.model('User', userSchema);
//
// export default User;
