import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'

const apiKey = '52c7f1e1257548e0650675e63ead469c';


export const AlbumPage = (props) => {
  const [album, setAlbum] = useState({})
  const history = useHistory()

  useEffect(() => {
    const { match: { params } } = props;

    let lastFmAlbum;
    fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${params.artist}&album=${params.albumName}&lang=en&format=json`).then(res => res.json()).then(data => {
      lastFmAlbum = data.album
      setAlbum(lastFmAlbum)
    })

    if (/[a-z]/i.test(params.albumName)) {
      fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srwhat=text&srsearch=${params.albumName + '+' + params.artist}&format=json`).then(res => res.json()).then(data => {
        if (data.query.search.length) {
          fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&titles=${data.query.search[0].title}&format=json`).then(res => res.json()).then(data => {
            setAlbum({...lastFmAlbum, description: Object.values(data.query.pages)[0].extract})
          })
        }
      })
    } else {
      fetch(`https://ru.wikipedia.org/w/api.php?origin=*&action=query&list=search&srwhat=text&srsearch=${params.albumName + '+' + params.artist}&format=json`).then(res => res.json()).then(data => {
        if (data.query.search.length) {
          fetch(`https://ru.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&titles=${data.query.search[0].title}&format=json`).then(res => res.json()).then(data => {
            setAlbum({...lastFmAlbum, description: Object.values(data.query.pages)[0].extract})
          })
        }
      })
    }
  }, [props]);


  return album && Object.values(album).length !== 0 && (
    <div className="row album-details" style={{ marginTop: "1.5em" }}>
      <div className="col s2 m1 go-back">
        <button className="btn-floating btn-flat grey darken-4"><i className="material-icons" onClick={() => history.goBack()}>keyboard_arrow_left</i></button>
      </div>

      <div className="col s12 m5">
        <img src={album.image[5]['#text']} alt="" />
        <div className="tags">
          {
            album.tags.tag.map(tag =>
               <Link to={{ pathname: `/albums/tags/${tag.name}` }} key={tag.name} style={{ textTransform: "none" }} className="btn-small btn-flat">{tag.name}</Link>)
          }
        </div>
      </div>

      <div className="album-description col s12 m6">
        <h5>{album.artist}</h5>
        <h4>{album.name}</h4>
        <p>{album.description}</p>
      </div>
    </div>
  )
}
