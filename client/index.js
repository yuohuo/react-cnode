// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./APP.jsx";

// ReactDOM.hydrate(<App />, document.getElementById("root"));

// if (module.hot) {
//   module.hot.accept("./App.jsx", () => {
//     const NextApp = require("./App.jsx").default;
//     ReactDOM.hydrate(<NextApp />, document.getElementById("root"));
//   });
// }

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './views/APP.jsx'
import appState from './store/app-state';

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default //eslint-disable-line
    // ReactDOM.hydrate(<NextApp />, document.getElementById("root"));
    render(NextApp)
  })
}
