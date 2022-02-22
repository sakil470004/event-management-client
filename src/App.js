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

function App() {
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Home />}>
          </Route>
          <Route path="/myEvents" element={<MyEvents />} >
          </Route>
          <Route path="/addEvent" element={<AddEvent />} >
          </Route>
          <Route path="/login" element={<Login />} >
          </Route>
          <Route path="/register" element={<Register />} >
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
