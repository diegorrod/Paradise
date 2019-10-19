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
        [Route("{resNro}/tarifa")]
        [HttpGet]
        public async Task<IHttpActionResult> GetTarifa(string resNro)
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (var db = new ParadiseDataContext())
                    {
                        db.CommandTimeout = SQL_TIMEOUTE;
                        var queryTarDet = from tar
                                          in db.RESOCUP
                                          where tar.ResNro == Convert.ToInt32(resNro)
                                          select new
                                          {
                                              ResTarDet = tar.ResTarDet.Trim(' ').ToLower(),
                                              tar.ResTarDiaCImp,
                                              tar.ResTarDias
                                          };

                        var queryTar = from res
                                       in db.RESERVA
                                       join pla in db.TARIFAS on res.ResPlan equals pla.PlaCod
                                       join mon in db.MONEDAS on pla.PlaMoneda equals mon.MonId
                                       where res.ResNro == Convert.ToInt32(resNro)
                                       select new
                                       {
                                           ResPlan = res.ResPlan.Trim(' ').ToLower(),
                                           PlaNom = pla.PlaNom.Trim(' ').ToLower(),
                                           MonSim = mon.MonSim.Trim(' ').ToLower(),
                                           detalle = queryTarDet.ToList()
                                       };
                        return Ok(queryTar.First());
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
