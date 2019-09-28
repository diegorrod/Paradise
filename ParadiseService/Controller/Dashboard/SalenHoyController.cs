using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Paradise.Service.Controller.Dashboard
{
    public partial class DashboardController : ApiController
    {
        [Route("salen-hoy")]
        [HttpGet]
        public async Task<IHttpActionResult> SalenHoy()
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (var db = new ParadiseDataContext())
                    {
                        var data = from res
                                   in db.RESERVA
                                   where res.ResFecSal == DateTime.Now.Date
                                   orderby res.ResHab
                                   select res;

                        return Ok(ExtendReserva(data, db));
                    }
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            });
        }
    }
}
