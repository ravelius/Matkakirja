// AIKAJANAN KELLO (web js/aikajana.js aikajanaAskel, aikajananNopeus,
// aikaSeuraavaan). Puhdas askelfunktio: sama tila ja dt antavat saman
// tuloksen, joten kamera voi laskea etukäteen, milloin seuraava valo syttyy.
//
// Pysäkillä kello ei seiso: ykkösrulla hiipii tauon aikana osuuden 0,6
// eteenpäin. Pysäkkien välillä nopeus kiihtyy ja jarruttaa logaritmisesti
// (aikajananNopeus), ja askel lasketaan 8 ms:n paloina, jotta käyrä on
// sama kehysnopeudesta riippumatta.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Kellon pysäkki: paikka asteikolla ja tauon laji.</summary>
    public readonly struct KellonPysakki
    {
        public readonly double Paikka;     // web t.vuosi (vuosiaSitten-asteikolla k·10)
        public readonly bool Paalu;
        public readonly bool Hiljainen;
        public KellonPysakki(double paikka, bool paalu = false, bool hiljainen = false)
        { Paikka = paikka; Paalu = paalu; Hiljainen = hiljainen; }
    }

    /// <summary>Kellon tila (web { vuosi, i, viive, viiveTaysi, alku }).</summary>
    public struct KellonTila
    {
        public double Paikka;        // web vuosi
        public int I;                // viimeisin syttynyt pysäkki, −1 alussa
        public double Viive;         // ms jäljellä pysäkin tauosta
        public double? ViiveTaysi;
        public double? Alku;         // mistä nykyinen väli lähti (kiihdytyksen etäisyys)

        public static KellonTila Aluksi(double alku) => new KellonTila { Paikka = alku, I = -1 };
    }

    public readonly struct KellonAskel
    {
        public readonly KellonTila Tila;
        /// <summary>Pysäkki, joka syttyi tällä askeleella, tai −1.</summary>
        public readonly int Syttyi;
        public readonly bool Loppu;
        public KellonAskel(KellonTila tila, int syttyi, bool loppu) { Tila = tila; Syttyi = syttyi; Loppu = loppu; }
    }

    /// <summary>Tahti (web tahti-olio); oletukset ovat pysäkkikellon.</summary>
    public sealed class KellonTahti
    {
        public double VuosiMs = Kello.VuosiMs;
        public double ViiveMs = Kello.ViiveMs;
        public double PaaluMs = Kello.PaaluMs;
        public bool Lineaarinen;
        public static readonly KellonTahti Oletus = new KellonTahti();
    }

    public static class Kello
    {
        public const double VuosiMs = 260;          // AIKAJANA_VUOSI_MS
        public const double ViiveMs = 4600;         // AIKAJANA_VIIVE_MS
        public const double PaaluMs = 3200;         // AIKAJANA_PAALU_MS
        public const double TauonOsuus = 0.6;       // AIKAJANA_TAUON_OSUUS
        public const double LuennanTaukovaraMs = 900;   // LUENNAN_TAUKOVARA_MS
        public const double LuennanPisinMs = 14000;     // LUENNAN_PISIN_MS
        public const double Pohjanopeus = 0.035;    // AIKAJANA_POHJANOPEUS
        public const double Kiihtymismatka = 1.5;   // AIKAJANA_KIIHTYMISMATKA
        public const double KayranTaite = 0.2;      // AIKAJANA_KAYRAN_TAITE
        public const double AliaskelMs = 8;         // AIKAJANA_ALIASKEL_MS
        public const double TaukoHimmennys = 0.5;   // AIKAJANA_TAUKO_HIMMENNYS
        public const double NaksuValiMs = 125;      // AIKAJANA_NAKSU_VALI_MS

        /// <summary>Nopeuskerroin etäisyydestä lähimpään pysäkkiin (vuosina).</summary>
        public static double Nopeus(double etaisyys)
        {
            if (!(etaisyys > 0)) return Pohjanopeus;
            double osuus = Log1p(etaisyys / KayranTaite) / Log1p(Kiihtymismatka / KayranTaite);
            return Math.Min(1, Math.Max(Pohjanopeus, osuus));
        }

        static double Log1p(double x) => Math.Abs(x) < 1e-4 ? x - x * x / 2 + x * x * x / 3 : Math.Log(1 + x);

        /// <summary>Yksi askel (web aikajanaAskel). dt millisekunteina.</summary>
        public static KellonAskel Askel(KellonTila tila, double dt, IReadOnlyList<KellonPysakki> pysakit, KellonTahti tahti = null)
        {
            tahti ??= KellonTahti.Oletus;
            double vuosi = tila.Paikka, viive = tila.Viive;
            int i = tila.I;
            double alku = tila.Alku
                ?? (i >= 0 && i < pysakit.Count ? pysakit[i].Paikka + TauonOsuus : vuosi);
            bool tauolta = false;
            if (viive > 0)
            {
                double taysi = tila.ViiveTaysi ?? viive;
                viive = Math.Max(0, viive - dt);
                double hiipima = taysi > 0 ? TauonOsuus * (1 - viive / taysi) : 0;
                double kok = Math.Floor(vuosi);
                vuosi = kok + Math.Max(vuosi - kok, hiipima);
                alku = vuosi;
                if (viive > 0)
                    return new KellonAskel(new KellonTila { Paikka = vuosi, I = i, Viive = viive, ViiveTaysi = taysi, Alku = alku }, -1, false);
                if (i >= pysakit.Count - 1)
                    return new KellonAskel(new KellonTila { Paikka = vuosi, I = i, Alku = alku }, -1, true);
                dt = 0;
                tauolta = true;
            }
            if (i + 1 >= pysakit.Count)
                return new KellonAskel(new KellonTila { Paikka = vuosi, I = i, Alku = alku }, -1, true);
            var seuraava = pysakit[i + 1];
            if (dt > 0)
            {
                if (tahti.Lineaarinen) vuosi += dt / tahti.VuosiMs;
                else
                {
                    int askelia = Math.Max(1, (int)Math.Ceiling(dt / AliaskelMs));
                    double pala = dt / askelia;
                    for (int n = 0; n < askelia && vuosi < seuraava.Paikka; n++)
                    {
                        double etaisyys = Math.Max(0, Math.Min(vuosi - alku, seuraava.Paikka - vuosi));
                        vuosi += (pala / tahti.VuosiMs) * Nopeus(etaisyys);
                    }
                }
            }
            if (vuosi < seuraava.Paikka)
                return new KellonAskel(new KellonTila { Paikka = vuosi, I = i, Alku = alku }, -1, false);
            i += 1;
            double uusiViive = seuraava.Paalu ? tahti.PaaluMs : (seuraava.Hiljainen ? 0 : tahti.ViiveMs);
            double kohta = tauolta ? Math.Max(vuosi, seuraava.Paikka) : seuraava.Paikka;
            return new KellonAskel(
                new KellonTila { Paikka = kohta, I = i, Viive = uusiViive, ViiveTaysi = uusiViive, Alku = kohta }, i, false);
        }

        /// <summary>
        /// Millisekunnit seuraavaan ei-hiljaiseen syttymiseen (web aikaSeuraavaan);
        /// ∞, jos kaari loppuu tai katto tulee vastaan. Kamera aloittaa ajon tämän mukaan.
        /// </summary>
        public static double AikaSeuraavaan(KellonTila tila, IReadOnlyList<KellonPysakki> pysakit,
            KellonTahti tahti = null, double katto = 120000)
        {
            if (pysakit == null || pysakit.Count == 0) return double.PositiveInfinity;
            var t = tila;
            double kulunut = 0;
            while (kulunut < katto)
            {
                double askel = Math.Min(AliaskelMs, katto - kulunut);
                var tulos = Askel(t, askel, pysakit, tahti);
                kulunut += askel;
                if (tulos.Syttyi >= 0 && !pysakit[tulos.Syttyi].Hiljainen) return kulunut;
                if (tulos.Loppu) return double.PositiveInfinity;
                t = tulos.Tila;
            }
            return double.PositiveInfinity;
        }

        /// <summary>
        /// Luenta pidättää tauon loppua (web pidataTaukoaLuennalle): niin kauan kuin
        /// selostus soi, tauko alkaa alusta taukovaran mittaisena ja hiipimä nollautuu,
        /// kuitenkin enintään LuennanPisinMs luennan alusta. Kutsutaan joka kehys
        /// ennen Askelta.
        /// </summary>
        public static KellonTila PidataLuennalle(KellonTila tila, bool luentaSoi, double luennanKestoMs)
        {
            if (!(tila.Viive > 0) || !luentaSoi || luennanKestoMs > LuennanPisinMs) return tila;
            tila.Paikka = Math.Floor(tila.Paikka);
            tila.Viive = LuennanTaukovaraMs;
            tila.ViiveTaysi = LuennanTaukovaraMs;
            return tila;
        }

        /// <summary>Kehyksen dt:n katto (web kehys: Math.min(200, …)).</summary>
        public const double DtKatto = 200;

        /// <summary>Vähennetty liike: nopeutettu ja lineaarinen (web reducedMotion-tahti).</summary>
        public static readonly KellonTahti VahennettyTahti = new KellonTahti { VuosiMs = 40, Lineaarinen = true };
    }
}
