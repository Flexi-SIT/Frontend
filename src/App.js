import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoterLoginSection from './pages/VoterLogin/VoterLoginSection';
import CompanyLoginSection from './pages/CompanyLogin/CompanyLoginSection';
import HomePage from './pages/HomePage/HomePageSection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voter" element={<VoterLoginSection />} />
        <Route path="/company" element={<CompanyLoginSection />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
