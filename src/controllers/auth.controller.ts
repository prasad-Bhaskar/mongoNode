import { Request, Response } from 'express';
import { User } from '../models/users.model';
import bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from '../utils/response';
import { generateToken } from '../services/auth.service';
import { registerSchema } from '../validator/user.validator';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received registration request:', req.body);
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });
    if (error) {
      const messages = error.details.map(d => d.message);
      res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: messages,
      });
      return;
    }

    const { name, email, password } = value;
    const existing = await User.findOne({ email });
    if (existing) {
      errorResponse(res, 'Email already exists', {}, 409);
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    successResponse(res, 'User registered successfully', user, 201);
    return;
  } catch (err) {
    errorResponse(res, 'Registration failed', err, 500);
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      errorResponse(res, 'Invalid credentials', null, 401);
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errorResponse(res, 'Invalid credentials', null, 401);
      return;
    }
    const token = generateToken({
      user_id: user._id.toString(),
      email: user.email,
      name: user.name,
      device: req.headers['user-agent'] || 'unknown',
      server: process.env.APP_URL || 'unknown',
    });
    successResponse(res, 'Login successful', { token, user });
    return;
  } catch (err) {
    errorResponse(res, 'Login failed', err, 500);
    return;
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      errorResponse(res, 'User not found', null, 404);
      return;
    }

    // TODO: Generate reset token, save it and email it
    successResponse(res, 'Password reset link sent (mock)', null);
    return;
  } catch (err) {
    errorResponse(res, 'Failed to process forgot password', err, 500);
    return;
  }
};
