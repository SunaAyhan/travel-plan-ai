import * as React from "react";
import DrawerAppBar from "./AppBar";
import HotelCard from "./HotelCard";
import { getHotels } from "../api";
import { useLocation } from "react-router-dom";

export default function HotelList() {
    
    //Get the data from the API
    const [hotelCardsData, setHotelCardsData] = React.useState([]);
    const location = useLocation();
    const city = location.state?.city;
    console.log(city);
    React.useEffect(() => {
        getHotels(city).then((data) => {
            console.log(data);
            setHotelCardsData(data.data);
        });
    }, []);

    // const hotelCardsData = [
    //     {
    //         name: "Hotel Name 1",
    //         imageSrc: "hotels/1.jpg",
    //         rating: 4.5,
    //     },
    //     {
    //         name: "Hotel Name 2",
    //         imageSrc: "hotels/2.jpg",
    //         rating: 4,
    //     },
    //     {
    //         name: "Hotel Name 3",
    //         imageSrc: "hotels/3.jpg",
    //         rating: 3.5,
    //     },
    //     {
    //         name: "Hotel Name 4",
    //         imageSrc: "hotels/4.jpg",
    //         rating: 5,
    //     },
    // ];

    return (
        <div
            style={{
                padding: "1rem ",
                
            marginTop: "10vh",
            }}
        >
            <DrawerAppBar />
            <div style={{ height: "75vh", overflow: "auto" }}>
                {hotelCardsData.map((hotelCardData, index) => (
                    <HotelCard key={index} data={hotelCardData} />
                ))}
            </div>
        </div>
    );
}
