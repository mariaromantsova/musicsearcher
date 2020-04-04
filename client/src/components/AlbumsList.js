import React, {useState, useEffect} from 'react';
import {CreatePlaylist} from './CreatePlaylist';
import {Spinner} from './Spinner';
import M from 'materialize-css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updatePlaylists } from '../actions';

const userName = 'cemetary_party',
  apiKey = '52c7f1e1257548e0650675e63ead469c';


export const AlbumsList = () => {
  const playlistsNames = useSelector(state => Object.keys(state.playlists))
  const dispatch = useDispatch()
  const [albums, setAlbums] = useState([])
  const [currentAlbum, setCurrentAlbum] = useState()

  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${userName}&api_key=${apiKey}&period=6month&format=json`).then(res => res.json()).then(data => {
      let lastFmAlbums = data.topalbums
        ?.album;
      setAlbums(lastFmAlbums)
    })
  }, []);

  useEffect(() => {
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {constrainWidth: false});
    M.Modal.init(document.querySelectorAll('.modal'), {endingTop: "30%"});
  })

  const addToPlaylist = (playlistName) => {
    axios.post('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/playlists/' + playlistName + '/update/', {playlistName, currentAlbum}).then(response => {
      dispatch(updatePlaylists({playlists: response.data}))
    })
  }

  return albums.length
    ? (<div className='items-wrapper'>
      {
        albums.map(album => {
          return (
              <div className="card album-card" key={album.name}>
              <div className="card-image">
                <img src={album.image[2]['#text']} alt="" onMouseEnter={() => {
                    setCurrentAlbum(album)
                  }}/>
              </div>
              <div className="card-content">
                <h5>{album.artist.name}</h5>
                <p>{album.name}</p>
              </div>
              {
                localStorage.getItem('userData') && <div>
                    <div data-target='dropdown1' className="dropdown-trigger album-button material-icons"></div>

                    <ul id='dropdown1' className='dropdown-content'>
                      {
                        playlistsNames.map(playlistName => <li key={playlistName}>
                          <a onClick={(e) => {
                              e.preventDefault()
                              addToPlaylist(playlistName)
                            }} href="#!">{playlistName}</a>
                        </li>)
                      }
                      <li className="divider" tabIndex="-1"></li>
                      <li>
                        <a className="modal-trigger" href="#modal1">
                          <i className="material-icons">add</i>new playlist</a>
                      </li>
                    </ul>
                  </div>
              }
            </div>
        )
        })
      }
      <CreatePlaylist album={currentAlbum}/>
    </div>)
    : <Spinner/>
};
