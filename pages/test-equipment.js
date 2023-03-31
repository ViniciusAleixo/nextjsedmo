import Head from "next/head";
import Image from "next/image.js";
import Link from "next/link";
import { Header } from "../components/Header/Header.js";
import SearchButton  from "../components/Search/Search";

import { useRouter } from "next/router";


import styles from "../styles/Home.module.css";


export async function getServerSideProps({ query: { page = 1} }) {
    const [firstGroup, secondGroup, thirdGroup, fourthGroup, fifthGroup, sixthGroup] = await Promise.all([
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page}&IncludeAttachments=true&limit=100`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page +1}&IncludeAttachments=true&limit=100`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page +2}&IncludeAttachments=true&limit=100`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page +3}&IncludeAttachments=true&limit=100`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
        fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page +4}&IncludeAttachments=true&limit=100`,
        {
            headers: {
              "api-auth-accountid": process.env.REACT_APP_API_ID,
              "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
            },
          }),
          fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page +5}&IncludeAttachments=true&limit=100`,
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

        
    data.push(...first.Products.filter((obj) => obj.Category.includes("Test Equipment")), 
              ...second.Products.filter((obj) => obj.Category.includes("Test Equipment")), 
              ...third.Products.filter((obj) => obj.Category.includes("Test Equipment")), 
              ...fourth.Products.filter((obj) => obj.Category.includes("Test Equipment")), 
              ...fifth.Products.filter((obj) => obj.Category.includes("Test Equipment")), 
              ...sixth.Products.filter((obj) => obj.Category.includes("Test Equipment")))


   
    return {
        props: {
            data,
            page: +page
        }
    }
}



export default function Home({page, data}) {




  const router = useRouter();


const lastPage = Math.ceil(data.length / 15);

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
        <h1 className={styles.title}>Test Equipment</h1>
        <SearchButton/>
        <ul className={styles.grid}>
          {data.map((result)=> { 
           
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
                    <p>Category: {result.Category}</p>
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
              onClick={() => router.push(`/test-equipment/?page=${page - 1}`)}
              disabled={page <= 1}
            >
              Previous
            </button>
            <button
              onClick={() => router.push(`/test-equipment/?page=${page + 1}`)}
              disabled={page >= lastPage }
            >
              next
            </button>
          </div>
        </div>
      </main>
    </div>
    
  );
}
