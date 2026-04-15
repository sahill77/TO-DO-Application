import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/helpers';

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span>TaskFlow</span>
        </div>

        {user && (
          <div className="navbar-user">
            <span className="user-name">
              Hey, <strong>{user.name}</strong>
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
