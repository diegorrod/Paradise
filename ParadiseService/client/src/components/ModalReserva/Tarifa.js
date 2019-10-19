import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Numeral from 'numeral';
import { Table } from 'antd';
import { ContextoReserva } from './Context/Reserva';

export const Tarifa = () => {
  const reserva = useContext(ContextoReserva);
  const [data, setData] = useState(
    {
      detalle: []
    }
  )

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/hotel/reservas/${reserva.ResNro}/tarifa`)
      .then(result => {
        setData(result.data);
      })
  },[])

  const columns = [
    {
      title: 'Detalle',
      dataIndex: 'ResTarDet',
    },
    {
      title: 'Importe',
      dataIndex: 'ResTarDiaCImp',
    },
    {
      title: 'Noches',
      dataIndex: 'ResTarDias',
    },
    {
      title: 'Total',
      render: (value, record) => (
        <div style={{textAlign: 'right'}}>{Numeral(record.ResTarDias * record.ResTarDiaCImp).format('0,0.00')}</div>
      ),
    },
  ]

  return (
      <Table columns={columns} dataSource={data.detalle} pagination={false} size="small" />
  )
}