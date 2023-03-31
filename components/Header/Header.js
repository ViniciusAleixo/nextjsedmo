import React from 'react';
import Navbar from '../Navbar/Navbar.js';
import styles from '../Header/Header.module.css';
import Image from 'next/image';
import imgHeader from "../../public/header.png";
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs.js';


export const Header = () => {
  return (
    <>
        <Navbar />
    <div className={styles.header}>
  
    <div className={styles.headerContent}>
      <div className={styles.headerText}>
        <h1>Quality and Excellence...</h1>
        <h2>Whatever it takes!</h2>
        <p>Call us now for a quote</p>
        <p><strong>AUS</strong> - 1300 133 256</p>
        <p id={styles.second}>
          <strong>NZ</strong> - 0800 893 488
        </p>
        <p id={styles.third}><strong>Login to see pricing</strong></p>
        <a href="https://edmoap.dearportal.com/Account/Login?ReturnUrl=%2F" target="_blank" rel="noreferrer">
          Go to Store
        </a>
       
      </div>
       
    </div>
    <div className={styles.imgHeaderContainer}>
           <Image priority layout='fill' objectFit='contain' src={imgHeader} alt={`header`} />
        </div>
    <div id="grid"></div>
  </div>
   <BreadCrumbs/>
 </>
  )
}
