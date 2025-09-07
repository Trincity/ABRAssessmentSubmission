import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import SpeciesAliasPage from "./pages/SpeciesAliasPage";
import "./style/index.css";

function App() {
  return (
    <Router>
      <nav className="main-nav">
        <Link to="/" className="main-nav-link">
          Home
        </Link>
        <Link to="/search" className="main-nav-link">
          Search
        </Link>
        <Link to="/about" className="main-nav-link">
          About
        </Link>
      </nav>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/species-aliases/:alias"
            element={<SpeciesAliasPage />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
