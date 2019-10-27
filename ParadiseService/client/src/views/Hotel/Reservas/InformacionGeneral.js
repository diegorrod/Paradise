import React from 'react';

import { Card, Descriptions, Typography, Divider, Button } from 'antd';

const style = {
  card: {
    margin: '0 50px',
    padding: '6px 24px',
    borderRadius: '12px'
  }
}

export default () => {
  return (
    <Card style={style.card}>
      {
        reserva ? 
        <Descriptions column={8} layout="vertical">
          <Descriptions.Item label="Titular" className="textTransform-capitalize" span={8}>
            <Typography.Title level={2}>
              <a>{reserva.ResPaxTit}</a>
              <Divider type="vertical" />
              {reserva.ResQuien}
            </Typography.Title>
          </Descriptions.Item>
          <Descriptions.Item label="Res. Nº" span={1}>
            {resNro}
          </Descriptions.Item>
          <Descriptions.Item label="Check In" span={2}>
            {`${Moment(reserva.ResFecEnt).format('DD/MM/YYYY')} ${reserva.ResFecEntHor}`}
          </Descriptions.Item>
          <Descriptions.Item label="Check Out" span={2}>
            {`${Moment(reserva.ResFecSal).format('DD/MM/YYYY')} ${reserva.ResLateCheckOut ? '20:00' : '11:00'}`}
          </Descriptions.Item>
          <Descriptions.Item label="habitación" className="textTransform-capitalize" span={3}>
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
  )
}