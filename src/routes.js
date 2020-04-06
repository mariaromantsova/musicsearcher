import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { UsersPage } from './pages/UsersPage';
import { AlbumPage } from './pages/AlbumPage';
import { TagsPage } from './pages/TagsPage';

export const useRoutes = (isAuthenticated, userId) => {
  if (isAuthenticated) {
    return (<Switch>
      <Route path="/home">
        <HomePage/>
      </Route>

      <Route path={"/" + userId + "/playlists"}>
        <PlaylistsPage/>
      </Route>

      <Route path="/albums/tags/:tag" component={TagsPage} />
      <Route path="/albums/:artist/:albumName" component={AlbumPage} />

      <Route path="/users">
        <UsersPage/>
      </Route>

      <Redirect to={"/" + userId + "/playlists"}/>

    </Switch>);
  }
  return (<Switch>

    <Route path="/albums/tags/:tag" component={TagsPage} />
    <Route path="/albums/:artist/:albumName" component={AlbumPage} />
    
    <Route path="/signin">
      <AuthPage/>
    </Route>

    <Route path="/signup">
      <RegistrationPage/>
    </Route>

    <Route path="/">
      <HomePage/>
    </Route>


    <Redirect to="/"/>

  </Switch>);
}
