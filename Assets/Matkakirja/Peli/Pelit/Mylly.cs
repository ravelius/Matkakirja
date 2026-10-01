// MYLLY (Nine Men's Morris / Mühle / Mlin / Moara, pelikatalogi DEU-2; Siirtoseppä 1.10.2026).
// Lauta: kolme sisäkkäistä neliötä, 24 pistettä, 16 myllyriviä. Kummallakin 9 nappulaa.
//   1) Asetus: nappula kädestä tyhjään pisteeseen.
//   2) Siirto: viivaa pitkin viereiseen tyhjään pisteeseen.
//   3) Lento: kun omia nappuloita on enää 3 (ja käsi tyhjä), saa siirtyä mihin tahansa tyhjään pisteeseen.
// Uusi mylly (kolme omaa samalla rivillä, juuri siirretty nappula mukana) → poista yksi vastustajan nappula; myllyssä
// olevaa ei saa poistaa, ellei kaikki vastustajan nappulat ole myllyissä. Siirto ja poisto ovat YKSI siirto
// (MyllySiirto.Poista), joten botin haku ja peruutus pysyvät yksinkertaisina.
// Peli päättyy: vastustajalle jää alle 3 nappulaa (käsi + lauta), tai vuorossa olevalla ei ole laillista siirtoa (häviö).
// Tasapeli: 50 siirtoa kummallekin (100 puolisiirtoa) asetusvaiheen jälkeen ilman poistoa (yleinen turnaussääntö;
// varmistaa, että peli ja botin haku päättyvät).
//
// Pisteiden numerointi (x, y ruudukossa 0–6): ulkoneliö 0–7, keskineliö 8–15, sisäneliö 16–23, kukin myötäpäivään
// vasemmasta yläkulmasta (0 = (0,0), 1 = (3,0), 2 = (6,0), 3 = (6,3), 4 = (6,6), 5 = (3,6), 6 = (0,6), 7 = (0,3)).
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli.Pelit
{
    /// <summary>Mihin = kohde; Mista = lähde (−1 = asetus kädestä); Poista = poistettava vastustajan piste (−1 = ei poistoa).</summary>
    public readonly struct MyllySiirto : IEquatable<MyllySiirto>
    {
        public readonly sbyte Mista, Mihin, Poista;
        public MyllySiirto(int mista, int mihin, int poista = -1) { Mista = (sbyte)mista; Mihin = (sbyte)mihin; Poista = (sbyte)poista; }
        public bool Asetus => Mista < 0;
        public bool Equals(MyllySiirto o) => Mista == o.Mista && Mihin == o.Mihin && Poista == o.Poista;
        public override bool Equals(object o) => o is MyllySiirto s && Equals(s);
        public override int GetHashCode() => (Mista + 1) * 676 + (Mihin + 1) * 26 + Poista + 1;
        public override string ToString() => (Asetus ? "" : Mista + "→") + Mihin + (Poista >= 0 ? " ×" + Poista : "");
    }

    public sealed class Mylly : IVuoropeli<MyllySiirto>
    {
        public const int Pisteita = 24, Nappuloita = 9, TasapeliRaja = 100;

        /// <summary>Pisteen (x, y) ruudukossa 0–6 (piirto ja testit).</summary>
        public static readonly (int X, int Y)[] Paikat =
        {
            (0,0),(3,0),(6,0),(6,3),(6,6),(3,6),(0,6),(0,3),
            (1,1),(3,1),(5,1),(5,3),(5,5),(3,5),(1,5),(1,3),
            (2,2),(3,2),(4,2),(4,3),(4,4),(3,4),(2,4),(2,3),
        };

        public static readonly int[][] Naapurit = LaskeNaapurit();
        public static readonly int[][] Myllyt =
        {
            new[] {0,1,2}, new[] {2,3,4}, new[] {4,5,6}, new[] {6,7,0},
            new[] {8,9,10}, new[] {10,11,12}, new[] {12,13,14}, new[] {14,15,8},
            new[] {16,17,18}, new[] {18,19,20}, new[] {20,21,22}, new[] {22,23,16},
            new[] {1,9,17}, new[] {3,11,19}, new[] {5,13,21}, new[] {7,15,23},
        };
        /// <summary>Kunkin pisteen kaksi myllyriviä (indeksit Myllyt-taulukkoon).</summary>
        static readonly int[][] PisteenMyllyt = LaskePisteenMyllyt();

        static int[][] LaskeNaapurit()
        {
            var n = new List<int>[Pisteita];
            for (int i = 0; i < Pisteita; i++) n[i] = new List<int>();
            void Liita(int a, int b) { n[a].Add(b); n[b].Add(a); }
            for (int r = 0; r < 3; r++) for (int i = 0; i < 8; i++) Liita(r * 8 + i, r * 8 + (i + 1) % 8);
            foreach (int k in new[] { 1, 3, 5, 7 }) { Liita(k, k + 8); Liita(k + 8, k + 16); }
            var t = new int[Pisteita][];
            for (int i = 0; i < Pisteita; i++) { n[i].Sort(); t[i] = n[i].ToArray(); }
            return t;
        }

        static int[][] LaskePisteenMyllyt()
        {
            var l = new List<int>[Pisteita];
            for (int i = 0; i < Pisteita; i++) l[i] = new List<int>();
            for (int m = 0; m < Myllyt.Length; m++) foreach (int p in Myllyt[m]) l[p].Add(m);
            var t = new int[Pisteita][];
            for (int i = 0; i < Pisteita; i++) t[i] = l[i].ToArray();
            return t;
        }

        readonly sbyte[] lauta = new sbyte[Pisteita];
        readonly int[] kadessa = { Nappuloita, Nappuloita };
        readonly int[] laudalla = new int[2];
        int vuoro, ilmanPoistoa;
        readonly Stack<(MyllySiirto Siirto, int IlmanPoistoa)> historia = new Stack<(MyllySiirto, int)>();

        public Mylly() { for (int i = 0; i < Pisteita; i++) lauta[i] = -1; }

        /// <summary>Asema merkkijonosta (testit, tallennus, opetustehtävät): 24 merkkiä '.', '0', '1' pisteiden järjestyksessä,
        /// kädessä olevat nappulat ja vuoro. Historia alkaa tyhjänä.</summary>
        public static Mylly Asemasta(string pisteet, int kadessa0, int kadessa1, int vuoro)
        {
            if (pisteet == null || pisteet.Length != Pisteita) throw new ArgumentException("24 merkkiä");
            var m = new Mylly { vuoro = vuoro };
            m.kadessa[0] = kadessa0; m.kadessa[1] = kadessa1;
            for (int i = 0; i < Pisteita; i++)
            {
                int o = pisteet[i] == '0' ? 0 : pisteet[i] == '1' ? 1 : -1;
                m.lauta[i] = (sbyte)o;
                if (o >= 0) m.laudalla[o]++;
            }
            return m;
        }

        /// <summary>Asema samassa muodossa kuin Asemasta (24 merkkiä).</summary>
        public string Asema()
        {
            var c = new char[Pisteita];
            for (int i = 0; i < Pisteita; i++) c[i] = lauta[i] < 0 ? '.' : (char)('0' + lauta[i]);
            return new string(c);
        }

        public int Vuorossa => vuoro;
        /// <summary>Pisteen omistaja: 0, 1 tai −1 (tyhjä).</summary>
        public int Nappula(int piste) => lauta[piste];
        public int Kadessa(int pelaaja) => kadessa[pelaaja];
        public int Laudalla(int pelaaja) => laudalla[pelaaja];
        public int Siirtoja => historia.Count;
        /// <summary>Saako pelaaja lentää (3 nappulaa laudalla, käsi tyhjä).</summary>
        public bool Lentaa(int pelaaja) => kadessa[pelaaja] == 0 && laudalla[pelaaja] == 3;
        public bool Asetusvaihe(int pelaaja) => kadessa[pelaaja] > 0;
        public MyllySiirto? Viimeisin => historia.Count > 0 ? historia.Peek().Siirto : (MyllySiirto?)null;

        /// <summary>Onko piste osa pelaajan valmista myllyä.</summary>
        public bool Myllyssa(int piste, int pelaaja)
        {
            foreach (int m in PisteenMyllyt[piste])
            {
                var r = Myllyt[m];
                if (lauta[r[0]] == pelaaja && lauta[r[1]] == pelaaja && lauta[r[2]] == pelaaja) return true;
            }
            return false;
        }

        /// <summary>Muodostaisiko pelaajan nappula pisteessä myllyn, kun lähde on tyhjennetty (lähde −1 = asetus).</summary>
        bool MuodostaaMyllyn(int kohde, int pelaaja, int lahde)
        {
            foreach (int m in PisteenMyllyt[kohde])
            {
                bool ok = true;
                foreach (int p in Myllyt[m])
                {
                    if (p == kohde) continue;
                    if (p == lahde || lauta[p] != pelaaja) { ok = false; break; }
                }
                if (ok) return true;
            }
            return false;
        }

        public void Siirrot(List<MyllySiirto> ulos)
        {
            ulos.Clear();
            if (Lopputulos().HasValue) return;
            int oma = vuoro;
            if (kadessa[oma] > 0)
            {
                for (int b = 0; b < Pisteita; b++) if (lauta[b] < 0) Lisaa(ulos, -1, b, oma);
                return;
            }
            bool lento = laudalla[oma] == 3;
            for (int a = 0; a < Pisteita; a++)
            {
                if (lauta[a] != oma) continue;
                if (lento) { for (int b = 0; b < Pisteita; b++) if (lauta[b] < 0) Lisaa(ulos, a, b, oma); }
                else foreach (int b in Naapurit[a]) if (lauta[b] < 0) Lisaa(ulos, a, b, oma);
            }
        }

        void Lisaa(List<MyllySiirto> ulos, int a, int b, int oma)
        {
            if (!MuodostaaMyllyn(b, oma, a)) { ulos.Add(new MyllySiirto(a, b)); return; }
            int vast = 1 - oma;
            bool kaikkiMyllyissa = true;
            for (int p = 0; p < Pisteita; p++) if (lauta[p] == vast && !Myllyssa(p, vast)) { kaikkiMyllyissa = false; break; }
            int lisatty = 0;
            for (int p = 0; p < Pisteita; p++)
            {
                if (lauta[p] != vast) continue;
                if (!kaikkiMyllyissa && Myllyssa(p, vast)) continue;
                ulos.Add(new MyllySiirto(a, b, p)); lisatty++;
            }
            if (lisatty == 0) ulos.Add(new MyllySiirto(a, b)); // vastustajalla ei nappuloita laudalla (asetusvaiheen alussa)
        }

        public void Tee(MyllySiirto s)
        {
            int oma = vuoro;
            historia.Push((s, ilmanPoistoa));
            if (s.Asetus) kadessa[oma]--;
            else { lauta[s.Mista] = -1; laudalla[oma]--; }
            lauta[s.Mihin] = (sbyte)oma; laudalla[oma]++;
            if (s.Poista >= 0) { lauta[s.Poista] = -1; laudalla[1 - oma]--; ilmanPoistoa = 0; }
            else if (kadessa[0] == 0 && kadessa[1] == 0) ilmanPoistoa++;
            vuoro = 1 - oma;
        }

        public void Peru()
        {
            var (s, ennen) = historia.Pop();
            int oma = 1 - vuoro;
            if (s.Poista >= 0) { lauta[s.Poista] = (sbyte)(1 - oma); laudalla[1 - oma]++; }
            lauta[s.Mihin] = -1; laudalla[oma]--;
            if (s.Asetus) kadessa[oma]++;
            else { lauta[s.Mista] = (sbyte)oma; laudalla[oma]++; }
            ilmanPoistoa = ennen;
            vuoro = oma;
        }

        public int? Lopputulos()
        {
            for (int p = 0; p < 2; p++) if (kadessa[p] + laudalla[p] < 3) return 1 - p;
            if (ilmanPoistoa >= TasapeliRaja) return -1;
            int oma = vuoro;
            if (kadessa[oma] > 0 || laudalla[oma] == 3) return null; // asetus tai lento: aina tyhjä piste jäljellä
            for (int a = 0; a < Pisteita; a++)
                if (lauta[a] == oma) foreach (int b in Naapurit[a]) if (lauta[b] < 0) return null;
            return 1 - oma; // jumissa
        }

        /// <summary>Heuristiikka (pelaajan näkökulmasta): nappulat (käsi + lauta), valmiit myllyt, avoimet kaksoset
        /// (kaksi omaa + tyhjä rivissä), liikkuvuus ja jumissa olevat nappulat siirtovaiheessa.</summary>
        public int Arvio(int pelaaja)
        {
            int vast = 1 - pelaaja;
            int arvo = 100 * ((kadessa[pelaaja] + laudalla[pelaaja]) - (kadessa[vast] + laudalla[vast]));
            foreach (var r in Myllyt)
            {
                int o = 0, v = 0, t = 0;
                foreach (int p in r) { if (lauta[p] == pelaaja) o++; else if (lauta[p] == vast) v++; else t++; }
                if (o == 3) arvo += 12; else if (v == 3) arvo -= 12;
                if (o == 2 && t == 1) arvo += 8; else if (v == 2 && t == 1) arvo -= 8;
            }
            if (kadessa[pelaaja] == 0 && laudalla[pelaaja] > 3) arvo += 3 * Liikkuvuus(pelaaja);
            if (kadessa[vast] == 0 && laudalla[vast] > 3) arvo -= 3 * Liikkuvuus(vast);
            return arvo;
        }

        int Liikkuvuus(int pelaaja)
        {
            int n = 0;
            for (int a = 0; a < Pisteita; a++)
                if (lauta[a] == pelaaja) foreach (int b in Naapurit[a]) if (lauta[b] < 0) n++;
            return n;
        }
    }
}
