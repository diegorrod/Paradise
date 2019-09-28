using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Paradise.Service.Controller.Dashboard
{
    [RoutePrefix("api/dashboard")]
    public partial class DashboardController : ApiController
    {
        private static List<ReservaItem> ExtendReserva(IOrderedQueryable<RESERVA> data, ParadiseDataContext db)
        {
            var result = new List<ReservaItem>();

            foreach (var res in data)
            {
                var hab = from habitacion
                                 in db.HABITACION
                          where habitacion.HabNum == res.ResHab
                          select habitacion.HabNom;
                var usuarioI = (from usuI
                               in db.USUARIOS
                               where usuI.UsuId == res.ResUsuIng
                               select usuI).FirstOrDefault();
                var usuarioM = (from usuM
                               in db.USUARIOS
                               where usuM.UsuId == res.ResUsuMod
                               select usuM).FirstOrDefault();
                var resOcup = (from ro
                               in db.RESOCUP
                               where ro.ResNro == res.ResNro
                               select ro).ToList();
                var plan = (from pl
                            in db.TARIFAS
                            where pl.PlaCod == res.ResPlan
                            select pl).FirstOrDefault();
                var moneda = (from mon
                              in db.MONEDAS
                              where mon.MonId == (plan != null ? plan.PlaMoneda : 0)
                              select mon).FirstOrDefault();

                decimal ResImpTar = 0;
                foreach (var item in resOcup)
                {
                    ResImpTar += (item.ResTarDiaCImp.Value * item.ResTarDias.Value);
                }

                result.Add(new ReservaItem()
                {
                    ResNro = res.ResNro,
                    ResHab = res.ResHab,
                    ResHabNom = hab.FirstOrDefault().Trim(),
                    ResFecEnt = res.ResFecEnt,
                    ResFecSal = res.ResFecSal,
                    ResQuien = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(res.ResQuien.Trim().ToLower()),
                    ResEsta = res.ResEsta,
                    ResFecIng = res.ResFecIng,
                    ResUsuIng = res.ResUsuIng.Trim(),
                    ResUsuIngNom = usuarioI != null ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(usuarioI.UsuNom.Trim().ToLower()) : "",
                    ResFecMod = res.ResFecMod,
                    ResUsuMod = res.ResUsuMod.Trim(),
                    ResUsuModNom = usuarioM != null ? CultureInfo.CurrentCulture.TextInfo.ToTitleCase(usuarioM.UsuNom.Trim().ToLower()) : "",
                    ResTarMonCod = moneda != null ? moneda.MonId : (short)0,
                    ResTarMonDes = moneda != null ? moneda.MonDsc : "",
                    ResTarMonSim = moneda != null ? moneda.MonSim : "",
                    ResTarImp = ResImpTar
                }) ;
            }

            return result;
        }
        public class ReservaItem
        {
            public int ResNro { get; set; }
            public short? ResHab { get; set; }
            public string ResHabNom { get; set; }
            public DateTime? ResFecEnt { get; set; }
            public DateTime? ResFecSal { get; set; }
            public string ResQuien { get; set; }
            public string ResEsta { get; set; }
            public DateTime? ResFecIng { get; set; }
            public string ResUsuIng { get; set; }
            public string ResUsuIngNom { get; set; }
            public DateTime? ResFecMod { get; set; }
            public string ResUsuMod { get; set; }
            public string ResUsuModNom { get; set; }
            public short ResTarMonCod { get; set; }
            public string ResTarMonDes { get; set; }
            public string ResTarMonSim { get; set; }
            public decimal ResTarImp { get; set; }
        }

    }
}
