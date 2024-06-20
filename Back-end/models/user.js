const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

  fullname:{
  type: String,
  required: true
  } ,
  email: {
    type: String,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
},
contactNumber:{
  type:String,
  required: true,
 
},
role:{
  type: String,
  enum:['user','admin'],
  default:'user'
},
}, { timestamps: true });



userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
      const saltRounds = 12;
      this.password = await bcrypt.hash(this.password, saltRounds); 
  }
  next()
});

userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.comparePassword = async function (userPassword) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

 module.exports= mongoose.model("User", userSchema);

