import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Card, Breadcrumb, Icon, Table, Tag, ConfigProvider } from 'antd';

// TEMPORAL
// import { Hotel } from '../../../driver'

const Estado = value => {
  let color = '#2196f3'
  if (value === 'Pendiente') color = '#ffc107';
  else if (value === 'Cancelada') color = '#f44336';
  else if (value === 'Ocupada') color = '#4caf50';
  else if (value === 'Finalizada') color = '#607d8b'

  return (
    <Tag color={color} key={value}>
      {value}
    </Tag>
  )
}

const columns = [
  {
    title: 'Nº',
    dataIndex: 'Res.ResNro',
    key: 'Res.ResNro',
    width: 100,
  },
  {
    title: 'Habitación',
    dataIndex: 'Res.ResHab',
    key: 'Res.ResHab',
    render: (text, record) => (
      <span>
        {`${record.Res.ResHab} - ${record.Hab.HabNom}`}
      </span>
    )
  },
  {
    title: 'Titular',
    dataIndex: 'Res.ResQuien',
    key: 'Res.ResQuien',
  },
  {
    title: 'Estado',
    dataIndex: 'Res.ResEsta',
    key: 'Res.ResEsta',
    render: ResEsta => (
      <span>
        {Estado(ResEsta)}
      </span>
    )
  },
];

const handleReservas = (values) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const res of values) {
    if (res.Res.ResEsta.trim() === 'RESINDIV' && res.Res.ResConfirm === 'S') {
      res.Res.ResEsta = 'Confirmada';
    } else if (res.Res.ResEsta.trim() === 'RESINDIV') {
      res.Res.ResEsta = 'Pendiente'
    } else if (res.Res.ResEsta.trim() === 'CANCEL.') {
      res.Res.ResEsta = 'Cancelada'
    } else if (res.Res.ResEsta.trim() === 'OCUPADA') {
      res.Res.ResEsta = 'Ocupada'
    } else if (res.Res.ResEsta.trim() === 'LIBRE') {
      res.Res.ResEsta = 'Finalizada'
    }
    const quien = res.Res.ResQuien.trim().split(" ");
    res.Res.ResQuien = '';
    for (let item of quien) {
      item = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      res.Res.ResQuien += `${item} `;
    }
    res.key = res.Res.ResNro;
  }
  return values;
}

export const IngresanHoy = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    Axios.post('reservas', {
      Ingresan: {
        Fecha: "2019-09-27T00:00:00.000Z"
      }
    }).then((result) => {
      setReservas(handleReservas(result.data));
      setLoading(false);
    })
  
    // cargarReservas();
  }, []);

  return (
    <Card
      bordered={false}
      hoverable
      style={{
        borderRadius: '8px'
      }}>
      <Breadcrumb style={{marginBottom: '16px'}}>
        <Breadcrumb.Item style={{color: '#2196f3'}}>
          Reservas
        </Breadcrumb.Item>
        <Breadcrumb.Item
          style={{
          display: 'inline-flex',
          alignItems: 'center',
          color: '#2196f3'
        }}
        >
          <span>Ingresan hoy...</span>
          <Icon
            component={() => (
              <i
                className="fad fa-sign-in-alt"
                style={{
                fontSize: '1.2rem',
                margin: '0px 8px'
              }}
              />
          )}
          />                    
        </Breadcrumb.Item>
      </Breadcrumb>
      <ConfigProvider renderEmpty={() => (
        <div style={{ textAlign: 'center' }}>
          <Icon
            component={() => (
              <i
                className="fad fa-info"
                style={{
                  padding: '2.5rem 0',
                  fontSize: '5rem',
                  color: '#2196f3'
                }}
              />
            )}/>
          <p>Sin ingresos para hoy...</p>
        </div>)}>
        <Table
          columns={columns}
          dataSource={reservas}
          size='small'
          bordered={false}
          loading={loading} />
      </ConfigProvider>
    </Card>
  )
}