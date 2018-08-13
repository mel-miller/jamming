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

  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
