import React, {useState, useEffect} from 'react';
import {CreatePlaylist} from './CreatePlaylist';
import {Spinner} from './Spinner';
import M from 'materialize-css';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {updatePlaylists} from '../actions';
import { useHistory } from 'react-router-dom'


export const AlbumsList = ({ albums }) => {
  const playlistsNames = useSelector(state => Object.keys(state.playlists))

  const history = useHistory()
  const dispatch = useDispatch()
  const [currentAlbum, setCurrentAlbum] = useState()

  useEffect(() => {
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {constrainWidth: false});
    M.Modal.init(document.querySelectorAll('.modal'), {endingTop: "30%"});
  })

  const addToPlaylist = (playlistName) => {
    axios.post('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/playlists/' + playlistName + '/update/', {playlistName, currentAlbum}).then(response => {
      dispatch(updatePlaylists(response.data))
    })
  }

  return albums.length
    ? (<div className='items-wrapper'>
      {
        albums.map(album => {
          return album.image[0]['#text'] && (
            <div className="card album-card" key={album.name + ' ' + album.url}>
              <div className="card-image">
                <img src={album.image[2]['#text']} alt=""
                onMouseEnter={() => {setCurrentAlbum(album)}}
                onClick={() => {
                  history.push(`/albums/${(album.artist.name || album.artist).split(' ').join("+") + '/' + album.name.split(' ').join("+")}`)
                }}
              />
              </div>
              <div className="card-content">
                <h5>{album.artist.name || album.artist}</h5>
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
                            }} href="">{playlistName}</a>
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
