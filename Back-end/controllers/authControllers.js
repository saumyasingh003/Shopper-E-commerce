const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.registerUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((error, user) => {
      if (user) {
        return res.status(400).json({ message: "User already exists!" });
      }
      const { fullname, email, password, contactNumber } = req.body;

      if (!fullname) {
        return res.json({ error: "Name is required" });
      }

      const _user = new User({
        fullname,
        email,
        password, 
        role:'user',
        contactNumber,
      });

      _user.save().then((data, error) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
        if (data) {
          return res.status(201).json({
            message: "User created successfully",
          });
        }
      });
    });
};

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user, error) => {
      if (error) return res.status(400).json({ message: "Error Occured" });
      if (user) {
        if (user.authenticate(req.body.password)) {
          const { _id, email, fullname, contactNumber,role } = user;
          const token = jwt.sign({ _id: user._id, role }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });

          return res.status(201).json({
            token,
            user: {
              _id,
              email,
              fullname,
              contactNumber,
              role
            },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Password!",
          });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
};


exports.updateAddressDetails = async(req,res)=>{
  const userId = req.user._id
  if(!userId){
    res.status(404).json({mesage:"User not found!"})
  }
  const {state, country, city, address, pinCode} = req.body
  try{

    const updatedDetails = await User.findOneAndUpdate(
      {_id: userId},
      {
        $set:{
          "state":state,
          "city":city,
          "country":country,
          "address":address,
          "pinCode":pinCode
        },
      },
      {new:true}
    )
   res.status(200).json({message:"Address Updated Successfully!", user:updatedDetails})
  }catch(err){
    console.error(err)
    res.status(500).json({messgae:"Error Updating Address Details!"})
  }
}