import { render } from 'solid-js/web';
import { For, onMount, createSignal, createResource, createEffect } from "solid-js";

import App from './App';
import Login from './Login';
import Main from './Main'
import Loader from './google';

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const [page, Setter] = createSignal('Main')

render(() => {
  onMount(() => {
    console.log('Started Loading');
    Loader();
  });
  return (
    <>
      <Show when={page() == 'Login'} fallback={<Main />}>
        <Login />
      </Show>
    </>
  )
}, document.getElementById('root'))


export default Setter
export { page }

