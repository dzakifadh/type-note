export const formatData = (value: string) => {
	const date = new Date(value);
	const day = date.toLocaleString("default", { day: "2-digit" });
	const month = date.toLocaleString("default", { month: "short" });
	const year = date.toLocaleString("default", { year: "numeric" });
	return `${month} ${day}, ${year}`;
};

export const isObjectEmpty = (obj: object) => {
	return Object.keys(obj).length === 0;
};
