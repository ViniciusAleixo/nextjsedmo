import Head from "next/head";
import Image from "next/image";
import { Header } from '../../../../components/Header/Header';
import Link from "next/link";
import styles from '../../../../styles/Home.module.css';

 

export async function getServerSideProps({params: {slug}}) {
 
 const response = await fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?SKU=${slug}&IncludeAttachments=true`,{
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
 


  const [{ ID, Name, SKU, Attachments, ShortDescription, Tags, Description} ]= Products;


  return (
    <>
    <Header/>
    <div className={styles.container}>
      <Head>
      <title>{Name}</title>
      <meta
          name="description"
          content={ShortDescription}
          key="desc"
        />
      </Head>
      
      <main>
       
        <div className={styles.containerImgSingle}>
        <div className={styles.cardImgSingle}>
              {Attachments.length === 0 || Attachments[0].DownloadUrl.includes('pdf') ? (
                        <span>No Photo</span>
                      ) :  <Image
                        
                        src={Attachments[0].DownloadUrl}
                        alt={Name}
                        layout="fill"
                        objectFit="contain"
                      /> }
            </div>
          <div className={styles.contentSingle}>
        
                <div className={styles.cardContent}>
                  <h3>{Name}</h3>
                  <p><strong>Description:</strong> {ShortDescription}</p>
                  <p><strong>Tags: </strong>{Tags}</p>
                  <p><strong>SKU: </strong>{SKU}</p>
                  <div className={styles.buttonShop}>
                  <Link href={`https://edmoap.dearportal.com/Product/${ID}`} passHref target="_blank" rel="noreferrer"><a className={styles.btnstore}>Go to Store</a></Link>
                  <Link href="/" rel="noreferrer" passHref ><a className={styles.btngoback}>Go back</a></Link>
                  </div>
                </div>
          </div> 
          
        </div>
          <h3 className={styles.headerDescription}>Description</h3> 
          <div className={styles.descriptionProd}dangerouslySetInnerHTML={{__html: Description}}/> 
      </main>
   
    </div>
    </>
  )
}
