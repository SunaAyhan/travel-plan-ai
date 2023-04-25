import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import QuestionForm from "./QuestionForm";
import { makeStyles } from "@mui/styles";
import GoogleFontLoader from "react-google-font-loader";
import { callGPTAPI } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Loading from './Loading';
import DrawerAppBar from "./AppBar";

const useStyles = makeStyles((theme) => ({
    img: {
        [theme.breakpoints?.down("md")]: {
            width: "100%",
            maxHeight: "30vh !important",
        },
        [theme.breakpoints?.up("md")]: {
            width: "100%",
            height: "50vh !important",
        },
    },

    root: {
        maxWidth: 400,
        flexGrow: 1,
    },

    dotActive: {
        backgroundColor: "white !important",
    },
}));

function SwipeableTextMobileStepper() {
    const navigate = useNavigate();

    const [destination, setDestination] = useState("");
    const [budget, setBudget] = useState("");
    const [duration, setDuration] = useState("");
    const [interests, setInterests] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [travelStyle, setTravelStyle] = useState("");
    const [transportation, setTransportation] = useState("");
    const [travelPlan, setTravelPlan] = useState("");

    const questions = [
        {
            question: "Where do you want to travel to?",
            label: "Destination Country",
            imgPath: "/travel.gif",
            onChange: setDestination,
        },
        {
            question: "What is your travel budget?",
            label: "Budget(with currency)",
            imgPath: "/money.gif",
            onChange: setBudget,
        },
        {
            question: "How many days have you set aside for your trip?",
            label: "Trip Duration(in days)",
            imgPath: "/duration.gif",
            onChange: setDuration,
        },
        {
            question: "What activities do you enjoy?",
            label: "Interests (e.g. Sports, Food, Shopping..)",
            imgPath: "/activity.gif",
            onChange: setInterests,
        },
        {
            question: "What type of accommodation do you prefer?",
            label: "Accommodation",
            imgPath: "/Target.gif",
            onChange: setAccommodation,
        },
        {
            question: "What type of travel style do you prefer?",
            label: "Travel Style ( e.g. Adventure, Nature, Culture ) ",
            imgPath: "/6.gif",
            onChange: setTravelStyle,
        },
        {
            question: "What mode of transportation do you prefer?",
            label: "Transportation Type",
            imgPath: "/Bus.gif",
            onChange: setTransportation,
        },
    ];
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = questions.length;
    const [loading, setLoading] = useState(false);
    let intervalId;

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };
    const handleNext = (event) => {
        if (activeStep === maxSteps - 1) {
            handleSubmit(event);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const input = `I want you to act as a travel guide. 
            Create a personalized travel itinerary for a trip to a specific destination,
            keeping in mind the traveler's budget, interests, preferred travel style, accommodation, and transportation.
           Please include details for each day such as recommended activities, restaurants, and local attractions to visit, along with estimated costs for each day. Additionally, include details on how to get around the destination, such as transportation options, and recommendations for accommodations that align with the traveler's preferences. Please provide a detailed itinerary that would make for a comfortable and enjoyable trip. 
            (Example:
                <div>
                <b style="color: #45b398"> Day 1: <br /> </b>
                <b> Transport: </b>  Fly into Barcelona El Prat Airport (BCN). Take the Aerobus to Plaça de Catalunya ($6).\n
                <b> Accomidation:</b>  Check into your budget-friendly Airbnb or hotel in the El Raval or Gothic Quarter neighborhoods ($60/night).\n
                <b>Places: </b> Walk around the Gothic Quarter, visiting Barcelona Cathedral, Plaça Reial, and Plaça de Sant Jaume.\n
                <b> Activities:</b>   Join a free walking tour of the Gothic Quarter (~$5-10 suggested tip for the guide).\n
                <b> Food:  </b> Have breakfast at Granja La Pallaresa (churros and hot chocolate, ~$10), lunch at Quimet & Quimet (tapas, ~$15), and dinner at La Taqueria (Mexican cuisine, ~$20). \n 
                <b>Estimated Cost: </b> $121\n  </div> 
                <hr class="dashed">
                <div>
                <b style="color: #45b398"> Day 2: <br /> </b>
                <b> Transport: </b>  Get a T-10 metro pass (~$11) for multiple rides on the metro, buses, and trams.\n
                <b>Places: </b> ...\n
                <b> Activities:</b>...\n
                <b> Food:  </b>... \n  Estimated Cost:  </b> $150 <br /> </div>
                
                )  \n\n The trip should last for a specified duration, and the final itinerary should be presented in an HTML format(you must write title's bold, add newline between days).
You should write plan for these informations: destination: ${destination}, budget: ${budget}, duration: ${duration}, interests: ${interests}, accommodation: ${accommodation}, travel style: ${travelStyle}, transportation: ${transportation} `;
            setLoading(true);
            const result = await callGPTAPI(input);
            setTravelPlan(result);
            navigate("/result", { state: { travelPlan: result } });
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        }
        finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        intervalId = setInterval(() => {
            setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
        }, 900000); // Change the interval time here to control the autoplay speed
        return () => {
            clearInterval(intervalId); // Clear interval when component unmounts or when user interacts
        };
    }, []);
    return (
        <Loading active={loading} >
            <DrawerAppBar />
            <Box
                sx={{
                    maxWidth: 450,
                    flexGrow: 1,
                    backgroundColor: "#45b398",
                    borderRadius: "1rem",
                    marginRight: "2rem",
                    marginLeft: "2rem",
                    marginTop: "4rem"
                }}
            >
                <GoogleFontLoader
                    fonts={[
                        {
                            font: "Cardo",
                            weights: [400, "400i"],
                        },
                    ]}
                    subsets={["cyrillic-ext", "greek"]}
                />
                {activeStep < maxSteps && (
                    <img className={classes.img} src={questions[activeStep].imgPath} />
                )}
                <Paper
                    square
                    elevation={0}
                    sx={{
                        borderRadius: "1rem",
                        padding: "1rem",

                        pl: 2,
                        backgroundColor: "#45b398",
                        color: "white",
                    }}
                >
                    {activeStep < maxSteps && (
                        <Typography
                            style={{
                                fontFamily: "Cardo",
                                padding: "1rem",
                                fontWeight: "bold",
                            }}
                        >
                            {questions[activeStep].question}
                        </Typography>
                    )}
                </Paper>

                <SwipeableViews
                    autoPlay={false}
                    style={{
                        width: "100%",
                        margin: "1rem",
                    }}
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    enableMouseEvents
                >
                    {questions.map((step, index) => (
                        <div key={step.question}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <QuestionForm
                                    question={step.question}
                                    label={step.label}
                                    onChange={step.onChange}
                                />
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    style={{
                        backgroundColor: "#45b398",
                        color: "white",
                        padding: "1rem",
                        borderRadius: "1rem",
                    }}
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    classes={{ dotActive: classes.dotActive }}
                    nextButton={
                        <Button
                            style={{
                                backgroundColor: "white",
                                color: "#45b398",
                                fontWeight: "bold",
                                ontFamily: "Cardo",
                                textTransform: "none",
                            }}
                            size="small"
                            onClick={(event) => handleNext(event)}
                        >
                            {activeStep === maxSteps - 1 ? "Submit" : "Next"}
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            style={{
                                backgroundColor: "white",
                                color: "#45b398",
                                fontWeight: "bold",
                                fontFamily: "Cardo",
                                textTransform: "none",
                            }}
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Loading>
    );
}

export default SwipeableTextMobileStepper;
