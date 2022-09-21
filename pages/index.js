import Head from "next/head";
import Image from "next/image.js";
import Link from "next/link";
import { Header } from "../components/Header/Header.js";
import { useRouter } from "next/router";
import SearchButton  from "../components/Search/Search";
import styles from "../styles/Home.module.css";



export async function getServerSideProps({ query: { page = 1} }) {
  const response = await fetch(
    `https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page}&limit=15&IncludeAttachments=true`,
    {
      headers: {
        "Content-Type": 'application/json',
        "api-auth-accountid": process.env.REACT_APP_API_ID,
        "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
      },
    }
  );

  const data = await response.json();
  


  return {
    props: {
      data,
      page: +page,

           
    },
  };
}

export default function Home({data, page}) {
 
const {Products = []} = data;


  const router = useRouter();


  const lastPage = Math.ceil(data.Total / 15);

  return (
    <div className="styles.container">
      <Head>
        <title>EdmoAP Products</title>
      </Head>

      <main>
       
      <Header/>
        <h1 className={styles.title}>All Products</h1>
    
        <SearchButton/>
       
        <ul className={styles.grid}>
      
          {Products.map((result) => {
            return (
              
              <li key={result.ID} className={styles.card}>
                <Link href={`/product/${encodeURIComponent(result.Name)}`} passHref>
                  <a href="#">
                    <div className={styles.containerImg}>
                    {result.Attachments.length === 0 && result.Attachments[0].ContentType === "application/pdf" ? (
                    <span>No Photo</span>
                  ) :  <Image
                    className={styles.cardImg}
                    src={result.Attachments[0].DownloadUrl}
                    alt={result.Name}
                    width={140} height={110}
                    
                  /> }
                    </div>
                    <h3>{result.Name}</h3>
                    <p>SKU: {result.SKU}</p>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.paginantion}>
          <div className={styles.total}>
            <span>
              Showing {page * Products.length} to {data.Total}
            </span>
          </div>
          <div className={styles.nextPrevious}>
            <button
              onClick={() => router.push(`/?page=${page - 1}`)}
              disabled={page <= 1}
            >
              Previous
            </button>
            <button
              onClick={() => router.push(`/?page=${page + 1}`)}
              disabled={page >= lastPage}
            >
              next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}



