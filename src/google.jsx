import { createSignal } from "solid-js";

const [token, setToken] = createSignal()

function LoadScript(src, onloadFunction) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    script.onload = null;
    onloadFunction();
  };
  document.head.appendChild(script);
}

const CLIENT_ID = '346355228034-6s2nedt7u3gijeqrmucm0eofhj5dn044.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDSxFcNECWTeyruM2d8132AvNeh8YveQBY';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive';

let Loader = () => {
  Loader = () => { }
  let tokenClient
  LoadScript('https://apis.google.com/js/api.js', () => {
    gapi.load('client', async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      console.log('gapiInited'); // UGLY !!
    });
  });
  LoadScript('https://accounts.google.com/gsi/client', () => {
    setToken(google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
    }));
    console.log('gisInited'); // UGLY !!
  });
  //LoadScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js', () => {});
}

export default Loader;
export { token }

