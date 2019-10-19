import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import { Button, Icon, Statistic, Row, Col, Timeline } from 'antd';

const Telefono = (data) => {
  if (data.length == 9 && data.charAt(0) == '0' && data.charAt(1) == '9'){
    const value = `(+598) ${data.charAt(1)}${data.charAt(2)} ${data.charAt(3)}${data.charAt(4)}${data.charAt(5)} ${data.charAt(6)}${data.charAt(7)}${data.charAt(8)}`
    const wa = `https://wa.me/598${data.charAt(1)}${data.charAt(2)}${data.charAt(3)}${data.charAt(4)}${data.charAt(5)}${data.charAt(6)}${data.charAt(7)}${data.charAt(8)}`
    return (<Statistic title="Teléfono" value={value} suffix={
      <Button type="primary" onClick={() => window.open(wa, "_blank")}>
        <Icon component={() => (
          <i className={`fab fa-whatsapp`} style={{ fontSize: '1rem', color: '#ffffff', paddingBottom: '2px' }} />
        )} />
      </Button>
    } valueStyle={{fontSize: '1rem'}} />)
  } else {
    return(<Statistic title="Teléfono" value={`${data} `} valueStyle={{fontSize: '1rem'}} />);
  }
}

export const Info = props => {
  Moment.locale('es');
  const [Reserva, SetReserva] = useState()
  useEffect(()=>{
  if(props.resNro) {
    Axios.get(`http://localhost:3030/api/hotel/reservas/${props.resNro}`)
    .then((result) => {
      SetReserva(result.data);
    })
  }},[]);
  if(Reserva){
  return (
    <div>
      <Row style={{marginBottom: '8px'}}>
        <Col span={12}>
          <Col style={{marginBottom: '8px'}} span={24}>
            <Statistic title="Titular" value={Reserva.ResQuien} valueStyle={{fontSize: '1.5rem', fontWeight: '600', textTransform: 'capitalize'}} />
          </Col>
          <Col style={{marginBottom: '8px'}} span={12}>
            <Statistic title="Check In" value={Moment(Reserva.ResFecEnt).format('L')} valueStyle={{fontSize: '1rem'}} />
          </Col>
          <Col style={{marginBottom: '8px'}} span={12}>
            <Statistic title="Check Out" value={Moment(Reserva.ResFecSal).format('L')} valueStyle={{fontSize: '1rem'}} />
          </Col>
          <Col style={{marginBottom: '8px'}} span={12}>
            {Telefono(Reserva.ResTel)}
          </Col>
          <Col style={{marginBottom: '8px'}} span={24}>
            <Statistic title="Pensión" value={Reserva.PenDetalle} valueStyle={{fontSize: '1rem', fontWeight: '600', textTransform: 'capitalize'}} />
          </Col>
          <Col style={{marginBottom: '8px'}} span={24}>
            <Statistic title="Rooming" value={`adultos: ${Reserva.ResCamMat} - menores: ${Reserva.ResCamSin} - bebés: ${Reserva.ResCamCun}`} valueStyle={{fontSize: '1rem', textTransform: 'capitalize'}} />
          </Col>
        </Col>
        <Col span={12}>
          {/* <Timeline>
            {Reserva.ResHistoria.map((value) =>{
              switch(value.TipoMovimiento){
                case 'Ingreso': return (
                  <Timeline.Item dot={(
                    <Icon
                      component={() => (
                        <i className={`fad fa-angle-double-right`} style={{ fontSize: '1rem', color: '#2196f3' }} />
                      )} 
                    />)}>
                    {`Ingresada el ${Moment(value.FechaHora).format('L')} por ${value.Usuario}`}
                  </Timeline.Item>)
                case 'Modificación': return (
                  <Timeline.Item dot={(
                    <Icon
                      component={() => (
                        <i className={`fad fa-edit`} style={{ fontSize: '1rem', color: '#607d8b' }} />
                      )} 
                    />)}>
                    {`Modificada el ${Moment(value.FechaHora).format('L')} por ${value.Usuario}`}
                  </Timeline.Item>)
                case 'Cancelación': return (
                  <Timeline.Item dot={(
                    <Icon
                      component={() => (
                        <i className={`fad fa-minus-circle`} style={{ fontSize: '1rem', color: '#f44336' }} />
                      )} 
                    />)}>
                    {`Cancelada el ${Moment(value.FechaHora).format('L')} por ${value.Usuario}`}
                  </Timeline.Item>)
                case 'Confirmación': return (
                  <Timeline.Item dot={(
                    <Icon
                      component={() => (
                        <i className={`fad fa-check`} style={{ fontSize: '1rem', color: '#4caf50' }} />
                      )} 
                    />)}>
                    {`Confirmada el ${Moment(value.FechaHora).format('L')}`}
                  </Timeline.Item>)
              
            default: return null
              }
              
            })
            }
          </Timeline> */}
        </Col>
      </Row>
      <Row style={{marginBottom: '8px'}}>
      </Row>
    </div>
  )
          } else {
            return (
              <div></div>
            )
          }
}