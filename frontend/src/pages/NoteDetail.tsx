import HTMLReactParser from "html-react-parser";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import DeleteIcon from "../components/icons/DeleteIcon";
import EditIcon from "../components/icons/EditIcon";
import ModalDelete from "../components/ModalDelete";
import * as NoteService from "../services/note";
import { formatData } from "../utils";

type INoteparams = {
	id: string;
};

const NoteDetail = () => {
	const { id: urlId } = useParams<INoteparams>();

	const {
		data: noteData,
		error: noteError,
		isLoading: noteIsLoading,
	} = useSWR(urlId ? urlId : null, NoteService.getNote);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsOpen(true);
	};

	if (noteError)
		return (
			<div className="flex h-full items-center justify-center">
				{noteError.response.status ? (
					<span>This note was deleted 😊</span>
				) : (
					"Failed to load 🥹"
				)}
			</div>
		);

	if (noteIsLoading) {
		return (
			<div className="flex h-full items-center justify-center">Loading...</div>
		);
	}

	return (
		<>
			<div className="mb-10 flex items-center justify-between">
				<h1 className="text-4xl font-bold">Note Details</h1>
				<div className="inline-flex items-center gap-2">
					<Link
						to={`/notes/update/${urlId}`}
						className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium duration-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
					>
						<EditIcon color="#3471FF" />
						Update
					</Link>
					<button
						onClick={openModal}
						className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium duration-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
					>
						<DeleteIcon color="#CB1919" />
						Delete
					</button>
				</div>
			</div>
			<span className="text-sm italic text-white/50">
				Last update:{" "}
				{formatData(noteData?.data.updatedAt || noteData?.data.createdAt)}
			</span>
			<h2 className="mb-4 text-3xl font-semibold">{noteData?.data.title}</h2>
			<div className="prose max-w-none prose-p:text-white">
				{noteData?.data.text && HTMLReactParser(noteData?.data.text)}
			</div>
			{urlId && (
				<ModalDelete isOpen={isOpen} setIsOpen={setIsOpen} noteId={urlId} />
			)}
		</>
	);
};

export default NoteDetail;
