import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Families from './pages/Families';
import Layout from './pages/Layout';
import FamilyMembers from './pages/FamilyMembers';
import FamilyMemberDetails from './pages/FamilyMemberDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Families />} />
          <Route path='/family/:family_name' element={<FamilyMembers />} />
          <Route
            path='/family/:family_name/:family_member'
            element={<FamilyMemberDetails />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
