let ID;
let FS = {};

function handleAuthClick() {
  if (localStorage.getItem("google_token")){
    if (localStorage.getItem("google_token")){
      gapi.client.setToken(localStorage.getItem("google_token"));
      return;
    }
  }
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    await makeFolder();
  };
  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
  localStorage.setItem("google_token", gapi.client.getToken());
}


function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
  }
}


async function makeFolder() {
  let response;
  try {
    response = await gapi.client.drive.files.list({
      'q': 'mimeType=\'application/vnd.google-apps.folder\'',
      'q': 'name=\'apiproxydf82e0bfd926a2aec9a57c69121ca4c824fb9de40.1509570332\'',
      'pageSize': 1,
    });
  } catch (err) { // ERR!!!
      return;
  }

  var files = response.result.files;


  if (!files || files.length == 0) {
    response = await gapi.client.drive.files.create({
      'mimeType': 'application/vnd.google-apps.folder',
      'name': 'apiproxydf82e0bfd926a2aec9a57c69121ca4c824fb9de40.1509570332',
      'parents': ['root'],
    });
    files = response.result.files;
  }
  ID = files[0].id;

}

async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  let file = fileInput.files[0];
  if (file) {

    const hashedPwd = CryptoJS.SHA256(CryptoJS.lib.WordArray.random(256).toString()).toString();
    FS['hash'] = hashedPwd;
    file = await file.text();

    file =  encrypt(file, hashedPwd, false);

    var metadata = {
      'mimeType': 'text/plain',
      'name': "L.txt",
      'uploadType': 'media',
      'parents': [ID],
      'useContentAsIndexableText': false,
      'body': file,
    };

    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
      var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    xhr.onload = () => {
      FS['id'] = xhr.response.id;
      document.getElementById('content').style.display = 'block';
    };
    xhr.send(form);
  } else {
    console.error("No file selected.");
  }
}

async function downloadFile(){
  gapi.client.drive.files.get({
    fileId: FS['id'],
    alt: "media"
  }).then(function(res) { 
    let file = decrypt(res.body, FS['hash'], false);
  });
}

function encrypt(clearTextData, hashedPwd, useIV){
  message = CryptoJS.AES.encrypt(clearTextData, hashedPwd);
  return message.toString();
}

function decrypt(encryptedData, hashedPwd, useIV){
 let code = CryptoJS.AES.decrypt(encryptedData, hashedPwd);

let decryptedMessage = "";
if (code.sigBytes < 0){
  decryptedMessage = `Couldn't decrypt! It is probable that an incorrect password was used.`;
  return decryptedMessage;
}
decryptedMessage = code.toString(CryptoJS.enc.Utf8);
return decryptedMessage;
}
