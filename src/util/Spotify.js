const clientId = '9aa9c7321b274190adab9ee52964471d';
const redirectUri = 'http://localhost:3000/';

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
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headerObj = {headers: {Authorization: `Bearer ${accessToken}`}};

    return fetch(searchUrl, headerObj).then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(jsonResponse => {
       if (jsonResponse.tracks.items){
         return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name : track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
         }));
       } else {
         return [];
       }
    })
  }
}

export default Spotify;
