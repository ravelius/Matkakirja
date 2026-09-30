// Cupolan horisonttikulma (omistaja 30.9.): pyöreässä rajauksessa maan reuna ikkunaympyrän ylimpään kolmannekseen.
using System;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class HorisonttikulmaTestit
    {
        static double Katse(double suhde, bool paalla = true)
        {
            var (vs, vp, vr, vk) = (IssKuvakulma.RuudunSuhde, IssKuvakulma.Horisonttikulma, IssKuvakulma.Rajaus, IssKuvakulma.KatseAlasPakotettu);
            try
            {
                IssKuvakulma.RuudunSuhde = suhde; IssKuvakulma.Horisonttikulma = paalla;
                IssKuvakulma.Rajaus = IssKuvakulma.IkkunanRajaus.Pyorea; IssKuvakulma.KatseAlasPakotettu = double.NaN;
                return IssKuvakulma.IkkunanKatse(420_000);
            }
            finally { (IssKuvakulma.RuudunSuhde, IssKuvakulma.Horisonttikulma, IssKuvakulma.Rajaus, IssKuvakulma.KatseAlasPakotettu) = (vs, vp, vr, vk); }
        }

        [Testi] static void HorisonttiIkkunanYlakolmannekseen()
        {
            Oleta.Tosi(Math.Abs(Katse(402.0 / 874.0) - 25.6) < 0.3, $"iPhone 25,6° ({Katse(402.0 / 874.0):0.00})");
            Oleta.Tosi(Math.Abs(Katse(834.0 / 1210.0) - 28.3) < 0.3, $"iPad pysty 28,3° ({Katse(834.0 / 1210.0):0.00})");
            Oleta.Tosi(Math.Abs(Katse(1210.0 / 834.0) - 31.6) < 0.3, $"vaaka 31,6° ({Katse(1210.0 / 834.0):0.00})");
            // Katse on aina horisontin alapuolella (painuma 20,3°), joten katsekohde osuu maahan.
            Oleta.Tosi(Katse(0.3) > 20.4, "kapea ruutu: yhä maassa");
        }

        [Testi] static void HorisonttikulmaPoisPalauttaaEntisen()
        {
            Oleta.Tosi(Math.Abs(Katse(402.0 / 874.0, false) - IssKuvakulma.IkkunanKatseAlas) < 1e-9, "A/B 0: 55°");
        }
    }
}
