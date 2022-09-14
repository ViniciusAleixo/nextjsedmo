import Link from "next/link";
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from "../../public/edmo-logo.png"
import styles from '../Navbar/Navbar.module.css';

function Navbar() {
    const {asPath} = useRouter();
  return (
    <div className={styles.containerNav}>
    <Image width={95} height={100} src={logo} alt={`logo`} priority />
    <nav className={styles.nav}>
    <Link href="https://www.edmoap.com.au"><a>Home</a></Link>
        <Link href='/' passHref><a className={asPath === '/' ? styles.active : styles.noActive}>All Products</a></Link>
        <Link href='/avionics'><a className={asPath === '/avionics' ? styles.active : styles.noActive}> Avionics </a></Link>
        <Link href='/install-supplies' passHref><a className={asPath === '/install-supplies' ? styles.active : styles.noActive}>Install Supplies</a></Link>
        <Link href='/pilot-supplies' passHref><a className={asPath === '/pilot-supplies' ? styles.active : styles.noActive}>Pilot Supplies</a></Link>
        <Link href='/tools' passHref><a className={asPath === "/tools" ? styles.active : styles.noActive}>Tools</a></Link>

        
    </nav>
    </div>
  )}


export default Navbar;