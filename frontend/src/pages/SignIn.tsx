import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ISignIn } from "../@types/auth";
import { useAuthContext } from "../context/authContext";

const SignIn = () => {
	const navigate = useNavigate();
	const { signIn: signInContext } = useAuthContext();
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ISignIn>();

	const handleOnSubmit = async (input: ISignIn) => {
		try {
			signInContext(input);
			navigate(`/notes`);
			reset({ username: "", password: "" });
		} catch (error) {
			const err = error as AxiosError;

			if (axios.isAxiosError(err)) {
				const errorMessage = err.response?.data;
				setError("credentialError", {
					type: "custom",
					message: errorMessage.error,
				});
			}
		}
	};
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="relative">
				<div className="absolute inset-x-0 -top-20 mb-8 flex items-center justify-center gap-3">
					<img src="/icon-official.svg" alt="icon-official.svg" />
					<p className="text-2xl font-bold">Notex</p>
				</div>
				<h1 className="mb-4 text-center text-2xl font-semibold text-white">
					Sign In
				</h1>
				<p className="text-center text-white/60">
					Welcome back! Enter your username and
					<br /> password below to sign in.
				</p>
				{errors.credentialError && (
					<span className="mt-4 flex items-center gap-2 rounded-lg bg-red-500 py-2.5 px-4 text-sm font-medium tracking-wide">
						<FontAwesomeIcon
							icon={faTriangleExclamation}
							className="h-4 w-4 text-white"
						/>
						{errors.credentialError.message}
					</span>
				)}
				<form
					onSubmit={handleSubmit(handleOnSubmit)}
					className={`w-96 max-w-full ${
						errors.credentialError ? "mt-4" : "mt-8"
					}`}
				>
					<div className="mb-6">
						<label
							htmlFor="title"
							className="mb-2 inline-block font-medium tracking-wide"
						>
							Username
						</label>
						<input
							type="text"
							className="form-input block w-full rounded-lg px-3 py-2 dark:border dark:border-dark-30 dark:bg-dark-30"
							placeholder="Enter your username"
							{...register("username", {
								required: "Please enter your username",
							})}
						/>
						{errors.username && (
							<span className="mt-4 flex items-center gap-2 rounded-lg bg-red-500 py-2.5 px-4 text-sm font-medium tracking-wide">
								<FontAwesomeIcon
									icon={faTriangleExclamation}
									className="h-4 w-4 text-white"
								/>
								{errors.username.message}
							</span>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="title"
							className="mb-2 inline-block font-medium tracking-wide"
						>
							Password
						</label>
						<input
							type="password"
							className="form-input block w-full rounded-lg px-3 py-2 dark:border dark:border-dark-30 dark:bg-dark-30"
							placeholder="Enter your password"
							{...register("password", {
								required: "Please enter your password",
							})}
						/>
						{errors.password && (
							<span className="mt-4 flex items-center gap-2 rounded-lg bg-red-500 py-2.5 px-4 text-sm font-medium tracking-wide">
								<FontAwesomeIcon
									icon={faTriangleExclamation}
									className="h-4 w-4 text-white"
								/>
								{errors.password.message}
							</span>
						)}
					</div>
					<div className="mb-8 flex items-center justify-between">
						<label className="inline-flex items-center hover:cursor-pointer">
							<input
								type="checkbox"
								className="focus:border-transparen form-checkbox rounded text-blue-600 focus:bg-dark-20 focus:ring-2 focus:ring-blue-600 focus:ring-offset-0 dark:border dark:border-dark-30 dark:bg-dark-30"
							/>
							<span className="ml-2 select-none text-sm">
								Keep me logged in
							</span>
						</label>
						<Link
							to="forgot-password"
							className="text-sm underline underline-offset-4"
						>
							Forgot Password
						</Link>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full rounded-lg bg-blue-600 py-2.5 px-6 font-semibold duration-300 hover:bg-blue-700 disabled:cursor-wait disabled:bg-gray-200/20"
						>
							Sign In
						</button>
					</div>
					<p className="mt-4 text-center text-sm text-white/60">
						Dont have an account?{" "}
						<Link
							to="sign-up"
							className="font-semibold text-white underline underline-offset-4"
						>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
