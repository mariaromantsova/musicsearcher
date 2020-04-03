import React from 'react';
import { Spinner } from './Spinner';
import { PlaylistCard } from './PlaylistCard';
import { useSelector } from 'react-redux';


export const Playlists = () => {
  const playlists = useSelector(state => state.playlists)

  if (!playlists) {
    return <h5 style={{ textAlign: "center", marginTop: "4em"}}>Nothing here yet🐀</h5>
  } else if (!Object.keys(playlists).length) {
    return <Spinner/>
  }

  return (
    Object.keys(playlists).map(name => <PlaylistCard key={name} albums={playlists[name]} playlistName={name} />)
  )
}
