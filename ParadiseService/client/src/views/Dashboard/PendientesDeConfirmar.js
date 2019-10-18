import React from 'react';
import { TarjetaDeReservas, columns } from '../../components/TarjetaDeReservas';

// TEMPORAL
// import { Hotel } from '../../../driver'


export const PendientesDeConfirmar = () => {

  return (
    <TarjetaDeReservas
      url="dashboard/pendientes-de-confirmar"
      title="Pendientes de confirmar..."
      icon="exclamation"
      columns={[
        columns.ResNro,
        columns.ResFecEnt,
        columns.ResFecSal,
        columns.ResHab,
        columns.ResImp,
        columns.ResIng,
        columns.ResQuien]} />
  )
}