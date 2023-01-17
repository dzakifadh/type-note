import { Menu, Transition } from "@headlessui/react";
import HTMLReactParser from "html-react-parser";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { INote } from "../@types/note";
import { formatData } from "../utils";
import { DeleteIcon, DotVerticalIcon, EditIcon } from "./icons";
import ModalDelete from "./ModalDelete";

interface INoteProps {
	note: INote;
}

const NoteCard = ({ note }: INoteProps) => {
	const navigate = useNavigate();

	const handleGeNote = (id: string) => {
		navigate(`/notes/${id}`);
	};

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = () => {
		setIsOpen(true);
	};

	return (
		<div className="relative">
			<div
				onClick={(e) => {
					e.stopPropagation();
					handleGeNote(note._id);
				}}
				className="flex flex-col rounded-lg px-5 py-4 shadow hover:cursor-pointer dark:bg-dark-20"
			>
				<h6 className="mb-4 text-xl font-semibold">{note.title}</h6>
				<div className="pr-8 line-clamp-3">
					{note?.text && HTMLReactParser(note.text)}
				</div>
				<div className="mt-auto justify-items-end pt-8">
					<span className="inline-flex h-9 items-center text-sm">
						Last update: {formatData(note.updatedAt || note.createdAt)}
					</span>
				</div>
			</div>
			<Menu
				as="div"
				className="absolute bottom-4 right-5 z-50 inline-block text-left"
			>
				{({ open }) => (
					<>
						<Menu.Button
							className={`inline-flex h-9 w-9 justify-center rounded-full border-2 border-blue-600/20 duration-300 hover:bg-blue-600/30 items-center${
								open ? " bg-blue-600/30" : ""
							}`}
						>
							<DotVerticalIcon className="fill-blue-600" />
						</Menu.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 mt-3 w-40 origin-top-right divide-y rounded-lg shadow focus:outline-none dark:bg-dark-20">
								<div className="px-1 py-1 ">
									<Menu.Item>
										{({ active }) => (
											<Link
												to={`/notes/update/${note._id}`}
												className={`${
													active ? "dark:bg-dark-30" : "dark:bg-dark-20"
												} group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium duration-300`}
											>
												<EditIcon className="fill-blue-600" />
												Update
											</Link>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={openModal}
												className={`${
													active ? "dark:bg-dark-30" : "dark:bg-dark-20"
												} group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium duration-300`}
											>
												<DeleteIcon className="fill-red-600" />
												Delete
											</button>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
			<ModalDelete isOpen={isOpen} setIsOpen={setIsOpen} noteId={note._id} />
		</div>
	);
};

export default NoteCard;
