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
        [Route("{resNro}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetReserva(int resNro)
        {
            return await Task.Run<IHttpActionResult>(() =>
            {
                try
                {
                    using (var db = new ParadiseDataContext())
                    {
                        db.CommandTimeout = SQL_TIMEOUTE;
                        var query = from res
                                    in db.RESERVA
                                    join hab in db.HABITACION on res.ResHab equals hab.HabNum
                                    join habCat in db.CATHAB on hab.HabCat equals habCat.CatHCod
                                    join habTip in db.TIPHAB on hab.HabTipo equals habTip.TiphCod
                                    where res.ResNro == resNro
                                    select new
                                    {
                                        res.ResNro,
                                        res.ResHab,
                                        HabNom = hab.HabNom.Trim(' ').ToLower(),
                                        HabCat = hab.HabCat.Trim(' ').ToLower(),
                                        CatHDes = habCat.CatHDes.Trim(' ').ToLower(),
                                        HabTipo = hab.HabTipo.Trim(' ').ToLower(),
                                        TiphDes = habTip.TiphDes.Trim(' ').ToLower(),
                                        res.ResFecEnt,
                                        ResFecEntHor = res.ResFecEntHor.Trim(' ').ToLower(),
                                        res.ResFecSal,
                                        ResLateCheckOut = res.ResLateCheckOut == 'S' ? true : false,
                                        res.ResPaxTit,
                                        ResQuien = res.ResQuien.Trim(' ').ToLower(),
                                        ResTel = res.ResTel.Trim(' ').ToLower(),
                                        res.ResCamMat,
                                        res.ResCamSin,
                                        res.ResCamCun
                                    };
                        var result = query.ToList().FirstOrDefault();
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
