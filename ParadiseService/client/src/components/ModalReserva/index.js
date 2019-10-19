import React, { createContext } from 'react';
import Moment from 'moment';
import { Icon, Modal, Tabs } from 'antd';
import { Info } from './Info';
import { TarifaSeña } from './TarifaSeña';
import { ContextoReserva } from './Context/Reserva';

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
    width: '90%',
    content: (
      <ContextoReserva.Provider value={Reserva}>
        <div>
          <Tabs defaultActiveKey="info" style={{minHeight: '300px'}}>
            <Tabs.TabPane tab="Info" key="info">
              <Info resNro={Reserva.ResNro} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Detalles" key="tarifa">
              <TarifaSeña resNro={Reserva.ResNro} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Observaciones" key="observaciones">
              Content of Tab Pane 3
            </Tabs.TabPane>
            <Tabs.TabPane tab="Obs. de mucamas" key="obs-de-mucamas">
              Content of Tab Pane 4
            </Tabs.TabPane>
          </Tabs>
        </div>
      </ContextoReserva.Provider>
    ),
    onOk() {},
  });
}
