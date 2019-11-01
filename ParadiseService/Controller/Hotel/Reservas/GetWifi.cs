using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using MikrotikDotNet;

namespace Paradise.Service.Controller.Hotel.Reservas
{
    public partial class ReservasController : ApiController
    {
        [Route("{resNro}/wifi")]
        [HttpGet]
        public async Task<IHttpActionResult> GetWiFi(string resNro)
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (MKConnection conn = new MKConnection("192.168.2.1", "diegor", "diegor"))
                    {
                        var suma = 0;
                        foreach (var item in resNro.ToCharArray())
                        {
                            suma = suma + Convert.ToInt32(item.ToString());
                        }
                        conn.Open();
                        var usuarios = conn.CreateCommand("ip hotspot user print");
                        usuarios.Parameters.Add("?name", $"{resNro}{suma}");
                        var result = usuarios.ExecuteReaderDynamic();
                        return Ok(new 
                        {
                            //result.Nombre,
                            //result.Password,

                        });
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
