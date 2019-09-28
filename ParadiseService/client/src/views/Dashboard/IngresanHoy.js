import React from 'react';
import { TarjetaDeReservas } from './TarjetaDeReservas';

export const IngresanHoy = () => {
  return (
    <TarjetaDeReservas
      url="dashboard/salen-hoy"
      title="Salen hoy..."
      icon="sign-out-alt" />
  )
}