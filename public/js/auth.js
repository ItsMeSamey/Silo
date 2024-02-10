/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '346355228034-6s2nedt7u3gijeqrmucm0eofhj5dn044.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDSxFcNECWTeyruM2d8132AvNeh8YveQBY';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive';

let tokenClient;
let gapiInited = false;
let gisInited = false;


/**
  * Callback after api.js is loaded.
  */


function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

/**
  * Callback after the API client is loaded. Loads the
  * discovery doc to initialize the API.
  */
  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    if (localStorage.getItem("google_token") != 'reg'){
      if (localStorage.getItem("google_token").length > 6){
        gapi.client.setToken(localStorage.getItem("google_token"));
      }
      else if (localStorage.getItem("google_token") == 'reg'){
        localStorage.setItem("google_token", 'null');
//         document.location.href = 'http://localhost:8080/index.html';
      }
    }
  }


/**
  * Callback after Google Identity Services are loaded.
  */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
}



