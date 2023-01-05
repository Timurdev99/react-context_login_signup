import React, {useState} from 'react';
import {
  makeStyles,
  Box,
  Paper,
  AppBar,
  CircularProgress,
  Tabs,
  Tab,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import ConversionTemperature from './TabPanels/ConversionTemperature';
import BMIPanel from './TabPanels/BMIPanel';
import PurchasePrice from './TabPanels/PurchasePrice';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(5),
  },
  paper: {
    height: '100%',
    position: 'relative',
  },
  topbar: {
    position: 'relative',
  },
  swipe: { 
    padding: theme.spacing(2),  
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const history = useHistory();
  const [value, setValue] = useState(0);

  const handleChange = (evt, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const a11yProps = (index) => {
    return {
      id: `exercise-tab-${index}`,
      'aria-controls': `exercise-tabpanel-${index}`,
    };
  }

  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper} elevation={5}>
        <AppBar className={classes.topbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="Exercises"
          >
            <Tab label="Conversion between Celsius and Fahrenheit" {...a11yProps(0)} />
            <Tab label="BMI Calculation" {...a11yProps(1)} />
            <Tab label="Purchase Price" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.swipe}
        >
          <ConversionTemperature value={value} index={0} />
          <BMIPanel value={value} index={1} />
          <PurchasePrice value={value} index={2} />
        </SwipeableViews>
      </Paper>
    </Box>
  );
}
