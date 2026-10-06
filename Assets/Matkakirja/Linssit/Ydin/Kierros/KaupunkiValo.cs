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
        // Päätoimittaja 6.10. 19.0x (stillit): aamu ja päivä erottumattomat → aamu selvästi kultaisemmaksi.
        public static readonly Savy Aamu = new Savy
        {
            TaivasYla = new[] { 0.45, 0.58, 0.80 }, Horisontti = new[] { 1.0, 0.80, 0.58 }, Suodin = new[] { 1.0, 0.90, 0.74 },
            Lampotila = 30, Savytys = 6, Valotus = 0.08, Kontrasti = 10, Saturaatio = 12,
        };
        public static readonly Savy Paiva = new Savy
        {
            TaivasYla = new[] { 0.30, 0.50, 0.80 }, Horisontti = new[] { 0.78, 0.85, 0.92 }, Suodin = new[] { 1.0, 1.0, 1.0 },
            Lampotila = 0, Savytys = 0, Valotus = 0, Kontrasti = 8, Saturaatio = 8,
        };
        // Päätoimittaja 6.10. 19.3x: ilta oli tasaisen oranssi (suodatin) → lämmin valo, viileämmät varjot (SplitToning
        // KaupunkiKuvassa), kylläisyys ~30 % alas, taivas liukuu horisontin kullasta siniseen.
        public static readonly Savy Ilta = new Savy
        {
            TaivasYla = new[] { 0.30, 0.38, 0.62 }, Horisontti = new[] { 0.98, 0.70, 0.48 }, Suodin = new[] { 1.0, 0.93, 0.85 },
            Lampotila = 18, Savytys = 4, Valotus = -0.12, Kontrasti = 10, Saturaatio = -8,
        };
        // YÖ = HIMMEÄ ILTA (Päätoimittaja 6.10. 19.0x: sininen yö näytti "siniseltä päivältä" ilman kaupungin valoja): oikea yö
        // vasta Black Marble- tai ikkunavalojen kanssa; siihen asti illan sävy himmeämpänä ja vähemmän värikkäänä.
        public static readonly Savy Yo = new Savy
        {
            TaivasYla = new[] { 0.14, 0.12, 0.22 }, Horisontti = new[] { 0.62, 0.38, 0.26 }, Suodin = new[] { 1.0, 0.84, 0.70 },
            Lampotila = 22, Savytys = 5, Valotus = -0.7, Kontrasti = 10, Saturaatio = 0,
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

        /// <summary>Auringon korkeus ja atsimuutti (astetta, pohjoisesta myötäpäivään) pisteessä ja onko aamupäivä; Iss.Aurinko
        /// (sama malli kuin ISS-kyydissä). Siirtosepän katselmointi: kajon suunta samasta alihajapisteestä kuin sävy.</summary>
        public static (double korkeus, bool aamu, double atsimuutti) Aurinko(DateTime utc, double lat, double lon)
        {
            Matkakirja.Linssit.Iss.Aurinko.Alihajapiste(Matkakirja.Linssit.Iss.Aika.Jd(utc), out double dekl, out double slon);
            double r = Math.PI / 180, h = ((lon - slon) % 360 + 540) % 360 - 180;   // tuntikulma: − = aamupäivä
            double k = Math.Asin(Math.Sin(lat * r) * Math.Sin(dekl * r) + Math.Cos(lat * r) * Math.Cos(dekl * r) * Math.Cos(h * r)) / r;
            double az = Math.Atan2(-Math.Sin(h * r), Math.Tan(dekl * r) * Math.Cos(lat * r) - Math.Sin(lat * r) * Math.Cos(h * r)) / r;
            return (k, h < 0, (az + 360) % 360);
        }

        /// <summary>Atsimuutti kellosta (asetuksen tunti): 90° klo 6 → 180° klo 12 → 270° klo 18.</summary>
        public static double AtsimuuttiTunnista(double tunti) => ((90 + (tunti - 6) * 15) % 360 + 360) % 360;

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
