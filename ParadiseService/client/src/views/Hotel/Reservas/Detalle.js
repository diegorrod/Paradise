import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Layout, PageHeader, Tag, Divider, Descriptions, Skeleton, Card, Button, Icon, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

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
  useEffect(()=>{
    Axios
      .get(`http://localhost:3030/api/hotel/reservas/${resNro}`)
      .then(result => {
        setReserva(result.data);
      })
    },
    []
  );
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
                  20/10/2019 - 11:00
                </Descriptions.Item>
                <Descriptions.Item
                  label="Check Out"
                  span={2}>
                  20/10/2019 - 20:00
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
          <Divider style={{padding: '0 50px'}}>Señas</Divider>
          <Divider style={{padding: '0 50px'}}>Vouchers</Divider>
          <Divider style={{padding: '0 50px'}}>Cargos</Divider>
          <Divider style={{padding: '0 50px'}}>WiFi</Divider>
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