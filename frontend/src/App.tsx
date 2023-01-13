import { Route, Routes } from "react-router-dom";
import Note from "./pages/Note";
import NoteForm from "./pages/NoteForm";
import NoteLayout from "./pages/NoteLayout";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/notes" element={<NoteLayout />}>
				<Route index element={<Note />} />
				<Route path="update" element={<NoteForm />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
