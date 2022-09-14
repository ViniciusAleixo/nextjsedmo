
import Head from "next/head";

import Image from "next/image";
import { Header} from '../../../components/Header/Header.js';

import styles from '../../../styles/Home.module.css';


export async function getServerSideProps({params: {slug}}) {
 
 const response = await fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?Name=${slug}&IncludeAttachments=true`,{
    headers: {
        "api-auth-accountid": process.env.REACT_APP_API_ID,
        "api-auth-applicationkey": process.env.REACT_APP_API_KEY
      } 
});


const data = await response.json();

  return {
    props: {
     data,

  
    }
  }
}


export default function Product({data}) {  

  const {Products = [] } = data;



  const [{ ID, Name, SKU, Attachments, ShortDescription, Tags} ]= Products;


  return (
    <>
    <Header/>
    <div className={styles.container}>
      <Head>
      <title>{Name}</title>
      </Head>
      
      <main>
        
        <div className={styles.containerImgSingle}>
          <div className={styles.contentSingle}>
                { Attachments.length === 0  ? <span>No Photo</span> : Attachments[0].ContentType === "application/pdf"  ? <Image className={styles.cardImgSingle} src= { Attachments[1].DownloadUrl } alt={ Name } />  : <Image className={styles.cardImgSingle} src= { Attachments[0].DownloadUrl } alt={ Name }  />}
                <div className={styles.cardContent}>
                  <h3>{Name}</h3>
                  <p><strong>Description:</strong> {ShortDescription}</p>
                  <p><strong>Tags: </strong>{Tags}</p>
                  <p><strong>SKU: </strong>{SKU}</p>
                  <div className={styles.buttonShop}>
                  <a className={styles.btnstore} href={`https://edmoap.dearportal.com/Product/${ID}`}  target="_blank" rel="noreferrer">Go to Store</a>
                  <a className={styles.btngoback} href="/">Go back</a>
                  </div>
                </div>
          </div>      
        </div>
                  
      </main>
   
    </div>
    </>
  )
}
