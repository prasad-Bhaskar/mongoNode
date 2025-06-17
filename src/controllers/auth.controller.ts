import { Request, Response } from 'express';
import { User } from '../models/users.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/response';

export const register = async (req: Request, res: Response) => {
  try {
    console.log('Received registration request:', req.body);

    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return errorResponse(res, 'Email already exists', null, 409);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    return successResponse(res, 'User registered successfully', user, 201);
  } catch (err) {
    return errorResponse(res, 'Registration failed', err, 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 'Invalid credentials', null, 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return errorResponse(res, 'Invalid credentials', null, 401);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    return successResponse(res, 'Login successful', { token, user });
  } catch (err) {
    return errorResponse(res, 'Login failed', err, 500);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 'User not found', null, 404);

    // TODO: Generate reset token, save it and email it
    return successResponse(res, 'Password reset link sent (mock)', null);
  } catch (err) {
    return errorResponse(res, 'Failed to process forgot password', err, 500);
  }
};
