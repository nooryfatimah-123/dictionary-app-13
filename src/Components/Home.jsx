import React, { useState } from 'react';
import bookIcon from './../images/book1.png';
import {Box , Typography , FilledInput, IconButton } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {useNavigate , Link} from 'react-router-dom';


const Home = () => {
  const [word, setWord] = useState("")
  // const theme = useTheme()
    const navigate = useNavigate()
  const handleSubmit =(event)=>{
    event.preventDefault();
    const trimmedWord = word.trim().toLowerCase();
        if (!trimmedWord || trimmedWord.split(' ').length > 1) return;
        navigate(`/search/${trimmedWord}`);
  }
  return (
   <Box sx = {{
     display:'flex',
     flexDirection :'column',
     alignItems :'center',
     justifyContent :'center',
     height: '90vh' 
   }}>
   <img src={bookIcon}alt="book" style={{ width: '275px', height: 'auto' }} 
   />
   <Typography 
   color="primary"
    sx={{
    mt:'3',
    mb:'1' ,
   }}variant='h4'>Dictionary</Typography>
   <Typography color='GrayText' sx={{
    mb :'2px' ,
   }}>Find Meanings and Save for Quick Reference</Typography>
   <Box sx={{width:"360px"}}> 
   <form onSubmit={handleSubmit}>
   <FilledInput 
   value={word}
   onChange={event => setWord(event.target.value)}
   
   disableUnderline placeholder ='Search Word Here...'
   sx={{   
          my: 4,
          backgroundColor:'white' ,
          borderRadius: 2,
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
          '& .MuiFilledInput-input' :{
            p :2,
          }
        }}startAdornment={<SearchIcon color="disabled" />}
           fullWidth/>
           </form>
           </Box>
   <IconButton to="/bookmarks" component={Link} sx={{
       borderRadius: 2 ,
       p:2 , 
       color:'white',
       background:'linear-gradient(138.72deg,rgb(209, 162, 97) 10%,rgb(138, 81, 54) 95.83%)',
      // backgroundColor:'#BA714E',
       boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
   }}>
    <BookmarkIcon/>
   </IconButton>

   </Box>
  )
}

export default Home ;
