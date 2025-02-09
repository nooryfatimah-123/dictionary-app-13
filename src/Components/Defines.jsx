import React from 'react';
import {Stack , Typography , Box , IconButton , Divider, CircularProgress, Button, styled} from '@mui/material';
import BackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkedIcon from "@mui/icons-material/BookmarkRounded";
import PlayIcon from "@mui/icons-material/PlayArrow";
import { useParams , useNavigate } from 'react-router-dom';
import { useEffect , useState  , Fragment} from 'react';
import axios from 'axios';

const AlignCenterBox = styled(Box)(({ theme }) => ({ ...theme.mixins.alignInTheCenter }))

const Defines = ({bookmarks , addBookmark, removeBookmark}) => {
  const {word}= useParams();
  const navigate=useNavigate();
  const [definitions, setDefinitions] = useState([])
  const [exist, setExist] = useState(true)
  const [audio, setAudio] = useState(null)

  const isBookmarked = Object.keys(bookmarks).includes(word)

    const updateState = data => {
        setDefinitions(data)
        const phonetics = data[0].phonetics
        if (!phonetics.length) return;
        const url = phonetics[0].audio.replace('//ssl', 'https://ssl');
        setAudio(new Audio(url));
    }


  const handleGoBack = () => {
    navigate(-1); 
  };

  useEffect(()=>{
    const fetchDefinition = async () => {
      try {
          const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          updateState(resp.data)
      } catch (err) {
          setExist(false)
      }
  }

  if (!isBookmarked) fetchDefinition()
  else updateState(bookmarks[word])

  }, [])

  if (!exist) return <AlignCenterBox>
  <Typography sx={{ fontSize: "24px", fontWeight:'800' }}>Word Not Found</Typography>
  <Button variant="contained" sx={{ textTransform: 'capitalize', mt: 2 }} onClick={handleGoBack}>Go back</Button>
</AlignCenterBox>

if (!definitions.length) return <AlignCenterBox ><CircularProgress sx={{ animationDuration: "8s" }} /></AlignCenterBox>

  
  return (
    <>
    <Stack direction="row" justifyContent="space-between">
    <IconButton>
      <BackIcon sx={{color : 'black'}}
      onClick={handleGoBack}/>
    </IconButton>

    <IconButton onClick={() => isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)}>
                    {isBookmarked ? <BookmarkedIcon sx={{ color: 'black' }} /> : <BookmarkIcon sx={{ color: 'black' }} />}
                </IconButton>
    </Stack>
    <Stack direction="row" alignItems="center"justifyContent="space-between" sx={{
      mt: 3,
      backgroundColor :'#F8E9D4' ,
      boxShadow: '0px 10px 20px rgba(19, 23, 71, 0.25)',
      px: 4,
      py: 5,
      color: 'black',
      borderRadius: 2,
    }}>
      <Typography sx={{textTransform :"capitalize"}} variant='h4'>{word}</Typography>
      {audio &&<IconButton onClick={() => audio.play()} sx={{
                    borderRadius: 2,
                    p: 1,
                    color: '#fff',
                    background:  theme => theme.palette.pink,
                }} ><PlayIcon/></IconButton>}
    </Stack>

    {definitions.map((def, idx) =>
                <Fragment key={idx}>
                    <Divider sx={{ display: idx === 0 ? 'none' : 'block', my: 3 }} />
                    {def.meanings.map(meaning =>
                        <Box key={Math.random()} sx={{
                            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                            backgroundColor: '#fff',
                            p: 2,
                            borderRadius: 2,
                            mt: 3
                        }}>
                            <Typography sx={{ textTransform: 'capitalize' }} color="GrayText" variant="subtitle1">{meaning.partOfSpeech}</Typography>
                            {meaning.definitions.map((definition, idx) => <Typography sx={{ my: 1 }} variant="body2" color="GrayText" key={definition.definition}>{meaning.definitions.length > 1 && `${idx + 1}. `} {definition.definition}</Typography>)}
                        </Box>
                    )}
                </Fragment>
            )}




    </>
  )
}

export default Defines;
