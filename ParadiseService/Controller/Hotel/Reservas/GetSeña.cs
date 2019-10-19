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
        [Route("{resNro}/senias")]
        [HttpGet]
        public async Task<IHttpActionResult> GetSeña(string resNro)
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (var db = new ParadiseDataContext())
                    {
                        db.CommandTimeout = SQL_TIMEOUTE;
                        var query = from seña
                                    in db.RESSENIA
                                    join moneda in db.MONEDAS on seña.ResSenMon equals moneda.MonId
                                    where seña.ResNro == Convert.ToInt32(resNro)
                                    select new
                                    {
                                        seña.ResSenFecha,
                                        MonSim = moneda.MonSim.Trim(' ').ToLower(),
                                        seña.ResSenImp,
                                        Presencial = seña.ResSenPresencial == 'S' ? true : false,
                                        seña.ResSenDetCobr
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
