import React from 'react';
import logosvg from '../assets/rs_school_js.svg';
export const Footer: React.FC = () => {
  return (
    <footer>
      <ul className="git_list">
        <li>
          <a href="https://github.com/rybakouvlad">rybakouvlad</a>
        </li>
        <li>
          <a href="https://github.com/TanyaNovik">TanyaNovik</a>
        </li>
        <li>
          <a href="https://github.com/Tav25">Tav25</a>
        </li>
      </ul>
      <span className="year">2021</span>
      <a href="https://rs.school/js/">
        <img className="rs_logo" src={logosvg} alt="logoRs" />
      </a>
    </footer>
  );
};
