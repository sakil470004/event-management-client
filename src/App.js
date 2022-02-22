import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ResponsiveAppBar from './Pages/AppBar/AppBar';

import Home from './Pages/Home/Home';
import MyEvents from './Pages/MyEvents/MyEvents';

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

        </Routes>
      </Router>
    </div>
  );
}

export default App;
