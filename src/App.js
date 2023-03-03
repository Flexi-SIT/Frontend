import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoterLoginSection from './pages/VoterLogin/VoterLogin';
import CompanyLoginSection from './pages/CompanyLogin/CompanyLogin';
import HomePage from './pages/HomePage/HomePage';
import VotingList from './pages/election/VotingList';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'semantic-ui-css/semantic.min.css'

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
