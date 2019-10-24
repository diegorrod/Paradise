using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Paradise.Service.Controller.Hotel.Reservas
{
    public partial class ReservasController : ApiController
    {
        [Route("{resNro}/cargos")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCargos(string resNro)
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (var db = new ParadiseDataContext())
                    {
                        db.CommandTimeout = SQL_TIMEOUTE;
                        var query = from cargo
                                    in db.GASTOS
                                    join punto in db.PTOVENT on cargo.GtoCabPtoVta equals punto.PtovCod
                                    join moneda in db.MONEDAS on cargo.GtoCabMonId equals moneda.MonId
                                    where cargo.GtoCabReserva == Convert.ToInt32(resNro)
                                    select new
                                    {
                                        Fecha = cargo.GtoCabFecha,
                                        Hora = cargo.GtoCabHoraCierre,
                                        PuntoDeVenta = cargo.GtoCabPtoVta.Trim(' ').ToLower(),
                                        PuntoDeVentaNombre = punto.PtovNom.Trim(' ').ToLower(),
                                        MonedaSimbolo = moneda.MonSim.Trim(' ').ToLower(),
                                        Importe = cargo.GtoCabTotGeneral,
                                        Facturado = cargo.GtoCabEstado == 'F' ? true : false,
                                    };
                        var result = query.ToList();
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
    }
}
