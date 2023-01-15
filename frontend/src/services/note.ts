import axios from "axios";
import { INote, INoteInput } from "../@types/note";

export const getNote = async () => {
	const res = await axios.get("http://localhost:8080/api/notes");
	return res;
};

export const createNote = async (note: INoteInput): Promise<INote> => {
	const res = await axios.post("http://localhost:8080/api/notes", note);
	return res.data;
};
