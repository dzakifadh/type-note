import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Note } from "../models/notes";
import { formatData } from "../utils";
import DeleteIcon from "./icons/DeleteIcon";
import DotVerticalIcon from "./icons/DotVerticalIcon";
import EditIcon from "./icons/EditIcon";

interface INoteProps {
	note: Note;
}

const NoteCard = ({ note }: INoteProps) => {
	return (
		<div className="dark:bg-dark-20 shadow px-5 py-4 rounded-lg flex flex-col">
			<h6 className="font-semibold text-xl mb-4">{note.title}</h6>
			<p className="line-clamp-3 pr-8">{note.text}</p>
			<div className="flex items-center mt-auto pt-8 justify-items-end justify-between">
				<span className="">{formatData(note.createdAt || note.updatedAt)}</span>
				<Menu as="div" className="relative inline-block text-left">
					{({ open }) => (
						<>
							<Menu.Button
								className={`border-2 border-blue-600/20 w-9 hover:bg-blue-600/30 duration-300 rounded-full h-9 inline-flex justify-center items-center${
									open ? " bg-blue-600/30" : ""
								}`}
							>
								<DotVerticalIcon color="#3471FF" />
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
								<Menu.Items className="absolute shadow right-0 mt-3 w-40 origin-top-right divide-y rounded-lg dark:bg-dark-20 focus:outline-none">
									<div className="px-1 py-1 ">
										<Menu.Item>
											{({ active }) => (
												<Link
													to="update"
													className={`${
														active ? "dark:bg-dark-30" : "dark:bg-dark-20"
													} group flex w-full items-center rounded-lg px-3 py-2 font-medium text-sm duration-300 gap-2`}
												>
													<EditIcon color="#3471FF" />
													Update
												</Link>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<button
													className={`${
														active ? "dark:bg-dark-30" : "dark:bg-dark-20"
													} group flex w-full items-center rounded-lg px-3 py-2 font-medium text-sm duration-300 gap-2`}
												>
													<DeleteIcon color="#CB1919" />
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
			</div>
		</div>
	);
};

export default NoteCard;
