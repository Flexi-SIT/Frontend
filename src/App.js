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
import CreateElections from "./pages/AdminPanel/CreateElections"
import NewCandidate from "./pages/AdminPanel/NewCandidate"



import "bootstrap/dist/css/bootstrap.min.css";
//import 'semantic-ui-css/semantic.min.css'

function App() {
  let adminCheck = localStorage.getItem('admin');
  console.log(adminCheck)
  let voterCheck = localStorage.getItem('voter');
  console.log(voterCheck)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voter" element={<VoterLoginSection />} />
        <Route path="/admin" element={<AdminLoginSection />} />
        {/* {voterCheck == "true" && <Route path="/election/vote" element={<VotingList />} />} */}
        <Route path="/voter-registration" element={<VoterRegistration />} />
        {voterCheck == "true" && <Route path="/voting" element={<Voting />} />}
        {voterCheck == "true" && <Route path="/vote/:id" element={<Vote />} />}

        {/* {adminCheck == "true" && <Route path="/adminPanel" element={<AdminPanel />} />} */}
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/create-election" element={<CreateElections />} />
        <Route path="/voteCount/:id" element={<VoteCounting />} />
        <Route path="/candidates/:id" element={<NewCandidate />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
