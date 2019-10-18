import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Icon, Table, Tag, ConfigProvider, Modal, Statistic, Row, Col, Tabs, List, Comment } from 'antd';

export const Observaciones = props => {
  const [observaciones, setObservaciones] = useState([]);
  useEffect(()=>{
    Axios.get(`hotel/reservas/${props.resNro}/observaciones`)
      .then(result =>setObservaciones(result.data))
  })
  return (
    <List
      dataSource={observaciones}
      itemLayout="horizontal"
      // renderItem={item => (
      //   <li>
      //     <Comment content={item} />
      //   </li>
      // )}
    />
  )
}