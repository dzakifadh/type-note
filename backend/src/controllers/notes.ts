import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";

// The title and text set to nullable because possibilty to undefined
interface NoteBody {
	title?: string;
	text?: string;
}

interface NoteParams {
	id: string; // id -> should same parameter passed in router
}

export const getNotes: RequestHandler = async (req, res, next) => {
	try {
		// throw createHttpError(401, "Lalalalal");
		const notes = await NoteModel.find().sort({ _id: -1 }).exec();
		res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
};

export const getNote: RequestHandler = async (req, res, next) => {
	const { id } = req.params;

	try {
		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(404, "Invalid note id!");
		}

		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, "Note not found");
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

	try {
		if (!title) {
			throw createHttpError(400, "Note must have a title");
		}
		const newNote = await NoteModel.create({ title, text });
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

	try {
		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(404, "Invalid note id!");
		}

		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, "Note not found");
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

	try {
		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(404, "Invalid note id!");
		}

		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, "Note not found");
		}

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
