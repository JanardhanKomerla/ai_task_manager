import Header from "./Header";
import "../styles/layout.css";

function Layout({ children, onLogout }) {
  return (
    <div className="layout-root">
      <Header onLogout={onLogout} />
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}

export default Layout;
