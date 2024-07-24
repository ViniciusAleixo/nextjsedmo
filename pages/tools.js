import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header/Header";
import SearchButton from "../components/Search/Search";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const fetchProducts = async (page, products = []) => {
    const res = await fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=${page}&IncludeAttachments=true&limit=1000`, {
        headers: {
            "api-auth-accountid": process.env.REACT_APP_API_ID,
            "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
        },
    });

    if (!res.ok) {
        console.error(`Failed to fetch page ${page}: ${res.statusText}`);
        return products; // return the products fetched so far
    }

    const text = await res.text();
    let result;

    try {
        result = JSON.parse(text);
    } catch (error) {
        console.error(`Failed to parse JSON for page ${page}: ${text}`);
        return products; // return the products fetched so far
    }

    products.push(...result.Products);

    if (result.Products.length === 100) {
        return fetchProducts(page + 1, products);
    } else {
        return products;
    }
};

export async function getServerSideProps({ query: { page = 1 } }) {
    const currentPage = parseInt(page, 10) || 1;
    const allProducts = await fetchProducts(1);
    const filteredProducts = allProducts.filter((obj) => obj.Category.includes("Tools"));

    const productsPerPage = 10;
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const data = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    return {
        props: {
            data,
            page: currentPage,
            totalPages,
        },
    };
}

export default function Home({ page, data, totalPages }) {
    const router = useRouter();

    const handlePagination = (direction) => {
        const newPage = page + direction;
        if (newPage > 0 && newPage <= totalPages) {
            router.push(`/tools/?page=${newPage}`);
        }
    };

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
                <h1 className={styles.title}>Tools</h1>
                <SearchButton />
                <ul className={styles.grid}>
                    {data.map((result) => (
                        <li key={result.ID} className={styles.card}>
                            <Link href={`/product/${encodeURIComponent(result.Name)}`}>
                                <a>
                                    <div className={styles.containerImg}>
                                        {result.Attachments.length === 0 ? (
                                            <span>No Photo</span>
                                        ) : (
                                            <Image
                                                className={styles.cardImg}
                                                src={result.Attachments[0].DownloadUrl}
                                                alt={result.Name}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        )}
                                    </div>
                                    <p className={styles.titleBold}><strong>{result.Name}</strong></p>
                                    <p>Category: {result.Category}</p>
                                    <p>SKU: {result.SKU}</p>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={styles.pagination}>
                <div className={styles.nextPrevious}>
                    <button
                        onClick={() => handlePagination(-1)}
                        disabled={page <= 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePagination(1)}
                        disabled={page >= totalPages}
                    >
                        Next
                    </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
