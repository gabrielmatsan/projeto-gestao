import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Login";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import EmDesenvolvimento from "./pages/EmDesenvolvimento";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/chave" element={<EmDesenvolvimento />} />
        <Route path="/observacoes" element={<EmDesenvolvimento />} />
        <Route path="/ponto" element={<EmDesenvolvimento />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
