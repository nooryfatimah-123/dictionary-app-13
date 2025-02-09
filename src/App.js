import { useState , useEffect } from 'react';
import theme from './theme';
import {ThemeProvider , CssBaseline , Grid} from '@mui/material';
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import './App.css';
import Home from './Components/Home';
import BookMarks from './Components/BookMarks';
import Defines from './Components/Defines';

function App() {
  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || {});

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (word, definitions) => setBookmarks(oldBookmarks => ({
    ...oldBookmarks,
    [word]: definitions
  }))

  const removeBookmark = word => setBookmarks(oldBookmarks => {
    const temp = { ...oldBookmarks };
    delete temp[word];
    return temp;
  })
  return (
<ThemeProvider theme = {theme}>
  <CssBaseline/>
  <Grid container sx={{p :2 , mt:{xs:0 ,sm:2,}}} justifyContent="center">
  <Grid item xs={12}sm={8}md={5}lg={3} >
  <Router>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/bookmarks" element={<BookMarks bookmarks={bookmarks} />} />
    <Route path="/search/:word" element={<Defines bookmarks={bookmarks}
                    addBookmark={addBookmark}
                    removeBookmark={removeBookmark} />} />

    </Routes>
  </Router>
  </Grid>
  </Grid>
</ThemeProvider>
  );
}

export default App;
