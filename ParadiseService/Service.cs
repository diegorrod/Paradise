using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Paradise.Service
{
    public class Service
    {
        private IDisposable _app;
        public void Start()
        {
            foreach (string sPrinters in System.Drawing.Printing.PrinterSettings.InstalledPrinters)
            {
                Console.WriteLine(sPrinters);
            }
            _app = WebApp.Start<Startup>("http://localhost:3030");
        }
        public void Stop()
        {
            if (_app != null)
                _app.Dispose();
        }
    }
}
