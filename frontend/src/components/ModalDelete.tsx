import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { mutate } from "swr";
import * as NoteService from "../services/note";
import TriangleExclamationIcon from "./icons/TriangleExclamationIcon";

interface IModalProps {
	isOpen: boolean;
	setIsOpen: any;
	noteId: string;
}

type INoteparams = {
	id: string;
};

const ModalDelete = ({ isOpen, setIsOpen, noteId }: IModalProps) => {
	const { id: urlId } = useParams<INoteparams>();

	const closeModal = () => {
		setIsOpen(false);
	};

	const deleteNote = async (id: string) => {
		try {
			await NoteService.deleteNote(id);
			mutate("/");
			mutate(urlId);
			closeModal();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-40" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-center align-middle shadow-2xl transition-all dark:bg-dark-30">
								<TriangleExclamationIcon className="mx-auto block h-14 w-14 fill-amber-400" />
								<Dialog.Title
									as="h3"
									className="mt-4 text-lg font-medium leading-6 text-gray-900 dark:text-white"
								>
									Do you really want to delete this note?
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-sm text-white/60">
										This process will be delete selected note permanently
									</p>
								</div>

								<div className="mt-6 flex justify-end gap-2">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white/50 dark:hover:text-white"
										onClick={closeModal}
									>
										Cancel
									</button>
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium duration-300 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-600 dark:text-white"
										onClick={() => deleteNote(noteId)}
									>
										Yes, Sure!
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ModalDelete;
