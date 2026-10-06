// KAUPUNKIKUVAN VUOROKAUDENAIKA (omistaja 6.10. 14.4x "kuvaa parantavat efektit", Päätoimittaja: utu + gradienttitaivas ja
// vuorokaudenajan värimaailma junaan 150): auringon todellinen korkeus kohteessa (Iss.Aurinko) valitsee
// sävyn: yö alle −8°, aamu- tai iltahämärä −8…6°, päivä yli 20°; väleissä liuku. Asetuksen tunti käyttää avainkuvia kellosta.
// Googlen 3D-laatoissa valo on valmiiksi kuvassa, joten aika näkyy vain värisävynä, valotuksena, taivaana ja horisontin utuna
// (ei reaaliaikaista valoa). Moottoriton: KaupunkiKuva (Unity) lukee arvot ja vie ne URP-volyymiin, sumuun ja taivaaseen.
using System;

namespace Matkakirja.Linssit.Kierros
{
    /// <summary>Yhden hetken sävy: taivas (zeniitti, horisontti; horisontti on myös udun väri) ja värikorjaus.</summary>
    public struct Savy
    {
        public double[] TaivasYla, Horisontti, Suodin;   // RGB 0–1 (lineaarinen väri UI-värien sijaan)
        /// <summary>Valkotasapaino (URP WhiteBalance, −100…100), valotus (EV), kontrasti ja saturaatio (URP ColorAdjustments, −100…100).</summary>
        public double Lampotila, Savytys, Valotus, Kontrasti, Saturaatio;

        public static Savy Valissa(Savy a, Savy b, double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            double L(double x, double y) => x + (y - x) * t;
            double[] V(double[] x, double[] y) => new[] { L(x[0], y[0]), L(x[1], y[1]), L(x[2], y[2]) };
            return new Savy
            {
                TaivasYla = V(a.TaivasYla, b.TaivasYla), Horisontti = V(a.Horisontti, b.Horisontti), Suodin = V(a.Suodin, b.Suodin),
                Lampotila = L(a.Lampotila, b.Lampotila), Savytys = L(a.Savytys, b.Savytys), Valotus = L(a.Valotus, b.Valotus),
                Kontrasti = L(a.Kontrasti, b.Kontrasti), Saturaatio = L(a.Saturaatio, b.Saturaatio),
            };
        }
    }

    public static class KaupunkiValo
    {
        public static readonly Savy Aamu = new Savy
        {
            TaivasYla = new[] { 0.42, 0.58, 0.82 }, Horisontti = new[] { 0.98, 0.84, 0.70 }, Suodin = new[] { 1.0, 0.96, 0.90 },
            Lampotila = 12, Savytys = 3, Valotus = 0.05, Kontrasti = 6, Saturaatio = 6,
        };
        public static readonly Savy Paiva = new Savy
        {
            TaivasYla = new[] { 0.30, 0.50, 0.80 }, Horisontti = new[] { 0.78, 0.85, 0.92 }, Suodin = new[] { 1.0, 1.0, 1.0 },
            Lampotila = 0, Savytys = 0, Valotus = 0, Kontrasti = 8, Saturaatio = 8,
        };
        public static readonly Savy Ilta = new Savy
        {
            TaivasYla = new[] { 0.26, 0.30, 0.55 }, Horisontti = new[] { 1.0, 0.64, 0.40 }, Suodin = new[] { 1.0, 0.88, 0.76 },
            Lampotila = 25, Savytys = 5, Valotus = -0.15, Kontrasti = 10, Saturaatio = 10,
        };
        public static readonly Savy Yo = new Savy
        {
            TaivasYla = new[] { 0.02, 0.03, 0.08 }, Horisontti = new[] { 0.08, 0.12, 0.24 }, Suodin = new[] { 0.60, 0.70, 1.0 },
            Lampotila = -30, Savytys = 0, Valotus = -1.3, Kontrasti = 12, Saturaatio = -25,
        };

        /// <summary>Avainkuvat (paikallinen aurinkotunti → sävy); väleissä lineaarinen liuku. Yö 21–5, aamu 6.30, päivä 9–16.30, ilta 19.</summary>
        static readonly (double tunti, Savy savy)[] Avaimet =
        {
            (0, Yo), (5, Yo), (6.5, Aamu), (9, Paiva), (16.5, Paiva), (19, Ilta), (21, Yo), (24, Yo),
        };

        /// <summary>Paikallinen aurinkoaika tunteina 0–24 (UTC + pituus / 15): sama kaikkialla ilman aikavyöhyketaulukkoa.</summary>
        public static double PaikallinenTunti(DateTime utc, double pituus)
        {
            double h = utc.Hour + utc.Minute / 60.0 + utc.Second / 3600.0 + pituus / 15.0;
            h %= 24; if (h < 0) h += 24;
            return h;
        }

        public static Savy Tunnille(double tunti)
        {
            tunti %= 24; if (tunti < 0) tunti += 24;
            for (int i = 1; i < Avaimet.Length; i++)
                if (tunti <= Avaimet[i].tunti)
                {
                    var (h0, s0) = Avaimet[i - 1]; var (h1, s1) = Avaimet[i];
                    return Savy.Valissa(s0, s1, (tunti - h0) / Math.Max(1e-9, h1 - h0));
                }
            return Yo;
        }

        /// <summary>Auringon korkeus (astetta) pisteessä ja onko aamupäivä (aurinko idässä); Iss.Aurinko (sama malli kuin ISS-kyydissä).</summary>
        public static (double korkeus, bool aamu) Aurinko(DateTime utc, double lat, double lon)
        {
            Matkakirja.Linssit.Iss.Aurinko.Alihajapiste(Matkakirja.Linssit.Iss.Aika.Jd(utc), out double dekl, out double slon);
            double r = Math.PI / 180, h = ((lon - slon) % 360 + 540) % 360 - 180;   // tuntikulma: − = aamupäivä
            double k = Math.Asin(Math.Sin(lat * r) * Math.Sin(dekl * r) + Math.Cos(lat * r) * Math.Cos(dekl * r) * Math.Cos(h * r)) / r;
            return (k, h < 0);
        }

        /// <summary>Sävy auringon korkeudesta: yö ≤ −8°, hämärä → aamu/ilta −2…6°, päivä ≥ 20°.</summary>
        public static Savy Korkeudelle(double korkeus, bool aamu)
        {
            var hamara = aamu ? Aamu : Ilta;
            if (korkeus <= -8) return Yo;
            if (korkeus < -2) return Savy.Valissa(Yo, hamara, (korkeus + 8) / 6);
            if (korkeus <= 6) return hamara;
            if (korkeus < 20) return Savy.Valissa(hamara, Paiva, (korkeus - 6) / 14);
            return Paiva;
        }

        /// <summary>Taivaan väri suunnan korkeuskulman sinistä (−1…1): horisontista zeniittiin pehmeästi, alle horisontin horisontin väri.</summary>
        public static double[] Taivas(Savy s, double sinKorkeus)
        {
            double t = Math.Pow(Math.Max(0, Math.Min(1, sinKorkeus)), 0.45);
            return new[]
            {
                s.Horisontti[0] + (s.TaivasYla[0] - s.Horisontti[0]) * t,
                s.Horisontti[1] + (s.TaivasYla[1] - s.Horisontti[1]) * t,
                s.Horisontti[2] + (s.TaivasYla[2] - s.Horisontti[2]) * t,
            };
        }
    }
}
