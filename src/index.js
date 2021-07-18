/**
 * Author: Frank Kwizera.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Card } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
  backend_enpoint = "https://franky250.pythonanywhere.com/get/album/photos/";
  constructor() {
    super();
    this.state = { 
      value: null,
      photos: [],
    };
  };

  /**
   * Updates the selected album id.
   * @param {Event} event - Input change event. 
   */
  onInputChange = (event) => {
    this.setState({value: event.target.value});
  }

  /**
   * Retrieves album photos from the backend API.
   */
  retrieveAlbumPhotos = () => {
    if (!this.state.value) {
      alert('Input the album ID.');
      return;
    }
    const albumPhotosEndpoint = this.backend_enpoint + this.state.value
    fetch(albumPhotosEndpoint)
      .then(response => response.json())
      .then(
        (albumPhotos) => {
          this.setState({
            photos: albumPhotos
          });
          if (this.state.photos.length === 0) {
            alert('No album photos for album id ' + this.state.value);
          }
        },
        (error) => {
          this.setState({
            photos: []
          });
          console.error("Error: ", error);
        }
      )
  };

  /**
   * Renders HTML elements in the DOM.
   */
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
            <Col className="single-photo col" xs="6" sm="4" md="3">
              <Card>
              <img className="album-photo" width="100%" src={photo.thumbnailUrl} alt={photo.url} />
              <p className="image-title">{photo.title}</p>
              </Card>
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
