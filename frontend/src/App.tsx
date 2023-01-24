import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthContext } from "./context/authContext";
import NoteDetail from "./pages/NoteDetail";
import NoteForm from "./pages/NoteForm";
import NoteLayout from "./pages/NoteLayout";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";

const App = () => {
	const { authInformation } = useAuthContext();

	console.log("APP", authInformation);

	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="*" element={<NotFound />} />
			{/* Protected Routes */}
			<Route
				path="/notes"
				element={<ProtectedRoute isAllowed={authInformation.auth} />}
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
