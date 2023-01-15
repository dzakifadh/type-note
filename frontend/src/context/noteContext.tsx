import { AxiosError } from "axios";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { INote, NoteContextType } from "../@types/note";
import * as NoteService from "../services/note";

type ContextProviderProps = {
	children: ReactNode;
};

const NoteContext = createContext<NoteContextType | null>(null);

export const useNoteContext = () => useContext(NoteContext);

const NoteProvider = ({ children }: ContextProviderProps) => {
	const [notes, setNotes] = useState<INote[]>([]);

	const setNotesHandler = (data: INote) => {
		setNotes((prev) =>
			[...prev, data].sort((a: INote, b: INote) => {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			})
		);
	};

	const getNotes = async () => {
		try {
			const resultNotes = await NoteService.getNote();
			setNotes(resultNotes.data);
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
		}
	};

	useEffect(() => {
		getNotes();
	}, []);

	const contextValue = {
		notes,
		setNotesHandler,
	};

	return (
		<NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
	);
};

export default NoteProvider;
