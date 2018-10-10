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

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App.jsx";

const root = document.getElementById("root");
const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    const NextApp = require("./App.jsx").default;
    // ReactDOM.hydrate(<NextApp />, document.getElementById("root"));
    render(NextApp);
  });
}
