import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PlayerDashboard from "./pages/PlayerDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import TalentMap from "./components/TalentMap";
import PlayerProfile from "./components/PlayerProfile";
import Results from "./components/Results";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/player" element={<PlayerDashboard />} />
        <Route path="/coach" element={<CoachDashboard />} />
        <Route path="/talent-map" element={<TalentMap />} />
        <Route path="/profile" element={<PlayerProfile />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;