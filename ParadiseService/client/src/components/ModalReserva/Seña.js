import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import { Table, Tag } from 'antd';
import { ContextoReserva } from './Context/Reserva';

export const Seña = () => {
  const reserva = useContext(ContextoReserva);
  const [data, setData] = useState([])

    useEffect(() => {
      Axios.get(`http://localhost:3030/api/hotel/reservas/${reserva.ResNro}/senias`)
        .then(result => {
          console.log(result.data);
          setData(result.data);
        })
    },[])

    const columns = [
      {
        title: 'Fecha',
        dataIndex: 'ResSenFecha',
        render: value => (
          <div>{Moment(value).format('DD/MM/YYYY')}</div>
        )
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
        render: value => {
          if (value) {
            return (<Tag color="blue">SEÑA PRESENCIAL</Tag>)
          } else {
            return (<Tag color="orange">SEÑA NO PRESENCIAL</Tag>)
          }
        }
      },
    ]

    return (
        <Table columns={columns} dataSource={data} pagination={false} size="small" />
    )
}