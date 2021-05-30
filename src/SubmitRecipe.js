import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputAdornment } from '@material-ui/core';
import Recipe from './model/recipe.model'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";

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
      .string('Enter a name for the recipe')
      .required('Name is required')
      .max(80, 'Name should be of maximum 80 characters'),
    shortDescription: yup
      .string('Enter a short description')
      .required('Short description is required')
      .max(256, 'Short description should be of maximum 256 characters'),
    prepTime: yup
      .number('Enter preparation time in minutes')
      .required('Preparation time is required')
      .positive('Preparation time should be a positive number'),
    products: yup
      .string('Enter products')
      .required('Products are required'),
    pictureUrl: yup
      .string('Enter picture url')
      .url('Enter a valid url')
      .required('Picture url is required'),
    longDescription: yup
      .string('Enter a long description')
      .required('Long description is required')
      .max(2048, 'Long description should be of maximum 2048 characters'),
    tags: yup
      .string('Enter tags')
      .required('Tags are required'),
});

export default function SubmitRecipe({loggedInUser, onSubmitRecipe}) {
  const classes = useStyles();
  let history = useHistory()

  useEffect(() => {
    if (!loggedInUser) {
      history.push('/sign-in')
    }
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      shortDescription: '',
      prepTime: '',
      products: '',
      pictureUrl: '',
      longDescription: '',
      tags: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const recipe = new Recipe(loggedInUser.id, values.name, values.shortDescription, values.prepTime, values.products, values.pictureUrl, values.longDescription, values.tags)
      onSubmitRecipe(recipe)
      history.push("/recipes")
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Submit a recipe
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
                id="shortDescription"
                label="Short Description"
                name="shortDescription"
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
                helperText={formik.touched.shortDescription && formik.errors.shortDescription}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="prepTime"
                label="Preparation Time"
                type="number"
                id="prepTime"
                value={formik.values.prepTime}
                onChange={formik.handleChange}
                error={formik.touched.prepTime && Boolean(formik.errors.prepTime)}
                helperText={formik.touched.prepTime && formik.errors.prepTime}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="products"
                label="Products"
                type="text"
                id="products"
                value={formik.values.products}
                onChange={formik.handleChange}
                error={formik.touched.products && Boolean(formik.errors.products)}
                helperText={formik.touched.products && formik.errors.products}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="pictureUrl"
                label="Picture URL"
                type="text"
                id="pictureUrl"
                value={formik.values.pictureUrl}
                onChange={formik.handleChange}
                error={formik.touched.pictureUrl && Boolean(formik.errors.pictureUrl)}
                helperText={formik.touched.pictureUrl && formik.errors.pictureUrl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                fullWidth
                name="longDescription"
                label="Long Description"
                type="text"
                rows={4}
                id="longDescription"
                value={formik.values.longDescription}
                onChange={formik.handleChange}
                error={formik.touched.longDescription && Boolean(formik.errors.longDescription)}
                helperText={formik.touched.longDescription && formik.errors.longDescription}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="tags"
                label="Tags"
                type="text"
                id="tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
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
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
