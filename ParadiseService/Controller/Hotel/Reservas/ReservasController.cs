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
        // Reserva basica
        // Reserva datos del cliente
        // Reserva tarifa
        // Reserva seña
        // Reserva observaciones
        [Route("{resNro}/observaciones")]
        [HttpGet]
        public async Task<IHttpActionResult> GetObservaciones(string resNro)
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (var db = new ParadiseDataContext())
                    {
                        var result = (from obs
                                     in db.RESOBSERVA
                                      where obs.ResNro == Convert.ToInt32(resNro)
                                      select obs.ResDatObs).ToList();
                        return Ok(result);
                    }
                }
                catch (System.Data.SqlClient.SqlException)
                {
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.GatewayTimeout));
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            });
        }

        // Reserva observaciones mucamas
        [Route("{resNro}/observaciones-mucamas")]
        [HttpGet]
        public async Task<IHttpActionResult> GetObservacionesMucamas(int resNro)
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (var db = new ParadiseDataContext())
                    {
                        db.CommandTimeout = 5;
                        var result = (from obs
                                     in db.RESERVAMUCAMA
                                      where obs.ResNro == Convert.ToInt32(resNro)
                                      select obs).ToList();
                        return Ok(result);
                    }
                }
                catch (System.Data.SqlClient.SqlException)
                {
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.GatewayTimeout));
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            });
        }
        // Reserva historial
        // Reserva auditoria
    }
}
