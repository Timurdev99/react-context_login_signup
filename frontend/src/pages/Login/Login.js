import { makeStyles, CssBaseline, Paper, Box, Grid, TextField, Typography, Button, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import login from '../../helpers/APICalls/login';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(3),
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100%',
    paddingTop: 23,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#3a8dff',
    fontWeight: 'bold',
  },
}));

const validationSchema = Yup.object({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string('Enter your password')
        .required('Password is required'),
});

export default function Login() {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
    
  const { handleSubmit, handleChange, values, errors, touched, isSubmitting } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit(values) {
      login(values).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          updateLoginContext(data.success);
        } else {
          console.error({ data });
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  })

  return (
    <Grid container component="main" className={classes.root} justifyContent="center">
      <CssBaseline />
      <Grid item xs={12} sm={7} md={6} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <AuthHeader linkTo="/signup" asideText="Don't have an account?" btnText="Create account" />
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Welcome to our site
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                id="email"
                label={<Typography className={classes.label}>E-mail address</Typography>}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                name="email"
                autoComplete="email"
                autoFocus
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
                value={values.email}
                onChange={handleChange}
              />
              <TextField
                id="password"
                label={<Typography className={classes.label}>Password</Typography>}
                fullWidth
                margin="normal"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
                value={values.password}
                onChange={handleChange}
              />
              <Box textAlign="center">
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                  {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Login'}
                </Button>
              </Box>
              <div style={{ height: 95 }} />
            </form>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
