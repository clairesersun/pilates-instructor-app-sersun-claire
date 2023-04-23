import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
  },
  igHandle: {
    type: String,
    required: true
  },
  myprofilephoto: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 15
  }
})

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export default models.User || model('User', userSchema)