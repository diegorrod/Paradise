import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import Numeral from 'numeral';
import { Icon, Table, Tag, ConfigProvider, Modal, Statistic, Row, Col, Tabs, Timeline } from 'antd';

export const detalleReserva = (Reserva) => {
  Moment.locale('es');
  Modal.info({
    icon: (<Icon
      component={() => (
        <i
          className={`fad fa-file-alt`}
          style={{
          fontSize: '5rem',
          margin: '0px 28px 0px 8px'
        }}
        />
    )}
    />),
    title: `Reserva Nº ${Reserva.ResNro} | Hab: ${Reserva.ResHab} - ${Reserva.ResHabNom}`,
    width: '80%',
    content: (
      <div>
        <Tabs defaultActiveKey="info">
          <Tabs.TabPane tab="Info" key="info">
            <Row style={{marginBottom: '8px'}}>
              <Col span={12}>
                <Col style={{marginBottom: '8px'}} span={24}>
                  <Statistic title="Titular" value={Reserva.ResQuien} valueStyle={{fontSize: '1.5rem', fontWeight: '600'}} />
                </Col>
                <Col style={{marginBottom: '8px'}} span={12}>
                  <Statistic title="Check In" value={Moment(Reserva.ResFecEnt).format('L')} valueStyle={{fontSize: '1rem'}} />
                </Col>
                <Col style={{marginBottom: '8px'}} span={12}>
                  <Statistic title="Check Out" value={Moment(Reserva.ResFecSal).format('L')} valueStyle={{fontSize: '1rem'}} />
                </Col>
                <Col style={{marginBottom: '8px'}} span={12}>
                  <Statistic title="Teléfono" value={Moment(Reserva.ResFecEnt).format('L')} valueStyle={{fontSize: '1rem'}} />
                </Col>
              </Col>
              <Col span={12}>
                <Timeline>
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
                </Timeline>
              </Col>
            </Row>
            <Row style={{marginBottom: '8px'}}>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tarifa" key="tarifa">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Seña" key="seña">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Observaciones" key="observaciones">
            Content of Tab Pane 3
          </Tabs.TabPane>
          <Tabs.TabPane tab="Obs. de mucamas" key="obs-de-mucamas">
            Content of Tab Pane 4
          </Tabs.TabPane>
        </Tabs>
      </div>
    ),
    onOk() {},
  });
}
