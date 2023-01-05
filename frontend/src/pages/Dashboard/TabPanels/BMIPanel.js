import React, {useState} from 'react';
import {
  makeStyles,
  Box,
  Typography,
  Grid,
  FormControl,
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

export default function BMIPanel({ value, index }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setResult("");
  };

  const handleWeightChange = (evt) => {
    setWeight(evt.target.value);
    setResult("");
  }

  const handleHeightChange = (evt) => {
    setHeight(evt.target.value);
    setResult("");
  }

  const handleCalculation = (evt) => {
    evt.preventDefault();
    if (name === "") {
      setResult("Input name");
      return;
    }

    const floatWeight = parseFloat(weight);
    if (!floatWeight) {
      setResult("Input correct weight");
      return;
    }
    
    const floatHeight = parseFloat(height);
    if (!floatHeight) {
      setResult("Input correct height");
      return;
    }

    const bmi = weight / (height * height);
    const prefix = `${name} has`;
    if (bmi < 18.5)
      setResult(`${prefix} underweight`);
    else if (bmi < 25)
      setResult(`${prefix} normal weight`);
    else if (bmi < 30)
      setResult(`${prefix} overweight`);
    else
      setResult(`${prefix} obesity`);
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
            Calculate the Person's BMI Body Mass Index (BMI)
          </Typography>
          <Grid container>
            <Grid item sm={12} md={6} container direction="column" alignItems="center">
              <Typography component="h4" className={classes.subtitle}>Conversion Formulas:</Typography>
              <Typography>{"{BMI} = {weight}/{height}^2"}</Typography>
              <Typography className={classes.element} />
              <Typography component="h4" className={classes.subtitle}>CATEGORY BMI RANGE</Typography>
              <Box>
                <Typography>{"BMI < 18.5 : Underweight"}</Typography>
                <Typography>{"BMI < 25 : Normal Weight"}</Typography>
                <Typography>{"BMI < 30 : Overweight"}</Typography>
                <Typography>{"BMI > 30 : Obesity"}</Typography>
              </Box>
            </Grid>
            <Grid item sm={12} md={6} container justifyContent="center">
              <form onSubmit={handleCalculation}>
                <FormControl component="fieldset">
                  <TextField id="input" label="Name" variant="outlined" className={classes.element} value={name} onChange={handleNameChange} />
                  <TextField id="input" label="Weight(Kg)" variant="outlined" className={classes.element} value={weight} onChange={handleWeightChange} />
                  <TextField id="input" label="Height(m)" variant="outlined" className={classes.element} value={height} onChange={handleHeightChange} />
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
