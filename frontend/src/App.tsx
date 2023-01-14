import { Route, Routes } from "react-router-dom";
import NoteDetail from "./pages/NoteDetail";
import NoteForm from "./pages/NoteForm";
import NoteLayout from "./pages/NoteLayout";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/notes" element={<Notes />} />
			<Route path="/notes" element={<NoteLayout />}>
				<Route path=":id" element={<NoteDetail />} />
				<Route path="update" element={<NoteForm />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
