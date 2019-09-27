using System;
using System.ServiceProcess;
using Microsoft.Owin.Hosting;
using Topshelf;

namespace Paradise.Service
{
    class Program
    {
        static void Main(string[] args)
        {
            StartTopshelf();
        }

        static void StartTopshelf()
        {
            HostFactory.Run(x =>
            {
                x.StartAutomatically();
                x.Service<WebServer>(s =>
                {
                    s.ConstructUsing(name => new WebServer());
                    s.WhenStarted(tc => tc.Start());
                    s.WhenStopped(tc => tc.Stop());
                });
                x.RunAsLocalSystem();

                x.SetDescription("This is a demo of a Windows Service using Topshelf.");
                x.SetDisplayName("Self Host Web API Demo");
                x.SetServiceName("AspNetSelfHostDemo");
            });
        }
    }
}
