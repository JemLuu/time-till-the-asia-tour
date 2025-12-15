import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AsiaTrip from './pages/AsiaTrip'
import SFSidequest from './pages/SFSidequest'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AsiaTrip />} />
        <Route path="/sf-sidequest" element={<SFSidequest />} />
      </Routes>
    </Router>
  );
}

export default App
