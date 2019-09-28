import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { Sider } from './components/Sider';
import { Content } from './components/Content';
import { Footer } from './components/Footer';

export const App = props => {
  return(
    <HashRouter>
      <Layout style={{height: 'inherit'}}>
        <Layout.Header>

        </Layout.Header>
        <Layout>
          <Sider />
          <Content />
        </Layout>
        <Footer />
      </Layout>
    </HashRouter>
  )
}
