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

export default function PurchasePrice({ value, index }) {
  const classes = useStyles();
  const [strawberry, setStrawberry] = useState("");
  const [apple, setApple] = useState("");
  const [result, setResult] = useState("");

  const handleStrawberryChange = (evt) => {
    setStrawberry(evt.target.value);
    setResult("");
  }

  const handleAppleChange = (evt) => {
    setApple(evt.target.value);
    setResult("");
  }

  const handleCalculation = (evt) => {
    evt.preventDefault();

    const floatStrawberry = parseFloat(strawberry);
    if (!floatStrawberry || floatStrawberry < 0) {
      setResult("Input correct weight");
      return;
    }
    
    const floatApple = parseFloat(apple);
    if (!floatApple || floatApple < 0) {
      setResult("Input correct height");
      return;
    }

    let sum = 0;
    if (floatStrawberry > 5)
      sum += floatStrawberry * 2.2;
    else
      sum += floatStrawberry * 2.5;
    
    if (floatApple > 5)
      sum += floatApple * 1.5;
    else
      sum += floatApple * 1.8;
    
    if (sum > 25 || (floatStrawberry + floatApple) > 8)
      sum = sum * 9 / 10;

    setResult(`Total is R$${sum}`);
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
            <Grid item sm={12} md={6} container justifyContent="center" wrap="nowrap">
              <Grid item container direction="column">
                <Typography component="h4" className={classes.subtitle}>Category</Typography>
                <Typography className={classes.element}>Strawberry</Typography>
                <Typography className={classes.element}>Apple</Typography>
              </Grid>
              <Grid item container direction="column">
                <Typography component="h4" className={classes.subtitle}>Up to 5 kg</Typography>
                <Typography className={classes.element}>R$ 2.50 per Kg</Typography>
                <Typography className={classes.element}>R$ 1.80 per Kg</Typography>
              </Grid>
              <Grid item container direction="column">
                <Typography component="h4" className={classes.subtitle}>Over 5 kg</Typography>
                <Typography className={classes.element}>R$ 2.20 per Kg</Typography>
                <Typography className={classes.element}>R$ 1.50 per Kg</Typography>
              </Grid>
            </Grid>
            <Grid item sm={12} md={6} container justifyContent="center">
              <form onSubmit={handleCalculation}>
                <FormControl component="fieldset">
                  <TextField id="input" label="Weight(Kg)" variant="outlined" className={classes.element} value={strawberry} onChange={handleStrawberryChange} />
                  <TextField id="input" label="Height(m)" variant="outlined" className={classes.element} value={apple} onChange={handleAppleChange} />
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
