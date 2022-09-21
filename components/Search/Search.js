import { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
      width: 250,
      "& .MuiOutlinedInput-input": {
        color: "green"
      },
      "& .MuiInputLabel-root": {
        color: "#000"
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#000"
      },
      "&:hover .MuiInputLabel-root": {
        color: "#000"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#000"
       
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#000"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000"
      }
    }
  });


export default function SearchButton() {
  const [product, setProduct] = useState('');
  const router = useRouter();
  const classes = useStyles();

    useEffect(() => {
    window.scroll(0, 0);
    if (product === 10) router.push("/search");
    else if (product === 20) router.push("/search-part-number");   
  }, [product, router]);

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  return (
    <Box  className={classes.root} sx={{ width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', marginX: 'auto', borderColor: '#000', marginBottom: '40px', '&:focus' :{borderColor: '#000'}} }>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label1">Search a Product by</InputLabel>
        <Select
         labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={product}
          label="Search a Product by"
          onChange={handleChange} 
        >
          <MenuItem value={10}>Name</MenuItem>
          <MenuItem value={20}>Part-Number</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
  );
}
