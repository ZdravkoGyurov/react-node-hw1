import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
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

export default function EditUserDialog({open, setOpen, onEditUser, user}) {
    const [isAdmin, setIsAdmin] = useState(Boolean(user.role));
    const [status, setStatus] = useState(user.status);

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
            u.status = status
            onEditUser(user.username, u)
            setOpen(false)
        },
    });

    const handleCloseDialog = () => {
        formik.setFieldValue('name', user.name)
        formik.setFieldValue('avatarUrl', user.avatarUrl)
        formik.setFieldValue('description', user.description)
        setStatus(user.status)
        setIsAdmin(Boolean(user.role))
        setOpen(false)
    };

    const handleSubmitEditForm = (event) => {
        event.preventDefault()
        formik.handleSubmit()
    }

    return (
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
                    <FormControl fullWidth component="fieldset">
                        <RadioGroup value={status.toString()} onChange={e => setStatus(parseInt(e.target.value))} aria-label="status" name="status">
                            <FormControlLabel value="0" control={<Radio required />} label="Active" />
                            <FormControlLabel value="1" control={<Radio required />} label="Suspended" />
                            <FormControlLabel value="2" control={<Radio required />} label="Deactivated" />
                        </RadioGroup>
                    </FormControl>
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
    )
}