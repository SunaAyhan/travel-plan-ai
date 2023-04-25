import * as React from 'react';
import DrawerAppBar from './AppBar';
import HotelCard from './HotelCard';

export default function HotelList() {


    return (
        <div style={{
            padding: "1rem ",

        }} >

            <DrawerAppBar />


            <div style={{ height: '75vh', overflow: 'auto' }}>
                <HotelCard />
                <HotelCard />
            </div>
        </div>
    );
}
