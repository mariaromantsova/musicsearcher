import React, { useState, useEffect } from 'react';
import spinner from '../assets/spinner.svg';

export const RecentTrack = ({ userName, apiKey }) => {
  const [lfmData, updateLfmData] = useState({});

  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${userName}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('error');
      })
      .then(data => {
        updateLfmData(data)
      })
      .catch(() =>
        updateLfmData({ error: 'Whoops! Something went wrong with Last.fm' })
      );
  }, [userName, apiKey]);

  const buildLastFmData = () => {
    const  { error } = lfmData;
    const track = lfmData?.recenttracks?.track;

    if (error) {
      return <p>{error}</p>;
    }

    if (!track) {
      return (
        <div className="center-align" style={{ marginTop: '12em' }}>
          <img src={spinner} alt="" />
        </div>
      )
    }

    const [
      { name: songName, artist: { '#text': artistName }, image = {} } = {}
    ] = track;
    const imgUrl = image['3']['#text'];

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m7 l9 offset-l2 offset-m2" style={{ marginTop: '2em' }}>
            <div className="card">
              <div className="card-image">
                <img src={imgUrl} alt="" />
              </div>
              <div className="card-content">
                <p>Currently listening to: {songName} by {artistName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return buildLastFmData();
};
