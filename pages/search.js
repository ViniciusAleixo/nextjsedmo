import Head from "next/head";
import Image from "next/image.js";
import Link from "next/link";
import { Header } from "../components/Header/Header.js";
import { useState, useEffect} from 'react';
import styles from "../styles/Home.module.css";





export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);



  const handleInputs = (event) => {
    let { name, value } = event.target
    setFormInputs({...formInputs, [name] : value});
    setSearchTerm(event.target.value);
  }

  const searchAPI = async () => {
    

    const [firstGroup, secondGroup, thirdGroup, fourthGroup, fifthGroup, sixthGroup] = await Promise.all([
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=1&IncludeAttachments=true&limit=1000`,
        {
            headers: {
                "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
                "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=2&IncludeAttachments=true&limit=1000`,
        {
            headers: {
                "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
                "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=3&IncludeAttachments=true&limit=1000`,
        {
            headers: {
                "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
                "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=4&IncludeAttachments=true&limit=1000`,
        {
            headers: {
                "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
                "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=5&IncludeAttachments=true&limit=1000`,
        {
            headers: {
                "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
                "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
            },
          }),
          fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=6&IncludeAttachments=true&limit=1000`,
          {
              headers: {
                "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
                "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
              },
            })
    ]);
   let prod =[];

    const [first, second, third, fourth, fifth, sixth] = await Promise.all([
        firstGroup.json(), secondGroup.json(), thirdGroup.json(), fourthGroup.json(), fifthGroup.json(),sixthGroup.json()
    ]);

        
    prod.push(...first.Products, ...second.Products, ...third.Products, ...fourth.Products, ...fifth.Products, ...sixth.Products)
    setSearchResults(prod)
    setLoading(true);
  }


  useEffect(() => {
    searchAPI();
  }, [])

  const search = async(event) => {
    event.preventDefault()
    let prod = await fetch(
        `https://inventory.dearsystems.com/ExternalApi/v2/Product?Name=${formInputs.searchTerm}&IncludeAttachments=true&limit=15`,
        {
          headers: {
            
            "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
            "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      prod = await prod.json()
     

 
  }





  return (
    <div className="styles.container">
      <Head>
      <title>EDMO | Avionics, Test Equipment, Install Supplies & Pilot Supplies</title>
        <meta
          name="description"
          content="EDMO, the most trusted name in aviation for aircraft electronics, install supplies, wire and cable, tooling, test equipment, tactical communication, pilot."
          key="desc"
        />
      </Head>

      <main>
       
      <Header/>
        <h1 className={styles.title}>Search by Name</h1>
       <div>
        <form onSubmit={search} >
          <input className={styles.search} name="searchTerm"  type='text' value={searchTerm} onChange={handleInputs} placeholder="Search"/>
         
        </form>
       </div>
        <ul className={styles.grid}>
      
          {searchResults && loading ? (searchResults.filter((e) => e.Name.toLowerCase().includes(searchTerm.toLowerCase()) ).map((result) => {
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
                    layout="fill"
                    objectFit="contain"
                    
                  /> }
                    </div>
                    <h3>{result.Name}</h3>
                    <p>SKU: {result.SKU}</p>
                  </a>
                </Link>
              </li>
            );
          })
        ): (<p>Loading...</p>)}
        </ul>

      </main>
    </div>
  );
}



