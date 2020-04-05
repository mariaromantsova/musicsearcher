import React, { useState, useEffect } from 'react';
import TextTruncate from 'react-text-truncate';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updatePlaylists } from '../actions';
import { useHistory, useLocation } from 'react-router-dom'


export const PlaylistCard = ({ albums, playlistName }) => {

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [imageUrls, setImageUrls] = useState("")
  const [artists, setArtists] = useState("")

  useEffect(() => {
    setArtists(
      albums.map(album => album.artist.name || album.artist).join(", ")
    )
    if (!albums.length) {
      setImageUrls("#ccc")
    } else if (albums.length < 4) {
      setImageUrls(`url(${albums[0].image[2]['#text']})`)
    } else {
      setImageUrls(`url(${albums[0].image[2]['#text']}) left top no-repeat, url(${albums[1].image[2]['#text']}) right top no-repeat, url(${albums[2].image[2]['#text']}) left bottom no-repeat, url(${albums[3].image[2]['#text']}) right bottom no-repeat`)
    }
  }, [albums])

  const styles = {
    "playlistCover": {
      height: "20em",
      background: `${imageUrls}`
    }
  }

  const deletePlaylist = (e) => {
    e.stopPropagation()
    axios.post('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/playlists/' + playlistName + '/delete/').then(response => {
      dispatch(updatePlaylists(response.data))
    })
  }

  const openPlaylist = () => history.push(`${location.pathname}/${playlistName}`)

  return albums && (
    <div className="card playlist-card">
      <div className="card-image" onClick={openPlaylist}>
        {
          !albums.length ? <div className="playlist-cover" style={styles.playlistCover}></div>
          : albums.length > 3
          ? <div className="playlist-cover" style={styles.playlistCover}></div>
          : <img src={albums[albums.length - 1].image[2]['#text']} alt="" style={{ height: '280px' }}/>
        }
        <span className="card-title playlist-title">
          {playlistName}
          <span className="playlist-actions">
            <i className="delete-playlist material-icons" onClick={deletePlaylist}>delete</i>
          </span>
        </span>
      </div>

      <div className="card-content">
        <TextTruncate line={2} element="p" truncateText="…" text={artists}/>
      </div>
    </div>
  )
};
