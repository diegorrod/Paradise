using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Paradise.Service.Controller.Hotel.Reservas
{
    [RoutePrefix("api/hotel/reservas")]
    public partial class ReservasController : ApiController
    {
        internal static int SQL_TIMEOUTE = 5;
        // Reserva basica
        // Reserva datos del cliente
        // Reserva tarifa
        // Reserva seña

        // Reserva historial
        // Reserva auditoria
    }
}
