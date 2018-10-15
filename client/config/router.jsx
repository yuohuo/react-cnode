import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicList from '../views/topic-list/index.jsx'
import TopicDetail from '../views/topic-detail/index.jsx'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={TopicDetail} />
]
