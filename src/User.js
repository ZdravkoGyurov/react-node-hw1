import { Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    avatarUrl: yup
        .string('Enter a url for your avatar')
        .url('Enter a valid url')
    ,
    description: yup
        .string('Enter information about yourself')
        .required('Description is required')
        .max(512, 'Description should be of maximum 512 characters'),
  });

const User = ({user, onEditUser, onDeleteUser}) => {
    const [open, setOpen] = useState(false);
    
    const [isAdmin, setIsAdmin] = useState(Boolean(user.role));

    const formik = useFormik({
        initialValues: {
          name: user.name,
          avatarUrl: user.avatarUrl,
          description: user.description,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const u = JSON.parse(JSON.stringify(user));
            u.name = values.name
            u.avatarUrl = values.avatarUrl
            u.description = values.description
            u.role = isAdmin
            onEditUser(user.username, u)
            setOpen(false)
        },
      });

    const handleEditUser = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        formik.setFieldValue('name', user.name)
        formik.setFieldValue('avatarUrl', user.avatarUrl)
        formik.setFieldValue('description', user.description)
        setIsAdmin(Boolean(user.role))
        setOpen(false)
    };

    const handleDeleteUser = () => {
        onDeleteUser(user.username)
    }

    const handleSubmitEditForm = (event) => {
        event.preventDefault()
        formik.handleSubmit()
    }

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src={user.avatarUrl !== '' ? user.avatarUrl : (user.gender === 'male' ? "https://i.pinimg.com/236x/9d/28/cf/9d28cf409109a2092e07c8873ed9444a.jpg" : "https://i.pinimg.com/474x/c1/15/45/c11545a6bcd91a8a9c817201e69b1e32.jpg") } />
                </ListItemAvatar>
                <ListItemText
                    primary={user.name + " (" + user.username + ")"}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            >
                            {user.description} / {Boolean(user.role).toString()} / {user.status}
                        </Typography>
                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={handleEditUser}>
                        <EditIcon></EditIcon>
                    </IconButton>
                    <IconButton onClick={handleDeleteUser}>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <form>
                <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            name="name"
                            fullWidth
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="avatarUrl"
                            label="Avatar URL"
                            type="text"
                            name="avatarUrl"
                            fullWidth
                            value={formik.values.avatarUrl}
                            onChange={formik.handleChange}
                            error={formik.touched.avatarUrl && Boolean(formik.errors.avatarUrl)}
                            helperText={formik.touched.avatarUrl && formik.errors.avatarUrl}
                        />
                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            name="description"
                            multiline
                            rows={4}
                            fullWidth
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                onChange={() => setIsAdmin(!isAdmin)}
                                value={isAdmin}
                                name="role"
                                checked={isAdmin}
                            />
                            }
                            label="Admin"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} variant="contained" color="secondary">Cancel</Button>
                        <Button type="button" onClick={handleSubmitEditForm} variant="contained" color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </form>
            <Divider/>
        </div>
    )
}

export default User;