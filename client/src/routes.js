import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { MyAlbumsPage } from './pages/MyAlbumsPage';
import UsersPage from './pages/UsersPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>

        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/albums">
          <MyAlbumsPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Redirect to="/home" />

      </Switch>
    );
  }
  return (
    <Switch>

      <Route path="/signin">
        <AuthPage />
      </Route>
      <Route path="/signup">
        <RegistrationPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
      <Redirect to="/" />

    </Switch>
  );
}
