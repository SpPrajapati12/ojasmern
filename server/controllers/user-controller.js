const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "SandipIsareactDeveloper";

const signup = async (req, res, next) => {
  const { regNo, email, mobileNo, birthDate } = req.body;
  if (!regNo || !email || !mobileNo || !birthDate ) {
    return res.status(422).json({ error: "please filled all required field" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ regNo: regNo });
    console.log(existingUser)
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "user already exists! Login instead" });
  }
  const hashedRegNo = bcrypt.hashSync(regNo);
  const user = new User({
    regNo: hashedRegNo,
    birthDate,
    mobileNo,
    email,
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  const { regNo, birthDate } = req.body;

  if(!regNo && !birthDate)
  {
    return res.status(422).json({ error: "please filled all required field" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ birthDate: birthDate });
    console.log("user", existingUser);
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not Found. Please Signup" });
  }
  const isRegNoCorrect = bcrypt.compareSync(regNo, existingUser.regNo);
  console.log("regNo",isRegNoCorrect)
  if (!isRegNoCorrect) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: "40s",
  });
  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });
  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  console.log(('first'))
  const cookies = req.headers.cookie;
  console.log(cookies)
  const token = cookies.split("=")[1];
  console.log(token)

  if (!token) {
    res.status(404).json({ message: "No token Found" });
  }
  jwt.verify(String(token), JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();

  //   const headers = req.headers["authorization"];
  //   const token = headers.split(" ")[1];
  //
};
const getUser = async (req, res, next) => {
  const userId = req.id;
  console.log("userID", userId);
  let user;
  try {
    user = await User.findById(userId, "-regNo");
    console.log(user);
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }
  return res.status(200).json({ user });
};

const refreshToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log("refresh",cookies)
  const ptoken = cookies.split("=")[1];

  if (!ptoken) {
    return res.status(400).json({ message: "Coulden't find Token" });
  }
  jwt.verify(String(ptoken), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Autjentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: "30s",
    });
    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "Lax",
    });
    req.id = user.id;
    next();
  });
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
