import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Numeral from 'numeral';
import Moment from 'moment';
import { useParams } from 'react-router-dom';
import { Layout, PageHeader, Tag, Divider, Descriptions, Skeleton, Card, Button, Icon, Typography, Table } from 'antd';

import { WiFi } from './WiFi';

import './Detalle.css';

const procesarTelefono = (data) => {
  if (data.length == 9 && data.charAt(0) == '0' && data.charAt(1) == '9'){
    const value = `(+598) ${data.charAt(1)}${data.charAt(2)} ${data.charAt(3)}${data.charAt(4)}${data.charAt(5)} ${data.charAt(6)}${data.charAt(7)}${data.charAt(8)}`
    const whatsApp = `https://wa.me/598${data.charAt(1)}${data.charAt(2)}${data.charAt(3)}${data.charAt(4)}${data.charAt(5)}${data.charAt(6)}${data.charAt(7)}${data.charAt(8)}`
    return {
      value,
      whatsApp
    }
  } else {
    return {
      value: data
    };
  }
}

export const Detalle = () => {
  const { resNro } = useParams();
  const [ reserva, setReserva ] = useState();
  const [ tarifa, setTarifa ] = useState();
  const [ seña, setSeña ] = useState();
  const [ vouchers, setVouchers ] = useState();
  const [ cargos, setCargos ] = useState();


  useEffect(()=>{
    const dat = {
      reserva: undefined,
    }

    Axios.get(`http://localhost:3030/api/hotel/reservas/${resNro}`).then(result => {
      dat.reserva = result.data;
      setReserva(result.data);
      return Axios.get(`http://localhost:3030/api/hotel/reservas/${resNro}/tarifa`)
    }).then(result => {
      setTarifa(result.data);
      return Axios.get(`http://localhost:3030/api/hotel/reservas/${resNro}/senias`)
    }).then(result => {
      setSeña(result.data.filter(item => Moment(item.ResSenFecha).isSameOrBefore(dat.reserva.ResFecEnt)));
      setVouchers(result.data.filter(item => Moment(item.ResSenFecha).isAfter(dat.reserva.ResFecEnt)));
      return Axios.get(`http://localhost:3030/api/hotel/reservas/${resNro}/cargos`)
    }).then(result => {
      setCargos(result.data);
    });
  },[]);

  const colTarifa = [
    {
      title: 'Detalle',
      dataIndex: 'ResTarDet',
      render: value => (
        <div style={
          {
            textTransform: 'capitalize'
          }
        }>{value}</div>
      )
    },
    {
      title: 'Importe',
      dataIndex: 'ResTarDiaCImp',
      width: '140px',
      className: 'hotel-reserva-detalle--column-number',
      render: value => (
        <div>
          {
            `${tarifa.MonSim} ${Numeral(value).format('0,0.00')}`
          }
        </div>
      )
    },
    {
      title: 'Noches',
      dataIndex: 'ResTarDias',
      className: 'hotel-reserva-detalle--column-number',
      width: '100px'
      },
    {
      title: 'Total',
      className: 'hotel-reserva-detalle--column-number --fw600',
      width: '140px',
      render: (value, record) => (
        <div> 
          {
            `${tarifa.MonSim} ${Numeral(record.ResTarDias * record.ResTarDiaCImp)
            .format('0,0.00')}`
          }
        </div>),
    },
  ]
  const colSeñaVouchers = [
    {
      title: 'Fecha',
      dataIndex: 'ResSenFecha',
      width: '140px',
      render: value => (
        <div>{Moment(value).format('DD/MM/YYYY')}</div>
      )
    },
    {
      title: 'Presencial',
      render: value => {
        if (value) {
          return (<Tag color="blue">SEÑA PRESENCIAL</Tag>)
        } else {
          return (<Tag color="orange">SEÑA NO PRESENCIAL</Tag>)
        }
      }
    },
    {
      title: 'Importe',
      dataIndex: 'ResSenImp',
      className: 'hotel-reserva-detalle--column-number --fw600',
      render: (value, record) => (
        <span style={{textTransform: "uppercase"}}>{`${record.MonSim} - ${value}`}</span>
      )
    }
  ]
  const colCargos = [
    {
      title: 'Fecha',
      dataIndex: 'Fecha',
    },
    {
      title: 'Punto de venta',
      dataIndex: 'PuntoDeVenta',
    },
    {
      title: 'Importe',
      dataIndex: 'Importe'
    },
    {
      title: 'Estado',
      dataIndex: 'Facturado',
      render: value => (
        value ? <Tag color="green">Facturado</Tag> : <Tag color="orange">Pendiente</Tag>
      )
    }
  ]

  return (
    <Layout>
      <Layout.Header style={{backgroundColor: '#f0f2f5'}}>
        <PageHeader
          title="detalle de reserva"
          style={
            {
              textTransform: 'capitalize'
            }
          }
          tags={
            <Tag color="#2196f3">
              Beta
            </Tag>
          }/>
      </Layout.Header>
      <Layout>
        <Layout.Content>
          <Divider style={{padding: '0 50px'}}>Información general</Divider>
            <Card
              style={
                {
                  margin: '0 50px',
                  padding: '6px 24px',
                  borderRadius: '12px'
                }
              }>
              {
                reserva ? 
                <Descriptions
                  column={8}
                  layout="vertical">
                  <Descriptions.Item
                    label="Titular"
                    className="textTransform-capitalize"
                    span={8}>
                    <Typography.Title level={2}>
                      <a>{reserva.ResPaxTit}</a>
                      <Divider type="vertical" />
                      {reserva.ResQuien}
                    </Typography.Title>
                  </Descriptions.Item>

                  <Descriptions.Item
                    label="Res. Nº"
                    span={1}>
                    {resNro}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Check In"
                    span={2}>
                    {`${Moment(reserva.ResFecEnt).format('DD/MM/YYYY')} ${reserva.ResFecEntHor}`}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Check Out"
                    span={2}>
                    {`${Moment(reserva.ResFecSal).format('DD/MM/YYYY')} ${reserva.ResLateCheckOut ? '20:00' : '11:00'}`}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="habitación"
                    className="textTransform-capitalize"
                    span={3}>
                    {`${reserva.ResHab} - ${reserva.HabNom}`}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Teléfono"
                    className="textTransform-capitalize"
                    span={3}>
                    {procesarTelefono(reserva.ResTel).value}
                    <Divider type="vertical" />
                    {procesarTelefono(reserva.ResTel).whatsApp ? <Button type="primary" onClick={() => window.open(procesarTelefono(reserva.ResTel).whatsApp, "_blank")}>
                      <Icon component={() => (
                        <i className={`fab fa-whatsapp`} style={{ fontSize: '1rem', color: '#ffffff', paddingBottom: '2px' }} />
                        )} />
                    </Button> : null}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="adultos"
                    className="textTransform-capitalize"
                    span={1}>
                    {reserva.ResCamMat}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="menores"
                    className="textTransform-capitalize"
                    span={1}>
                    {reserva.ResCamSin}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="bebes"
                    className="textTransform-capitalize"
                    span={1}>
                    {reserva.ResCamCun}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Pensión"
                    className="textTransform-capitalize"
                    span={2}>
                    {reserva.PenDetalle}
                  </Descriptions.Item>
                </Descriptions> :
                <Skeleton active/>       
              }
            </Card>
          <Divider style={{padding: '0 50px'}}>Tarifas</Divider>
            <Card
              style={
                {
                  margin: '0 50px',
                  padding: '24px',
                  borderRadius: '12px'
                }
              }>
              {
                tarifa ?
                <Table size="small" pagination={false} columns={colTarifa} dataSource={tarifa.detalle} /> :
                <Skeleton active />
              }
            </Card>
          <Divider style={{padding: '0 50px'}}>Señas</Divider>
            <Card
              style={
                {
                  margin: '0 50px',
                  padding: '24px',
                  borderRadius: '12px'
                }
              }>
              {
                seña ?
                <Table size="small" pagination={false} columns={colSeñaVouchers} dataSource={seña} /> :
                <Skeleton active />
              }
            </Card>
          <Divider style={{padding: '0 50px'}}>Vouchers</Divider>
            <Card
              style={
                {
                  margin: '0 50px',
                  padding: '24px',
                  borderRadius: '12px'
                }
              }>
              {
                seña ?
                <Table size="small" pagination={false} columns={colSeñaVouchers} dataSource={vouchers} /> :
                <Skeleton active />
              }
            </Card>
          <Divider style={{padding: '0 50px'}}>Cargos</Divider>
            <Card
              style={
                {
                  margin: '0 50px',
                  padding: '24px',
                  borderRadius: '12px'
                }
              }>
              {
                cargos ?
                <Table size="small" pagination={false} columns={colCargos} dataSource={cargos} /> :
                <Skeleton active />
              }
            </Card>
          <Divider style={{padding: '0 50px'}}>WiFi</Divider>
          <WiFi />
          <Divider style={{padding: '0 50px'}}>Pensión</Divider>
          <Divider style={{padding: '0 50px'}}>Rooming</Divider>
        </Layout.Content>
        <Layout.Sider
          style={
            {
              background: '#f0f2f5'
            }
          }>
          Test
        </Layout.Sider>
      </Layout>
    </Layout>
  )
}