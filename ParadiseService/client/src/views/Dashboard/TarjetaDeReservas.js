import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import Numeral from 'numeral';
import { Card, Breadcrumb, Icon, Table, Tag, ConfigProvider, notification, Button } from 'antd';
import { detalleReserva } from './TarjetaDeReservas.Detalle';

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
  
const handleReservas = (values) => {
// eslint-disable-next-line no-restricted-syntax
  for (const res of values) {
    if (res.ResEsta.trim() === 'RESINDIV' && res.ResConfirm === 'S') {
    res.ResEsta = 'Confirmada';
    } else if (res.ResEsta.trim() === 'RESINDIV') {
    res.ResEsta = 'Pendiente'
    } else if (res.ResEsta.trim() === 'CANCEL.') {
    res.ResEsta = 'Cancelada'
    } else if (res.ResEsta.trim() === 'OCUPADA') {
    res.ResEsta = 'Ocupada'
    } else if (res.ResEsta.trim() === 'LIBRE') {
    res.ResEsta = 'Finalizada'
    }
    res.key = res.ResNro;
  }
  return values;
}

export const columns = {
  ResNro: {
    title: 'Nº',
    dataIndex: 'ResNro',
    key: 'ResNro',
    width: 60,
    render: (text, record) => (
        <a onClick={()=>detalleReserva(record)}>
          {text}
        </a>        
      )
  },
  ResHab: {
    title: 'Habitación',
    dataIndex: 'ResHab',
    key: 'ResHab',
    width: 140,
    render: (text, record) => (
      <span>
        {`${record.ResHab} - ${record.ResHabNom}`}
      </span>
    )
  },
  ResQuien: {
    title: 'Titular',
    dataIndex: 'ResQuien',
    key: 'ResQuien',
  },
  ResEsta: {
    title: 'Estado',
    dataIndex: 'ResEsta',
    key: 'ResEsta',
    width: 80,
    filters: [
      {
        text: 'Pendiente',
        value: 'Pendiente'
      },
      {
        text: 'Confirmada',
        value: 'Confirmada'
      },
      {
        text: 'Ocupada',
        value: 'Ocupada'
      },
      {
        text: 'Finalizada',
        value: 'Finalizada'
      },
      {
        text: 'Cancelada',
        value: 'Cancelada'
      }
    ],
    onFilter: (value, record) => record.ResEsta === value ? true : false,
    render: ResEsta => (
      <span>
        {Estado(ResEsta)}
      </span>
    )
  },
  ResFecEnt: {
    title: 'Check In',
    dataIndex: 'ResFecEnt',
    key: 'ResFecEnt',
    width: 100,
    render: ResFecEnt => (
      <span>
        {Moment(ResFecEnt).format("DD/MM/YYYY")}
      </span>
    )
  },
  ResFecSal: {
    title: 'Check Out',
    dataIndex: 'ResFecSal',
    key: 'ResFecSal',
    width: 100,
    render: ResFecSal => (
      <span>
        {Moment(ResFecSal).format("DD/MM/YYYY")}
      </span>
    )
  },
  ResIng: {
    title: 'Ingresada por',
    dataIndex: 'ResUsuIngNom',
    key: 'ResUsuIngNom',
    render: (ResUsuIngNom, record) => (
      <span>
        {`${ResUsuIngNom} el ${Moment(record.ResFecIng).format("DD/MM/YYYY")}`}
      </span>
    )
  },
  ResUsuIngNom: {
    title: 'Por',
    dataIndex: 'ResUsuIngNom',
    key: 'ResUsuIngNom',
  },
  ResUsuModNom: {
    title: 'Mod. por',
    dataIndex: 'ResUsuModNom',
    key: 'ResUsuModNom',
  },
  ResImp: {
    title: 'Ingresada por',
    dataIndex: 'ResTarImp',
    key: 'ResTarImp',
    render: (ResTarImp, record) => (
      <span>
        {`${record.ResTarMonSim} ${Numeral(ResTarImp).format('0,0')}`}
      </span>
    )
  }
}

export const TarjetaDeReservas = props => {
  const defColumns = [
    columns.ResNro,
    columns.ResHab,
    columns.ResQuien,
    columns.ResEsta
  ];

  const defFiltersValues = {
    ResEsta: null
  }

  const [filetrsValues, setFiltersValues] = useState(defFiltersValues);
  const [columnDef, setColumnDef] = useState([])
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const defEmpty = {icon: 'info', message: 'Sin datos que mostrar...', actualizar: true};
  const [empty, setEmpty] = useState(defEmpty)

  const handleChange = (pagination, filters, sorter) => {
    setFiltersValues(filters);
  };

  const obtenerDatos = () => {
    setLoading(true);
    setEmpty({icon: 'search', message: 'Buscando datos para mostrar...', actualizar: false});

    setColumnDef(props.columns ? props.columns : defColumns)
    setFiltersValues(props.filtersValues || defFiltersValues)
    Axios.get(props.url)
      .then((result) => {
        setReservas(handleReservas(result.data));
        setLoading(false);
        setEmpty(defEmpty);
      })
      .catch(() => {
        const notificar = mensaje => {
          notification.error({
            message: 'Ups!!!',
            description: mensaje,
            duration: 10
          })
          setEmpty({icon: 'flushed', message: 'Algo salió mal, y no sabemos porque...', actualizar: true});
        }
        notificar('Algo salió mal, y no sabemos porque...');
        setReservas([]);
        setLoading(false);
      })
  }
  

  defColumns.find(x => x.dataIndex === 'ResEsta').filteredValue = filetrsValues.ResEsta;

  useEffect(() => {
    obtenerDatos();
    }, []);

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: '8px',
        marginTop: '24px'
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
          <span>{props.title}</span>
          <Icon
            component={() => (
              <i
                className={`fad fa-${props.icon}`}
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
                className={`fad fa-${empty.icon}`}
                style={{
                  padding: '2.5rem 0',
                  fontSize: '5rem',
                  color: '#2196f3'
                }}
              />
            )}/>
          <p>{empty.message}</p>
          <Button onClick={()=>{ obtenerDatos() }} style={{
              visibility: empty.actualizar ? 'visible' : 'hidden'
            }}>
            Actualizar
          </Button>
        </div>)}>
        <Table
          columns={columnDef}
          dataSource={reservas}
          bordered={false}
          loading={loading}
          onChange={handleChange} />
      </ConfigProvider>
    </Card>
  )
}
  