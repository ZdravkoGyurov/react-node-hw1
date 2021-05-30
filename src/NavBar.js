import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Greeting from "./Greeting";

function NavBar({loggedInUser, handleSignOut}) {

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Typography variant="h4">Cooking Recipes</Typography>
                    </IconButton>
                    {loggedInUser ? null : <Button size="large" style={{textTransform: 'none'}} component={Link} color="inherit" to={'/sign-up'}>Sign Up</Button>}
                    {loggedInUser ? null : <Button size="large" style={{textTransform: 'none'}} component={Link} color="inherit" to={'/sign-in'}>Sign In</Button>}
                    {loggedInUser ? <Button size="large" style={{textTransform: 'none'}} component={Link} color="inherit" to={'/recipes'}>Recipes</Button> : null}
                    {loggedInUser && loggedInUser.role === true ? <Button size="large" style={{textTransform: 'none'}} component={Link} color="inherit" to={'/users'}>Users</Button> : null }
                    {loggedInUser ? <Greeting user={loggedInUser} handleSignOut={handleSignOut}/> : null }
                </Toolbar>
            </AppBar>
        </div>
      );
}

export default NavBar;