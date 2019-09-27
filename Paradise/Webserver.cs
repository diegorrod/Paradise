using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Owin.Hosting;

namespace Paradise.Service
{ 
    public class WebServer
    {
        private IDisposable _webapp;

        public void Start()
        {
            _webapp = WebApp.Start<Startup>("http://localhost:3030");
        }

        public void Stop()
        {
            _webapp?.Dispose();
        }
    }
}
