import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainteams from './Mainteams'
import './App.css'
import Navbar from './Navbar'
import Teampage from './Teampage'
import Teamstandingpage from './Teamstandingpage';
import Leaguepage from './leaguepage';
import Morepage from './Morepage';
import Playerpage from './Playerpage';
import Contact from './Contact';

function App() {
  
  return (
    <Router>
      <Navbar />
      <div className="bg-black px-14 pt-3 pb-3">
        <Routes>
          <Route path="/" element={<Mainteams />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team/:name" element={<Teampage />} />
          <Route path="/standings/:teamId" element={<Teamstandingpage />} />
          <Route path="/league/:leagueId" element={<Leaguepage />} />
          <Route path="/more" element={<Morepage />} />
          <Route path="/standings/:teamId/player/:playerName" element={< Playerpage/>}/>
        </Routes>
      </div>
    </Router>
  );
  
}

export default App


