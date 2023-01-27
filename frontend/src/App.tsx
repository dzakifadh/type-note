import { Route, Routes } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthContext } from "./context/authContext";
import NoteDetail from "./pages/NoteDetail";
import NoteForm from "./pages/NoteForm";
import NoteLayout from "./pages/NoteLayout";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";

const App = () => {
	const { authInformation } = useAuthContext();

	console.log("authInformation", authInformation);

	return (
		<Routes>
			<Route path="/" element={<LoadingPage />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="*" element={<NotFound />} />
			<Route
				path="/notes"
				element={
					<ProtectedRoute
						isAllowed={authInformation.auth}
						isLoading={authInformation.isLoading}
					/>
				}
			>
				<Route path="/notes" element={<Notes />} />
				<Route path="/notes" element={<NoteLayout />}>
					<Route path="create" element={<NoteForm />} />
					<Route path=":id" element={<NoteDetail />} />
					<Route path="update/:id" element={<NoteForm />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
