import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoterLoginSection from "./pages/VoterLogin/VoterLogin";
import AdminLoginSection from "./pages/AdminLogin/AdminLogin";
import HomePage from "./pages/HomePage/HomePage";
import VoteCounting from "./pages/VoteCounting/VoteCounting";
import VoterRegistration from "./pages/VoterRegistration/VoterRegistration";
import Voting from "./pages/VoterPanel/Voting";

import Vote from "./pages/Vote/Vote"
import AdminPanel from "./pages/AdminPanel/adminPanel"
import CreateElections from "./pages/AdminPanel/CreateElections"
import NewCandidate from "./pages/AdminPanel/NewCandidate"

//Importing Bootstrap for the whole application
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    //Routes protected by cookies in the components itself
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voter" element={<VoterLoginSection />} />
        <Route path="/admin" element={<AdminLoginSection />} />
        {/* {voterCheck == "true" && <Route path="/election/vote" element={<VotingList />} />} */}
        <Route path="/voter-registration" element={<VoterRegistration />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/vote/:id" element={<Vote />} />

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
