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

export default function HotelCard({ data }) {
    return (
        <>
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
                <BasicRating value={data.rating} />
                <img width={"100%"} src={data.imageSrc} />
                <Button
                    style={{
                        backgroundColor: "#45b398",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        textTransform: "none",
                        marginTop: "10px",
                    }}
                >
                    Harita <ArrowForwardIcon />
                </Button>
            </Card>
        </>
    );
}
