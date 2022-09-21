import Head from "next/head";
import Image from "next/image.js";
import Link from "next/link";
import { Header } from "../components/Header/Header.js";
import { useRouter } from "next/router";
import { useState, useEffect} from 'react';
import styles from "../styles/Home.module.css";



export async function getServerSideProps({ query: { page = 1} }) {
    const [firstGroup, secondGroup, thirdGroup, fourthGroup, fifthGroup, sixthGroup] = await Promise.all([
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=1&IncludeAttachments=true&limit=1000`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=2&IncludeAttachments=true&limit=1000`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=3&IncludeAttachments=true&limit=1000`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=4&IncludeAttachments=true&limit=1000`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=5&IncludeAttachments=true&limit=1000`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
          fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=6&IncludeAttachments=true&limit=1000`,
          {
              headers: {
                "api-auth-accountid": process.env.REACT_APP_API_ID,
                "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
              },
            })
    ]);
   let data =[];

    const [first, second, third, fourth, fifth, sixth] = await Promise.all([
        firstGroup.json(), secondGroup.json(), thirdGroup.json(), fourthGroup.json(), fifthGroup.json(),sixthGroup.json()
    ]);

        
    data.push(...first.Products, ...second.Products, ...third.Products, ...fourth.Products, ...fifth.Products, ...sixth.Products)


   
    return {
        props: {
            data,
            page: +page
        }
    }
}


export default function Home(initialData, page) {
  const [searchResults, setSearchResults] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchResults(initialData.data)
  }, [initialData])

  const handleInputs = (event) => {
    let { name, value } = event.target
    setFormInputs({...formInputs, [name] : value});
    setSearchTerm(event.target.value);
  }

  const search = async(event) => {
    event.preventDefault()
    let prod = await fetch(
        `https://inventory.dearsystems.com/ExternalApi/v2/Product?sku=${formInputs.searchTerm}&page=${page}&IncludeAttachments=true&limit=15`,
        {
          headers: {
            
            "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
            "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      prod = await prod.json()
     

 
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
        <h1 className={styles.title}>Search by Part-Number</h1>
       <div>
        <form onSubmit={search}>
          <input className={styles.search} name="searchTerm"  type='text' value={searchTerm} onChange={handleInputs} placeholder="Search"/>
        
        </form>
       </div>
        <ul className={styles.grid}>
      
          {searchResults.filter((e) => e.SKU.toLowerCase().includes(searchTerm.toLowerCase()) ).map((result) => {
            return (
              
              <li key={result.ID} className={styles.card}>
                <Link href={`/product/${encodeURIComponent(result.Name)}`}>
                  <a href="#">
                    <div className={styles.containerImg}>
                    {result.Attachments.length === 0  ? (
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
          
          <div className={styles.nextPrevious}>
            <button
              onClick={() => router.push(`/search?page=${initialData.Page - 1}`)}
              disabled={initialData.Page <= 1}
            >
              Previous
            </button>
            <button
              onClick={() => router.push(`/search?page=${initialData.Page + 1}`)}
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



