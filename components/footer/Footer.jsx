import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full shadow-md p-8 flex items-center justify-center">
      Made with ❤ by{' '}
      <a
        href="https://github.com/ayush1337"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold underline"
      >
        {' '}
        Ayush
      </a>
    </footer>
  );
};

export default Footer;
