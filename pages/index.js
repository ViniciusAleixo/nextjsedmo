import Head from "next/head";
import Image from "next/image.js";
import Link from "next/link";
import { Header } from "../components/Header/Header.js";
import { useRouter } from "next/router";
import { useState, useEffect} from 'react';
import styles from "../styles/Home.module.css";


export async function getServerSideProps({ query: { page = 1} }) {
  const response = await fetch(
    `https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page}&limit=15&IncludeAttachments=true`,
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


export default function Home(initialData) {
  const [searchResults, setSearchResults] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchResults(initialData.data.Products)
  }, [initialData])

  const handleInputs = (event) => {
    let { name, value } = event.target
    setFormInputs({...formInputs, [name] : value});
    setSearchTerm(event.target.value);
  }

  const search = async(event) => {
    event.preventDefault()
    let prod = await fetch(
      `https://inventory.dearsystems.com/ExternalApi/v2/Product?Name=${formInputs.searchTerm}&page=1&limit=15&IncludeAttachments=true`,
      {
        headers: {
          "api-auth-accountid": process.env.REACT_APP_API_ID,
          "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
        },
      }
    );
    prod = await movies.json()
    setSearchResults(prod.Products)
  }

  const router = useRouter();


  const lastPage = Math.ceil(initialData.Total / 15);

  return (
    <div className="styles.container">
      <Head>
        <title>EdmoAP Products</title>
      </Head>

      <main>
       
      <Header/>
        <h1 className={styles.title}>All Products</h1>
       <div>
        <form onSubmit={search}>
          <input className="styles.seach" name="searchTerm"  type='text' value={searchTerm} onChange={handleInputs}/>
          <button>search</button>
        </form>
       </div>
        <ul className={styles.grid}>
          {searchResults.map((result) => {
            return (
              
              <li key={result.ID} className={styles.card}>
                <Link href={`/product/${encodeURIComponent(result.Name)}`}>
                  <a href="#">
                    <div className={styles.containerImg}>
                      {result.Attachments.length === 0 ? (
                        <span>No Photo</span>
                      ) : result.Attachments[0].ContentType ===
                        "application/pdf" ? (
                        <Image
                          className={styles.cardImg}
                          src={result.Attachments[1].DownloadUrl}
                          alt={result.Name}
                          width={200} height={160}
                         
                        />
                      ) : (
                        <Image
                          className={styles.cardImg}
                          src={result.Attachments[0].DownloadUrl}
                          alt={result.Name}
                          width={200} height={160}
                          
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
              Showing {initialData.Page * initialData.data.length} to {initialData.Total}
            </span>
          </div>
          <div className={styles.nextPrevious}>
            <button
              onClick={() => router.push(`/?page=${initialData.Page - 1}`)}
              disabled={initialData.Page <= 1}
            >
              Previous
            </button>
            <button
              onClick={() => router.push(`/?page=${initialData.Page + 1}`)}
              disabled={initialData.Page >= lastPage}
            >
              next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}



