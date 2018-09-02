const clientId = '9aa9c7321b274190adab9ee52964471d';
const redirectUri = 'http://jamm2676.surge.sh';
//const redirectUri = 'http://localhost:3000/';

let accessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //if accessToken and expiration are in url save to vars
    //else send a request to authorize
    const url = window.location.href;
    const urlToken = url.match(/access_token=([^&]*)/);
    const urlExpires = url.match(/expires_in=([^&]*)/);

    if (urlToken && urlExpires) {
      accessToken = urlToken[1];
      expiresIn = Number(urlExpires[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
      window.location = authorizeUrl;
    }
  },

  search(term) {
    accessToken = Spotify.getAccessToken();

    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headerObj = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    return fetch(searchUrl, headerObj).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } else {
        return [];
      }
    })
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }

    accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    const spotifyUserUrl = "https://api.spotify.com/v1/me";
    let userId;
    let playlistId;

    //GET current userId
    return fetch(spotifyUserUrl, {
        headers: headers
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      })
      //POST new playlist with the userId
      .then(jsonResponse => {
        userId = jsonResponse.id;
        const newPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;

        return fetch(newPlaylistUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              name: playlistName
            })
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          //POST tracks to the playlist
          .then(jsonResponse => {
            playlistId = jsonResponse.id;
            const addTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

            return fetch(addTracksUrl, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({
                  uris: trackURIs
                })
              })
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
              })

          })
      })

  } //end savePlaylist

}

export default Spotify;
