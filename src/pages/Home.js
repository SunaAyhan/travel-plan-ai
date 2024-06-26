
import { makeStyles } from '@mui/styles';
import backgroundImage from '../bgnew.jpg';
import { Button, Card } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import AnimatedButon from '../components/AnimatedButton';
const useStyles = makeStyles({
    root: {
        margin: "0px ",
        padding: "1.2rem",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        height: "100vh",


    },
    title: {
        padding: "0px",
        fontSize: "40px",
        fontWeight: "bold",
        color: 'white'
    },
    card: {
        opacity: "0.9",
        padding: "20px",
        backgroundColor: "#45b398 !important",
        borderRadius: "30px !important",

    },

});





function Home() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/questions');
    }
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
                width: "100%",


            }} > <Card className={classes.card} ><p className={classes.title} >Travel Planning Made Easy </p></Card>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }} >
                    <AnimatedButon onClick={handleClick} />
                </div>
                {/* <Button style={{
                    backgroundColor: "#45b398",
                    color: "white",
                    fontSize: "20px",

                    fontWeight: "bold",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",

                    bottom: "100px",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }} className={classes.button} onClick={handleClick} >Get Started <ArrowForwardIcon style={{
                    fontSize: "30px", marginLeft: "10px"
                }} /> </Button> */}
            </div>

        </div>
    );
}

export default Home;
