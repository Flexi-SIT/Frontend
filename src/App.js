import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoterLoginSection from "./pages/VoterLogin/VoterLogin";
import AdminLoginSection from "./pages/AdminLogin/AdminLogin";
import HomePage from "./pages/HomePage/HomePage";
import VotingList from "./pages/election/VotingList";
import VoteCounting from "./pages/VoteCounting/VoteCounting";
import VoterRegistration from "./pages/VoterRegistration/VoterRegistration";
import Voting from "./pages/VoterPanel/Voting";
import Audit from "./pages/Audit/Audit";
import Vote from "./pages/Vote/Vote"
import AdminPanel from "./pages/AdminPanel/adminPanel"
import "bootstrap/dist/css/bootstrap.min.css";
//import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voter" element={<VoterLoginSection />} />
        <Route path="/admin" element={<AdminLoginSection />} />
        <Route path="/election/vote" element={<VotingList />} />
        <Route path="/voter-registration" element={<VoterRegistration />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/votecount" element={<VoteCounting />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
