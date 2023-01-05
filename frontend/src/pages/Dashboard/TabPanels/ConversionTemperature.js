import React, {useState} from 'react';
import {
  makeStyles,
  Box,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: theme.spacing(3),
  },
  element: {
    margin: theme.spacing(1),
  },
  subtitle: {
    fontWeight: 'bold',
    margin: theme.spacing(1),
  }
}));

export default function ConversionTemperature({ value, index }) {
  const classes = useStyles();
  const [conversion, setConversion] = useState("0");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleConversionChange = (evt) => {
    setConversion(evt.target.value);
    setResult("");
  };

  const handleInputChange = (evt) => {
    setInput(evt.target.value);
    setResult("");
  }

  const handleCalculation = (evt) => {
    evt.preventDefault();
    const floatNumber = parseFloat(input);
    if (floatNumber) {
      setInput(floatNumber);
      setResult(conversion === "0" ? (floatNumber * 1.8 + 32) : ((floatNumber - 32) * 9 / 5));
    }
    else {
      setResult("Input correct number");
    }
  }

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`exercise-tabpanel-${index}`}
      aria-labelledby={`exercise-tab-${index}`}
    >
      {value === index && (
        <>
          <Typography component="h2" className={classes.title}>
            Conversion Celsius to Fahrenheit and vice versa
          </Typography>
          <Grid container>
            <Grid item sm={12} md={6} container direction="column" alignItems="center">
              <Typography component="h4" className={classes.subtitle}>Conversion Formulas:</Typography>
              <Typography className={classes.element}>F(Fahrenheit) = C x 1.8 + 32</Typography>
              <Typography className={classes.element}>C(Celsius) = 5 * (F - 32) / 9</Typography>
            </Grid>
            <Grid item sm={12} md={6} container justifyContent="center">
              <form onSubmit={handleCalculation}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Conversion Type</FormLabel>
                  <RadioGroup aria-label="Conversion Type" name="conversion-group" value={conversion} onChange={handleConversionChange}>
                    <FormControlLabel value="0" control={<Radio />} label="To Fahrenheit" />
                    <FormControlLabel value="1" control={<Radio />} label="To Celsius" />
                  </RadioGroup>
                  <TextField id="input" label="Temperature" variant="outlined" className={classes.element} value={input} onChange={handleInputChange} />
                  <Button type="submit" variant="outlined" color="primary" className={classes.element}>Calculate</Button>
                </FormControl>
              </form>
            </Grid>
            <Grid item sm={12} container justifyContent="center">
              <Typography className={classes.element}>Result: </Typography>
              <Typography className={classes.element}>{result}</Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
