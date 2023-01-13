interface IIconProps {
	color?: string;
}

const DotVerticalIcon = ({ color = "#fff" }: IIconProps) => {
	return (
		<svg
			width="4"
			height="16"
			viewBox="0 0 4 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2 11.25C2.96656 11.25 3.75 12.0344 3.75 13C3.75 13.9656 2.96656 14.75 2 14.75C1.03344 14.75 0.25 13.9656 0.25 13C0.25 12.0344 1.03344 11.25 2 11.25ZM2 6.25C2.96656 6.25 3.75 7.03438 3.75 8C3.75 8.96562 2.96656 9.75 2 9.75C1.03344 9.75 0.25 8.96562 0.25 8C0.25 7.03438 1.03344 6.25 2 6.25ZM2 4.75C1.03344 4.75 0.25 3.96563 0.25 3C0.25 2.03344 1.03344 1.25 2 1.25C2.96656 1.25 3.75 2.03344 3.75 3C3.75 3.96563 2.96656 4.75 2 4.75Z"
				fill={color}
			/>
		</svg>
	);
};

export default DotVerticalIcon;
