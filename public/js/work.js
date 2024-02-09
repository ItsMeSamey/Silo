let ID;
let FS;

function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    await makeFolder();
  };
  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
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
  console.log(files);

  if (!files || files.length == 0) {
    response = await gapi.client.drive.files.create({
      'mimeType': 'application/vnd.google-apps.folder',
      'name': 'apiproxydf82e0bfd926a2aec9a57c69121ca4c824fb9de40.1509570332',
      'parents': ['root'],
    });
    files = response.result.files;
  }
  ID = files[0].id;

  //     const output = files.reduce(
  //       (str, file) => `${str}${file.name} (${file.id})\n`,
  //       'Files:\n');
}

async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileStream = new Uint8Array(e.target.result);
//       console.log("File Stream:", fileStream);
    };
    reader.readAsArrayBuffer(file);
    //Encrypt{
    useIV = document.querySelector("#useIVCheckBox").checked;
    let cleartext_pwd = document.querySelector("#password").value
    let hashedPwd = sha256(cleartext_pwd);
    document.querySelector("#cipher_output").innerHTML =  encrypt(file.stream(), hashedPwd, useIV);
//    generateHmac();
    // }Encrypt
//     ID = ID.toString();
    var metadata = {
      'mimeType': 'text/plain',
      'name': "L.txt",
      'uploadType': 'media',
      'parents': [ID],
      'useContentAsIndexableText': false,
      'body': file.stream(),
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
      FS = xhr.response.id;
      document.getElementById('content').style.display = 'block';
    };
    xhr.send(form);
  } else {
    console.error("No file selected.");
  }
}

async function downloadFile(){
  gapi.client.drive.files.get({
    fileId: FS,
    alt: "media"
  }).then(function(res) { 
    console.log("XO");
    document.querySelector("#cleartext_output").innerHTML = "";
  useIV = document.querySelector("#useIVCheckBox").checked;
  let cleartext_pwd = document.querySelector("#password").value;

  let hashedPwd = sha256(cleartext_pwd);
  console.log(`hashedPwd: ${hashedPwd}`);
  
  // either get the cipher text from the input box or the div
  let cipherText = document.querySelector("#cipher_text").value;
  if (cipherText == ""){
    cipherText = document.querySelector("#cipher_output").innerHTML;
  }
  console.log(cleartext_pwd);
  document.querySelector("#cleartext_output").innerHTML = decrypt(cipherText,hashedPwd,useIV);


    console.log(res.body);
  });
}

