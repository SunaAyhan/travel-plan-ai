import * as React from "react";
import DrawerAppBar from "./AppBar";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CardActions,
    CardActionArea,
    Grid,
    Box,
    useTheme,
} from "@mui/material";
import BasicRating from "./Rating";

export default function TourCard({ data }) {
    return (
        <div style={{
            
            marginTop: "10vh",
        }} >
            <Card
                style={{
                    padding: "30px",
                    textAlign: "center",
                    marginTop: "20px",
                }}
            >
                <p
                    style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                    }}
                >
                    {data.name}
                </p>
                {/* description */}
                <p
                    style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        textAlign: "center",
                    }}
                >
                    {data.description}
                </p>
                
                
                <img width={"80%"} src={data.imageSrc} />
                <Button
                    style={{
                        backgroundColor: "#45b398",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        textTransform: "none",
                        marginTop: "10px",
                    }}
                    onClick={() => { 
                        window.location.href = data.bookingLink;
                    }}
                >
                    Katıl <ArrowForwardIcon />
                </Button>
            </Card>
        </div>
    );
}
