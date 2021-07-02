/**
 * Author: Frank Kwizera.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
  backend_enpoint = "https://jsonplaceholder.typicode.com/albums/";
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
    const albumPhotosEndpoint = this.backend_enpoint + this.state.value + "/photos";
    console.log("<<<<<< albumPhotosEndpoint ", albumPhotosEndpoint);
    fetch(albumPhotosEndpoint)
      .then(response => response.json())
      .then(
        (albumPhotos) => {
          console.log("<<<<< backend response: ", albumPhotos)
          this.setState({
            photos: albumPhotos
          });
        },
        (error) => {
          console.error("Error: ", error);
        }
      )
  };

  render () {
    return (
      <Container className="album-photos-app">
        <h2>Album Photos</h2>
        <div className="search-form">
          <Input 
            className="get-album-photos-by-id-input" 
            placeholder="Use album id" type="number"
            onChange={this.onInputChange} />
          <Button 
            className="get-album-photos-by-id-button"
            onClick={this.retrieveAlbumPhotos}>
              Get Album Photos By ID</Button>
        </div>
        <Row className="album-photos">
          {this.state.photos.map((photo) => (
            <Col className="single-photo col" sm="4">
              <img className="album-photo" width="100%" src={photo.thumbnailUrl} alt={photo.url} />
              <p className="image-title">{photo.title}</p>
            </Col>
            ))}
        </Row>
    </Container>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
