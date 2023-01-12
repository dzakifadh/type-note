import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
	try {
		const notes = await NoteModel.find().exec();
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
		const note = await NoteModel.findById(id);
		if (!note) {
			throw createHttpError(404, "Note not found");
		}
		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};

// The title and text set to nullable because possibilty to undefined
interface CreateNoteBody {
	title?: string;
	text?: string;
}

export const createNote: RequestHandler<
	unknown,
	unknown,
	CreateNoteBody,
	unknown
> = async (req, res, next) => {
	try {
		const { title, text } = req.body;
		if (!title) {
			throw createHttpError(400, "Note must have a title");
		}
		const newNote = await NoteModel.create({ title, text });
		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};
