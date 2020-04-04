import React from 'react';
import { Spinner } from './Spinner';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updatePlaylists } from '../actions';


export const Playlist = (props) => {
  const dispatch = useDispatch()
  const albums = useSelector(state => state.playlists[props.match.params.playlistName])

  const deleteFromPlaylist = (albumName, playlistName) => {
    axios.post('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/playlists/' + playlistName + '/deleteAlbum/', [playlistName, albumName]).then(response => {
      dispatch(updatePlaylists(response.data))
    })
  }

  const renderAlbums = (albums, playlistName) => albums.map(album => {
    return (<div className="card album-card" key={album.name}>
      <div className="card-image">
        <img src={album.image[2]['#text']} alt=""/>
      </div>
      <div className="card-content">
        <h5>{album.artist.name || album.name}</h5>
        <p>{album.name}</p>
      </div>
      <div className="album-button material-icons added" onClick={() => deleteFromPlaylist(album.name, playlistName)}></div>
    </div>)
  })

  if (!albums) {
    return <Spinner/>
  }

  return (<ul className="collection">
    <li className="collection-item active">
      <button className="btn-floating btn-flat grey darken-4"><i className="material-icons" onClick={() => window.location.href = `/${props.match.params.id}/playlists`}>keyboard_arrow_left</i></button>
      <h5>{props.match.params.playlistName}</h5>
    </li>

    <li className="collection-item">
      <div className="items-wrapper">
        {renderAlbums(albums, props.match.params.playlistName)}
      </div>
    </li>
  </ul>)
}
