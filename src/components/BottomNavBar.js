import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import SwipeableTextMobileStepper from './StepperAutoPlay';
import HotelList from './Hotels';
import Activities from './Activities';

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);

    const renderTabContent = (value) => {
        switch (value) {
            case 0:
                return <SwipeableTextMobileStepper />;
            case 1:
                return <HotelList />;
            case 2:
                return <Activities />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{
            pb: 7,
            marginTop: "10vh",
            overflow: "hidden",
        }} ref={ref}>
            <CssBaseline />
            {renderTabContent(value)}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={2}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        console.log(newValue);
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction sx={{
                        "& .Mui-selected": {
                            color: '#45b398',
                            fontWeight: 'bold',
                        }
                    }} label="Create Plan" />
                    <BottomNavigationAction sx={{
                        "& .Mui-selected": {
                            color: '#45b398',
                            fontWeight: 'bold',
                        }
                    }} label="Hotel List" />
                    <BottomNavigationAction sx={{
                        "& .Mui-selected": {
                            color: '#45b398',
                            fontWeight: 'bold',
                        }
                    }} label="Tour&Activities" />

                </BottomNavigation>
            </Paper>
        </Box>
    );
}
