import { Avatar } from "@boringer-avatars/react";
import {
	faAngleDown,
	faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useSWR from "swr";
import { INote } from "../@types/note";
import LoadingPage from "../components/LoadingPage";
import NoteCard from "../components/NoteCard";
import { useAuthContext } from "../context/authContext";
import * as NoteService from "../services/note";

const Notes = () => {
	const { signOut: signOutContext } = useAuthContext();

	const {
		data: notesData,
		error: notesError,
		isLoading: notesIsLoading,
	} = useSWR("/", NoteService.getNotes);

	const signOut = () => {
		signOutContext();
	};

	if (notesError)
		return (
			<div className="flex h-screen items-center justify-center">
				{notesError.response.data.error
					? `${notesError.response.data.error} 😎`
					: "Failed to load 🥹"}
			</div>
		);
	if (notesIsLoading) return <LoadingPage />;

	return (
		<>
			<nav className="sticky top-0 flex items-center justify-between bg-dark-20 py-4 px-6 dark:shadow dark:shadow-dark">
				<div className="inline-flex items-center justify-center gap-2">
					<img
						src="/icon-official.svg"
						alt="icon-official.svg"
						className="w-7"
					/>
					<p className="text-xl font-bold">Notex</p>
				</div>
				<Menu as="div" className="relative inline-block text-left">
					<Menu.Button className="inline-flex items-center gap-1.5">
						<Avatar
							title={false}
							size={34}
							variant="beam"
							name="Mary Baker"
							square={false}
							colors={["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"]}
						/>
						<FontAwesomeIcon
							icon={faAngleDown}
							className="h-3.5 w-3.5 text-white"
						/>
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
						<Menu.Items className="absolute right-0 mt-3 w-40 origin-top-right divide-y rounded-lg border border-dark-10 shadow focus:outline-none dark:bg-dark-20">
							<div className="px-1 py-1 ">
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={signOut}
											className={`${
												active ? "dark:bg-dark-30" : "dark:bg-dark-20"
											} group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium duration-300`}
										>
											<FontAwesomeIcon
												icon={faArrowRightFromBracket}
												className="h-4 w-4 text-white"
											/>
											Sign Out
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</nav>
			<div className="container">
				<div className="mt-10 columns-2 md:columns-3 lg:columns-4">
					{notesData?.data.map((note: INote) => (
						<NoteCard key={note._id} note={note} isMasonryItem={true} />
					))}
				</div>
			</div>
		</>
	);
};

export default Notes;
