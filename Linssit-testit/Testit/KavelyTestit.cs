// HISTORIAMOOTTORI V1 (Siirtoseppä 7.10.2026): vapaan kävelyn ydin — liike kameran suuntaan, kiihtyvyys, hahmon kääntyminen, katseen rajat.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class KavelyTestit
    {
        static void Aja(Kavely k, KavelySyote s, double sekuntia) { for (double t = 0; t < sekuntia; t += 1 / 60.0) k.Paivita(1 / 60.0, s); }

        [Testi] static void EteenKameranSuuntaan()
        {
            var k = new Kavely { KameraYaw = 90 };   // kamera katsoo +x:ään
            Aja(k, new KavelySyote { LiikeY = 1 }, 1.0);
            Oleta.Tosi(Math.Abs(k.NopeusX - Kavely.KavelyMs) < 1e-6 && Math.Abs(k.NopeusZ) < 1e-6, $"eteen = +x ({k.NopeusX:F2}, {k.NopeusZ:F2})");
            Oleta.Tosi(Math.Abs(k.HahmoYaw - 90) < 1, $"hahmo kääntyy kulkusuuntaan ({k.HahmoYaw:F1})");
        }

        [Testi] static void OikealleJaJuoksuJaHiipiminen()
        {
            var k = new Kavely { KameraYaw = 0 };
            Aja(k, new KavelySyote { LiikeX = 1 }, 1.0);
            Oleta.Tosi(k.NopeusX > 1.3 && Math.Abs(k.NopeusZ) < 1e-6, $"oikealle = +x kun yaw 0 ({k.NopeusX:F2}, {k.NopeusZ:F2})");
            Aja(k, new KavelySyote { LiikeY = 1, Juoksu = true }, 1.5);
            Oleta.Tosi(Math.Abs(k.Vauhti - Kavely.JuoksuMs) < 1e-6 && k.Tapa == Liiketapa.Juoksu, $"juoksu {k.Vauhti:F2}");
            Aja(k, new KavelySyote { LiikeY = 1, Juoksu = true, Hiipiminen = true }, 1.0);
            Oleta.Tosi(Math.Abs(k.Vauhti - Kavely.HiipiminenMs) < 1e-6 && k.Tapa == Liiketapa.Hiipiminen, "hiipiminen voittaa juoksun");
        }

        [Testi] static void PysahtyyJaKuolleAlue()
        {
            var k = new Kavely();
            Aja(k, new KavelySyote { LiikeY = 1 }, 1.0);
            Aja(k, new KavelySyote { LiikeY = 0.05 }, 0.5);   // kuollut alue → pysähtyy
            Oleta.Tosi(k.Vauhti < 1e-9, $"pysähtyy ({k.Vauhti:F3})");
            double yaw = k.HahmoYaw;
            Aja(k, new KavelySyote { KatseX = 1 }, 0.5);
            Oleta.Tosi(Math.Abs(k.HahmoYaw - yaw) < 1e-9, "paikallaan katse ei käännä hahmoa");
        }

        [Testi] static void KatseenRajat()
        {
            var k = new Kavely();
            Aja(k, new KavelySyote { KatseY = -1 }, 5);
            Oleta.Tosi(Math.Abs(k.KameraPitch - Kavely.PitchMax) < 1e-9, $"alas rajaan ({k.KameraPitch:F1})");
            Aja(k, new KavelySyote { KatseY = 1 }, 5);
            Oleta.Tosi(Math.Abs(k.KameraPitch - Kavely.PitchMin) < 1e-9, "ylös rajaan");
            Aja(k, new KavelySyote { HiiriX = 200 }, 1 / 60.0);
            Oleta.Tosi(k.KameraYaw >= -180 && k.KameraYaw < 180, $"yaw kääritty ({k.KameraYaw:F1})");
        }

        [Testi] static void Kallistusvyohykkeet()
        {
            var k = new Kavely { Kallistusvyohykkeet = true };
            Aja(k, new KavelySyote { LiikeY = 0.3 }, 1.0);
            Oleta.Tosi(k.Tapa == Liiketapa.Hiipiminen && k.Vauhti > 0.1 && k.Vauhti <= Kavely.HiipiminenMs + 1e-9, $"30 % = hiivintä ({k.Vauhti:F2})");
            Aja(k, new KavelySyote { LiikeY = 0.7 }, 1.0);
            Oleta.Tosi(k.Tapa == Liiketapa.Kavely && k.Vauhti > Kavely.HiipiminenMs && k.Vauhti < Kavely.KavelyMs, $"70 % = kävely välillä ({k.Vauhti:F2})");
            Aja(k, new KavelySyote { LiikeY = 1 }, 1.0);
            Oleta.Tosi(Math.Abs(k.Vauhti - Kavely.KavelyMs) < 1e-6, "näppäin = täysi kävely");
            var v = new Kavely();
            Aja(v, new KavelySyote { LiikeY = 0.3 }, 1.0);
            Oleta.Tosi(v.Tapa == Liiketapa.Kavely, "ilman vyöhykkeitä 30 % = kävely");
        }

        [Testi] static void KaannossaantoEnintaan10JaHidas()
        {
            var k = new Kavely { KameraYaw = 0 };
            Aja(k, new KavelySyote { HiiriX = 0.5 }, 1 / 60.0);
            Oleta.Tosi(!k.PyydaKaanto(40), "ohjattu juuri: ei käännöstä");
            Aja(k, new KavelySyote(), 1.1);
            double alku = k.KameraYaw;
            Oleta.Tosi(k.PyydaKaanto(alku + 40), "sekunnin jälkeen käännös");
            Aja(k, new KavelySyote(), 0.5);
            Oleta.Tosi(k.KameraYaw - alku > 3 && k.KameraYaw - alku < 9.9, $"0,5 s: kesken ({k.KameraYaw - alku:F1})");
            Aja(k, new KavelySyote(), 1.0);
            Oleta.Tosi(Math.Abs(k.KameraYaw - alku - Kavely.KaantoMaxAste) < 1e-6, "enintään 10°");
            Oleta.Tosi(k.PyydaKaanto(k.KameraYaw - 30), "uusi pyyntö");
            Aja(k, new KavelySyote { LiikeX = 1 }, 1 / 60.0);
            Oleta.Tosi(!k.Kaantyy, "ohjaus keskeyttää");
        }

        [Testi] static void EnsimmaisenPersoonanPystyrajat()
        {
            var k = new Kavely();
            Aja(k, new KavelySyote { HiiriY = -200 }, 1 / 60.0);
            Oleta.Sama(Kavely.PitchMax, k.KameraPitch);   // oletusrajat (olan yli)
            k.PitchAla = -75; k.PitchYla = 75;
            Aja(k, new KavelySyote { HiiriY = -200 }, 1 / 60.0);
            Oleta.Sama(75.0, k.KameraPitch);
            Aja(k, new KavelySyote { HiiriY = 400 }, 1 / 60.0);
            Oleta.Sama(-75.0, k.KameraPitch);
        }
    }
}
