interface IIconProps {
	color?: string;
}

const DeleteIcon = ({ color = "#fff" }: IIconProps) => {
	return (
		<svg
			width="13"
			height="13"
			viewBox="0 0 13 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_205_7)">
				<path
					d="M12.1875 10.5625C12.6369 10.5625 13 10.9256 13 11.375C13 11.8244 12.6369 12.1875 12.1875 12.1875H3.82379C3.39469 12.1875 2.98082 12.0174 2.67613 11.7127L0.644123 9.68144C0.0095761 9.04668 0.0095761 8.01582 0.644123 7.38105L6.56852 1.45666C7.20328 0.822146 8.23414 0.822146 8.86891 1.45666L12.355 4.94355C12.9898 5.57832 12.9898 6.60918 12.355 7.24394L9.03648 10.5625H12.1875ZM6.73863 10.5625L8.44742 8.85371L4.95875 5.36504L1.7933 8.53125L3.82379 10.5625H6.73863Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_205_7">
					<rect width="13" height="13" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default DeleteIcon;
