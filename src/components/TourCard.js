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
                        color: "#45b398",
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
                    <img height={"200vh"} src={data.pictures[1]} />
                    <br />

                    {/* print first 100 letters of description */}
                    {data.description?.slice(0, 100) + "..."}
                </p>


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
