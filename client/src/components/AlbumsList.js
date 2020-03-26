import React, { useState } from 'react';
import spinner from '../assets/spinner.svg';
import axios from 'axios';


const Album = ({ album }) => {
  const [isAdded, setIsAdded] = useState(album.isAdded)

  return (
    <div className="card album-card">
      <div className="card-image">
        <img src={album.image[2]['#text']} alt="" />
      </div>
      <div className="card-content">
        <h5>{album.artist.name}</h5>
        <p>{album.name}</p>
      </div>
      {
        localStorage.getItem('userData') &&
        <div>
          <div className="overlay"></div>
          <div
             className={`album-button material-icons ${isAdded ? "added" : ""}`} onClick={() => {
              setIsAdded(!isAdded)
              axios.post('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/albums/update/', { ...album, isAdded: !album.isAdded }).then(res => console.log(res.data))
            }}
          ></div>
        </div>
      }
    </div>
  )
};


export const AlbumsList = ({ albums }) => {
  const renderAlbums = () => {
    if (!albums.length) {
      return (
        <div className="center-align" style={{ marginTop: '12em' }}>
          <img src={spinner} alt="" />
        </div>
      )
    }
    return (
      <div className='albums-wrapper'>
          {
            albums.map(album => <Album key={album.name} album={album} />)
          }
      </div>
    )
  };

  return renderAlbums();
};
