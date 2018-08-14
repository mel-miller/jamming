const clientId = '9aa9c7321b274190adab9ee52964471d';
const redirectUri = 'http://localhost:3000/';

let accessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const url = window.location.href;
    const urlToken = url.match(/access_token=([^&]*)/);
    const urlExpires = url.match(/expires_in=([^&]*)/);

    if (urlToken && urlExpires) {
      accessToken = urlToken[1];
      expiresIn = number(urlExpires[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
      window.location = authorizeUrl;
    }
  }

}

export default Spotify;