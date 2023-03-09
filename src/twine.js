import { Routes, Route } from 'react-router-dom';
import { Unauthorized } from './components/auth/unauthorized';

function Twine() {
  return (
    <Routes>
      <Route path="/" element={<Unauthorized />} />
    </Routes>
  )
}

export default Twine;
