
import logo from './logo.svg';
import styles from './index.module.css';

styles.button

function App() {
  return (
    <>
      <p>Drive API Quickstart</p>
      <button id="authorize_button" onclick={handleAuthClick}>Authorize</button>
      <button id="signout_button" onclick={handleSignoutClick}>Sign Out</button>
      <pre id="content" style="white-space: pre-wrap;"></pre>
    </>
  );
}


export default App;
