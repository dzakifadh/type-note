import { SearchIcon } from "./icons";

const SearchForm = () => {
	return (
		<form className="flex items-stretch gap-2">
			<input
				type="text"
				placeholder="Search Here..."
				className="form-input flex-grow rounded-lg px-3 py-2 dark:border dark:border-dark-30 dark:bg-dark-30"
			/>
			<button
				type="submit"
				className="inline-flex w-11 items-center justify-center rounded-lg bg-blue-600 duration-300 hover:bg-blue-700"
			>
				<SearchIcon className="fill-white" />
			</button>
		</form>
	);
};

export default SearchForm;
