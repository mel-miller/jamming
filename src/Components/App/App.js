import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {name:'Human Child', artist:'Belly', album:'Dove', id:'6kWgLukzuG475u02bSKLao'}
      ],
      playlistName: 'My Music',
      playlistTracks: [
        {name:'Human Child', artist:'Belly', album:'Dove', id:'6kWgLukzuG475u02bSKLao'},
        {name:'Slow Dog', artist:'Belly', album:'Star', id:'6kWgLukzuG475dddbSKLao'}
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState({
        playlistTracks: this.state.playlistTracks.push(track)
      })
    }
  }

  removeTrack(track) {
    let updatedPlaylist = this.state.playListTracks;
    updatedPlaylist = updatedPlaylist.filter(removedTrack => removedTrack.id !== track.id);
    this.setState({playlistTracks: updatedPlaylist});
  }

  updatePlaylistName(name) {

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
