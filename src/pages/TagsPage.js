import React, { useState, useEffect } from 'react';
import { AlbumsList } from '../components/AlbumsList';
import { useHistory } from 'react-router-dom'

const apiKey = '52c7f1e1257548e0650675e63ead469c';


export const TagsPage = (props) => {
  const [albums, setAlbums] = useState({})
  const history = useHistory()

  useEffect(() => {
    const { match: { params } } = props;

    fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${params.tag}&api_key=${apiKey}&limit=20&format=json`).then(res => res.json()).then(data => {
      let lastFmAlbums = data.albums.album;
      setAlbums(lastFmAlbums.filter((album, i) => i === lastFmAlbums.indexOf(album)))
      })
  }, [props])

  return (
    <div className="row">
      <div className="col s2 m1 go-back">
        <button className="btn-floating btn-flat grey darken-4"><i className="material-icons" onClick={() => history.goBack()}>keyboard_arrow_left</i></button>
      </div>
      <h4>Tags: <span className="tag">{props.match.params.tag}</span></h4>
      <AlbumsList albums={albums} />
    </div>
  )
}
