// DIORAAMAN KAMERALIIKE — puhdas logiikka (speksi docs/raportit/dioraama-rajapinnat-20260929.md kohta 4).
// JS-pari: js/dioraama/kamera.js (asentoSijainti, siirtymanKesto, siirtymaAsento, pelaajanAsento, smootherstep).
// Pariteettia vartioidaan Linssit-testit/kultaiset/dioraama-vektorit.json:lla (DioraamaTestit.cs).
using System;

namespace Matkakirja.Linssit.Dioraama
{
    public static class Kameraliike
    {
        static double Rajaa(double x, double lo, double hi) => x < lo ? lo : x > hi ? hi : x;

        /// <summary>smootherstep(t) = t³(t(6t − 15) + 10), t rajattu 0–1 ennen laskua.</summary>
        public static double Smootherstep(double t)
        {
            double x = Rajaa(t, 0, 1);
            return x * x * x * (x * (6 * x - 15) + 10);
        }

        /// <summary>
        /// Lyhin kiertoero kahden kompassiasteen välillä, väli (-180, 180]. Tasan 180 asteen käännös palautuu
        /// arvona -180 (ei +180): normalisointi puoliavoimelle välille (js kiertoero, ks. vektorien tulkinnat).
        /// </summary>
        static double KiertoEro(double a0, double a1) => Mod(Mod(a1 - a0 + 180, 360) + 360, 360) - 180;

        static double Mod(double a, double m) => a % m;

        /// <summary>
        /// Kameran maailmansijainti asennosta. k = korkeus, a = atsimuutti (kompassi: kohteesta kameraan päin).
        /// a = 180 → kamera kohteen ETELÄPUOLELLA eli +Z: cos k·sin 180 = 0, −cos k·cos 180 = +cos k → (0, sin k, +cos k).
        /// </summary>
        public static (V3 sijainti, V3 kohde) AsentoSijainti(Asento p)
        {
            double k = p.Korkeus * Math.PI / 180, a = p.Atsimuutti * Math.PI / 180;
            double ck = Math.Cos(k);
            var suunta = new V3(ck * Math.Sin(a), Math.Sin(k), -ck * Math.Cos(a));
            return (p.Kohde + suunta * p.Etaisyys, p.Kohde);
        }

        /// <summary>Δ = |kohde1 − kohde0| + |etaisyys1 − etaisyys0|; T = clamp(1,6 + 0,35·√Δ, 2,0, 3,8).</summary>
        public static double SiirtymanKesto(Asento p0, Asento p1)
        {
            double delta = (p1.Kohde - p0.Kohde).Pituus + Math.Abs(p1.Etaisyys - p0.Etaisyys);
            return Rajaa(1.6 + 0.35 * Math.Sqrt(delta), 2.0, 3.8);
        }

        /// <summary>
        /// Interpoloitu asento kahden asennon välillä (t 0…1). e = smootherstep(t) ohjaa kohteen, atsimuutin
        /// (lyhin kiertoero), korkeuden, fov:n ja aukon lerpiä. etaisyys saa nosturinoston 0,25·|Δkohde|·sin(π·t) —
        /// HUOM: tässä termissä t on RAAKA t (ei smootherstepattu), joten nosto on 0 molemmissa päätepisteissä.
        /// </summary>
        public static Asento SiirtymaAsento(Asento p0, Asento p1, double t)
        {
            double e = Smootherstep(t);
            var kohde = V3.Lerp(p0.Kohde, p1.Kohde, e);
            double atsimuutti = p0.Atsimuutti + KiertoEro(p0.Atsimuutti, p1.Atsimuutti) * e;
            double korkeus = p0.Korkeus + (p1.Korkeus - p0.Korkeus) * e;
            double fov = p0.Fov + (p1.Fov - p0.Fov) * e;
            double aukko = p0.Aukko + (p1.Aukko - p0.Aukko) * e;
            double dKohde = (p1.Kohde - p0.Kohde).Pituus;
            double etaisyys = p0.Etaisyys + (p1.Etaisyys - p0.Etaisyys) * e + 0.25 * dKohde * Math.Sin(Math.PI * t);
            return new Asento(kohde, atsimuutti, korkeus, etaisyys, fov, aukko);
        }

        /// <summary>Pelaajan ohjaama poikkeama nykyisestä asennosta. da rajataan ±20, dk ±10, zoom 0,75–1,3.</summary>
        public static Asento PelaajanAsento(Asento p, double da, double dk, double zoom)
        {
            double daR = Rajaa(da, -20, 20), dkR = Rajaa(dk, -10, 10), zoomR = Rajaa(zoom, 0.75, 1.3);
            return new Asento(p.Kohde, p.Atsimuutti + daR, p.Korkeus + dkR, p.Etaisyys * zoomR, p.Fov, p.Aukko);
        }
    }
}
