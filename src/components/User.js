import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from "react";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { UserStatus } from '../model/user.model'
import EditUserDialog from "./EditUserDialog";

const User = ({user, onEditUser, onDeleteUser}) => {
    const [open, setOpen] = useState(false);

    const handleEditUser = () => {
        setOpen(true)
    }

    const handleDeleteUser = () => {
        onDeleteUser(user.username)
    }

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src={user.avatarUrl !== '' ? user.avatarUrl : (user.gender === 'male' ? "https://i.pinimg.com/236x/9d/28/cf/9d28cf409109a2092e07c8873ed9444a.jpg" : "https://i.pinimg.com/474x/c1/15/45/c11545a6bcd91a8a9c817201e69b1e32.jpg") } />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body1"
                                color="textPrimary"
                                >
                                {user.name + " (" + user.username + ")"}
                                {user.role ? <SupervisorAccountIcon fontSize="small"></SupervisorAccountIcon> : null }
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                [{UserStatus[user.status]}] {user.description}
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
            <EditUserDialog open={open} setOpen={setOpen} onEditUser={onEditUser} user={user}/>
            <Divider/>
        </div>
    )
}

export default User;