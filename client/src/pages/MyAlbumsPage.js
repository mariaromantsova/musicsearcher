import React, { useState, useEffect } from 'react';
import { AlbumsList } from '../components/AlbumsList';
import axios from 'axios';


export const MyAlbumsPage = () => {
  const [myAlbums, updateMyAlbums] = useState([]);

  useEffect(() => {
    axios.get('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/albums')
      .then(response => {
        updateMyAlbums(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <AlbumsList albums={myAlbums} />
    </div>
  )
}
