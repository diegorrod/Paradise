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
                                        res.ResCamCun,
                                        ResResPor = res.ResResPor.Trim(' ').ToLower(),
                                        PenCod = GetReservaHelper.PenCod(res),
                                        PenDetalle = GetReservaHelper.PenDetalle(res)
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

        private static class GetReservaHelper
        {
            internal static string PenCod(RESERVA res)
            {
                switch (res.ResPlan.Trim(' ').ToLower())
                {
                    case "psd": return "sd";
                    case "dsd": return "sd";
                    case "pmp": return "mp";
                    case "dmp": return "mp";
                    case "pmpb": return "mpb";
                    case "dmpb": return "mpb";
                    case "ppc": return "pc";
                    case "dpc": return "pc";
                    case "ppcm": return "pcm";
                    case "dpcm": return "pcm";
                    default: return PenCodDesdeResResPor(res.ResResPor);
                }
            }
            private static string PenCodDesdeResResPor(string ResResPor)
            {
                switch (ResResPor.Trim(' ').ToLower())
                {
                    case "sd": return "sd";
                    case "mp": return "mp";
                    case "mpb": return "mpb";
                    case "pc": return "pc";
                    case "pcm": return "pcm";
                    default: return "sc";
                }

            }
            internal static string PenDetalle(RESERVA res)
            {
                switch (res.ResPlan.Trim(' ').ToLower())
                {
                    case "psd": return "solo desayuno";
                    case "dsd": return "solo desayuno";
                    case "pmp": return "media pensión";
                    case "dmp": return "media pensión";
                    case "pmpb": return "media pensión con bebidas";
                    case "dmpb": return "media pensión con bebidas";
                    case "ppc": return "pensión completa";
                    case "dpc": return "pensión completa";
                    case "ppcm": return "pensión completa con merienda";
                    case "dpcm": return "pensión completa con merienda";
                    default: return PenDetalleDesdeResResPor(res.ResResPor);
                }
            }
            private static string PenDetalleDesdeResResPor(string ResResPor)
            {
                switch (ResResPor.Trim(' ').ToLower())
                {
                    case "sd": return "solo desayuno";
                    case "mp": return "media pensión";
                    case "mpb": return "media pensión con bebida";
                    case "pc": return "pensión completa";
                    case "pcm": return "pensión completa con merienda";
                    default: return "sin especificar";
                }

            }
        }
    }
}
