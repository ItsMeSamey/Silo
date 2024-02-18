import { createSignal, createEffect, onMount } from 'solid-js'
import './Login.css'
import 'animate.css'
import { token } from './google';
import Setter from './index'

const textArray = ['Safety', 'Security', 'Privacy', 'Storage'];
let textIndex = 0;
let charIndex = 0;
let isBackspacing = false;

function typeText() {
  try {
    const currentText = textArray[textIndex];
    const typingElement = document.querySelector('.typing-text');
    if (!isBackspacing) {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isBackspacing = true;
        setTimeout(typeText, 2000);
      } else {
        setTimeout(typeText, 150 * (2 * charIndex / currentText.length));
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isBackspacing = false;
        textIndex = (textIndex + 1) % textArray.length;
      }
      setTimeout(typeText, 50 * (1.5 * charIndex / currentText.length) ** 4);
    }
  }
  catch (e) { console.log(e) }
}

function handleAuthClick() {
  token().callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    //    typeText = () => { }
    console.log(token());
    Setter('Main');
  }
  if (gapi.client.getToken() === null) {
    token().requestAccessToken({ prompt: 'consent' });
  } else {
    token().requestAccessToken({ prompt: '' });
  }
}

function Login() {
  onMount(() => {
    typeText();
  })

  const [cl, setcl] = createSignal([]);
  createEffect(() => {
    if (cl().length != 0) {
      setTimeout(() => setcl([]), 350)
    }
  });

  console.log(typeText)
  return (
    <div class='flex flex-row bg-black text-white mt-[15%]'>
      <div class='king animate__animated animate__fadeIn mt-12' style={{ '--animate-duration': '2s' }}>
        <h1 class='margin-right-60 text-7xl subpixel-antialiased font-[150] mb-20'> WELCOME TO SILO </h1>
        <div class='mainin flex'>
          <h1 class='text-5xl'>We Provide </h1>
          <h1 class='typing-text' style='color: #ffa200;margin-left: 12px;font-size: 40px;margin-right: 20px;'></h1>
        </div>
      </div>

      <div class='p-20 rounded-lg text-center'>
        <h2 class='mt-6 text-2xl subpixel-antialiased font-[400]'>Login Page</h2>
        <button id='authorize_button'
          className={cl().length ? cl() : ''}
          onClick={() => { handleAuthClick() }}
          class='duration-[400] hover:bg-[#ffa20010] active:scale-[.90] active:bg-[#ffa200] active:shadow-orange-500/100 hover:shadow-orange-500/10 mt-12 mb-24 bg-[#ffa200] shadow-xl shadow-orange-500/50 text-black py-2 px-8 rounded-xl border border-orange-600/10 font-semibold cursor-pointer flex justify-center items-center hover:text-white transition-all'
        >
          <div class='google-icon'>
            <svg class='google-icon' alt='Google Icon' enable-background='new 0 0 48 48' height='48' viewBox='0 0 48 48' width='48' xmlns='http://www.w3.org/2000/svg'>
              <path d='m43.611 20.083h-1.611v-.083h-18v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z' fill='#ffc107' />
              <path d='m6.306 14.691 6.571 4.819c1.778-4.402 6.084-7.51 11.123-7.51 3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-7.682 0-14.344 4.337-17.694 10.691z' fill='#ff3d00' />
              <path d='m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238c-2.008 1.521-4.504 2.43-7.219 2.43-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025c3.31 6.477 10.032 10.921 17.805 10.921z' fill='#4caf50' />
              <path d='m43.611 20.083h-1.611v-.083h-18v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238c-.438.398 6.591-4.807 6.591-14.807 0-1.341-.138-2.65-.389-3.917z' fill='#1976d2' />
            </svg>
          </div>
          <text class='non-italic'>
            Sign in with Google
          </text>
        </button>
      </div>
    </div>
  );
}


export default Login;
