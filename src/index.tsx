import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// @ts-expect-error
import theme from 'theme'
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function Root() {
  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId='95145798580-pvj3rvi93dt34lpnqlsjilmfrbnmjajm.apps.googleusercontent.com'>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>
  )
}

root.render(Root())

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
