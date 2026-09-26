// ELÄVÄ KARTTA: kameran polku avainasennoista (Linssiseppä 26.9.2026). Puhdas C#.
//
// Raamattu KAMERA-AJOT: ease in / ease out, ei lineaarisia pätkiä eikä hyppyjä, tempon vaihtelu. Jokainen väli kulkee
// oman käyränsä mukaan (Kamerakoreografia: Pehmea, Jarruttava, Kuminauha …, sekä täällä Liuku = kiihtyvä → tasainen →
// jarruttava yhtenä käyränä). Katsekohde kulkee isoympyrää, etäisyys logaritmisesti (kuten PalloKierto.Aja), kallistus
// ja suuntima suoraan (suuntima lyhintä tietä). Kuminauhan ylitys (osuus > 1) jatkaa isoympyrää hieman maalin yli.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Elava
{
    public static class ElavaKayrat
    {
        public static double Rajaa(double t) => t < 0 ? 0 : t > 1 ? 1 : t;

        public static double Pehmea(double t) => Kamerakayrat.Pehmea(t);

        /// <summary>Hidastuva (1 − (1 − t)^p): kuivuva muste, täyttö.</summary>
        public static double Hidastuva(double t, double p = 2) => 1 - Math.Pow(1 - Rajaa(t), p);

        /// <summary>
        /// LIUKU: kiihtyvä → tasainen → jarruttava yhtenä käyränä (käsikirjoituksen loppuvetäytyminen). Nopeus nousee
        /// smoothstepillä välillä [0, a], pysyy vakiona ja laskee peilikuvana; asema on nopeuden integraali, joten
        /// nopeus on jatkuva eikä lopussa ole nykäystä.
        /// </summary>
        public static double Liuku(double t, double a = 0.3)
        {
            double x = Rajaa(t);
            a = Math.Max(1e-3, Math.Min(0.5, a));
            double Ramppi(double u) { u = Rajaa(u); return u * u * u - u * u * u * u / 2; }   // ∫ smoothstep
            double kokonais = 1 - a;
            double s;
            if (x < a) s = a * Ramppi(x / a);
            else if (x <= 1 - a) s = a / 2 + (x - a);
            else s = kokonais - a * Ramppi((1 - x) / a);
            return s / kokonais;
        }

        public static Func<double, double> Kayralle(Kayra k, double parametri = double.NaN) =>
            t => Kamerakayrat.Arvo(k, t, parametri);
    }

    /// <summary>Avainasento: hetki (s), asento ja käyrä, jolla edellisestä avaimesta tullaan tähän.</summary>
    public readonly struct Avainasento
    {
        public readonly double Aika;
        public readonly Asento Asento;
        public readonly Func<double, double> Kayra;
        public readonly string Nimi;

        public Avainasento(double aika, Asento asento, Func<double, double> kayra, string nimi)
        { Aika = aika; Asento = asento; Kayra = kayra ?? ElavaKayrat.Pehmea; Nimi = nimi; }
    }

    public sealed class Kamerapolku
    {
        public readonly IReadOnlyList<Avainasento> Avaimet;

        public Kamerapolku(IReadOnlyList<Avainasento> avaimet)
        {
            if (avaimet == null || avaimet.Count == 0) throw new ArgumentException("kamerapolku ilman avaimia");
            for (int i = 1; i < avaimet.Count; i++)
                if (avaimet[i].Aika < avaimet[i - 1].Aika) throw new ArgumentException("avaimet eivät ole aikajärjestyksessä");
            Avaimet = avaimet;
        }

        public double Kesto => Avaimet[Avaimet.Count - 1].Aika;

        /// <summary>Välin indeksi (avain, johon ollaan menossa) ja käyrän arvo hetkellä t.</summary>
        public (int Vali, double Osuus) Kohta(double t)
        {
            if (t <= Avaimet[0].Aika) return (0, 0);
            for (int i = 1; i < Avaimet.Count; i++)
            {
                if (t >= Avaimet[i].Aika) continue;
                double v = Avaimet[i].Aika - Avaimet[i - 1].Aika;
                double u = v > 0 ? (t - Avaimet[i - 1].Aika) / v : 1;
                return (i, Avaimet[i].Kayra(u));
            }
            return (Avaimet.Count - 1, 1);
        }

        public Asento Asento(double t)
        {
            var (i, w) = Kohta(t);
            if (i == 0) return Avaimet[0].Asento;
            var a = Avaimet[i - 1].Asento;
            var b = Avaimet[i].Asento;
            if (w >= 1 && t >= Avaimet[i].Aika) return b;
            return Sekoita(a, b, w);
        }

        public static Asento Sekoita(Asento a, Asento b, double w)
        {
            var kohde = Kameramatikka.IsoympyranPiste(a.Kohde, b.Kohde, w);
            double etaisyys = Math.Exp(Math.Log(Math.Max(1, a.EtaisyysM)) + (Math.Log(Math.Max(1, b.EtaisyysM)) - Math.Log(Math.Max(1, a.EtaisyysM))) * w);
            double kallistus = a.Kallistus + (b.Kallistus - a.Kallistus) * w;
            double ds = ((b.Suuntima - a.Suuntima) % 360 + 540) % 360 - 180;
            return new Asento(kohde, etaisyys, Math.Max(0, kallistus), a.Suuntima + ds * w);
        }
    }
}
