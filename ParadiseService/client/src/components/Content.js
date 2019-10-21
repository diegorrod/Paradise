import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import { Dashboard } from '../views/Dashboard/index.js'
import { Detalle } from '../views/Hotel/Reservas/Detalle.js';

export const Content = () => {
  return (
    <Layout.Content>
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/hotel/reservas/:resNro' component={Detalle} />
      {/* <Redirect from='/' exact={true} to='/dashboard' /> */}
    </Layout.Content>
  )
}