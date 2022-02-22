import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ResponsiveAppBar from './Pages/AppBar/AppBar';
import Login from './Pages/Login/Login'
import Register from './Pages/Login/Register'
import Home from './Pages/Home/Home';
import MyEvents from './Pages/MyEvents/MyEvents';
import AddEvent from './Pages/AddEvent/AddEvent';
import PrivateRoute from './Pages/Login/PrivateRoute';
import { useEffect, useState } from 'react';
import { getStoredCart } from './Pages/fakedb/fakedb';

function App() {
  const [user, setUser] = useState('')
  useEffect(() => {
    setUser(getStoredCart().user)

  }, [user])
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar setUser={setUser} user={user} />
        <Routes>
          <Route path='/' element={<Home />}>
          </Route>
          <Route path="/myEvents" element={
            <PrivateRoute user={user}>
              <MyEvents user={user} />
            </PrivateRoute>
          } >
          </Route>
          <Route path="/addEvent" element={
            <PrivateRoute user={user}>
              <AddEvent user={user} />
            </PrivateRoute>
          } >
          </Route>
          <Route path="/login" element={<Login setUser={setUser} />} >
          </Route>
          <Route path="/register" element={<Register setUser={setUser} />} >
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
