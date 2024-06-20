const { comparePassword } = require("../../helpers/auth");
const Admin = require("../../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.registerAdmin = (req, res) => {
  Admin.findOne({ email: req.body.email })
    .exec()
    .then((error, admin) => {
      if (admin) {
        return res.status(400).json({ message: "Admin already exists!" });
      }
      const { fullname, email, password, contactNumber } = req.body;

      if (!fullname) {
        return res.json({ error: "Name is required" });
      }

      const _admin = new Admin({
        fullname,
        email,
        password,
        role:'admin',
        contactNumber,
      });

      _admin.save().then((data, error) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
        if (data) {
          return res.status(201).json({
            message: "Admin created successfully",
          });
        }
      });
    });
};

exports.loginAdmin = (req, res) => {
  Admin.findOne({ email: req.body.email })
    .exec()
    .then((admin, error) => {
      if (error) return res.status(400).json({ message: "Error Occured" });
      if (admin) {
        if (admin.authenticate(req.body.password)) {
          const { _id, email, fullname, contactNumber,role } = admin;
          const token = jwt.sign({ _id: admin._id, role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
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
