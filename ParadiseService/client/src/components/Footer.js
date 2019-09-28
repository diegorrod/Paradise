import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Icon } from 'antd';
import Axios from 'axios';
import Pak from '../../package.json';


export const Footer = () => {
  const [info, setInfo] = useState({
    apiVersion: "",
    uiVersion: ""
  });

  const handleSetInfo = (apiVersion, uiVersion) => {
    setInfo({apiVersion, uiVersion})
  }

  useEffect(()=>{
    Axios.get('info').then(result => {
      handleSetInfo(result.data.Version, Pak.version);
    })
  },[])

  return (
    <Layout.Footer style={{color: '#eceff1',backgroundColor: '#263238', padding: '12px 80px'}}>
      <Row justify='space-between'>
        <Col span={12} />
        <Col span={12}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <span style={{marginLeft: '8px'}}><Icon component={() => (<i className={`fad fa-tv`} />)} /></span>
            <span style={{marginLeft: '8px'}}>Api: versión: {info.apiVersion}</span>
            <span style={{marginLeft: '8px'}}>UI: versión: {info.uiVersion}</span>
          </div>
        </Col>
      </Row>
    </Layout.Footer>
  )
}