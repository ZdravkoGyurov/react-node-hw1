import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import * as yup from 'yup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouteLink, useHistory } from "react-router-dom";
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { useState } from 'react';
import { User } from '../model/user.model';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  username: yup
    .string('Enter your username')
    .required('Username is required')
    .max(15, 'Username should be of maximum 15 characters'),
  password: yup
    .string('Enter your password')
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should be of minimum 8 characters, one uppercase, one lowercase, one number and one special case character"),
  avatarUrl: yup
    .string('Enter a url for your avatar')
    .url('Enter a valid url'),
  description: yup
    .string('Enter information about yourself')
    .required('Description is required')
    .max(512, 'Description should be of maximum 512 characters'),
});

export default function SignUp({loggedInUser, onAddUser}) {
  const classes = useStyles();
  let history = useHistory()

  useEffect(() => {
    if (loggedInUser) {
        history.push('/recipes')
    }
  })

  const [gender, setGender] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      avatarUrl: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user = new User(values.name, values.username, values.password, gender, isAdmin, values.avatarUrl, values.description)
      try {
        onAddUser(user)
        history.push('/sign-in')
      } catch (e) {
        alert(e.message)
      }
    },
  });
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="avatarUrl"
                label="Avatar URL"
                type="text"
                id="avatarUrl"
                value={formik.values.avatarUrl}
                onChange={formik.handleChange}
                error={formik.touched.avatarUrl && Boolean(formik.errors.avatarUrl)}
                helperText={formik.touched.avatarUrl && formik.errors.avatarUrl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xl={12}>
                <FormControl component="fieldset">
                  <RadioGroup onChange={e => setGender(e.target.value)} aria-label="gender" name="gender">
                      <FormControlLabel value="male" control={<Radio required />} label="Male" />
                      <FormControlLabel value="female" control={<Radio required />} label="Female" />
                  </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                    <Checkbox
                        onChange={() => setIsAdmin(!isAdmin)}
                        value={isAdmin}
                        name="role"
                        color="secondary"
                        checked={isAdmin}
                    />
                    }
                    label="Admin"
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouteLink} to={'/sign-in'} variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
