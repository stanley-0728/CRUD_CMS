import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import EntityPage from './components/EntityPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:entityName" element={<EntityPage />} />
      </Routes>
    </Router>
  );
};

export default App;
