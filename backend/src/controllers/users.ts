import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";

interface ISignUpBody {
	username: string;
	email: string;
	password: string;
}

export const signUp: RequestHandler<
	unknown,
	unknown,
	ISignUpBody,
	unknown
> = async (req, res, next) => {
	const { username, email, password: passwordRaw } = req.body;

	console.log("req.body", req.body);

	try {
		if (!username || !email || !passwordRaw) {
			throw createHttpError(400, "Parameter missing");
		}

		const existingUsername = await UserModel.findOne({ username }).exec();

		if (existingUsername) {
			throw createHttpError(
				409,
				"Username already taken. Please choose a different one or log in instead."
			);
		}

		const existingEmail = await UserModel.findOne({ email }).exec();

		if (existingEmail) {
			throw createHttpError(
				409,
				"A user with this email address already exists. Please log in instead."
			);
		}

		const passwordHashed = await bcrypt.hash(passwordRaw, 10);

		const newUser = await UserModel.create({
			username,
			email,
			password: passwordHashed,
		});

		req.session.userId = newUser._id;

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

interface ISignIn {
	username?: string;
	password?: string;
}

export const signIn: RequestHandler<
	unknown,
	unknown,
	ISignIn,
	unknown
> = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		if (!username || !password) {
			throw createHttpError(400, "Parameters missing");
		}

		const user = await UserModel.findOne({ username })
			.select("+password +email")
			.exec();

		if (!user) {
			throw createHttpError(401, "Invalid credentials");
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw createHttpError(401, "Invalid credentials");
		}

		req.session.userId = user._id;
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
	try {
		const user = await UserModel.findById(req.session.userId)
			.select("+email")
			.exec();
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const signout: RequestHandler = (req, res, next) => {
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			res.sendStatus(200);
		}
	});
};
