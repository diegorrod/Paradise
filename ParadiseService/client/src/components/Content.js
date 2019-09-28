import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import { Dashboard } from '../views/Dashboard/index.js'

export const Content = () => {
  return (
    <Layout.Content>
      <Redirect from='/' to='/dashboard' />
      <Route path='/dashboard' component={Dashboard} />
    </Layout.Content>
  )
}