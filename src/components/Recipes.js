import { Button, Checkbox, FormControlLabel, Grid, TextField } from "@material-ui/core";
import Recipe from "./Recipe";
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Recipes = ({users, loggedInUser, recipes, onEditRecipe, onDeleteRecipe}) => {
    let history = useHistory()

    const [searchText, setSearchText] = useState('')
    const [recent, setRecent] = useState(false)

    useEffect(() => {
        if (!loggedInUser) {
            history.push('/sign-in')
        }
    })

    const filterByName = (recipe) => {
        const postedBy = users.filter(u => u.id === recipe.userId)[0]
        return recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
                recipe.tags.toLowerCase().includes(searchText.toLowerCase()) ||
                (postedBy && postedBy.name.toLowerCase().includes(searchText.toLowerCase())) ||
                (postedBy && postedBy.username.toLowerCase().includes(searchText.toLowerCase()))
    }

    const filterRecent = (recipes) => {
        if (!recent) {
            return recipes
        }
        const recentRecipes = recipes.slice().sort((r1, r2) => new Date(r2.lastModifiedOn) - new Date(r1.lastModifiedOn))
        return recentRecipes.splice(0, 10)
    }

    const handleSearch = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="filter"
                    label="Search"
                    type="text"
                    id="filter"
                    value={searchText}
                    onChange={handleSearch}
                />
            <Grid item xs>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="role"
                        color="secondary"
                        checked={recent}
                        value={recent}
                        onChange={() => setRecent(!recent)}
                    />
                    }
                    label="Most recent"
                />
            </Grid>
            <Grid item xl>
                <Button size="large" style={{textTransform: 'none'}} component={Link} to={'/submit-recipe'} variant="contained" color="primary">
                    <AddIcon/>Submit Recipe
                </Button>
            </Grid>
            </Grid>
            <Grid container spacing={2}>
                {filterRecent(recipes).filter(r => filterByName(r)).map(recipe => (<Recipe loggedInUser={loggedInUser} key={recipe.id} recipe={recipe} onEditRecipe={onEditRecipe} onDeleteRecipe={onDeleteRecipe}/>))}
            </Grid>
        </Grid>
    )
}

export default Recipes;