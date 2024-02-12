import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/emailSending.js";
import sendEmailForgotPass from "../utils/emailSendForgotPass.js";
import AppError from "../utils/errorHandler.js";

export const handleRegister = async (req, res, next) => {
  try {
    console.log("🚀 ~ Register:", req.body);

    if (!req.body.username || !req.body.password)
      throw new AppError("Username and password required!", 400);

    const SALT_ROUNDS = 10;

    // const salt = await bcrypt.genSalt(10);
    // console.log("🚀 ~ salt:", salt);

    // salt1: $2b$10$0wMsSrRhYfXOkpHXVGneNO
    // $2b = algorithm chosen
    // $10 = work factor (10 is the highest allowed by the library).

    // const hash = await bcrypt.hash(req.body.password, salt);

    // const hash = await bcrypt.hash(
    //   req.body.password,
    //   parseInt(process.env.SALT_ROUNDS)
    // );

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    console.log("🚀 ~ hash:", hash);
    // hash: $2b$10$uYv0MdKVpt9N.O5aHapECuwR7SnOVS/Rm5Y3fiwvcZfc3Y0r292m6
    req.body.password = hash;

    const user = await User.create(req.body);
    console.log("🚀 ~ user:", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    sendEmail(token, "ae04_23@alkas.gr");

    res.status(201).send({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const handleLogin = async (req, res, next) => {
  try {
    console.log("🚀 ~ Login:", req.body);

    if (!req.body.username || !req.body.password)
      throw new AppError("Username and password required!", 400);

    const user = await User.findOne({
      username: req.body.username,
    });
    console.log("🚀 ~ user:", user);

    if (!user) throw new AppError("User not found.", 403);

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("🚀 ~ isMatch:", isMatch);

    if (!user || !isMatch)
      throw new AppError("Username or password not correct", 403);

    if (!user.verified) throw new AppError("Email not verified", 401);

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("🚀 ~ token:", token);

    res.cookie("social_media", token, {
      httpOnly: true,
      secure: process.env.production,
      sameSite: process.env.production ? "None" : "Lax",
    });

    res.send({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const handleLoginNoCookie = async (req, res) => {
  try {
    console.log("🚀 ~ Login:", req.body);

    const user = await User.findOne({
      username: req.body.username,
    });
    console.log("🚀 ~ user:", user);

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("🚀 ~ isMatch:", isMatch);

    if (!user || !isMatch)
      return res.send({
        success: false,
        error: "Username or password not correct",
      });

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("🚀 ~ token:", token);

    res.send({ success: true, user, token });
  } catch (error) {
    console.log("🚀 ~ error in login:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};

export const emailconfirm = async (req, res) => {
  try {
    console.log("🚀 ~ emailconfirm:", req.params);

    const token = jwt.verify(req.params.token, process.env.JWT_SECRET);

    if (token) {
      const user = await User.findByIdAndUpdate(
        token.id,
        { verified: true },
        { new: true }
      );
      console.log("🚀 ~ user:", user);
    }

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ error in emailconfirm:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};

export const forgotPass = async (req, res) => {
  try {
    console.log("🚀 ~ forgotPass:", req.body);

    const user = await User.findOne({
      $or: [
        { email: req.body.usernameOrEmail },
        { username: req.body.usernameOrEmail },
      ],
    });
    console.log("🚀 ~ user:", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // generate a one hour validity token
    console.log("🚀 ~ token:", token);

    sendEmailForgotPass(token, "ae04_23@alkas.gr");

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ error in forgotPass:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};

export const changePass = async (req, res) => {
  try {
    console.log("🚀 ~ changePass:", req.body);

    const token = jwt.verify(req.body.token, process.env.JWT_SECRET);
    console.log("🚀 ~ token:", token);

    const SALT_ROUNDS = 10;

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    console.log("🚀 ~ hash:", hash);
    // hash: $2b$10$uYv0MdKVpt9N.O5aHapECuwR7SnOVS/Rm5Y3fiwvcZfc3Y0r292m6
    req.body.password = hash;

    const user = await User.findByIdAndUpdate(
      token.id,
      { password: req.body.password },
      { new: true }
    );
    console.log("🚀 ~ user:", user);

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ error in changePass:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};
