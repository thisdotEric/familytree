import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Families from './pages/Family';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Families />} />
      </Routes>
    </Router>
  );
}

export default App;
