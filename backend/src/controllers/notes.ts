import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
import { assertIsDefined } from "../utils/assertIsDefined";

// The title and text set to nullable because possibilty to undefined
interface NoteBody {
	title?: string;
	text?: string;
}

interface NoteParams {
	id: string; // id -> should same parameter passed in router
}

export const getNotes: RequestHandler = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);
		const notes = await NoteModel.find({ userId: authenticatedUserId })
			.sort({ updatedAt: -1 })
			.exec();
		res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
};

export const getNote: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(404, "Invalid note id!");
		}

		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, "Note not found");
		}

		if (!note.userId.equals(authenticatedUserId)) {
			throw createHttpError(401, "You cannot access this note");
		}

		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};

export const createNote: RequestHandler<
	unknown,
	unknown,
	NoteBody,
	unknown
> = async (req, res, next) => {
	const { title, text } = req.body;
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);

		if (!title) {
			throw createHttpError(400, "Note must have a title");
		}
		const newNote = await NoteModel.create({
			title,
			text,
			userId: authenticatedUserId,
		});
		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};

export const updateNote: RequestHandler<
	NoteParams,
	unknown,
	NoteBody,
	unknown
> = async (req, res, next) => {
	const { id } = req.params;
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);

		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(404, "Invalid note id!");
		}

		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, "Note not found");
		}

		if (!note.userId.equals(authenticatedUserId)) {
			throw createHttpError(401, "You cannot access this note");
		}

		// This automatically update certain key, like patch
		const updateNote = await NoteModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		res.status(200).json(updateNote);
	} catch (error) {
		next(error);
	}
};

export const deleteNote: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const authenticatedUserId = req.session.userId;

	try {
		assertIsDefined(authenticatedUserId);
		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(404, "Invalid note id!");
		}

		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, "Note not found");
		}

		if (!note.userId.equals(authenticatedUserId)) {
			throw createHttpError(401, "You cannot access this note");
		}

		await note.remove();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
