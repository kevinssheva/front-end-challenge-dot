import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Auth from "./Pages/Auth";
import Quiz from "./Pages/Quiz";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/join" element={<Auth />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
