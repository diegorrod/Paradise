import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import hot from 'react-hot-loader';
import { Row, Col, List } from 'antd';
import { ContextoReserva } from './Context/Reserva';

export const Resumen = () => {
  const reserva = useContext(ContextoReserva);
//   const [data, setData] = useState([])

    useEffect(() => {
      let señas = [];
      let tarifas = [];
      Axios.get(`http://localhost:3030/api/hotel/reservas/${reserva.ResNro}/senias`)
        .then(result => {
          señas = result.data;
          Axios.get(`http://localhost:3030/api/hotel/reservas/${reserva.ResNro}/tarifa`)
            .then(result => {
              tarifas = result.data.detalle;
              console.log(tarifas, señas);
            })
        })
    },[])

//     const columns = [
//       {
//         title: 'Fecha',
//         dataIndex: 'ResSenFecha',
//         render: value => (
//           <div>{Moment(value).format('DD/MM/YYYY')}</div>
//         )
//       },
//       {
//         title: 'Importe',
//         dataIndex: 'ResSenImp',
//         render: (value, record) => (
//           <span style={{textTransform: "uppercase"}}>{`${record.MonSim} - ${value}`}</span>
//         )
//       },
//       {
//         title: 'Presencial',
//         render: value => {
//           if (value) {
//             return (<Tag color="blue">SEÑA PRESENCIAL</Tag>)
//           } else {
//             return (<Tag color="orange">SEÑA NO PRESENCIAL</Tag>)
//           }
//         }
//       },
//     ]

  return (
    <Row>
      <Col span={12}>
        <List>
          <List.Item>Tarifa:</List.Item>
          <List.Item>Seña:</List.Item>
          <List.Item style={{fontWeight: '600'}}>Saldo:</List.Item>
        </List>
      </Col>
      <Col span={12}>
        <List>
          <List.Item style={{textAlign: 'right'}}>500</List.Item>
          <List.Item style={{textAlign: 'right'}}>100</List.Item>
          <List.Item style={{fontWeight: '600', textAlign: 'right'}}>400</List.Item>
        </List>
      </Col>
    </Row>
  )
}
