import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { Container } from '@material-ui/core';
import SubmitRecipe from './components/SubmitRecipe';
import Recipes from './components/Recipes';
import Users from './components/Users';
import { useState } from 'react';
import Home from './components/Home';

function App() {
  const usersMap = new Map(JSON.parse(localStorage.getItem('users')))
  const [users, setUsers] = useState(Array.from(usersMap).map(userEntry => userEntry[1]))
  const [loggedInUser, setLoggedInUser] = useState(null)

  const recipesMap = new Map(JSON.parse(localStorage.getItem('recipes')))
  const [recipes, setRecipes] = useState(Array.from(recipesMap).map(recipeEntry => recipeEntry[1]))

  const onSubmitRecipe = (recipe) => {
    if (!recipesMap.has(recipe.id)) {
      const newRecipes = recipes.concat(recipe)
      setRecipes(newRecipes)
      recipesMap.set(recipe.id, recipe)
      window.localStorage.setItem('recipes', JSON.stringify(Array.from(recipesMap)));
    }
  }

  const onEditRecipe = (recipeId, recipe) => {
    recipe.lastModifiedOn = new Date()
    const newRecipes = [...recipes]
    setRecipes(newRecipes.map(r => r.id === recipeId ? recipe : r))
    recipesMap.set(recipeId, recipe)
    window.localStorage.setItem('recipes', JSON.stringify(Array.from(recipesMap)));
  }
  
  const onDeleteRecipe = (recipeId) => {
    const newRecipes = [...recipes]
    setRecipes(newRecipes.filter(r => r.id !== recipeId))
    recipesMap.delete(recipeId)
    window.localStorage.setItem('recipes', JSON.stringify(Array.from(recipesMap)));
  }

  const onAddUser = (user) => {
    if (!usersMap.has(user.username)) {
      const newUsers = users.concat(user)
      setUsers(newUsers)
      usersMap.set(user.username, user)
      window.localStorage.setItem('users', JSON.stringify(Array.from(usersMap)));
    }
  }

  const onEditUser = (username, user) => {
    const newUsers = [...users]
    setUsers(newUsers.map(u => u.username === username ? user : u))
    usersMap.set(username, user)
    window.localStorage.setItem('users', JSON.stringify(Array.from(usersMap)));
  }

  const onDeleteUser = (username) => {
    const newUsers = [...users]
    setUsers(newUsers.filter(u => u.username !== username))
    usersMap.delete(username)
    window.localStorage.setItem('users', JSON.stringify(Array.from(usersMap)));
  }

  const onLogin = (username, password) => {
    if (!loggedInUser) {
      const user = users.filter(u => u.username === username)[0]
      if (!user) {
        alert("You are not registered")
        return
      }
      if (user.password === password) {
        setLoggedInUser(user)
      } else {
        alert("Wrong password")
      }
    }
  }

  const handleSignOut = () => {
    if (loggedInUser) {
      setLoggedInUser(null)
    }
  }

  return (
    <Router>
      <Container className="App">
      <NavBar loggedInUser={loggedInUser} handleSignOut={handleSignOut} />
        <Switch>
          <Route exact path="/sign-up">
            <SignUp loggedInUser={loggedInUser} onAddUser={onAddUser} />
          </Route>
          <Route exact path="/sign-in">
            <SignIn loggedInUser={loggedInUser} onLogin={onLogin} />
          </Route>
          <Route exact path="/submit-recipe">
            <SubmitRecipe loggedInUser={loggedInUser} onSubmitRecipe={onSubmitRecipe} />
          </Route>
          <Route exact path="/recipes">
            <Recipes users={users} loggedInUser={loggedInUser} recipes={recipes} onEditRecipe={onEditRecipe} onDeleteRecipe={onDeleteRecipe} />
          </Route>
          <Route exact path="/users">
            <Users loggedInUser={loggedInUser} users={users} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
