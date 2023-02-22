import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSection from './components/LoginSection/LoginSection';
import HomePage from './components/HomePage/homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voter" element={<LoginSection />} />
        <Route path="/company" element={<LoginSection />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
