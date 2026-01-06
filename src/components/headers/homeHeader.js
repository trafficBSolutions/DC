import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
    const toggle = () => 
        setIsOpen(!isOpen);
  return (
    <header className="header">
      <div className="header-nav">
        <button className="header-nav-toggle" onClick={toggle}>
          <IoMenuOutline className="icon-mobile-nav"/>
          </button>
          </div>
      <nav className={`header-nav-list ${isOpen ? 'active' : ''}`}>
        <h1 className="header-title">Direct Connection</h1>
        </nav>
    </header>
  );
};
export default Header;
