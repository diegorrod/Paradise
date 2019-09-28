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
        [Route("pendientes-de-confirmar")]
        [HttpGet]
        public async Task<IHttpActionResult> PendientesDeConfirmar()
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (var db = new ParadiseDataContext())
                    {
                        var data = from res
                                   in db.RESERVA
                                   where res.ResFecEnt >= DateTime.Now.Date
                                   && res.ResEsta == "RESINDIV"
                                   && res.ResConfirm != 'S'
                                   orderby res.ResFecEnt, res.ResHab
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
