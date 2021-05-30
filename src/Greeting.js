import { Avatar, Grid, IconButton, Typography } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Greeting({user, handleSignOut}) {
    return (
        <Grid container direction="row" justify="flex-end" alignItems="baseline" spacing={1}>
            <Grid item>
                <Grid container direction="column"></Grid>
                    <Avatar style={{justifyContent: "center", display: "flex"}} src={user.avatarUrl !== '' ? user.avatarUrl : (user.gender === 'male' ? "https://i.pinimg.com/236x/9d/28/cf/9d28cf409109a2092e07c8873ed9444a.jpg" : "https://i.pinimg.com/474x/c1/15/45/c11545a6bcd91a8a9c817201e69b1e32.jpg") } />
                    <Typography component="h1">{user.name}</Typography>     
                </Grid>
            <Grid item>
                <IconButton color="default" onClick={handleSignOut}>
                    <ExitToAppIcon fontSize="large" />
                </IconButton>
            </Grid>
        </Grid>
    )
} 