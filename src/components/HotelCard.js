import * as React from "react";
import DrawerAppBar from "./AppBar";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
export default function HotelCard() {
    return (
        <>
            <Card
                style={{
                    padding: "30px",
                    textAlign: "center",
                    marginTop: "20px",

                }}
            >
                <p style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",

                }} >Hotel Name</p>
                <BasicRating />
                <img width={"100%"} src="hotels/1.jpg" />
                <Button style={{
                    backgroundColor: "#45b398",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    textTransform: "none",
                    marginTop: "10px",
                }} >Harita <ArrowForwardIcon /> </Button>
            </Card>
        </>
    );
}
