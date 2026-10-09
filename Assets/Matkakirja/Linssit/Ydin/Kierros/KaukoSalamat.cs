// KAUKAISET SALAMAT (Päätoimittaja 9.10., junan 171 erä: "kaukaiset salamat ukkosella"): ukkosella (sää tai ukkoskuuro) salamaniskuja
// horisonttiin EtMinM…EtMaxM:n päähän satunnaiseen suuntaan; isku välähtää 2–3 kertaa (Kirkkaus), jyrinä kuuluu etäisyyden
// mukaisella viiveellä (ääni 343 m/s, vain AaniMaxM:ää lähemmistä). Väli lyhenee ukkosen voiman mukaan. Muoto: siksak-polku maasta
// pilven alapintaan (Muoto, siemenestä toistettava) ja sivuhaara. Puhdas C#; Unity-puoli KaupunkiSalamat. Testi KaukoSalamatTestit.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class KaukoSalamat
    {
        public const double ValiMinS = 5, ValiMaxS = 16, EtMinM = 4000, EtMaxM = 14000, KestoS = 0.5, AaniMaxM = 9000, AaniMs = 343, PilviM = 1400;

        public struct Isku { public double Suunta, EtaisyysM, Aika; public int Siemen; public bool Haara; }

        readonly Random r;
        double seuraava = -1, kumahdus = -1;
        /// <summary>Nykyinen isku (null = ei välähdystä juuri nyt).</summary>
        public Isku? Nykyinen { get; private set; }
        /// <summary>Tässä päivityksessä alkoi isku.</summary>
        public bool Alkoi { get; private set; }
        /// <summary>Tässä päivityksessä kuuluu jyrinä; voima 0–1 etäisyyden mukaan (0 = ei).</summary>
        public double Kumahdus { get; private set; }
        double kumahdusVoima;

        public KaukoSalamat(int siemen) { r = new Random(siemen); }

        /// <summary>Joka ruutu; ukkonen = ukkosen voima 0–1 (alle 0,3: ei iskuja).</summary>
        public void Paivita(double dt, double ukkonen)
        {
            dt = Math.Max(0, dt); Alkoi = false; Kumahdus = 0;
            if (Nykyinen is Isku i)
            {
                i.Aika += dt;
                Nykyinen = i.Aika > KestoS ? (Isku?)null : i;
            }
            if (kumahdus >= 0 && (kumahdus -= dt) <= 0) { Kumahdus = kumahdusVoima; kumahdus = -1; }
            if (ukkonen < 0.3) { seuraava = -1; return; }
            double vali(double v) => (ValiMinS + (ValiMaxS - ValiMinS) * r.NextDouble()) / Math.Max(0.4, v);
            if (seuraava < 0) seuraava = vali(ukkonen) * 0.5;
            if ((seuraava -= dt) > 0) return;
            seuraava = vali(ukkonen);
            double et = EtMinM + (EtMaxM - EtMinM) * Math.Pow(r.NextDouble(), 0.7);
            Nykyinen = new Isku { Suunta = 360 * r.NextDouble(), EtaisyysM = et, Aika = 0, Siemen = r.Next(1, int.MaxValue), Haara = r.NextDouble() < 0.6 };
            Alkoi = true;
            if (et < AaniMaxM && kumahdus < 0) { kumahdus = et / AaniMs; kumahdusVoima = Math.Max(0.3, 1 - (et - EtMinM) / (AaniMaxM - EtMinM) * 0.7); }
        }

        /// <summary>Välähdyksen kirkkaus 0–1 iskun alusta: päävälähdys, sammuminen ja 1–2 jälkivälähdystä (KestoS:ssa).</summary>
        public static double Kirkkaus(double t, int siemen)
        {
            if (t < 0 || t > KestoS) return 0;
            double Pulssi(double alku, double huippu, double kesto) { double u = (t - alku) / kesto; return u < 0 || u > 1 ? 0 : huippu * Math.Pow(1 - u, 2); }
            double toka = 0.12 + (siemen % 7) * 0.012, kolmas = 0.3 + (siemen % 5) * 0.02;
            return Math.Min(1, Pulssi(0, 1, 0.09) + Pulssi(toka, 0.75, 0.08) + (siemen % 3 == 0 ? 0 : Pulssi(kolmas, 0.5, 0.1)));
        }

        /// <summary>Iskun polku (x sivuttain, y ylös) korkeuden yksiköissä 0 (maa) … 1 (pilvi): siksak, jonka poikkeama kasvaa ylöspäin
        /// ja on enintään 0,25. pisteita ≥ 2. haara = sivuhaaran polku (alkaa pääpolun 40–70 %:sta ja kulkee alas sivulle).</summary>
        public static List<(double x, double y)> Muoto(int siemen, int pisteita, bool haara = false)
        {
            var rr = new Random(siemen * (haara ? 31 : 1) + (haara ? 17 : 0));
            var l = new List<(double, double)>();
            if (!haara)
            {
                double x = 0;
                for (int i = 0; i < pisteita; i++)
                {
                    double y = (double)i / (pisteita - 1);
                    if (i > 0) x += (rr.NextDouble() - 0.5) * 0.12;
                    x = Math.Max(-0.25, Math.Min(0.25, x));
                    l.Add((i == 0 ? 0 : x, y));
                }
                return l;
            }
            double y0 = 0.4 + 0.3 * rr.NextDouble(), suunta = rr.NextDouble() < 0.5 ? -1 : 1, hx = 0;
            for (int i = 0; i < pisteita; i++)
            {
                double u = (double)i / (pisteita - 1);
                hx += suunta * (0.03 + 0.04 * rr.NextDouble());
                l.Add((Math.Max(-0.4, Math.Min(0.4, hx)), y0 - u * y0 * 0.6));
            }
            return l;
        }
    }
}
