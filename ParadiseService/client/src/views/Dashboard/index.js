import React from 'react';
import { Layout, Row, Col, PageHeader, Tag } from 'antd';
import { IngresanHoy } from './IngresanHoy'

export const Dashboard = () => {
  return (
    <Layout>
      <Layout.Header style={{backgroundColor: '#f0f2f5'}}>
      <PageHeader title="Dashboard" tags={<Tag color="#2196f3">Beta</Tag>}/>
      </Layout.Header>
      <Layout.Content>
        <Row style={{padding: '0 50px', paddingTop: '24px'}}>
          <Col
              xl={{
                span: 12,
              }}>
            <IngresanHoy />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}