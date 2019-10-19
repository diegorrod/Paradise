import React from 'react';
import {  Row, Col, Divider } from 'antd';
import { Tarifa } from './Tarifa';
import { Seña } from './Seña';
import { Resumen } from './Resumen';

export const TarifaSeña = () => {
  return (
    <div>
      <Row gutter={12}>
        <Col span={12}>
          <Divider>Tarifa</Divider>
          <Tarifa />
        </Col>
        <Col span={12}>
          <Divider>Seña y vouchers</Divider>
          <Seña />
        </Col>
      </Row>
      <Divider>Resumen</Divider>
      <Row>
        <Col span={8} offset={16}>
          <Resumen />
        </Col>
      </Row>
    </div>
  )
}