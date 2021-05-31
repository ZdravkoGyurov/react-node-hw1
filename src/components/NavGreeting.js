import { Grid, IconButton, Typography } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Greeting({user, handleSignOut}) {
    return (
        <Grid container direction="row" justify="flex-end" alignItems="baseline" spacing={1}>
            <Grid item>
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