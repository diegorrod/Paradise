import React from 'react';
import { TarjetaDeReservas } from '../../components/TarjetaDeReservas';

export const IngresanHoy = () => {
  return (
    <TarjetaDeReservas
      url="dashboard/ingresan-hoy"
      title="Ingresan hoy..."
      icon="sign-in-alt"
      filtersValues={{
        ResEsta: ['Pendiente', 'Confirmada']
      }} />
  )
}