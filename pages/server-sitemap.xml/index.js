
import { GetServerSideProps } from "next";
import { getServerSideSitemap } from 'next-sitemap';


export const getServerSideProps = async (context) => {
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
          fetch(`https://inventory.dearsystems.com/ExternalApi/v2/Product?page=6&IncludeAttachments=true&limit=1`,
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

    const fields = data.map((product) => ({
        loc: `https://products.edmoap.com.au/product/${encodeURIComponent(product.Name).replaceAll('%2F','%252F').replaceAll('))', '%29%29').replaceAll('%20', '%2520').replaceAll('(', '%28').replaceAll('#','%2523').replaceAll('%23', '%2523').replaceAll('%7C', '%257C')}`, lastmod: new Date().toISOString(),
    }));


    return getServerSideSitemap(context, fields)
}

export default function Site() {

}

