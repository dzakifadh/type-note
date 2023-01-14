import axios from "axios";
import { Note, NoteInput } from "../models/notes";

export const getNote = async () => {
	const res = await axios.get("http://localhost:8080/api/notes");
	return res;
};

export const createNote = async (note: NoteInput): Promise<Note> => {
	const res = await axios.post("http://localhost:8080/api/notes", note);
	return res.data;
};
