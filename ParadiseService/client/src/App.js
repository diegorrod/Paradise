import React from 'react';
import { HashRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'antd';
import { Sider } from './components/Sider';
import { Content } from './components/Content';
import { Footer } from './components/Footer';

const app = () => {
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

export const App = hot(app);
