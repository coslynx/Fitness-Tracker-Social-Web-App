import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { API_URL } from './api';
import { UserModel } from '../models/user';
dotenv.config();

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const registerUser = async (userData) => {
  try {
    const { email, password, name } = userData;
    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({ email, password: hashedPassword, name });
    await newUser.save();
    return { message: 'User registered successfully' };
  } catch (error) {
    if (error.code === 11000) {
      return { message: 'Email already exists' };
    }
    throw new Error('Registration failed');
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (isValidPassword) {
      const payload = { id: user._id, name: user.name };
      const token = generateToken(payload);
      return { token, message: 'Login successful' };
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    throw new Error('Login failed');
  }
};

const getToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    return token;
  }
  return null;
};

export default {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  registerUser,
  loginUser,
  getToken,
};