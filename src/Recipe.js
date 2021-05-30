import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from "react";
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import * as yup from 'yup';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
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

const Recipe = ({loggedInUser, recipe, onEditRecipe, onDeleteRecipe}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false)

    const formik = useFormik({
        initialValues: {
          name: recipe.name,
          shortDescription: recipe.shortDescription,
          prepTime: recipe.prepTime,
          products: recipe.products,
          pictureUrl: recipe.pictureUrl,
          longDescription: recipe.longDescription,
          tags: recipe.tags,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const r = JSON.parse(JSON.stringify(recipe));
            r.name = values.name
            r.shortDescription = values.shortDescription
            r.prepTime = values.prepTime
            r.products = values.products
            r.pictureUrl = values.pictureUrl
            r.longDescription = values.longDescription
            r.tags = values.tags
            onEditRecipe(recipe.id, r)
            setOpen(false)
        },
      });

    const handleEditRecipe = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        formik.setFieldValue('name', recipe.name)
        formik.setFieldValue('shortDescription', recipe.shortDescription)
        formik.setFieldValue('prepTime', recipe.prepTimeMinutes)
        formik.setFieldValue('products', recipe.products)
        formik.setFieldValue('pictureUrl', recipe.pictureUrl)
        formik.setFieldValue('longDescription', recipe.longDescription)
        formik.setFieldValue('tags', recipe.tags)
        setOpen(false)
    };

    const handleDeleteRecipe = () => {
        onDeleteRecipe(recipe.id)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault()
        formik.handleSubmit()
    }

    return (
        <Grid item>
            <Card className={classes.root}>
                <CardHeader
                    title={recipe.name}
                    subheader={new Date(recipe.sharedOn).toUTCString().split(' ').splice(0, 4).join(' ')}
                />
                <CardMedia
                    className={classes.media}
                    image={recipe.pictureUrl}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {recipe.shortDescription}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {loggedInUser && (loggedInUser.role ||  loggedInUser.id === recipe.userId) ? 
                        <div>
                            <IconButton onClick={handleEditRecipe}>
                                <EditIcon></EditIcon>
                            </IconButton>
                            <IconButton onClick={handleDeleteRecipe}>
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        </div>
                     : null}
                    <IconButton
                        className={clsx(classes.expand, {[classes.expandOpen]: expanded})}
                        onClick={handleExpandClick}
                        aria-expanded="false"
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {recipe.products}
                        </Typography>
                        <Typography paragraph>
                            {recipe.longDescription}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit recipe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        margin="dense"
                        id="shortDescription"
                        name="shortDescription"
                        label="Short Description"
                        type="text"
                        fullWidth
                        value={formik.values.shortDescription}
                        onChange={formik.handleChange}
                        error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
                        helperText={formik.touched.shortDescription && formik.errors.shortDescription}
                    />
                    <TextField
                        margin="dense"
                        id="prepTime"
                        name="prepTime"
                        label="Preparation Time"
                        type="number"
                        fullWidth
                        value={formik.values.prepTime}
                        onChange={formik.handleChange}
                        error={formik.touched.prepTime && Boolean(formik.errors.prepTime)}
                        helperText={formik.touched.prepTime && formik.errors.prepTime}
                    />
                    <TextField
                        margin="dense"
                        id="products"
                        name="products"
                        label="Products"
                        type="text"
                        fullWidth
                        value={formik.values.products}
                        onChange={formik.handleChange}
                        error={formik.touched.products && Boolean(formik.errors.products)}
                        helperText={formik.touched.products && formik.errors.products}
                    />
                    <TextField
                        margin="dense"
                        id="pictureUrl"
                        name="pictureUrl"
                        label="Picture URL"
                        type="text"
                        fullWidth
                        value={formik.values.pictureUrl}
                        onChange={formik.handleChange}
                        error={formik.touched.pictureUrl && Boolean(formik.errors.pictureUrl)}
                        helperText={formik.touched.pictureUrl && formik.errors.pictureUrl}
                    />
                    <TextField
                        margin="dense"
                        id="longDescription"
                        name="longDescription"
                        label="Long Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={formik.values.longDescription}
                        onChange={formik.handleChange}
                        error={formik.touched.longDescription && Boolean(formik.errors.longDescription)}
                        helperText={formik.touched.longDescription && formik.errors.longDescription}
                    />
                    <TextField
                        margin="dense"
                        id="tags"
                        name="tags"
                        label="Tags"
                        type="text"
                        fullWidth
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        error={formik.touched.tags && Boolean(formik.errors.tags)}
                        helperText={formik.touched.tags && formik.errors.tags}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary" variant="contained">Cancel</Button>
                    <Button type="button" onClick={handleSubmitEditForm} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
            <Divider/>
        </Grid>
    )
}

export default Recipe;