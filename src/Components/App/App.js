import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../SearchBar/SearchBar';
import '../SearchResults/SearchResults';
import '../Playlist/Playlist';

class App extends React.Component {
  contstructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {name:'Human Child', artist:'Belly', album:'Dove', id:'6kWgLukzuG475u02bSKLao'}
      ]
    };

  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <!-- Add a SearchBar component -->
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <!-- Add a Playlist component -->
          </div>
        </div>
      </div>
    );
  }
}

export default App;
