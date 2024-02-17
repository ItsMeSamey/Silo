import styles from './index.module.css';
import './index.css';
import { page } from './index'
import Setter from './index'
import { createSignal } from 'solid-js'
const CryptoJS = require('crypto-js');


let ID;
let KEY = 1;
let FILES = [];
let PASSWORD = 'oxox';
const [list, setList] = createSignal(
  [
    { 'name': 'Temp', 'id': 'dasdqwdhavsdbjabshldjadbshliashds' }, { 'name': 'Temp2', 'id': 'dasdqwdhavsdbjabshldjadbshliashds' }
  ]
)

function jsonLoad() {
  //   try {KEY = }catch{}
  FILES = JSON.parse(localStorage.getItem('VAL'));
  /*
  if (KEY){
    let response;
    gapi.client.drive.files.get({
      fileId: FS['id'],
      alt: 'media'
    }).then(function(res) { 
      FILES = JSON.parse(decrypt(res.body, CryptoJS.SHA256(PASSWORD).toString(), false));
    });
  }*/
}

async function jsonWrite() {
  /*
  if (KEY){
    response = await gapi.client.files.delete({
      'fileId': KEY
    });
  }

    file = JSON.toString(FILES);
    var metadata = {
      'mimeType': 'text/plain',
      'name': 'L.txt',
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
      KEY = xhr.response.id;
      document.getElementById('content').style.display = 'block';
    };
    xhr.send(form);
    FILES.push(FP);*/

  localStorage.setItem('VAL', JSON.toString(FILES))

}

function handleAuthClick() {
  token().callback = async (resp) => {
    let response;
    if (resp.error !== undefined) { throw (resp); }
    try {
      response = await gapi.client.drive.files.list({ 'q': 'mimeType=\'application/vnd.google-apps.folder\'', 'q': 'name=\'apiproxydf82e0bfd926a2aec9a57c69121ca4c824fb9de40.1509570332\'', 'pageSize': 1 });
      ID = response.result.files[0].id;
    } catch (err) { } // err!!!!
    response = await gapi.client.drive.files.create({ 'mimeType': 'application/vnd.google-apps.folder', 'name': 'apiproxydf82e0bfd926a2aec9a57c69121ca4c824fb9de40.1509570332', 'parents': ['root'] });
    ID = response.result.id;
    /* try {
      response = await gapi.client.drive.files.list({ 'q': 'mimeType=\'text/plain\'', 'q': 'name=\'2330759051.04ed9bf428c4ac12196c75a9cea2a629dfb0e28fdyxorpipa\'', 'pageSize': 1 });
      ID = response.result.files[0].id;
    } catch (err) { } // err!!!!
    response = await gapi.client.drive.files.create({ 'mimeType': 'plain/text', 'name': 'apiproxydf82e0bfd926a2aec9a57c69121ca4c824fb9de40.1509570332', 'parents': [ID] });
    KEY = response.result.id;*/
  }
  //    localStorage.setItem('google_token', gapi.client.getToken().access_token);
  if (gapi.client.getToken() === null) {
    token().requestAccessToken({ prompt: 'consent' });
  } else {
    token().requestAccessToken({ prompt: '' });
  }
}

function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
  }
}

async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  let file = fileInput.files[0];
  let FS = {};
  if (file) {
    FS['name'] = file.name;
    const hashedPwd = CryptoJS.SHA256(CryptoJS.lib.WordArray.random(256).toString()).toString();
    FS['hash'] = hashedPwd;
    file = await file.text();
    file = encrypt(file, hashedPwd, false);

    var metadata = { 'mimeType': 'text/plain', 'name': file.name, 'uploadType': 'media', 'parents': [ID], 'useContentAsIndexableText': false, 'body': file };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'text/plain' }));
    form.append('file', file);
    var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    xhr.onload = () => {
      FS['id'] = xhr.response.id;
      FILES.push(FS);
      setList(FILES);
    };
    xhr.send(form);
    // jsonWrite();
  } else {
    console.error('No file selected.');
  }
}

