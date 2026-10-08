// KAUPUNGIN OMA VESIPINTA (Linssiseppä 2, 8.10.2026; omistaja 20.2x valitsi B: oma vesipinta Googlen laattojen päälle, ei maskia
// Googlen varjostimeen; Karttaseppä tekee aineiston vesi-<kohde>-<ruutu>.bytes + .json). Muoto: kaikki kärjet (float32 x itä, y pohjoinen,
// z ylös ENU:ssa origossa, d rantaetäisyys m), sitten kaikki indeksit (uint32 palan sisäisinä: + pala.karjet[0]); 1 km:n palat
// bbox:ineen; kolmiot CCW ylhäältä ENU:ssa. Unityyn: (x, z, y) ja kiertosuunta käännetään (vasenkätinen). Nosto (nosto_m_suositus 0,4)
// ja rannan alfa = smoothstep(0, 3, d) varjostimessa. Valinta: palat kameran ympäriltä bbox-etäisyyden mukaan (lähellä 6 m, kaukana 16 m).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Ilmakeha
{
    public sealed class VesiVerkko
    {
        public struct Pala { public int K0, Kn, I0, In; public double MinE, MinN, MinU, MaxE, MaxN, MaxU; }

        public readonly int Karkia, Indekseja; public readonly Pala[] Palat;
        readonly byte[] tavut;

        public VesiVerkko(byte[] tavut, int karkia, int indekseja, Pala[] palat)
        {
            if (tavut.Length != karkia * 16 + indekseja * 4) throw new ArgumentException($"koko {tavut.Length} ≠ {karkia}×16 + {indekseja}×4");
            this.tavut = tavut; Karkia = karkia; Indekseja = indekseja; Palat = palat;
        }

        public (float E, float N, float U, float D) Karki(int i)
        {
            int o = i * 16;
            return (BitConverter.ToSingle(tavut, o), BitConverter.ToSingle(tavut, o + 4), BitConverter.ToSingle(tavut, o + 8), BitConverter.ToSingle(tavut, o + 12));
        }

        public int Indeksi(int i) => (int)BitConverter.ToUInt32(tavut, Karkia * 16 + i * 4);

        /// <summary>Palan kärjet Unity-järjestyksessä (x itä, y ylös + nosto, z pohjoinen), rantaetäisyys ja kolmiot vasenkätisinä (CW ylhäältä).</summary>
        public void Unityyn(int pala, double nostoM, List<(float X, float Y, float Z)> paikat, List<float> ranta, List<int> kolmiot)
        {
            var p = Palat[pala]; int alku = paikat.Count;
            for (int i = 0; i < p.Kn; i++) { var k = Karki(p.K0 + i); paikat.Add((k.E, (float)(k.U + nostoM), k.N)); ranta.Add(k.D); }
            for (int i = 0; i + 2 < p.In; i += 3)
            {
                kolmiot.Add(alku + Indeksi(p.I0 + i)); kolmiot.Add(alku + Indeksi(p.I0 + i + 2)); kolmiot.Add(alku + Indeksi(p.I0 + i + 1));
            }
        }

        /// <summary>Kameran (ENU e, n) vaakaetäisyys palan bbox:iin (0 sisällä).</summary>
        public double Etaisyys(int pala, double e, double n)
        {
            var p = Palat[pala];
            double de = Math.Max(0, Math.Max(p.MinE - e, e - p.MaxE)), dn = Math.Max(0, Math.Max(p.MinN - n, n - p.MaxN));
            return Math.Sqrt(de * de + dn * dn);
        }

        /// <summary>Palat etäisyysvälillä [min, max) m kamerasta (lähi- ja kaukotaso eri verkoista).</summary>
        public List<int> Valitse(double e, double n, double minM, double maxM)
        {
            var l = new List<int>();
            for (int i = 0; i < Palat.Length; i++) { double d = Etaisyys(i, e, n); if (d >= minM && d < maxM) l.Add(i); }
            return l;
        }

        /// <summary>Vesipinnan korkeus (ENU u, ilman nostoa) pisteessä (e, n): kolmio, jonka sisällä piste on, barysentrisesti; false = ei vettä
        /// (LS1:n veneet: korkeus samasta aineistosta, ei Googlesta).</summary>
        public bool Korkeus(double e, double n, out double u)
        {
            u = 0;
            for (int pi = 0; pi < Palat.Length; pi++)
            {
                var p = Palat[pi];
                const double V = 0.05;   // bbox jsonissa senttimetrin tarkkuudella
                if (e < p.MinE - V || e > p.MaxE + V || n < p.MinN - V || n > p.MaxN + V) continue;
                for (int i = 0; i + 2 < p.In; i += 3)
                {
                    var a = Karki(p.K0 + Indeksi(p.I0 + i)); var b = Karki(p.K0 + Indeksi(p.I0 + i + 1)); var c = Karki(p.K0 + Indeksi(p.I0 + i + 2));
                    double d = (b.N - c.N) * (a.E - c.E) + (c.E - b.E) * (a.N - c.N);
                    if (Math.Abs(d) < 1e-12) continue;
                    double l1 = ((b.N - c.N) * (e - c.E) + (c.E - b.E) * (n - c.N)) / d, l2 = ((c.N - a.N) * (e - c.E) + (a.E - c.E) * (n - c.N)) / d, l3 = 1 - l1 - l2;
                    if (l1 < -1e-6 || l2 < -1e-6 || l3 < -1e-6) continue;
                    u = l1 * a.U + l2 * b.U + l3 * c.U; return true;
                }
            }
            return false;
        }

        /// <summary>Rannan alfa (Karttaseppä: smoothstep(0, 3, d)).</summary>
        public static double RantaAlfa(double d) { double t = Math.Max(0, Math.Min(1, d / 3)); return t * t * (3 - 2 * t); }
    }
}
