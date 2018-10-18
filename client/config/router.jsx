import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicList from '../views/topic-list/index.jsx'
import TopicDetail from '../views/topic-detail/index.jsx'
import TestApi from '../views/test/api-test'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={TopicDetail} />,
  <Route path="/test" component={TestApi} key="test" />,
]
