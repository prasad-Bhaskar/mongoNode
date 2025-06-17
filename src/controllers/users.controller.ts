import { Request, Response } from 'express';
import { User } from '../models/users.model';
import { errorResponse, successResponse } from '../utils/response';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return successResponse(res, 'Users fetched successfully', users);
  } catch (error: unknown) {
    return errorResponse(res, 'Failed to fetch users', error, 500);
  }
};
