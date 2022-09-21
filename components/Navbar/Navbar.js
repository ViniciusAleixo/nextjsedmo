import Link from "next/link";
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from "../../public/edmo-logo.png"
import styles from '../Navbar/Navbar.module.css';

function Navbar() {
    const {asPath} = useRouter();
  return (
    <div className={styles.containerNav}>
   <Link href='/' passHref>
    <a>
    <Image width={95} height={100} src={logo} alt={`logo`} priority />
    </a>
    </Link>
    <nav className={styles.nav}>
    <Link href="https://www.edmoap.com.au">Home</Link>
        <Link href='/' passHref className={asPath === '/' ? styles.active : styles.noActive}>All Products</Link>
        <Link href='/avionics' className={asPath === '/avionics' ? styles.active : styles.noActive}> Avionics </Link>
        <Link href='/install-supplies' passHref  className={asPath === '/install-supplies' ? styles.active : styles.noActive}>Install Supplies</Link>
        <Link href='/pilot-supplies' passHref className={asPath === '/pilot-supplies' ? styles.active : styles.noActive}>Pilot Supplies</Link>
        <Link href='/test-equipment' passHref className={asPath === '/test-equipment' ? styles.active : styles.noActive}>Test Equipment</Link>
        <Link href='/tools' passHref className={asPath === "/tools" ? styles.active : styles.noActive}>Tools</Link>
        
    </nav>
    </div>
  )}


export default Navbar;