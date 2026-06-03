import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navLinks = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <div className="card home-card shadow-sm p-4 mb-4">
      <div className="card-body">
        <h2 className="card-title">Welcome to OctoFit Tracker</h2>
        <p className="card-text text-secondary">
          Browse the API endpoints for Activities, Leaderboard, Teams, Users, and Workouts.
        </p>
        <p className="text-muted mb-0">
          Use the navigation menu to view each dataset fetched from the Django REST API.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      <div className="container py-4">
        <header className="app-header p-4 mb-4 rounded shadow-sm">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <h1 className="display-5 mb-1">OctoFit Tracker</h1>
              <p className="lead text-secondary mb-0">
                React frontend for the OctoFit Tracker Django REST API.
              </p>
            </div>
            <nav className="nav nav-pills flex-column flex-sm-row gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link text-nowrap${isActive ? ' active' : ' text-primary'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="data-card p-3 rounded shadow-sm bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <div className="footer-note text-center">
          <small>Powered by React, Bootstrap, and Django REST Framework.</small>
        </div>
      </div>
    </div>
  );
}

export default App;
