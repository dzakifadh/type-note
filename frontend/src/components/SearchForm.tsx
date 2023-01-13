import { SearchIcon } from "./icons";

const SearchForm = () => {
	return (
		<form className="flex items-stretch gap-2">
			<input
				type="text"
				placeholder="Search Here..."
				className="form-input dark:bg-dark-30 dark:border dark:border-dark-30 px-3 py-2 rounded-lg flex-grow"
			/>
			<button
				type="submit"
				className="bg-blue-600 rounded-lg w-11 inline-flex items-center justify-center"
			>
				<SearchIcon />
			</button>
		</form>
	);
};

export default SearchForm;
