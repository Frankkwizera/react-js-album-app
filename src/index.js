/**
 * Author: Frank Kwizera.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      value: null,
      photos: [1, 2, 3, 4, 5, 6, 7],
    };
  };

  onInputChange = (event) => {
    this.setState({value: event.target.value});
  }

  retrieveAlbumPhotos = () => {
    console.log("<<<<<< About to retrieve album photos for ", this.state.value);
  };

  render () {
    return (
      <div className="album-photos-app">
      <div>
        <h2>Album Photos</h2>
        <div className="search-form">
          <input 
            className="get-album-photos-by-id-input" 
            placeholder="Use album id" type="number"
            onChange={this.onInputChange}></input>
          <button 
            className="get-album-photos-by-id-button"
            onClick={this.retrieveAlbumPhotos}>
              Get Album Photos By ID</button>
        </div>
        <div className="album-photos">
          {this.state.photos.map((photo, index) => (
            <div className="single-photo">
              <p>{index}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
