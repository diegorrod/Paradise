import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Table, Statistic, Collapse, Tag, Row, Col } from 'antd';

export const TarifaSeña = props => {
  const columns = {
    tarifa: [
      {
        title: 'Detalle',
        dataIndex: 'ResTarDet',
      },
      {
        title: 'Importe',
        dataIndex: 'ResTarDiaCImp',
      },
      {
        title: 'Noches',
        dataIndex: 'ResTarDias',
      },
      {
        title: 'Total',
        render: (value, record) => (
          <span>{record.ResTarDias * record.ResTarDiaCImp}</span>
        ),
      },
    ],
    seña: [
      {
        title: 'Fecha',
        dataIndex: 'ResSenFecha',
      },
      {
        title: 'Importe',
        dataIndex: 'ResSenImp',
        render: (value, record) => (
          <span style={{textTransform: "uppercase"}}>{`${record.MonSim} - ${value}`}</span>
        )
      },
      {
        title: 'Presencial',
        dataIndex: 'Presencial',
        render: value => {
          if (value) {
            return (<Tag color="blue">SEÑA PRESENCIAL</Tag>)
          } else {
            return (<Tag color="orange">SEÑA NO PRESENCIAL</Tag>)
          }
        }
      },
    ]
  };
  const [Tarifa, SetTarifa] = useState({detalle:[]});
  const [Seña, SetSeña] = useState([]);
  const calcular = () => {
    let tarifa = 0;
    let cargos = 0;
    let seña = 0;
    let saldo = 0;
    Tarifa.detalle.map(row => {
      tarifa += row.ResTarDias * row.ResTarDiaCImp;
    })
    Seña.map(row => {
      seña += row.ResSenImp
    })
    saldo = tarifa + cargos - seña;
    return {
      tarifa,
      cargos,
      seña,
      saldo
    }
  }
  useEffect(()=>{
    if(props.resNro) {
      Axios.get(`http://localhost:3030/api/hotel/reservas/${props.resNro}/tarifa`)
        .then(result => {
          console.log(result);
          SetTarifa(result.data);
        })
      Axios.get(`http://localhost:3030/api/hotel/reservas/${props.resNro}/senias`)
        .then(result => {
          console.log(result);
          SetSeña(result.data);
        })
    }
  },[]);
  return (
    <div>
      <Collapse accordion bordered={false}>
      <Collapse.Panel header="Tarifa">
          <Table
            dataSource={Tarifa.detalle}
            columns={columns.tarifa}
            pagination={false}
            size='small'
          />
        </Collapse.Panel>
        <Collapse.Panel header="Seña">
          <Table
            dataSource={Seña}
            columns={columns.seña}
            pagination={false}
            size='small'
          />
        </Collapse.Panel>
      </Collapse>
      <Row>
        <Col span={6}>
          <Statistic title="Tarifa" value={`U$S - ${calcular().tarifa}`} />
        </Col>
        <Col span={6}>
          <Statistic title="Cargos" value={`U$S - ${calcular().cargos}`} />
        </Col>
        <Col span={6}>
          <Statistic title="Seña" value={`U$S - ${calcular().seña}`} />
        </Col>
        <Col span={6}>
          <Statistic title="Saldo" value={`U$S - ${calcular().saldo}`} />
        </Col>
      </Row>

    </div>
  )
}