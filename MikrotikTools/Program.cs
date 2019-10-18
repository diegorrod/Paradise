using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MikrotikTools
{
    class Program
    {
        static void Main(string[] args)
        {
            PdfDocument document = new PdfDocument();
            document.PageSettings.Size = PdfPageSize.A4;
            PdfPage page = document.Pages.Add();
            PdfGraphics graphics = page.Graphics;
            PdfFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 20);
            graphics.DrawString("Hello World!!!", font, PdfBrushes.Black, new PointF(0, 0));
            PdfSolidBrush brush = new PdfSolidBrush(Color.Green);
            RectangleF bounds = new RectangleF(0, 0, 100, 50);
            page.Graphics.DrawRectangle(brush, bounds);
            document.Save("Output.pdf");
            document.Close(true);
        }
        static void generateUser()
        {
            MK mikrotik = new MK("192.168.2.1");
            if (!mikrotik.Login("diegor", "diegor"))
            {
                Console.WriteLine("Could not log in");
                mikrotik.Close();
                return;
            }
            mikrotik.Send("/ip/hotspot/user/print");
            mikrotik.Send("?profile=D1-STD", true);
            foreach (string h in mikrotik.Read())
            {
                var result = h.Split('=').ToList();
                if (result[0] == "!re")
                {
                    var data = new User();

                    for (int i = 1; i < result.Count; i++)
                    {
                        if ((i % 2) != 0)
                            switch (result[i])
                            {
                                case ".id":
                                    data.Id = result[i + 1];
                                    break;
                                case "name":
                                    data.Name = result[i + 1];
                                    break;
                                case "password":
                                    data.Password = result[i + 1];
                                    break;
                                case "profile":
                                    data.Profile = result[i + 1];
                                    break;
                                default: break;
                            }
                    }

                    Console.WriteLine(data.Name);
                }
            }

        }
    }
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Profile { get; set; }
        public string Uptime { get; set; }
        public string BytesIn { get; set; }
        public string BytesOut { get; set; }
        public string PacketsIn { get; set; }
        public string PacketsOut { get; set; }
        public string Dynamic { get; set; }
        public string Disabled { get; set; }
        public string Comment { get; set; }
    }

    //    .id
    //* E8A
    //name
    //3397426
    //password
    //3397426
    //profile
    //D1-STD
    //uptime
    //1d3h51m25s
    //bytes-in
    //110295243
    //bytes-out
    //570304772
    //packets-in
    //410080
    //packets-out
    //466026
    //dynamic
    //false
    //disabled
    //false
    //comment
    //Sin Registros
}
