// VU-mittari (BUILD 7): webin v267-mittarin ballistiikka, asteikko, lepo ja varakuvio.
using System;
using Matkakirja.Linssit.Radio;

namespace Matkakirja.Linssit.Testit
{
    public static class VuMittariTestit
    {
        static VuMittari Aja(VuMittari m, double sekunnit, double taso, bool soi = true, double voimakkuus = 1, double t0 = 0, bool vahennetty = false)
        {
            const double Dt = 1 / 60.0;
            for (double t = 0; t < sekunnit; t += Dt) m.Paivita(Dt, taso, soi, voimakkuus, t0 + t, vahennetty);
            return m;
        }

        [Testi] static void AsteikkoDesibeleina()
        {
            Oleta.Sama(0.0, VuMittari.Lukema(0));
            Oleta.Sama(0.0, VuMittari.Lukema(Math.Pow(10, -45 / 20.0)));             // alle −40 dB
            Oleta.Tosi(Math.Abs(VuMittari.Lukema(Math.Pow(10, -23 / 20.0)) - 0.5) < 1e-9, "−23 dB = puoliväli");
            Oleta.Sama(1.0, VuMittari.Lukema(1));                                     // yli −6 dB rajautuu
        }

        [Testi] static void NatiivinNayttotasoTakaisinRmsiksi()
        {
            // MatkakirjaRadio_Taso = (dBFS + 60) / 60. Musiikki −20 dBFS (0,667) ei saa lyödä neulaa ylälaitaan.
            Oleta.Sama(-1.0, VuMittari.RmsNayttotasosta(-1));
            Oleta.Sama(0.0, VuMittari.RmsNayttotasosta(0));
            Oleta.Tosi(Math.Abs(VuMittari.RmsNayttotasosta(1) - 1) < 1e-9, "0 dBFS = 1");
            double musiikki = VuMittari.Lukema(VuMittari.RmsNayttotasosta(40 / 60.0));
            Oleta.Tosi(Math.Abs(musiikki - 20 / 34.0) < 1e-9, "−20 dBFS asteikolla: " + musiikki);
            Oleta.Tosi(VuMittari.Lukema(VuMittari.RmsNayttotasosta(0.5)) < 0.3, "−30 dBFS alaosassa");
        }

        [Testi] static void NousuNopeaLaskuHidas()
        {
            var m = new VuMittari();
            Oleta.Sama(VuMittari.Lepo, m.Osuus);
            double kohde = VuMittari.Lukema(Math.Pow(10, -10 / 20.0));
            Aja(m, 0.3, Math.Pow(10, -10 / 20.0));
            Oleta.Tosi(m.Osuus > VuMittari.Lepo + 0.98 * (kohde - VuMittari.Lepo), "300 ms nousu täyteen: " + m.Osuus);
            Aja(m, 0.3, 0);
            double laskenut = (kohde - m.Osuus) / (kohde - VuMittari.Lepo);
            Oleta.Tosi(laskenut > 0.5 && laskenut < 0.7, "300 ms lasku on hitaampi (τ 0,34 s): " + laskenut);
        }

        [Testi] static void LepoKunEiSoi()
        {
            var tasolla = Math.Pow(10, -10 / 20.0);
            Oleta.Tosi(Aja(new VuMittari(), 3, tasolla, soi: false).Levossa, "ei soi → lepo");
            Oleta.Tosi(Aja(new VuMittari(), 3, tasolla, voimakkuus: 0).Levossa, "vaiennettu → lepo");
            var m = Aja(new VuMittari(), 1, tasolla);
            m.Nollaa();
            Oleta.Tosi(m.Levossa, "nollaus");
            Oleta.Tosi(Math.Abs(m.KulmaAsteina - (2 * VuMittari.Lepo - 1) * VuMittari.Kulma) < 1e-9, "lepokulma");
        }

        [Testi] static void VarakuvioKunTasoaEiSaada()
        {
            var m = new VuMittari();
            double min = 1, max = 0;
            for (int i = 0; i < 600; i++)
            {
                m.Paivita(1 / 60.0, -1, true, 1, i / 60.0);
                if (i > 60) { min = Math.Min(min, m.Osuus); max = Math.Max(max, m.Osuus); }
            }
            Oleta.Tosi(m.Jaljitelty, "varakuvio käytössä");
            Oleta.Tosi(min > 0.3 && max < 0.95 && max - min > 0.1, $"neula elää puheen tavoin: {min:F2}…{max:F2}");
            Oleta.Tosi(VuMittari.Jaljitelma(1.3, 0.5) < VuMittari.Jaljitelma(1.3, 1), "varakuvio seuraa voimakkuutta");
        }

        [Testi] static void VahennettyLiikeAjautuu()
        {
            double taso = Math.Pow(10, -10 / 20.0);
            var nopea = Aja(new VuMittari(), 0.2, taso);
            var vaisu = Aja(new VuMittari(), 0.2, taso, vahennetty: true);
            Oleta.Tosi(vaisu.Osuus < nopea.Osuus && vaisu.Osuus > VuMittari.Lepo, "vähennetty liike: hitaampi mutta liikkuu");
        }
    }
}
