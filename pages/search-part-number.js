import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header/Header";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputs = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const fetchProducts = useCallback(async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?SKU=${searchTerm}&IncludeAttachments=true&limit=15`, {
        headers: {
          "api-auth-accountid": process.env.NEXT_PUBLIC_API_ID,
          "api-auth-applicationkey": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      const data = await response.json();
      setSearchResults(data.Products);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300); // Adding a debounce to limit the API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchProducts]);

  return (
    <div className={styles.container}>
      <Head>
        <title>EDMO | Avionics, Test Equipment, Install Supplies & Pilot Supplies</title>
        <meta
          name="description"
          content="EDMO, the most trusted name in aviation for aircraft electronics, install supplies, wire and cable, tooling, test equipment, tactical communication, pilot."
          key="desc"
        />
      </Head>

      <main>
        <Header />
        <h1 className={styles.title}>Search by Part-Number</h1>
        <div>

          <input className={styles.search} name="searchTerm" type="text" value={searchTerm} onChange={handleInputs} placeholder="Search" />
        </div>
        <ul className={styles.grid}>
          {loading ? (
            <p>Loading...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((result) => (
              <li key={result.ID} className={styles.card}>
                <Link href={`/product/SKU/${encodeURIComponent(result.SKU)}`}>
                  <a>
                    <div className={styles.containerImg}>
                      {result.Attachments.length === 0 || result.Attachments[0].DownloadUrl.includes("pdf") ? (
                        <span>No Photo</span>
                      ) : (
                        <Image className={styles.cardImg} src={result.Attachments[0].DownloadUrl} alt={result.Name} layout="fill" objectFit="contain" />
                      )}
                    </div>
                    <p className={styles.titleBold}>
                      <strong>{result.Name}</strong>
                    </p>
                    <p>SKU: {result.SKU}</p>
                  </a>
                </Link>
              </li>
            ))
          ) : searchTerm && !loading ? (
            <p>No products found.</p>
          ) : (
            <p>Type a product part-number to search.</p>
          )}
        </ul>
      </main>
    </div>
  );
}
