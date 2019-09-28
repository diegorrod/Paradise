using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Paradise.Service.Controller
{
    [RoutePrefix("api")]
    public class ReservasController : ApiController
    {
        [Route("reservas")]
        [HttpPost]
        public async Task<IHttpActionResult> Reservas([FromBody]Model.Request request)
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                if (request.Ingresan != null)
                {
                    using (var db = new ParadiseDataContext())
                    {
                        var res = (
                            from reserva 
                            in db.RESERVA 
                            join habitacion in db.HABITACION 
                            on reserva.ResHab equals habitacion.HabNum
                            join usuarioIng in db.USUARIOS.DefaultIfEmpty()
                            on reserva.ResUsuIng equals usuarioIng.UsuId
                            join usuarioMod in db.USUARIOS.DefaultIfEmpty()
                            on reserva.ResUsuMod equals usuarioMod.UsuId
                            where reserva.ResFecEnt == request.Ingresan.Fecha 
                            orderby reserva.ResHab
                            select new {
                                Res = reserva,
                                Hab = habitacion,
                                UsuarioI = usuarioIng,
                                UsuarioM = usuarioMod,
                            }).ToList();
                        return Ok(res);
                    }
                }
                else if (request.Salen != null)
                {
                    using (var db = new ParadiseDataContext())
                    {
                        var res = (from x in db.RESERVA where x.ResFecSal == request.Salen.Fecha select x).ToList();
                        return Ok(res);
                    }
                }
                else if (request.DelUsuario != null)
                {
                    using (var db = new ParadiseDataContext())
                    {
                        var res = (from x in db.RESERVA where x.ResUsuIng == request.DelUsuario.Usuario && x.ResFecEnt >= DateTime.Now.Date select x).ToList();
                        return Ok(res);
                    }
                }
                else return BadRequest();
            });
        }

        public class Model
        {
            public class Request
            {
                public Ingresan Ingresan { get; set; }
                public Salen Salen { get; set; }
                public DelUsuario DelUsuario { get; set; }
            }
            public class Ingresan
            {
                public DateTime Fecha { get; set; }
            }
            public class Salen
            {
                public DateTime Fecha { get; set; }
            }
            public class DelUsuario
            {
                public string Usuario { get; set; }
            }
            public class Info
            {
                public string ServiceName { get; set; }
                public string Version { get; set; }
            }
        }
    }
}
