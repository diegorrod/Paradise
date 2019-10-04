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
                        var result = (from seña
                                     in db.RESSENIA
                                      where seña.ResNro == Convert.ToInt32(resNro)
                                      select seña).ToList();
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
