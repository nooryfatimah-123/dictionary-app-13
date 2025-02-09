import {createTheme} from '@mui/material';

    export default createTheme({

        palette: {
            background: {
                default: '#F1F3F4',
            },
            primary: {
                main: "#5B5619",
            },
            pink: 'linear-gradient(138.72deg,rgb(209, 162, 97) 10%, #B9704D 95.83%)'
            
        },
        typography: {
            fontFamily: 'Mulish, sans-serif',
            h4: {
                fontWeight: 800
            },
            h5: {
                fontWeight: 800
            },
            h6: {
                fontWeight: 800
            },
            subtitle1: {
                fontWeight: 800
            },
    
        },
        mixins: {
            alignInTheCenter: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }
        }



    })