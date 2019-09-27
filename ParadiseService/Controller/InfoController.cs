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
    public class InfoController : ApiController
    {
        [Route("info")]
        [HttpGet]
        public async Task<IHttpActionResult> Info()
        {
            var result = await Task.Run(() =>
            {
                return new Model.Info()
                {
                    ServiceName = Assembly.GetEntryAssembly().GetName().Name,
                    Version = Assembly.GetEntryAssembly().GetName().Version.ToString()
                };
            });
            return Ok(result);
        }

        public class Model
        {
            public class Info
            {
                public string ServiceName { get; set; }
                public string Version { get; set; }
            }
        }
    }
}
