import { makeStyles } from "@mui/styles";
import backgroundImage from "../bgnew.jpg";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import DrawerAppBar from "../components/AppBar";
import Card from "@mui/material/Card";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
const useStyles = makeStyles({
    root: {
        margin: "0px ",
        padding: "1.2rem",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
    },
    title: {
        padding: "0px",
        fontSize: "50px",
        fontWeight: "bold",
    },
    card: {
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        backgroundColor: "white",
        opacity: "0.8",
        height: "90vh",
        marginTop: "4rem",
        width: "50vw",
        overflow: "auto !important",
        maxHeight: "80vh",
    },
});

function Result() {
    const navigate = useNavigate();
    const location = useLocation();
    const travelPlan =
        location.state?.travelPlan.replace(/\n\n/g, "<br>") ||
        "No travel plan available";

    function handleClick() {
        navigate("/questions");
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <DrawerAppBar />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Card className={classes.card}>
                    <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{ __html: travelPlan }}
                    />
                </Card>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {" "}
                <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={handleClick}
                    style={{
                        marginTop: "0.5rem",
                        fontSize: "16px",
                        textTransform: "none",
                        backgroundColor: "#45b398",
                        color: "white",
                        fontWeight: "bold",
                        border: "3px solid white",
                    }}
                >
                    Create Another Plan
                </Button>
            </div>
        </div>
    );
}

export default Result;
