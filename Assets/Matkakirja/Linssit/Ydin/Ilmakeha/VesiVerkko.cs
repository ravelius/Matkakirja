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
            pois = PienetErilliset();
        }

        /// <summary>PIENET ERILLISET VEDET POIS (LS1 + PT 9.10.: Tuileries'n kahdeksankulmaisen altaan päällä leijui iso tummansininen
        /// kiekko; WorldCoverin 10 m:n maski tekee altaista ja suihkulähteistä pyöreitä, sivuun siirtyneitä läiskiä väärällä korkeudella).
        /// Yhtenäinen vesialue (kolmiot yhteisten kärkien kautta, palojen leikkausviivojen yli yhdistettynä) pudotetaan, kun sen ala on
        /// alle PieniVesiM2: joki, kanava ja meri ovat yhtä isoa aluetta. Leikkausviivat = bbox-reunat, jotka ovat toisen palan
        /// vastakkainen reuna; viivan kärjet yhdistetään 3 m:n lohkoissa (molemmin puolin samat rasterin pisteet).</summary>
        public const double PieniVesiM2 = 10000, ViivaToleranssiM = 0.6, ViivaLohkoM = 3;
        readonly bool[][] pois;
        public int Pudotettuja { get; private set; }

        bool[][] PienetErilliset()
        {
            var e = new List<double>(); var n = new List<double>();
            foreach (var a in Palat) foreach (var b in Palat)
            {
                if (Math.Abs(a.MaxE - b.MinE) < ViivaToleranssiM) e.Add(a.MaxE);
                if (Math.Abs(a.MaxN - b.MinN) < ViivaToleranssiM) n.Add(a.MaxN);
            }
            e.Sort(); n.Sort();
            int Viiva(float x, List<double> l)
            {
                int i = l.BinarySearch(x); if (i < 0) i = ~i;
                if (i < l.Count && Math.Abs(l[i] - x) < ViivaToleranssiM) return i;
                if (i > 0 && Math.Abs(l[i - 1] - x) < ViivaToleranssiM) return i - 1;
                return -1;
            }
            var juuri = new int[Karkia];
            for (int i = 0; i < Karkia; i++) juuri[i] = i;
            int Etsi(int x) { while (juuri[x] != x) { juuri[x] = juuri[juuri[x]]; x = juuri[x]; } return x; }
            void Yhdista(int a, int b) { a = Etsi(a); b = Etsi(b); if (a != b) juuri[b] = a; }
            foreach (var p in Palat)
                for (int i = 0; i + 2 < p.In; i += 3)
                {
                    int a = p.K0 + Indeksi(p.I0 + i);
                    Yhdista(a, p.K0 + Indeksi(p.I0 + i + 1)); Yhdista(a, p.K0 + Indeksi(p.I0 + i + 2));
                }
            var lohkot = new Dictionary<(int, int, long), int>();
            for (int k = 0; k < Karkia; k++)
            {
                var v = Karki(k);
                int ve = Viiva(v.E, e), vn = Viiva(v.N, n);
                if (ve >= 0) { var avain = (0, ve, (long)Math.Floor(v.N / ViivaLohkoM)); if (lohkot.TryGetValue(avain, out var m)) Yhdista(m, k); else lohkot[avain] = k; }
                if (vn >= 0) { var avain = (1, vn, (long)Math.Floor(v.E / ViivaLohkoM)); if (lohkot.TryGetValue(avain, out var m)) Yhdista(m, k); else lohkot[avain] = k; }
            }
            var ala = new Dictionary<int, double>();
            foreach (var p in Palat)
                for (int i = 0; i + 2 < p.In; i += 3)
                {
                    int ia = p.K0 + Indeksi(p.I0 + i);
                    var ka = Karki(ia); var kb = Karki(p.K0 + Indeksi(p.I0 + i + 1)); var kc = Karki(p.K0 + Indeksi(p.I0 + i + 2));
                    int r = Etsi(ia);
                    ala[r] = (ala.TryGetValue(r, out var s) ? s : 0) + Math.Abs((kb.E - ka.E) * (kc.N - ka.N) - (kc.E - ka.E) * (kb.N - ka.N)) * 0.5;
                }
            var tulos = new bool[Palat.Length][];
            for (int pi = 0; pi < Palat.Length; pi++)
            {
                var p = Palat[pi]; tulos[pi] = new bool[p.In / 3];
                for (int i = 0; i + 2 < p.In; i += 3)
                    if (ala[Etsi(p.K0 + Indeksi(p.I0 + i))] < PieniVesiM2) { tulos[pi][i / 3] = true; Pudotettuja++; }
            }
            return tulos;
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
                if (pois[pala][i / 3]) continue;
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
                    if (pois[pi][i / 3]) continue;
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
