import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { Icon, Table, Tag, ConfigProvider, Modal, Statistic, Row, Col, Tabs, Timeline } from 'antd';
import { Info } from './Info';

export const ModalReserva = (Reserva) => {
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
        <Tabs defaultActiveKey="info" style={{minHeight: '300px'}}>
          <Tabs.TabPane tab="Info" key="info">
            <Info resNro={Reserva.ResNro} />
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
