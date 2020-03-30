import React, { useState, useEffect } from 'react';
import { AlbumsList } from '../components/AlbumsList';
import axios from 'axios';


const userName = 'cemetary_party',
      apiKey = '52c7f1e1257548e0650675e63ead469c';

export const HomePage = () => {
  const [albums, updateAlbums] = useState([]);

  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${userName}&api_key=${apiKey}&period=6month&format=json`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('error');
    })
    .then(data => {
      let recievedAlbums = data.topalbums?.album;
      if (!JSON.parse(localStorage.getItem('userData'))) {
        console.log('no user data');
        updateAlbums(recievedAlbums)
        return
      }

      axios.get('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/albums')
        .then(response => {
          console.log('recieved albums: ', response.data);
            const addedAlbums = response.data;
            recievedAlbums = recievedAlbums.map(recievedAlbum => {

              addedAlbums.map(addedAlbum => {
                if (addedAlbum.name === recievedAlbum.name) recievedAlbum.isAdded = addedAlbum.isAdded
                return addedAlbum
              })
            return recievedAlbum
          })
        updateAlbums(recievedAlbums)
        })
        
      .catch(() => updateAlbums(recievedAlbums))
    })

  }, []);


  return (
    <div>
      <AlbumsList albums={albums} />
    </div>
  );
}
