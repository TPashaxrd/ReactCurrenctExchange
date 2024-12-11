import React from "react";
import '../css/footer.css'; // CSS dosyasını import et

let COMPANY = "https://nivesoft.com";

const Footer = () => {
  return (
    <>
      <div className="nivesoft">
        <p>Our Company, <a href={COMPANY} target="_blank" rel="noreferrer">NiveSOFT</a></p>
      </div>
      <footer className="footer">
        <p>Made with ❤️ by <a href="https://toprak.nivesoft.com" target="_blank" rel="noreferrer">Toprak Altın</a></p>
      </footer>
    </>
  );
};

export default Footer;
