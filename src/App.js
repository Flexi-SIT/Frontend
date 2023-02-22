import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoterLoginSection from './components/VoterSection/VoterLoginSection';
import CompanyLoginSection from './components/CompanySection/CompanyLoginSection';
import HomePage from './components/HomePageSection/HomePageSection';

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
