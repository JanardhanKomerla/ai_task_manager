import "../styles/footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p className="app-footer-text">
        AI Task Manager - {year} - Built with Spring Boot, MongoDB, React, and AI-assisted task insights.
      </p>
    </footer>
  );
}

export default Footer;
