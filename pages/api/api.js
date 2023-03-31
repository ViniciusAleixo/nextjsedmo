export default async function handler(req, res) {
  try{
     const data = await feach('https://inventory.dearsystems.com/ExternalApi/v2/Product' , {param: req.body.param}, 
     {
      headers: {
        "Content-Type": 'application/json',
        "api-auth-accountid": process.env.REACT_APP_API_ID,
        "api-auth-applicationkey": process.env.REACT_APP_API_KEY,
      },
    }
     );


    
      res.status(200).json(data)
   } catch (error) {
      console.error(error)
      return res.status(error.status || 500).end(error.message)
    }
  }