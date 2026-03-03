import Header from "./Header";
import Footer from "./Footer";
import "../styles/layout.css";

function Layout({ children, onLogout }) {
  return (
    <div className="layout-root">
      <Header onLogout={onLogout} />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
