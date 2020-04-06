import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTag } from '../actions';
import { AlbumsList } from '../components/AlbumsList';
import { Link } from 'react-router-dom'

const userName = 'cemetary_party',
  apiKey = '52c7f1e1257548e0650675e63ead469c';


export const HomePage = () => {
  const dispatch = useDispatch()

  const searchQuery = useSelector(state => state.query)
  const tags = useSelector(state => state.tags)
  const playlists = useSelector(state => state.playlists)

  const [albums, setAlbums] = useState({})

  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
    if (searchQuery.length) {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchQuery}&api_key=${apiKey}&limit=10&format=json`).then(res => res.json()).then(data => {
        let lastFmAlbums = data.results.albummatches.album;
        setAlbums(lastFmAlbums)
      })
    } else {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${userName}&api_key=${apiKey}&period=6month&format=json`).then(res => res.json()).then(data => {
        let lastFmAlbums = data.topalbums?.album;
        setAlbums(lastFmAlbums.filter((album, i) => i === lastFmAlbums.indexOf(album)))
      })
    }


    Object.values(playlists).map(playlist => {
      playlist.map(album => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=album.gettoptags&artist=${album.artist.name || album.artist}&album=${album.name}&api_key=${apiKey}&format=json`).then(res => res.json()).then(data => {
          if (data.toptags.tag[0]) {
            // console.log(album.artist.name || album.artist, data.toptags.tag[0].name);
            dispatch(updateTag(data.toptags.tag[0].name))
          }
        })
        return album
      })
      return playlist
    })
  }, [searchQuery, dispatch, playlists]);


  return (
    <div>
      {
        localStorage.getItem('userData') && <div className="tags">
                <h4>Top tags</h4>
                {
                  tags.length ?
                  tags.map(tag =>
                     <Link to={{ pathname: `/albums/tags/${tag}` }} key={tag} style={{ textTransform: "none" }} className="btn-small btn-flat">{tag}</Link>)
                  : <p>here will be your top tags</p>
                }
              </div>
      }
      <AlbumsList albums={albums} playlists={playlists} />
    </div>
  );
}