async function downloadFile(id, hash) {
  console.log(id)
  return
  gapi.client.drive.files.get({
    fileId: id,
    alt: 'media'
  }).then(function (res) {
    let file = decrypt(res.body, hash, false);
    const blob = new Blob([file], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'variable.txt';
    link.click();
    URL.revokeObjectURL(url);
  });
}

function encrypt(clearTextData, hashedPwd, useIV) {
  const message = CryptoJS.AES.encrypt(clearTextData, hashedPwd);
  return message.toString();
}

function decrypt(encryptedData, hashedPwd, useIV) {
  let code = CryptoJS.AES.decrypt(encryptedData, hashedPwd);

  let decryptedMessage = '';
  if (code.sigBytes < 0) {
    decryptedMessage = `Couldn't decrypt! It is probable that an incorrect password was used.`;
    return decryptedMessage;
  }
  decryptedMessage = code.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}

function drawPopup() { } // TOOD

function Table() {
  return (
    <div class='select-none w-full h-full overflow-scroll text-gray-100 bg-[#0c0c0e] bg-clip-border rounded-2xl'>
      <table class='subpixel-antialiased w-full text-left table-auto min-w-max'>
        <thead>
          <tr>
            <th class='p-4 border-b bg-[#141416] bg-[#111113]'>
              <p class='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Name
              </p>
            </th>
            <th class='p-4 border-b bg-[#141416] bg-[#111113]'>
              <p class='block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Id
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={list()}>{(file) =>
            <tr
              data-ripple-dark='true'
              class='will-change-transform hover:skew-x-2 duration-200 ease-in-out middle rounded-2xl text-center align-middle active:opacity-[0.8] active:scale-[.94] hover:rounded-full even:bg-[#121214] hover:scale-[.98] origin-center'
              onclick={() => { downloadFile(file['id'], file['hash']) }}
            >
              <td class='p-4'>
                <p class='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                  {file['name']}
                </p>
              </td>
              <td class='p-4'>
                <p class='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                  {file['id']}
                </p>
              </td>
            </tr>
          }</For>
        </tbody>
      </table>
    </div>
  )
}

/*
          <div class='grid ml-auto place-items-center justify-self-end'>
            <div
              class='relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900'>
              <span class=''>14</span>
            </div>
          </div>
*/

function Sidebar() {
  const buttonClasses = 'will-change-transform active:scale-[.93] select-none transition-all duration-200 flex items-center w-full p-3 leading-tight rounded-lg outline-none text-start hover:bg-[#201d1a] hover:bg-opacity-80 focus:text-blue-gray-900 active:bg-[#ffa200] active:bg-opacity-80 active:shadow-orange-500/50 shadow-2xl';
  return (
    <div
      class='relative flex h-[100%] w-full max-w-[16rem] flex-col rounded-xl  bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5'>
      <div
        class="relative block text-4xl antialiased font-[150] leading-snug tracking-normal select-none items-center rounded-full bg-gradient-to-tr from-[#ffa20002] to-orange-500/25 mx-auto py-.5 px-2 uppercase text-white text-center">
        <span class="">Silo</span>
      </div>
      <nav class='flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700'>
        <div role='button'
          onClick={() => Setter('Main')}
          className={page() == 'Main' ? 'bg-[#ffa200a4]' : ''}
          data-ripple-dark='true'
          class={buttonClasses}>
          <div class='grid mr-4 place-items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'
              class='w-5 h-5'>
              <path fill-rule='evenodd'
                d='M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z'
                clip-rule='evenodd'></path>
            </svg>
          </div>
          Dashboard
        </div>
        <div role='button'
          onClick={() => Setter('File')}
          className={page() == 'File' ? 'bg-[#ffa200a4]' : ''}

          data-ripple-dark='true'
          class={buttonClasses}>
          <div class='grid mr-4 place-items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'
              class='w-5 h-5'>
              <path fill-rule='evenodd'
                d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z'
                clip-rule='evenodd'></path>
            </svg>
          </div>
          Files
        </div>
        <div role='button'
          onClick={() => Setter('Inbox')}
          className={page() == 'Inbox' ? 'bg-[#ffa200a4]' : ''}

          data-ripple-dark='true'
          class={buttonClasses}>
          <div class='grid mr-4 place-items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'
              class='w-5 h-5'>
              <path fill-rule='evenodd'
                d='M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z'
                clip-rule='evenodd'></path>
            </svg>
          </div>
          Inbox
        </div>
        <div role='button'
          onClick={() => Setter('Profie')}
          className={page() == 'Profie' ? 'bg-[#ffa200a4]' : ''}

          data-ripple-dark='true'
          class={buttonClasses}>
          <div class='grid mr-4 place-items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'
              class='w-5 h-5'>
              <path fill-rule='evenodd'
                d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                clip-rule='evenodd'></path>
            </svg>
          </div>
          Profile
        </div>
        <div role='button'
          onClick={() => Setter('Settings')}
          className={page() == 'Settings' ? 'bg-[#ffa200a4]' : ''}

          data-ripple-dark='true'
          class={buttonClasses}>
          <div class='grid mr-4 place-items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'
              class='w-5 h-5'>
              <path fill-rule='evenodd'
                d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z'
                clip-rule='evenodd'></path>
            </svg>
          </div>
          Settings
        </div>
        <div role='button'
          onClick={() => {
            Setter('Login'); const token = gapi.client.getToken();
            if (token !== null) {
              google.accounts.oauth2.revoke(token.access_token);
              gapi.client.setToken('');
            }
          }}
          className={'bg-[#ff1e002d] active:bg-[#ff1e008c] active:shadow-red-500/50'}
          data-ripple-dark='true'
          class={buttonClasses}>
          <div class='grid mr-4 place-items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'
              class='w-5 h-5'>
              <path fill-rule='evenodd'
                d='M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z'
                clip-rule='evenodd'></path>
            </svg>
          </div>
          Log Out
        </div>
      </nav>
    </div>
  )
}

function Main() {
  return (
    <div class='flex flex-row absolute inset-y-0 inset-x-0 transition-all'>
      <Sidebar />
      <Show when={page() == 'Main'} fallback>
        <Table />
      </Show>
    </div>
  );
}

export default Main
