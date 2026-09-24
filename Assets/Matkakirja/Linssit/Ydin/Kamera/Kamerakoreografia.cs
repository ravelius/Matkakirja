// KAMERAKOREOGRAFIA: yhteinen käyrä- ja aikajanakirjasto automaattisille kamera-ajoille
// (Raamattu KAMERA-AJOT, omistaja 24.9.2026: ease in / ease out, ei lineaarisia pätkiä eikä hyppyjä,
// ja TEMPON DRAMATURGIA: nopeuden vaihtelu, kuminauhamaiset kiihdytykset ja jarrutukset, tasaisen ja
// kiihtyvän vuorottelu). Linssiseppä ja Natiiviseppä käyttävät samaa kirjastoa (Kartta viittaa Ydiniin).
//
// Käyrä on t 0…1 → osuus. Kaikki käyrät alkavat ja päättyvät nopeuteen nolla (paitsi Tasainen), joten
// peräkkäiset vaiheet eivät nyi. Kuminauha ylittää maalin hieman (osuus > 1) ja palaa: PalloKierto
// lerppaa ylityksen yli (paikka ja logaritminen korkeus), joten kamera "joustaa" perille.
//
// Aikajana (Kameraketju) on lista vaiheita { kohde, kesto, käyrä, parametri, pito }: Kohta(s) kertoo,
// mikä vaihe on menossa ja missä kohtaa sitä. Suorittaja (LinssiOhjain tai PalloKierto) ajaa vaiheet.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kamera
{
    public enum Kayra
    {
        /// <summary>Smootherstep: tasainen kiihdytys ja jarrutus (oletus).</summary>
        Pehmea,
        /// <summary>Kiihtyvä: lähtee levosta, kiihtyy loppuun asti (t³). Seuraavan vaiheen pitää jatkaa vauhdista.</summary>
        Kiihtyva,
        /// <summary>Jarruttava: lähtee vauhdista, pysähtyy pehmeästi (1 − (1 − t)³).</summary>
        Jarruttava,
        /// <summary>Nousu: nopea lähtö (huippunopeus alussa), pitkä pehmeä hidastus.</summary>
        Nousu,
        /// <summary>Syöksy: hidas lähtö, kiihtyy, huippunopeus myöhään, jyrkkä jarrutus.</summary>
        Syoksy,
        /// <summary>Kuminauha: pehmeä lähtö, jarrutus pienellä ylityksellä (parametri = ylitys, oletus 0,6).</summary>
        Kuminauha,
        /// <summary>Syöksy + kuminauhajarrutus samassa vaiheessa (parametri = ylitys, oletus 0,6).</summary>
        SyoksyKuminauha,
        /// <summary>Tasainen: vakionopeus. Vain ketjun keskellä kiihtyvän ja jarruttavan välissä.</summary>
        Tasainen,
    }

    public static class Kamerakayrat
    {
        /// <summary>Kuminauhan oletusylitys (easeOutBack-kerroin): ~2 % maalin yli.</summary>
        public const double OletusYlitys = 0.6;

        static double Rajaa(double t) => t < 0 ? 0 : t > 1 ? 1 : t;

        /// <summary>Smootherstep x³(6x² − 15x + 10): nopeus ja kiihtyvyys nollassa molemmissa päissä.</summary>
        public static double Pehmea(double t)
        {
            double x = Rajaa(t);
            return x * x * x * (x * (x * 6 - 15) + 10);
        }

        /// <summary>easeOutBack: nopeus 0 lopussa, ylittää maalin ja palaa (ylitys ≈ kerroin/30 pienillä arvoilla).</summary>
        static double TakaisinJousi(double u, double kerroin)
        {
            double c1 = Math.Max(0, kerroin), c3 = c1 + 1, v = u - 1;
            return 1 + c3 * v * v * v + c1 * v * v;
        }

        public static double Arvo(Kayra kayra, double t, double parametri = double.NaN)
        {
            double x = Rajaa(t);
            double yli = double.IsNaN(parametri) ? OletusYlitys : parametri;
            switch (kayra)
            {
                case Kayra.Kiihtyva: return x * x * x;
                case Kayra.Jarruttava: { double v = 1 - x; return 1 - v * v * v; }
                case Kayra.Nousu: return Pehmea(Math.Pow(x, 0.6));
                case Kayra.Syoksy: return Pehmea(Math.Pow(x, 1.6));
                // Lähtö levosta (u = x^p, derivaatta 0), loppu easeOutBack (nopeus 0 ylityksen jälkeen).
                case Kayra.Kuminauha: return TakaisinJousi(x * x, yli);
                case Kayra.SyoksyKuminauha: return TakaisinJousi(Math.Pow(x, 2.2), yli);
                case Kayra.Tasainen: return x;
                default: return Pehmea(x);
            }
        }

        /// <summary>Paluun ja muistijatkon kevyt jousto (pienempi kuin syöksyn kuminauha).</summary>
        public const double PaluunYlitys = 0.3;

        /// <summary>Lyhyen ja pitkän matkan rajat (isoympyräkulma asteina) automaattisten ajojen rytmille.</summary>
        public const double LyhytAsteina = 6, PitkaAsteina = 35;

        /// <summary>Isoympyräkulma asteina kahden pisteen välillä.</summary>
        public static double Kulma(double lat1, double lon1, double lat2, double lon2)
        {
            const double Rad = Math.PI / 180;
            double c = Math.Sin(lat1 * Rad) * Math.Sin(lat2 * Rad) + Math.Cos(lat1 * Rad) * Math.Cos(lat2 * Rad) * Math.Cos((lon2 - lon1) * Rad);
            return Math.Acos(Math.Max(-1, Math.Min(1, c))) / Rad;
        }

        /// <summary>
        /// TEMPO MATKAN MUKAAN (Raamattu KAMERA-AJOT: nopeuden vaihtelu): lyhyt siirto pehmeä, keskipitkä
        /// kuminauhajarrutuksella, pitkä syöksy kuminauhalla.
        /// </summary>
        public static Kayra Matkalle(double kulmaAsteina) =>
            kulmaAsteina < LyhytAsteina ? Kayra.Pehmea : kulmaAsteina < PitkaAsteina ? Kayra.Kuminauha : Kayra.SyoksyKuminauha;

        /// <summary>Matkan käyrä funktiona (lähtö → kohde).</summary>
        public static Func<double, double> Matkalle(double lat1, double lon1, double lat2, double lon2) =>
            Funktio(Matkalle(Kulma(lat1, lon1, lat2, lon2)));

        /// <summary>Käyrä funktiona (ILinssiYmparisto.AjaKamera / PalloKierto.Aja pehmennys).</summary>
        public static Func<double, double> Funktio(Kayra kayra, double parametri = double.NaN) =>
            t => Arvo(kayra, t, parametri);
    }

    /// <summary>Aikajanan vaihe: kohde (NaN = ennallaan), kesto, käyrä; Pito = kamera paikallaan koko keston.</summary>
    public readonly struct Kameravaihe
    {
        public readonly double Lat, Lon, KorkeusM, KestoS, Parametri;
        public readonly Kayra Kayra;
        public readonly bool Pito;

        public Kameravaihe(double lat, double lon, double korkeusM, double kestoS, Kayra kayra = Kayra.Pehmea,
            double parametri = double.NaN)
        { Lat = lat; Lon = lon; KorkeusM = korkeusM; KestoS = Math.Max(0, kestoS); Kayra = kayra; Parametri = parametri; Pito = false; }

        Kameravaihe(double kestoS) { Lat = Lon = KorkeusM = double.NaN; KestoS = Math.Max(0, kestoS); Kayra = Kayra.Pehmea; Parametri = double.NaN; Pito = true; }

        /// <summary>Tauko: kamera paikallaan (esim. "hetki tähdissä").</summary>
        public static Kameravaihe Tauko(double kestoS) => new Kameravaihe(kestoS);
    }

    /// <summary>Vaiheiden aikajana: kokonaiskesto ja kohta ajassa.</summary>
    public sealed class Kameraketju
    {
        public readonly IReadOnlyList<Kameravaihe> Vaiheet;
        public readonly double KestoS;

        public Kameraketju(IReadOnlyList<Kameravaihe> vaiheet)
        {
            Vaiheet = vaiheet ?? Array.Empty<Kameravaihe>();
            double s = 0;
            foreach (var v in Vaiheet) s += v.KestoS;
            KestoS = s;
        }

        /// <summary>Vaihe ja sen paikallinen t (0…1) hetkellä s sekuntia ketjun alusta; (-1, 0) tyhjälle, viimeinen t = 1 lopussa.</summary>
        public (int Vaihe, double T) Kohta(double s)
        {
            if (Vaiheet.Count == 0) return (-1, 0);
            double alku = 0;
            for (int i = 0; i < Vaiheet.Count; i++)
            {
                double k = Vaiheet[i].KestoS;
                if (s < alku + k) return (i, k > 0 ? Math.Max(0, (s - alku) / k) : 1);
                alku += k;
            }
            return (Vaiheet.Count - 1, 1);
        }
    }
}
