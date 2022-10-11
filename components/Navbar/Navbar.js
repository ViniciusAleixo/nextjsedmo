import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import logo from "../../public/edmo-logo.png"





import NavItem from "./NavItem";

const MENU_LIST = [
  { text: "Home", href: "https://www.edmoap.com.au" },
  { text: "All Products", href: "/" },
  { text: "Avionics", href: "/avionics" },
  { text: "Install Supplies", href: "/install-supplies" },
  { text: "Pilot Supplies", href: "/pilot-supplies" },
  { text: "Test Equipment", href: "/test-equipment" },
  { text: "Tools", href: "/tools" },

];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          <a>
         
    <Image width={96} height={107} src={logo} alt={`logo`} priority />
  
          </a>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`${navActive ? "active" : ""} nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;