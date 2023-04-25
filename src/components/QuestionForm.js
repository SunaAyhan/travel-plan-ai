


import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import { useState } from 'react';

import GoogleFontLoader from 'react-google-font-loader';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingOverlay from 'react-loading-overlay';

const useStyles = makeStyles({
    form: {
        padding: "0px",
        fontSize: "50px",
        fontWeight: "bold",
        width: "100%",
    },
    label: {
        color: 'white',
        fontFamily: 'Cardo',

    },
    input: {
        width: "90%",
        padding: "15px",
        borderRadius: "5px",
        border: 'none',
        outline: 'none',
        fontFamily: 'Cardo',

    },


});

function QuestionForm({ label, question, onChange }) {
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setLoading(true);
        onChange(event.target.value);
        setLoading(false);
    };

    const classes = useStyles();

    return (
        <div >
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Cardo',
                        weights: [400, '400i'],
                    },

                ]}
                subsets={['cyrillic-ext', 'greek']}
            />
            <LoadingOverlay
                active={loading}
                spinner={<CircularProgress />}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }),
                }}
            >

                <form className={classes.form} action="/action_page.php">
                    {/* <Grid container>     <label className={classes.label} for="fname">Location</label></Grid> */}
                    <Grid container>    <input type="text" onChange={handleInputChange} className={classes.input} id="fname" name="firstname" placeholder={label} />

                    </Grid>




                </form>

            </LoadingOverlay>
        </div>
    );
}



export default QuestionForm;