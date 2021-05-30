import { List } from "@material-ui/core";
import { useEffect } from "react";
import User from "./User";
import { useHistory } from "react-router-dom";

const Users = ({loggedInUser, users, onEditUser, onDeleteUser}) => {
    let history = useHistory()
    
    useEffect(() => {
        if (!loggedInUser || !loggedInUser.role) {
          history.push('/sign-in')
        }
    });

    return (
        <List>
            {users.map(user => (<User key={user.username} user={user} onEditUser={onEditUser} onDeleteUser={onDeleteUser}/>))}
        </List>
    )
}

export default Users;