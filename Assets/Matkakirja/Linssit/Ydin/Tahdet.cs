// TÄHTITAIVAS (web js/pallolauta/tahdet.js): kolme pistekerrosta pallon ympärillä,
// siemenluku 20260907, joten taivas on joka kerta sama. Ihmisen matka käyttää
// taivasta avausjaksossa ja astronautin kamera koko linssin ajan (kerroin 1,6).
//
// Tähdet ovat MAAHAN kiinnitettyjä pisteitä 2,6–6,5 säteen korkeudella, eivät
// kameraan kiinnitetty kupu: kun kamera laskeutuu, lähin pölykerros liukuu
// ohi (parallaksi) ja ajelehtii hitaasti maapallon akselin ympäri.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit
{
    public sealed class Tahtikerros
    {
        public string Tunnus;
        public int Maara;
        public double KorkeusMin, KorkeusMax;   // pallon säteinä pinnan yläpuolella
        public double Koko;                      // webin maailmanyksikköinä (säde = 100)
        public string Vari;
        public bool Ajautuu;
    }

    public readonly struct Tahti
    {
        public readonly double Lat, Lon, Korkeus;
        public Tahti(double lat, double lon, double korkeus) { Lat = lat; Lon = lon; Korkeus = korkeus; }
    }

    public sealed class Tahtijoukko
    {
        public string Tunnus, Vari;
        public double Koko;
        public bool Ajautuu;
        public List<Tahti> Pisteet;
    }

    public static class Tahdet
    {
        public const uint Siemen = 20260907;
        /// <summary>Pölykerroksen ajelehdinta kierroksina sekunnissa.</summary>
        public const double PolynAjautumaKierrostaS = 0.0016;
        /// <summary>Astronautin kameran etäisyyskerroin (TAHTIEN_KERROIN).</summary>
        public const double AstronautinKerroin = 1.6;

        public static readonly IReadOnlyList<Tahtikerros> Kerrokset = new[]
        {
            new Tahtikerros { Tunnus = "kaukaiset", Maara = 1200, KorkeusMin = 5.4, KorkeusMax = 6.5, Koko = 0.9, Vari = "#c9d4e8" },
            new Tahtikerros { Tunnus = "kirkkaat", Maara = 260, KorkeusMin = 4.8, KorkeusMax = 5.8, Koko = 1.35, Vari = "#ffffff" },
            new Tahtikerros { Tunnus = "poly", Maara = 730, KorkeusMin = 2.6, KorkeusMax = 3.4, Koko = 1.3, Vari = "#93a6c4", Ajautuu = true },
        };

        /// <summary>mulberry32 (web siemenluvut): tasajakautuneet luvut [0, 1).</summary>
        public static Func<double> Siemenluvut(uint siemen)
        {
            uint t = siemen;
            return () =>
            {
                unchecked
                {
                    t += 0x6d2b79f5;
                    uint v = t;
                    v = (v ^ (v >> 15)) * (v | 1);
                    v ^= v + (v ^ (v >> 7)) * (v | 61);
                    return (v ^ (v >> 14)) / 4294967296.0;
                }
            };
        }

        public static List<Tahti> Pisteet(int maara, double korkeusMin, double korkeusMax, uint siemen)
        {
            var arpa = Siemenluvut(siemen);
            var ulos = new List<Tahti>(maara);
            for (int i = 0; i < maara; i++)
            {
                double lat = Math.Asin(2 * arpa() - 1) * 180 / Math.PI;
                double lng = arpa() * 360 - 180;
                double alt = korkeusMin + arpa() * (korkeusMax - korkeusMin);
                ulos.Add(new Tahti(lat, lng, alt));
            }
            return ulos;
        }

        /// <summary>Kerrokset pisteinä (web tahtijoukot); kerroin venyttää etäisyydet ja koot.</summary>
        public static List<Tahtijoukko> Joukot(double kerroin = 1, uint siemen = Siemen)
        {
            double k0 = kerroin > 0 && double.IsFinite(kerroin) ? kerroin : 1;
            var ulos = new List<Tahtijoukko>();
            for (int i = 0; i < Kerrokset.Count; i++)
            {
                var k = Kerrokset[i];
                ulos.Add(new Tahtijoukko
                {
                    Tunnus = k.Tunnus, Vari = k.Vari, Koko = k.Koko * k0, Ajautuu = k.Ajautuu,
                    Pisteet = Pisteet(k.Maara, k.KorkeusMin * k0, k.KorkeusMax * k0, unchecked(siemen + (uint)(i * 7919))),
                });
            }
            return ulos;
        }

        /// <summary>
        /// Pisteen leveys maailmassa pallon säteinä. Webin PointsMaterial (sizeAttenuation)
        /// piirtää pisteen koolla koko · (H/2) / syvyys pikseliä; saman kokoinen neliö
        /// maailmassa on koko · tan(fov/2) yksikköä, ja webin säde on 100 yksikköä.
        /// </summary>
        public static double LeveysSateina(double koko, double fovAsteina = 50) =>
            koko * Math.Tan(fovAsteina / 2 * Math.PI / 180) / 100;
    }
}
