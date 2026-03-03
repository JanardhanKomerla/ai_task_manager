import "../styles/header.css";

function Header({ onLogout }) {
  return (
    <header className="app-header">
      <h1 className="app-header-title">AI Task Manager</h1>
      <button onClick={onLogout} className="app-header-button">
        Logout
      </button>
    </header>
  );
}

export default Header;
