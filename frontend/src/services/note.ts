import axios from "axios";

export const getNote = async () => {
	const res = await axios.get("http://localhost:8080/api/notes");
	return res;
};
