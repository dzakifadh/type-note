import { Route, Routes } from "react-router-dom";
import NoteDetail from "./pages/NoteDetail";
import NoteForm from "./pages/NoteForm";
import NoteLayout from "./pages/NoteLayout";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/notes" element={<Notes />} />
			<Route path="/notes" element={<NoteLayout />}>
				<Route path="create" element={<NoteForm />} />
				<Route path=":id" element={<NoteDetail />} />
				<Route path="update/:id" element={<NoteForm />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
