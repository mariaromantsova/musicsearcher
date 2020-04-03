import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Playlists } from '../components/Playlists';
import { Playlist } from '../components/Playlist';


export const PlaylistsPage = () => {
  return (
  <div className="row" style={{ marginTop: "1.5em" }}>
    <Switch>
      <Route exact path='/:id/playlists'>
      <h4>Playlists</h4>
        <Playlists />
      </Route>

      <Route path='/:id/playlists/:playlistName' component={Playlist} />
    </Switch>
  </div>
  )
}
