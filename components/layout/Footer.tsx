import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white py-8 text-center border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm">&copy; {currentYear} Pomegranate Trade Dashboard. All rights reserved.</p>
        {/* <p className="text-xs mt-1">All data on this platform is for demonstration purposes and does not represent live market data.</p> */}
      </div>
    </footer>
  );
};

export default Footer;