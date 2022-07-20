const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const authController = {};
const jsonwebtoken = require('jsonwebtoken');

authController.signup = catchAsyncErrors(async (req, res) => {
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(req.body.password, salt);
  const newUser = await new Users({ ...req.body, password: hashPassword });

  await newUser.save();
  newUser.password = undefined;
  res.status(200).json({
    newUser,
    success: true,
    message: 'create user successfully',
  });
});

authController.signin = catchAsyncErrors(async (req, res, next) => {
  console.log(process.env.TIME_EXPIRES_TOKEN);
  const user = await Users.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Invalid username or password',
    });
  }

  const isMatchPassword = await bcrypt.compare(req.body.password, user.password);

  if (!isMatchPassword) {
    return res.status(404).json({
      success: false,
      message: 'Invalid username or password',
    });
  }

  user.password = undefined;

  const token = jsonwebtoken.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN_SECONDS,
  });

  res
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      message: 'Login successful',
      success: true,
      user,
    });
});

module.exports = authController;
