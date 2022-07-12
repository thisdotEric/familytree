import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Families from './pages/Family';
import Layout from './pages/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Families />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
