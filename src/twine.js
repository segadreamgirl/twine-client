import { Routes, Route } from 'react-router-dom';
import { Unauthorized } from './components/auth/unauthorized';
import { SideBar } from './components/dashboard/sidebar';
import { AppViews } from './components/views/appViews';
import { Authorized } from './components/views/authorized';

function Twine() {
  return (
    <Routes>
      <Route path="/" element={<Unauthorized />} />
      <Route
        path="*"
        element={
          <Authorized>
            <>
              <SideBar />
              <AppViews />
            </>
          </Authorized>
        }
      />
    </Routes>
  )
}

export default Twine;
