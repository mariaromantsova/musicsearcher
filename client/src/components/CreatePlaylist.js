import React, {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updatePlaylists } from '../actions';


export const CreatePlaylist = ({album}) => {
  const [playlistName, setPlaylistName] = useState()
  const dispatch = useDispatch()

  const changeHandler = e => {
    setPlaylistName(e.target.value)
  }

  const createPlaylist = () => {
    axios.post('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/playlists/create/', {playlistName, album})
    .then(res => dispatch(updatePlaylists({playlists: res.data})))
  }

  return (<div>
    <div id="modal1" className="modal">
      <div className="modal-content">
        <input name="playlistName" className="pink-input" type="text" onChange={changeHandler}/>
      </div>
      <div className="modal-footer">
        <button className="btn pink darken-2 modal-close" onClick={createPlaylist}>
          OK
        </button>
      </div>
    </div>
  </div>)
};
