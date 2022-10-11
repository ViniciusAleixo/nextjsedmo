import React from 'react';
import Navbar from '../Navbar/Navbar.js';
import styles from '../Header/Header.module.css';
import Image from 'next/image';
import imgHeader from "../../public/header.png"


export const Header = () => {
  return (
    <>
        <Navbar />
    <div className={styles.header}>
  
    <div className={styles.headerContent}>
      <div className={styles.headerText}>
        <h1>Quality and Excellence...</h1>
        <h1>Whatever it takes!</h1>
        <h4>Call us now for a quote</h4>
        <h5>
          <strong>AUS</strong> - 1300 133 256
        </h5>
        <h5 id={styles.second}>
          <strong>NZ</strong> - 0800 893 488
        </h5>
        <h4 id={styles.third}>Login to see pricing</h4>
        <a href="https://edmoap.dearportal.com/Account/Login?ReturnUrl=%2F" target="_blank" rel="noreferrer">
          Go to Store
        </a>
        
      </div>
       
    </div>
    <div className={styles.imgHeaderContainer}>
           <Image layout='fill' objectFit='contain' src={imgHeader} alt={`header`} />
        </div>
    <div id="grid"></div>
  </div>

 </>
  )
}
