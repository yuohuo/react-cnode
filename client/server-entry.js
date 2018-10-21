import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react';
import App from './views/App'

import { createStoreMap } from './store/store'

// To avoid leaking memory, call useStaticRendering(true) when using server side rendering.
useStaticRendering(true)

// stores --> { key : value, key : value }
export default (stores, routerContext, url) => (
  <Provider {... stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
