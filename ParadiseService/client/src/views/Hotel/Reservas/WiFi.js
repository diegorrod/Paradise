import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import Numeral from 'numeral';
import Moment from 'moment';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Skeleton, Button, Divider } from 'antd';

export const WiFi = () => {
  // Parametros
  const { resNro } = useParams();
  // Estado
  const [ wifi, setWifi ] = useState();
  const [ mostrarPass, setMostrarPass] = useState(false);
  // Funciones
  function getWiFI() {
    Axios.get(`http://localhost:3030/api/hotel/reservas/${resNro}/wifi`).then(result => {
      console.log(result.data);
      if(result.data.length > 0) {
        setWifi(result.data[0]);
      } else if (result.data.length = 0) {
        setWifi({});
      }
    });
  }
  function alterMostrarPass() {
    if (mostrarPass) {
      setMostrarPass(false);
    } else {
      setMostrarPass(true);
    }
  }
  function b2mb(value) {
    const result = value / 1048576;
    return `${Numeral(result).format('0.00')} MB`;
  }
  function time2moment(value) {
    const d_val = value.split('d');
    const h_val = d_val[1] ? d_val[1].split('h') : value.split('h');
    const m_val = h_val[1] ? h_val[1].split('m') : value.split('m');
    const s_val = m_val[1] ? m_val[1].split('s') : value.split('s');

    const result = Moment.duration({
      d: d_val[0] | 0,
      h: h_val[0] | 0,
      m: m_val[0] | 0,
      s: s_val[0] | 0
    })
    return result;
  }
  // Efectos
  useEffect(()=>{
    getWiFI();
  }, [])
  // Estilos
  const Style = {
    Card: {
      margin: '0 50px',
      padding: '24px',
      borderRadius: '12px'
    }
  }
  // Renderizado
  return (
    <Card style={Style.Card}>
      {
        wifi ?
        <div>
          <Descriptions title="Datos del usuario:">
            <Descriptions.Item label="Usuario">{wifi.Name}</Descriptions.Item>
            <Descriptions.Item label="Contraseña">
              {
                mostrarPass ? 
                <span>
                  {wifi.Password}
                  <Divider type="vertical" />
                  <Button onClick={alterMostrarPass}>Ocultar</Button>
                </span> :
                <Button onClick={alterMostrarPass}>Mostrar</Button>
              }
              {/* {
                mostrarPass ? 
                <Button type="link" onClick={setMostrarPass(true)}>Mostrar</Button> :
                <div>
                  {wifi.Password}
                  <Divider type="vertical" />
                  <Button type="link" onClick={setMostrarPass(false)}>Ocultar</Button>
                </div>
              } */}
            </Descriptions.Item>
            <Descriptions.Item label="Perfil">{wifi.Profile}</Descriptions.Item>
            <Descriptions.Item label="Tiempo en linea">{time2moment(wifi.Uptime).humanize()}</Descriptions.Item>
            <Descriptions.Item label="Subido">{b2mb(wifi.BytesIn)}</Descriptions.Item>
            <Descriptions.Item label="Descargado">{b2mb(wifi.BytesOut)}</Descriptions.Item>
          </Descriptions>
        </div> :
        <Skeleton active />
      }
    </Card>
  );
}

export default WiFi;