
import { makeStyles } from '@mui/styles';
import backgroundImage from '../5.jpg';
import SwipeableTextMobileStepper from '../components/StepperAutoPlay';
import DrawerAppBar from '../components/AppBar';

const useStyles = makeStyles({
    root: {
        margin: "0px ",
        padding: "1.2rem",
        // backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        height: "100vh",


    },
    title: {
        padding: "0px",
        fontSize: "50px",
        fontWeight: "bold",


    },

});





function Question() {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <DrawerAppBar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                padding: '1rem',
                marginTop: '3rem',
            }} >     <SwipeableTextMobileStepper /></div>




        </div>
    );
}

export default Question;
