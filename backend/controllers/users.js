/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const { OK_CODE, CREATE_CODE } = require('../utils/responseCodes');

const { NODE_ENV, SECRET_KEY } = require('../config');

const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({}).orFail();
    return res.status(OK_CODE).send(allUsers);
  } catch (err) {
    return next(err);
  }
};

async function findUser(req, res, userId, next) {
  try {
    const findedUser = await User.findById(userId).orFail();
    return res.status(OK_CODE).send(findedUser);
  } catch (err) {
    return next(err);
  }
}

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  findUser(req, res, userId, next);
};

const getUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  findUser(req, res, userId, next);
};

const createUser = async (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 15);
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
      about,
      avatar,
    });
    const dataUser = createdUser.toObject();
    delete dataUser.password;
    return res.status(CREATE_CODE).send(dataUser);
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findedUser = await User.findUserByMailPassword(email, password);

    const token = JWT.sign(
      { _id: findedUser._id },
      NODE_ENV === 'production' ? SECRET_KEY : 'secretdevkey',
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, {
      maxAge: 3600 * 1000 * 24 * 7,
      httpOnly: true,
      secure: true,
      // sameSite: true,
      sameSite: 'none',
    });
    return res
      .status(OK_CODE)
      .send({ message: 'Вы успешно вошли в профиль, поздравляем!' });
  } catch (err) {
    return next(err);
  }
};

async function updateUser(id, updateUserInfo, res, next) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateUserInfo, {
      new: true,
      runValidators: true,
    }).orFail();

    return res.status(OK_CODE).send(updatedUser);
  } catch (err) {
    return next(err);
  }
}

const updateUserInfo = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, about } = req.body;

  updateUser(userId, { name, about }, res, next);
};

const updateUserAvatar = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { avatar } = req.body;

  updateUser(userId, { avatar }, res, next);
};

module.exports = {
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  login,
  updateUserInfo,
  updateUserAvatar,
};
