interface IIconProps {
	className: string;
}

export const SearchIcon = ({ className }: IIconProps) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_104_687)">
				<path
					d="M15.6346 13.8657L11.894 10.1251C12.7446 8.86225 13.1643 7.28444 12.9396 5.60319C12.5565 2.7435 10.2127 0.416315 7.35021 0.0539093C3.09427 -0.484622 -0.484479 3.09413 0.054083 7.35006C0.416583 10.2138 2.74408 12.5594 5.60408 12.9407C7.28533 13.1653 8.86346 12.7458 10.126 11.8951L13.8666 15.6357C14.3547 16.1238 15.1463 16.1238 15.6344 15.6357C16.1221 15.1469 16.1221 14.3532 15.6346 13.8657ZM2.47208 6.50006C2.47208 4.29444 4.26646 2.50006 6.47208 2.50006C8.67771 2.50006 10.4721 4.29444 10.4721 6.50006C10.4721 8.70569 8.67771 10.5001 6.47208 10.5001C4.26646 10.5001 2.47208 8.70631 2.47208 6.50006Z"
					className={className}
				/>
			</g>
			<defs>
				<clipPath id="clip0_104_687">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
