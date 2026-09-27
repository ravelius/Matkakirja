// ERIKOISMALLIN LIIKE: HOHENSALZBURG (elämänidea hyväksytty 27.9. klo 07.5x; speksi docs/raportit/erikoismallit/hohensalzburg.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (FestungsBahn), harvinainen tapahtuma (Salzburger Stier), reaktio ja yövalot.
// Puhdas C#, ei allokaatioita kehyksessä (Asento vertaa nimiä suoraan, ei Substringiä), siemenellä toistettava.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Hohensalzburg: perusliike = punainen FestungsBahn-vaunu nousee suoraa rataa vanhastakaupungista linnaan (14 s,
    /// smootherstep), odottaa vuoriasemalla 10–30 s, laskee (14 s) ja odottaa laaksoasemalla 20–60 s. Harvinainen (1/10
    /// matkoista): Salzburger Stier — linnan urkuhornin F-duurisointu mylvii: kolme äänirengasta laajenee Hoher Stockin
    /// katolta porrastettuina (0 / 0,6 / 1,2 s, kukin 2,4 s) ja kyyhkyparvi pyrähtää lentoon, kiertää linnaa ja laskeutuu
    /// (6,5 s). Reaktio: lähestyttäessä odottava vaunu lähtee heti; napautus = Stier heti (enintään kerran 20 s:ssa).
    /// Yöllä linnoitus valaistaan (lämmin hehku, syttyy 1,5 s), eikä Stier mylvi itsestään (soittoajat 7, 11 ja 18),
    /// mutta napautus soittaa sen. Parvi kiertää myötäpäivään ylhäältä katsottuna (positiivinen kierto Y:n ympäri).
    /// </summary>
    public sealed class HohensalzburgLiike : ErikoisAnimaatio
    {
        public const double AjoS = 14, AlaMinS = 20, AlaMaxS = 60, YlaMinS = 10, YlaMaxS = 30, Harvinainen = 0.1, NapautusValiS = 20;
        public const int Renkaita = 3;
        public const double RengasPorras = 0.6, RengasS = 2.4, RengasAlku = 0.12, RengasNousu = 0.02;
        public const double ParviAlkuS = 0.5, ParviS = 6.5, ParviKorkeus = 0.1, ParviKierros = 300;
        /// <summary>Härän kokonaiskesto (s): parvi laskeutuu viimeisenä.</summary>
        public const double HarkaS = ParviAlkuS + ParviS;
        /// <summary>Vaunun matka laaksoasemalta vuoriasemalle mallin yksiköissä (sama kuin Symbolimallit.HsVaununMatka).</summary>
        public const double MatkaX = -0.0410117, MatkaY = 0.1968561, MatkaZ = 0.2706771;

        enum Vaihe { Alhaalla, Nousee, Ylhaalla, Laskee }
        Vaihe vaihe = Vaihe.Ylhaalla;
        double aika, kesto, harka = -1, edellinen = double.NegativeInfinity;
        int matkoja, harkia;

        public HohensalzburgLiike(string id) : base(id) { kesto = Vali(5, 30, 0, 60); }

        /// <summary>Vaunun paikka radalla: 0 laaksoasema, 1 vuoriasema.</summary>
        public double Paikka { get; private set; } = 1;
        public bool Harka => harka >= 0;

        void Mylvi()
        {
            harka = 0; edellinen = T; harkia++;
        }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && harka < 0 && T - edellinen >= NapautusValiS) Mylvi();
            // Lähestyminen: odottava vaunu lähtee heti (kumpaan suuntaan tahansa).
            if (heraa && (vaihe == Vaihe.Alhaalla || vaihe == Vaihe.Ylhaalla)) aika = kesto;
            aika += d;
            if (aika >= kesto)
            {
                aika = 0;
                switch (vaihe)
                {
                    case Vaihe.Alhaalla: vaihe = Vaihe.Nousee; kesto = AjoS; break;
                    case Vaihe.Ylhaalla: vaihe = Vaihe.Laskee; kesto = AjoS; break;
                    case Vaihe.Nousee:
                        Paikka = 1; matkoja++;
                        vaihe = Vaihe.Ylhaalla; kesto = Vali(YlaMinS, YlaMaxS, matkoja, 61);
                        if (!yo && harka < 0 && Arpa(matkoja, 62) < Harvinainen) Mylvi();
                        break;
                    case Vaihe.Laskee:
                        Paikka = 0; matkoja++;
                        vaihe = Vaihe.Alhaalla; kesto = Vali(AlaMinS, AlaMaxS, matkoja, 63);
                        if (!yo && harka < 0 && Arpa(matkoja, 62) < Harvinainen) Mylvi();
                        break;
                }
            }
            double p = Pehmea(aika / Math.Max(1e-6, kesto));
            if (vaihe == Vaihe.Nousee) Paikka = p;
            else if (vaihe == Vaihe.Laskee) Paikka = 1 - p;
            bool kaynnissa = vaihe == Vaihe.Nousee || vaihe == Vaihe.Laskee || harka >= 0;
            if (harka >= 0) { harka += d; if (harka > HarkaS) harka = -1; }
            // Kehys piirretään vain, kun jokin oikeasti liikkuu: vähennetty liike (d = 0) jäädyttää vaiheen ja lepää (0 kehystä).
            if (kaynnissa && d > 0) Liikkuu = true;
        }

        /// <summary>Äänirenkaan r asento: laajenee pienestä täyteen (hidastuen) ja nousee hieman, sitten katoaa.</summary>
        OsanAsento Rengas(int r)
        {
            if (harka < 0) return OsanAsento.Piilossa;
            double t = (harka - r * RengasPorras) / RengasS;
            if (t <= 0 || t >= 1) return OsanAsento.Piilossa;
            double laaj = 1 - (1 - t) * (1 - t);
            return new OsanAsento { Qw = 1, Y = RengasNousu * laaj, Skaala = RengasAlku + (1 - RengasAlku) * laaj };
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "vaunu": return new OsanAsento { Qw = 1, Skaala = 1, X = MatkaX * Paikka, Y = MatkaY * Paikka, Z = MatkaZ * Paikka };
                case "aani0": return Rengas(0);
                case "aani1": return Rengas(1);
                case "aani2": return Rengas(2);
                case "parvi":
                {
                    if (harka < ParviAlkuS) return OsanAsento.Piilossa;
                    double t = (harka - ParviAlkuS) / ParviS;
                    if (t >= 1) return OsanAsento.Piilossa;
                    // Pyrähtää lentoon (skaala kasvaa 0,6 s:ssa), kaartaa linnan yllä ylös ja laskeutuu takaisin katolle.
                    double skaala = Pehmea(t / 0.09) * (1 - Pehmea((t - 0.88) / 0.12));
                    if (skaala <= 0.02) return OsanAsento.Piilossa;
                    double kaari = Math.Sin(Math.PI * Math.Min(1, t * 1.1));
                    double y = ParviKorkeus * kaari + 0.006 * Math.Sin(t * 40) * kaari;
                    return new OsanAsento { Y = y, Skaala = skaala }.Kierretty(OsanAsento.Kierto(0, 1, 0, ParviKierros * Pehmea(t)));
                }
                case "valot": return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"FestungsBahn {(vaihe == Vaihe.Alhaalla ? "laaksoasemalla" : vaihe == Vaihe.Ylhaalla ? "vuoriasemalla" : vaihe == Vaihe.Nousee ? "nousee" : "laskee")} " +
            $"{Paikka:F2} ({aika:F0}/{kesto:F0} s), matkoja {matkoja}, härkä {harkia}" + (harka >= 0 ? $", Stier mylvii {harka:F1} s" : "");
    }
}
