import * as React from 'react';
import DrawerAppBar from './AppBar';
import TourCard from './TourCard';

export default function Activities() {

    const tourCardsData = [
        {
            name: "Tour Name 1",
            imageSrc: "turs/1.jpg",
            rating: 4,
        },
        {
            name: "Tour Name 2",
            imageSrc: "turs/2.jpg",
            rating: 4.5,
        },
        {
            name: "Tour Name 3",
            imageSrc: "turs/3.jpg",
            rating: 3.5,
        },
        {
            name: "Tour Name 4",
            imageSrc: "turs/4.jpg",
            rating: 5,
        },
    ];
    return (
        <div
            style={{
                padding: "1rem ",
            }}
        >
            <DrawerAppBar />
            <div style={{ height: "75vh", overflow: "auto" }}>
                {tourCardsData.map((tourCardData, index) => (
                    <TourCard key={index} data={tourCardData} />
                ))}
            </div>
        </div>
    );
}
