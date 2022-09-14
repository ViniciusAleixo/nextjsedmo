import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header/Header.js";

import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";


export async function getServerSideProps({ query: { page = 1, search = ''  } }) {
  const response = await fetch(
    `https://inventory.dearsystems.com/ExternalApi/v2/Product?SKU=${search}&page=${page}&limit=15&IncludeAttachments=true`,
    {
      headers: {
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
  const {Products = [] } = data;

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

       <div>
        <form>
          <input className="styles.seach" name="search"  type='search'/>
          <button>search</button>
        </form>
       </div>
        <ul className={styles.grid}>
          {Products.map((result) => {
            return (
              
              <li key={result.ID} className={styles.card}>
                <Link href={`/product/${encodeURIComponent(result.Name)}`}>
                  <a href="#">
                    <div className={styles.containerImg}>
                      {result.Attachments.length === 0 ? (
                        <span>No Photo</span>
                      ) : result.Attachments[0].ContentType ===
                        "application/pdf" ? (
                        <img
                          className={styles.cardImg}
                          src={result.Attachments[1].DownloadUrl}
                          alt={result.Name}
                         
                        />
                      ) : (
                        <img
                          className={styles.cardImg}
                          src={result.Attachments[0].DownloadUrl}
                          alt={result.Name}
                          
                        />

                      )}
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
              Showing {data.Page * Products.length} to {data.Total}
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



