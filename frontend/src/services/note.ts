import { INote, INoteInput } from "../@types/note";
import { default as axios } from "../config/axios";

export const getNotes = async () => {
	const res = await axios.get("notes");
	return res;
};
export const getNote = async (id?: string) => {
	const res = await axios.get(`notes/${id}`);
	return res;
};

export const createNote = async (note: INoteInput): Promise<INote> => {
	const res = await axios.post("notes", note);
	return res.data;
};

export const updateNote = async (data: INoteInput, id?: string) => {
	const res = await axios.put(`notes/${id}`, data);
	return res;
};

export const deleteNote = async (id?: string) => {
	const res = await axios.delete(`notes/${id}`);
	return res;
};
