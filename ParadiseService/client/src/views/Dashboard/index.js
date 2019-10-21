import React from 'react';
import { Layout, Row, Col, PageHeader, Tag, Divider } from 'antd';
import { IngresanHoy } from './IngresanHoy'
import { SalenHoy } from './SalenHoy';
import { PendientesDeConfirmar } from './PendientesDeConfirmar';

export const Dashboard = () => {
  return (
    <Layout>
      <Layout.Header style={{backgroundColor: '#f0f2f5'}}>
        <PageHeader title="Dashboard" tags={<Tag color="#2196f3">Beta</Tag>}/>
      </Layout.Header>
      <Layout.Content>
        <Divider style={{padding: '0 50px'}}>Información general</Divider>
        <Row gutter={24} style={{padding: '0 50px', paddingBottom: '50px'}}>
          <Col
              xl={{
                span: 12,
              }}>
            <IngresanHoy />
          </Col>
          <Col
              xl={{
                span: 12,
              }}>
            <SalenHoy />
          </Col>
          <Col
              xl={{
                span: 24,
              }}>
            <PendientesDeConfirmar />
          </Col>
          {/* <Col
              xl={{
                span: 12,
              }}>
            <SalenHoy />
          </Col> */}
        </Row>
      </Layout.Content>
    </Layout>
  )
}