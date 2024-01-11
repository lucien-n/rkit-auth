import { z } from 'zod';

const email = z.string().email();
const password = z.string().min(8).max(255);
const username = z.string().min(2).max(24);

export const signInSchema = z.object({
	email,
	password
});

export type SignInSchema = typeof signInSchema;

export const signUpSchema = z.object({
	username,
	email,
	password
});

export type SignUpSchema = typeof signUpSchema;

export const postSchema = z.object({
	title: z.string().min(3).max(250),
	content: z.string().min(0).max(2500)
});

export type PostSchema = typeof postSchema;
