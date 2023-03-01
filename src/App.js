import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoterLoginSection from './pages/VoterLogin/VoterLoginSection';
import CompanyLoginSection from './pages/CompanyLogin/CompanyLoginSection';
import HomePage from './pages/HomePage/HomePageSection';
import VotingList from './pages/election/VotingList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voter" element={<VoterLoginSection />} />
        <Route path="/company" element={<CompanyLoginSection />} />
        <Route path="/election/vote" element={<VotingList />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
