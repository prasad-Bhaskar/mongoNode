import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .required()
        .messages({
            'any.required': 'Name is required',
            'string.empty': 'Name is required and must be a non‑empty string',
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } }) // skip TLD checking so “localhost” works too
        .required()
        .messages({
            'any.required': 'Valid email is required',
            'string.email': 'Valid email is required',
        }),

    password: Joi.string()
        .min(6)
        .max(64)
        .required()
        .messages({
            'any.required': 'Password field is required',
            'string.min': 'Password must be between 6 and 64 characters',
            'string.max': 'Password must be between 6 and 64 characters',
        }),
});

