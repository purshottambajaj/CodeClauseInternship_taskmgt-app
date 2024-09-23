import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 shadow-md p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="nav-left flex items-center">
          {/* Logo or Icon */}
          <div className="text-white font-bold text-2xl">
            <i className="fas fa-tasks mr-2"></i> 
            Task Manager
          </div>
        </div>
        <div className="nav-right">
          <div className="text-white text-lg font-semibold tracking-wide">
            Task Management App
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
