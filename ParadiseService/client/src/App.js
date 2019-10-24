import React from 'react';
import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'antd';
import { Sider } from './components/Sider';
import { Content } from './components/Content';
import { Footer } from './components/Footer';

import esES from 'antd/es/locale/es_ES';

const app = () => {
  return(
    <ConfigProvider locale={esES}>
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
    </ConfigProvider>
  )
}

export const App = hot(app);
