import { Request, Response, NextFunction } from 'express';
import { isObject, isString, isArray, trim } from 'lodash';
import validator from 'validator';

function sanitizeObject(obj: any): any {
  if (isString(obj)) return validator.escape(trim(obj));
  if (isArray(obj)) return obj.map(sanitizeObject);
  if (isObject(obj)) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = sanitizeObject(obj[key]);
      }
    }
  }
  return obj;
}

export const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
  sanitizeObject(req.body);
  sanitizeObject(req.query as any); // Avoid reassigning
  sanitizeObject(req.params as any); // Avoid reassigning
  next();
};
