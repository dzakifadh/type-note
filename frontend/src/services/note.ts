import axios from "axios";
import { INote, INoteInput } from "../@types/note";

export const getNotes = async () => {
	const res = await axios.get("http://localhost:8080/api/notes");
	return res;
};
export const getNote = async (id?: string) => {
	const res = await axios.get(`http://localhost:8080/api/notes/${id}`);
	return res;
};

export const createNote = async (note: INoteInput): Promise<INote> => {
	const res = await axios.post("http://localhost:8080/api/notes", note);
	return res.data;
};

export const updateNote = async (data: INoteInput, id?: string) => {
	const res = await axios.put(`http://localhost:8080/api/notes/${id}`, data);
	return res;
};

export const deleteNote = async (id?: string) => {
	const res = await axios.delete(`http://localhost:8080/api/notes/${id}`);
	return res;
};
