// TAVLI (kreikkalainen backgammon), v1 = PORTES (perus-backgammon), yksi erä (Siirtoseppä 5.10.2026).
// Kummallakin 15 nappulaa, 24 pistettä, kaksi noppaa (tuplat = neljä siirtoa). Lyöty yksinäinen (blot) menee palkille ja
// on tuotava sisään ennen muita siirtoja. Piste on suljettu, kun siinä on vähintään 2 vastustajan nappulaa. Poisto vasta,
// kun kaikki 15 ovat kotialueella (tai jo poistettu): tarkka silmäluku poistaa, suurempi poistaa kauimmaisen vain jos
// kauempana ei ole omia. PAKKOSÄÄNNÖT: on käytettävä mahdollisimman monta noppaa; jos vain toisen voi käyttää, suurempi
// (jos mahdollista). Voittaja poistaa ensin kaikki 15. Mars (gammon) ja backgammon kirjataan tiedoksi (Voittolaji),
// ei pisteytystä.
//
// PISTEIDEN INDEKSOINTI (UI kytkee pisteet a0–a23 laudan mittoihin):
//   a0 = oikea alakulma, a11 = vasen alakulma, a12 = vasen yläkulma, a23 = oikea yläkulma
//   (alarivi oikealta vasemmalle a0…a11, ylärivi vasemmalta oikealle a12…a23).
//   Pelaaja 0 = VAALEA: liikkuu pisteistä a23 → a0, koti a0–a5 (oikea alanurkka); palkilta sisään pisteisiin a23–a18
//     (noppa d → a(24 − d)); poistossa etäisyys pisteestä a(i) on i + 1.
//   Pelaaja 1 = TUMMA: liikkuu a0 → a23, koti a18–a23 (oikea ylänurkka); palkilta sisään pisteisiin a0–a5
//     (noppa d → a(d − 1)); poistossa etäisyys pisteestä a(i) on 24 − i.
//   Alkuasetelma (standardi): vaalea a23:2, a12:5, a7:3, a5:5; tumma a0:2, a11:5, a16:3, a18:5. Pip 167 kummallakin.
//   Askeleen erikoispisteet: Mista = Palkki (24) = palkilta sisään, Mihin = Pois (25) = poisto.
//
// VUORON KULKU (UI): Heita / AsetaHeitto → LaillisetAskeleet → TeeAskel (PeruAskel) … kunnes LaillisetAskeleet on tyhjä
// → LopetaVuoro. Botti ja testit: LaillisetVuorot → TeeVuoro (askeleet + LopetaVuoro). Askel kerrallaan -eteneminen
// tarjoaa vain askeleita, joista päästään johonkin lailliseen kokonaiseen vuoroon (pakkosäännöt pysyvät voimassa).
// Puhdas C# (ei UnityEngineä): Peli-testit ajaa säännöt, todennäköisyydet ja botin (TavliBotti.cs) ilman editoria.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Matkakirja.Peli.Pelit
{
    /// <summary>Yksi askel: nappula pisteestä Mista (tai Palkki) pisteeseen Mihin (tai Pois) nopalla Noppa; Lyonti = kohteessa
    /// oli vastustajan yksinäinen, joka meni palkille.</summary>
    public readonly struct TavliAskel : IEquatable<TavliAskel>
    {
        public readonly sbyte Mista, Mihin, Noppa;
        public readonly bool Lyonti;
        public TavliAskel(int mista, int mihin, int noppa, bool lyonti = false) { Mista = (sbyte)mista; Mihin = (sbyte)mihin; Noppa = (sbyte)noppa; Lyonti = lyonti; }
        public bool Palkilta => Mista == Tavli.Palkki;
        public bool Poisto => Mihin == Tavli.Pois;
        public bool Equals(TavliAskel o) => Mista == o.Mista && Mihin == o.Mihin && Noppa == o.Noppa && Lyonti == o.Lyonti;
        public override bool Equals(object o) => o is TavliAskel s && Equals(s);
        public override int GetHashCode() => ((Mista * 32 + Mihin) * 8 + Noppa) * 2 + (Lyonti ? 1 : 0);
        public override string ToString() => Tavli.PisteenNimi(Mista) + "→" + Tavli.PisteenNimi(Mihin) + " (" + Noppa + ")" + (Lyonti ? " ×" : "");
    }

    /// <summary>Asematiiviste: laudan ja palkkien tarkka pakkaus (5 bittiä/piste + palkki 4 bittiä), ei törmäyksiä.
    /// Poistetut seuraavat (15 − laudalla − palkilla). Vuoroa ei ole mukana (saman vuoron sisäinen vertailu).</summary>
    public readonly struct TavliAvain : IEquatable<TavliAvain>
    {
        public readonly ulong A, B;
        public TavliAvain(ulong a, ulong b) { A = a; B = b; }
        public bool Equals(TavliAvain o) => A == o.A && B == o.B;
        public override bool Equals(object o) => o is TavliAvain k && Equals(k);
        public override int GetHashCode() => unchecked((A * 0x9E3779B97F4A7C15UL ^ B).GetHashCode());
    }

    /// <summary>Kokonainen vuoro: askeleet järjestyksessä ja lopputilan tiiviste (deduplikointi).</summary>
    public sealed class TavliVuoro
    {
        public readonly TavliAskel[] Askeleet;
        public readonly TavliAvain Lopputila;
        public TavliVuoro(TavliAskel[] askeleet, TavliAvain lopputila) { Askeleet = askeleet; Lopputila = lopputila; }
        public int Pituus => Askeleet.Length;
        public override string ToString() => Askeleet.Length == 0 ? "ei siirtoa" : string.Join(", ", Askeleet);
    }

    public sealed class Tavli
    {
        public const int Pisteita = 24, Nappuloita = 15, Palkki = 24, Pois = 25;
        /// <summary>Alkuasetelma Asemasta-muodossa (pisteet a0…a23: + vaalea, − tumma | palkit | vuoro).</summary>
        public const string Alkuasema = "-2,0,0,0,0,5,0,3,0,0,0,-5,5,0,0,0,-3,0,-5,0,0,0,0,2|0,0|0";

        // Lauta etumerkillisenä: + = vaalean (0) nappulat, − = tumman (1). Botti käyttää kenttiä suoraan (sama kokoonpano).
        internal readonly sbyte[] lauta = new sbyte[Pisteita];
        internal readonly int[] palkki = new int[2], pois = new int[2];
        int vuoro, noppa1, noppa2, maksimi;
        bool heitetty;
        readonly List<int> jaljella = new List<int>();
        readonly List<TavliAskel> tehdyt = new List<TavliAskel>();
        List<TavliVuoro> vuorot = new List<TavliVuoro>();
        readonly HashSet<TavliAvain> loput = new HashSet<TavliAvain>();
        readonly Stack<(TavliAskel[] Askeleet, int N1, int N2)> historia = new Stack<(TavliAskel[], int, int)>();

        /// <summary>Uusi erä alkuasetelmasta; aloittaja heittää ensin (UI voi ratkaista aloittajan yhden nopan heitoilla).</summary>
        public Tavli(int aloittaja = 0) { Lue(Alkuasema); vuoro = aloittaja; }
        Tavli(bool tyhja) { }

        // ---------- Asema merkkijonona ----------

        /// <summary>Asema merkkijonosta (testit, tallennus, opetustehtävät): "p0,…,p23|palkki0,palkki1|vuoro", jossa pisteen
        /// luku on + vaalean ja − tumman nappuloita. Poistetut = 15 − laudalla − palkilla. Ei heittoa, historia tyhjä.</summary>
        public static Tavli Asemasta(string asema)
        {
            var t = new Tavli(true);
            t.Lue(asema);
            return t;
        }

        void Lue(string asema)
        {
            var osat = (asema ?? "").Split('|');
            if (osat.Length != 3) throw new ArgumentException("muoto: pisteet|palkki0,palkki1|vuoro");
            var p = osat[0].Split(',');
            if (p.Length != Pisteita) throw new ArgumentException("24 pistettä");
            var b = osat[1].Split(',');
            palkki[0] = Luku(b[0]); palkki[1] = Luku(b[1]);
            int[] laudalla = new int[2];
            for (int i = 0; i < Pisteita; i++)
            {
                int n = Luku(p[i]);
                if (n < -Nappuloita || n > Nappuloita) throw new ArgumentException("pisteessä enintään 15");
                lauta[i] = (sbyte)n;
                if (n > 0) laudalla[0] += n; else laudalla[1] -= n;
            }
            for (int q = 0; q < 2; q++)
            {
                pois[q] = Nappuloita - laudalla[q] - palkki[q];
                if (pois[q] < 0) throw new ArgumentException("yli 15 nappulaa pelaajalla " + q);
            }
            vuoro = Luku(osat[2]);
            if (vuoro != 0 && vuoro != 1) throw new ArgumentException("vuoro 0 tai 1");
        }

        static int Luku(string s) => int.Parse(s.Trim().Replace('\u2212', '-'), NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture);

        /// <summary>Asema samassa muodossa kuin Asemasta (ASCII-miinus kulttuurista riippumatta).</summary>
        public string Asema()
        {
            var sb = new StringBuilder();
            for (int i = 0; i < Pisteita; i++) { if (i > 0) sb.Append(','); sb.Append(((int)lauta[i]).ToString(CultureInfo.InvariantCulture)); }
            sb.Append('|').Append(palkki[0]).Append(',').Append(palkki[1]).Append('|').Append(vuoro);
            return sb.ToString();
        }

        /// <summary>Kopio laudasta ja vuorosta ilman heittoa ja historiaa (botin haku taustasäikeessä).</summary>
        public Tavli Kopio() => Asemasta(Asema());

        // ---------- Tila (UI) ----------

        public int Vuorossa => vuoro;
        /// <summary>Pisteen omistaja: 0, 1 tai −1 (tyhjä).</summary>
        public int Omistaja(int piste) => lauta[piste] > 0 ? 0 : lauta[piste] < 0 ? 1 : -1;
        /// <summary>Nappuloiden määrä pisteessä (omistajasta riippumatta).</summary>
        public int Maara(int piste) => Math.Abs(lauta[piste]);
        public int Palkilla(int pelaaja) => palkki[pelaaja];
        public int Poistettu(int pelaaja) => pois[pelaaja];
        public bool Heitetty => heitetty;
        public int Noppa1 => noppa1;
        public int Noppa2 => noppa2;
        /// <summary>Käyttämättömät silmäluvut (suurin ensin; tuplissa neljä).</summary>
        public IReadOnlyList<int> Jaljella => jaljella;
        /// <summary>Tämän vuoron jo tehdyt askeleet.</summary>
        public IReadOnlyList<TavliAskel> TehdytAskeleet => tehdyt;
        /// <summary>Montako askelta lailliseen kokonaiseen vuoroon kuuluu tällä heitolla (pakkosääntö; 0 = ei siirtoja).
        /// Erän päättävä vuoro voi jäädä lyhyemmäksi (nappulat loppuvat).</summary>
        public int AskeleitaVuorossa => maksimi;
        /// <summary>Päättyneiden vuorojen määrä.</summary>
        public int Siirtoja => historia.Count;

        /// <summary>Pelaajan pip-luku: kunkin nappulan etäisyys poistoon (palkilla 25).</summary>
        public int Pip(int pelaaja)
        {
            int s = 25 * palkki[pelaaja];
            for (int i = 0; i < Pisteita; i++) s += Omat(pelaaja, i) * Etaisyys(pelaaja, i);
            return s;
        }

        /// <summary>Pisteen etäisyys poistoon pelaajan suunnassa (vaalea: i + 1, tumma: 24 − i).</summary>
        public static int Etaisyys(int pelaaja, int piste) => pelaaja == 0 ? piste + 1 : 24 - piste;
        public static bool KotiPiste(int pelaaja, int piste) => pelaaja == 0 ? piste <= 5 : piste >= 18;
        /// <summary>Palkilta sisääntulon kohde nopalla (vaalea a(24 − d), tumma a(d − 1)).</summary>
        public static int Sisaantulopiste(int pelaaja, int noppa) => pelaaja == 0 ? 24 - noppa : noppa - 1;
        public static string PisteenNimi(int piste) => piste == Palkki ? "palkki" : piste == Pois ? "pois" : "a" + piste;

        // ---------- Säännöt (sisäiset; botti käyttää samoja) ----------

        internal int Omat(int p, int x) { int n = lauta[x]; return p == 0 ? (n > 0 ? n : 0) : (n < 0 ? -n : 0); }
        /// <summary>Onko piste suljettu pelaajalle p (vastustajalla ≥ 2).</summary>
        internal bool Suljettu(int p, int x) => Omat(1 - p, x) >= 2;

        internal static int Kohde(int p, int mista, int d)
        {
            int x = mista == Palkki ? (p == 0 ? 24 : -1) : mista;
            int k = p == 0 ? x - d : x + d;
            return k < 0 || k > 23 ? Pois : k;
        }

        internal bool KaikkiKotona(int p)
        {
            if (palkki[p] > 0) return false;
            int n = pois[p];
            if (p == 0) { for (int x = 0; x <= 5; x++) n += Omat(0, x); }
            else { for (int x = 18; x <= 23; x++) n += Omat(1, x); }
            return n == Nappuloita;
        }

        /// <summary>Onko pelaajalla nappuloita pistettä kauempana poistosta (kotialueella).</summary>
        bool KauempanaOmia(int p, int x)
        {
            if (p == 0) { for (int y = x + 1; y <= 5; y++) if (Omat(0, y) > 0) return true; }
            else { for (int y = x - 1; y >= 18; y--) if (Omat(1, y) > 0) return true; }
            return false;
        }

        /// <summary>Yksittäiset lailliset askeleet nopalla d (ei pakkosääntöjä). Tyhjentää listan.</summary>
        internal void Askeleet(int p, int d, List<TavliAskel> ulos)
        {
            ulos.Clear();
            int vast = 1 - p;
            if (palkki[p] > 0)
            {
                int e = Sisaantulopiste(p, d);
                if (!Suljettu(p, e)) ulos.Add(new TavliAskel(Palkki, e, d, Omat(vast, e) == 1));
                return;
            }
            bool kotona = KaikkiKotona(p);
            for (int x = 0; x < Pisteita; x++)
            {
                if (Omat(p, x) == 0) continue;
                int k = Kohde(p, x, d);
                if (k == Pois)
                {
                    if (!kotona) continue;
                    int e = Etaisyys(p, x);
                    if (e == d || (e < d && !KauempanaOmia(p, x))) ulos.Add(new TavliAskel(x, Pois, d));
                }
                else if (!Suljettu(p, k)) ulos.Add(new TavliAskel(x, k, d, Omat(vast, k) == 1));
            }
        }

        internal void Siirra(int p, TavliAskel s)
        {
            sbyte m = (sbyte)(p == 0 ? 1 : -1);
            if (s.Mista == Palkki) palkki[p]--; else lauta[s.Mista] -= m;
            if (s.Mihin == Pois) pois[p]++;
            else
            {
                if (s.Lyonti) { lauta[s.Mihin] = 0; palkki[1 - p]++; }
                lauta[s.Mihin] += m;
            }
        }

        internal void Palauta(int p, TavliAskel s)
        {
            sbyte m = (sbyte)(p == 0 ? 1 : -1);
            if (s.Mihin == Pois) pois[p]--;
            else
            {
                lauta[s.Mihin] -= m;
                if (s.Lyonti) { lauta[s.Mihin] = (sbyte)-m; palkki[1 - p]--; }
            }
            if (s.Mista == Palkki) palkki[p]++; else lauta[s.Mista] += m;
        }

        /// <summary>Asematiiviste nykyisestä laudasta.</summary>
        public TavliAvain Avain()
        {
            ulong a = 0, b = 0;
            for (int i = 0; i < 12; i++) a |= (ulong)((lauta[i] + 16) & 31) << (5 * i);
            for (int i = 0; i < 12; i++) b |= (ulong)((lauta[12 + i] + 16) & 31) << (5 * i);
            a |= (ulong)(palkki[0] & 15) << 60;
            b |= (ulong)(palkki[1] & 15) << 60;
            return new TavliAvain(a, b);
        }

        // ---------- Kokonaisten vuorojen generointi ----------

        readonly List<TavliAskel>[] tasot = { new List<TavliAskel>(), new List<TavliAskel>(), new List<TavliAskel>(), new List<TavliAskel>() };
        readonly TavliAskel[] polku = new TavliAskel[4];
        readonly HashSet<(TavliAvain, int)> kayty = new HashSet<(TavliAvain, int)>();
        readonly List<(TavliAvain Avain, TavliAskel[] Polku, int Pituus)> lehdet = new List<(TavliAvain, TavliAskel[], int)>();
        int[] nopat;

        /// <summary>Kaikki lailliset kokonaiset vuorot pelaajalle p heitolla (a, b) pakkosäännöillä; samaan lopputilaan
        /// johtavat yhdistetty (asematiiviste). Ei siirtoja → yksi tyhjä vuoro. Palauttaa askelten määrän (0–4).
        /// Ei muuta lautaa (tekee ja peruu).</summary>
        internal int Generoi(int p, int a, int b, List<TavliVuoro> ulos)
        {
            ulos.Clear(); kayty.Clear(); lehdet.Clear();
            nopat = a == b ? new[] { a, a, a, a } : new[] { a, b };
            Syvenna(p, 0, 0);
            int m = 0;
            foreach (var l in lehdet) if (l.Pituus > m) m = l.Pituus;
            int suuri = Math.Max(a, b);
            bool suuriSaanto = false;
            if (m == 1 && a != b) foreach (var l in lehdet) if (l.Pituus == 1 && l.Polku.Length == 1 && l.Polku[0].Noppa == suuri) { suuriSaanto = true; break; }
            var nahty = new HashSet<TavliAvain>();
            foreach (var l in lehdet)
            {
                if (l.Pituus != m) continue;
                if (suuriSaanto && l.Polku.Length == 1 && l.Polku[0].Noppa != suuri) continue;
                if (nahty.Add(l.Avain)) ulos.Add(new TavliVuoro(l.Polku, l.Avain));
            }
            return m;
        }

        void Syvenna(int p, int syv, int kaytetty)
        {
            bool jokin = false;
            bool tuplat = nopat.Length == 4;
            for (int i = 0; i < nopat.Length; i++)
            {
                if ((kaytetty & (1 << i)) != 0) continue;
                var lista = tasot[syv];
                Askeleet(p, nopat[i], lista);
                foreach (var s in lista)
                {
                    jokin = true;
                    Siirra(p, s);
                    polku[syv] = s;
                    int k = kaytetty | (1 << i);
                    if (kayty.Add((Avain(), k))) Syvenna(p, syv + 1, k);
                    Palauta(p, s);
                }
                if (tuplat) break; // tuplissa noppien järjestyksellä ei ole väliä
            }
            if (!jokin)
            {
                var pol = new TavliAskel[syv];
                Array.Copy(polku, pol, syv);
                // Erän päättävä poisto on aina täysi vuoro (nappulat loppuivat, ei noppien hukkaamista).
                lehdet.Add((Avain(), pol, pois[p] == Nappuloita ? nopat.Length : syv));
            }
        }

        // ---------- Vuoron kulku (UI) ----------

        /// <summary>Heittää kaksi noppaa Satunnainen-lähteestä ja aloittaa vuoron.</summary>
        public void Heita(Satunnainen sat)
        {
            int a = 1 + (int)(sat.Seuraava() * 6), b = 1 + (int)(sat.Seuraava() * 6);
            AsetaHeitto(a, b);
        }

        /// <summary>Annettu heitto (testit, verkkopeli): laskee lailliset kokonaiset vuorot.</summary>
        public void AsetaHeitto(int a, int b)
        {
            if (heitetty) throw new InvalidOperationException("jo heitetty");
            if (Lopputulos().HasValue) throw new InvalidOperationException("erä päättynyt");
            if (a < 1 || a > 6 || b < 1 || b > 6) throw new ArgumentException("noppa 1–6");
            noppa1 = a; noppa2 = b; heitetty = true;
            jaljella.Clear();
            if (a == b) { for (int i = 0; i < 4; i++) jaljella.Add(a); }
            else { jaljella.Add(Math.Max(a, b)); jaljella.Add(Math.Min(a, b)); }
            tehdyt.Clear();
            vuorot = new List<TavliVuoro>();
            maksimi = Generoi(vuoro, a, b, vuorot);
            loput.Clear();
            foreach (var v in vuorot) loput.Add(v.Lopputila);
        }

        /// <summary>Heiton lailliset kokonaiset vuorot (deduplikoitu). Ei siirtoja → yksi tyhjä vuoro.</summary>
        public List<TavliVuoro> LaillisetVuorot()
        {
            if (!heitetty) throw new InvalidOperationException("heitä ensin");
            return new List<TavliVuoro>(vuorot);
        }

        /// <summary>Lailliset seuraavat askeleet nykyisestä välitilasta: vain ne, joista päästään johonkin lailliseen
        /// kokonaiseen vuoroon. Tyhjä = vuoro valmis (LopetaVuoro). Saman lähteen ja kohteen askel voi esiintyä kahdella
        /// nopalla (esim. poisto 5:llä tai 6:lla); EtsiAskel valitsee pienimmän.</summary>
        public void LaillisetAskeleet(List<TavliAskel> ulos)
        {
            ulos.Clear();
            if (!heitetty || Lopputulos().HasValue || tehdyt.Count >= maksimi) return;
            muisti.Clear();
            var lista = new List<TavliAskel>();
            foreach (int d in Erilaiset())
            {
                Askeleet(vuoro, d, lista);
                foreach (var s in lista)
                {
                    Siirra(vuoro, s); jaljella.Remove(d);
                    bool ok = Saavuttaa(tehdyt.Count + 1);
                    LisaaJaljella(d); Palauta(vuoro, s);
                    if (ok) ulos.Add(s);
                }
            }
        }

        int[] Erilaiset()
        {
            var e = new List<int>();
            foreach (int d in jaljella) if (!e.Contains(d)) e.Add(d);
            return e.ToArray();
        }

        void LisaaJaljella(int d)
        {
            jaljella.Add(d);
            jaljella.Sort((x, y) => y.CompareTo(x));
        }

        /// <summary>Välitilan tulos (asema + jäljellä olevat nopat) yhden LaillisetAskeleet-kutsun ajan: tuplissa sama
        /// välitila toistuu monessa järjestyksessä.</summary>
        readonly Dictionary<(TavliAvain, int), bool> muisti = new Dictionary<(TavliAvain, int), bool>();

        bool Saavuttaa(int syv)
        {
            if (syv == maksimi || pois[vuoro] == Nappuloita) return loput.Contains(Avain());
            int jSumma = 0;
            foreach (int d in jaljella) jSumma += d;
            var avain = (Avain(), jSumma * 8 + syv);
            if (muisti.TryGetValue(avain, out bool tulos)) return tulos;
            tulos = SaavuttaaHaku(syv);
            muisti[avain] = tulos;
            return tulos;
        }

        bool SaavuttaaHaku(int syv)
        {
            var lista = new List<TavliAskel>();
            foreach (int d in Erilaiset())
            {
                Askeleet(vuoro, d, lista);
                foreach (var s in lista)
                {
                    Siirra(vuoro, s); jaljella.Remove(d);
                    bool ok = Saavuttaa(syv + 1);
                    LisaaJaljella(d); Palauta(vuoro, s);
                    if (ok) return true;
                }
            }
            return false;
        }

        /// <summary>Laillinen askel lähteestä kohteeseen (pienin sopiva noppa) tai null. UI: napautus nappulaan + kohteeseen.</summary>
        public TavliAskel? EtsiAskel(int mista, int mihin)
        {
            var l = new List<TavliAskel>();
            LaillisetAskeleet(l);
            TavliAskel? paras = null;
            foreach (var s in l)
                if (s.Mista == mista && s.Mihin == mihin && (paras == null || s.Noppa < paras.Value.Noppa)) paras = s;
            return paras;
        }

        /// <summary>Tekee laillisen askeleen (vertailu: Mista, Mihin, Noppa; lyönti päätellään). Palauttaa tehdyn askeleen.</summary>
        public TavliAskel TeeAskel(TavliAskel askel)
        {
            var l = new List<TavliAskel>();
            LaillisetAskeleet(l);
            foreach (var s in l)
            {
                if (s.Mista != askel.Mista || s.Mihin != askel.Mihin || s.Noppa != askel.Noppa) continue;
                Siirra(vuoro, s);
                tehdyt.Add(s);
                jaljella.Remove(s.Noppa);
                return s;
            }
            throw new InvalidOperationException("laiton askel " + askel);
        }

        /// <summary>Peruu tämän vuoron viimeisimmän askeleen.</summary>
        public void PeruAskel()
        {
            if (tehdyt.Count == 0) throw new InvalidOperationException("ei askelta peruttavana");
            var s = tehdyt[tehdyt.Count - 1];
            tehdyt.RemoveAt(tehdyt.Count - 1);
            Palauta(vuoro, s);
            LisaaJaljella(s.Noppa);
        }

        /// <summary>Vuoro valmis: heitetty ja laillisia askeleita ei enää ole (laillinen kokonainen vuoro tehty).</summary>
        public bool VoiLopettaa()
        {
            if (!heitetty) return false;
            var l = new List<TavliAskel>();
            LaillisetAskeleet(l);
            return l.Count == 0;
        }

        /// <summary>Päättää vuoron ja vaihtaa pelaajan.</summary>
        public void LopetaVuoro()
        {
            if (!VoiLopettaa()) throw new InvalidOperationException("vuoro kesken");
            Paata();
        }

        void Paata()
        {
            historia.Push((tehdyt.ToArray(), noppa1, noppa2));
            tehdyt.Clear(); jaljella.Clear(); loput.Clear();
            vuorot = new List<TavliVuoro>();
            heitetty = false; maksimi = 0;
            vuoro = 1 - vuoro;
        }

        /// <summary>Tekee kokonaisen laillisen vuoron (LaillisetVuorot-listasta) ja vaihtaa pelaajan.</summary>
        public void TeeVuoro(TavliVuoro v)
        {
            if (!heitetty || tehdyt.Count > 0) throw new InvalidOperationException("vuoro jo aloitettu tai heittämättä");
            if (!loput.Contains(v.Lopputila)) throw new InvalidOperationException("laiton vuoro " + v);
            foreach (var s in v.Askeleet) { Siirra(vuoro, s); tehdyt.Add(s); }
            Paata();
        }

        /// <summary>Peruu edellisen päättyneen vuoron (kumoa): ensin hylkää kesken olevan vuoron askeleet ja heiton, sitten
        /// palauttaa edellisen pelaajan tilaan "heitetty, ei askeleita" samalla heitolla.</summary>
        public void PeruVuoro()
        {
            if (historia.Count == 0) throw new InvalidOperationException("ei vuoroa peruttavana");
            while (tehdyt.Count > 0) PeruAskel();
            heitetty = false;
            var (ask, n1, n2) = historia.Pop();
            vuoro = 1 - vuoro;
            for (int i = ask.Length - 1; i >= 0; i--) Palauta(vuoro, ask[i]);
            AsetaHeitto(n1, n2);
        }

        /// <summary>Voittaja 0/1 (kaikki 15 poistettu) tai null = kesken.</summary>
        public int? Lopputulos() => pois[0] == Nappuloita ? 0 : pois[1] == Nappuloita ? 1 : (int?)null;

        /// <summary>Voiton laji tiedoksi: 1 = tavallinen, 2 = mars (häviäjä ei poistanut yhtään), 3 = backgammon (mars ja
        /// häviäjällä nappula palkilla tai voittajan kotialueella). 0 = kesken. Ei pisteytystä (yksi erä).</summary>
        public int Voittolaji()
        {
            var v = Lopputulos();
            if (v == null) return 0;
            int h = 1 - v.Value;
            if (pois[h] > 0) return 1;
            if (palkki[h] > 0) return 3;
            for (int x = 0; x < Pisteita; x++) if (KotiPiste(v.Value, x) && Omat(h, x) > 0) return 3;
            return 2;
        }

        // ---------- Todennäköisyydet (oppimisen kärki; UI:n tilarivi) ----------

        /// <summary>Montako 36:sta heitosta ampujan nappula osuu kohdepisteeseen (suorat, yhdistelmät, tuplat). Välissä
        /// suljetut pisteet estävät yhdistelmän välilaskeutumisen. Palkilla olevan ampujan on ensin päästävä sisään: yksi
        /// palkilla → sisääntulo yhdellä nopalla, toinen noppa vapaa (myös sisään tulleelle); kaksi tai enemmän (ei tuplat)
        /// → vain sisääntulo voi osua; tuplissa sisääntulot vievät siirtoja ennen muita.
        /// YKSINKERTAISTUS: osuva siirto lasketaan, jos se on yksittäisinä askelina mahdollinen; vuoron muita pakkosääntöjä
        /// (esim. että osuman jälkeen pitäisi vielä pystyä käyttämään molemmat nopat) ei tarkisteta. Jos kohteessa on
        /// vähintään kaksi puolustajan tai yksikin ampujan oma nappula, tulos on 0.</summary>
        public static int OsumaTodennakoisyys(Tavli asema, int kohdepiste, int ampuja)
        {
            Span<int> lahdot = stackalloc int[Pisteita];
            int m = Lahdot(asema, kohdepiste, ampuja, lahdot);
            if (m < 0) return 0;
            int n = 0;
            for (int a = 1; a <= 6; a++)
                for (int b = a; b <= 6; b++)
                    if (Osuu(asema, kohdepiste, ampuja, a, b, lahdot.Slice(0, m))) n += a == b ? 1 : 2;
            return n;
        }

        /// <summary>Osuvat heitot koko 36 heiton luettelona (järjestetyt parit (noppa1, noppa2)); testit ja opetusnäkymä.</summary>
        public static List<(int, int)> OsuvatHeitot(Tavli asema, int kohdepiste, int ampuja)
        {
            var l = new List<(int, int)>();
            Span<int> lahdot = stackalloc int[Pisteita];
            int m = Lahdot(asema, kohdepiste, ampuja, lahdot);
            if (m < 0) return l;
            for (int a = 1; a <= 6; a++)
                for (int b = 1; b <= 6; b++)
                    if (Osuu(asema, kohdepiste, ampuja, Math.Min(a, b), Math.Max(a, b), lahdot.Slice(0, m))) l.Add((a, b));
            return l;
        }

        /// <summary>Laudalla olevat ampujan lähtöpisteet kohteen takana (kirjoittaa listaan, palauttaa määrän).
        /// −1 = ei osumia mahdollisia (kohde suljettu tai ampujan oma, tai ei ampujia laudalla eikä palkilla).</summary>
        static int Lahdot(Tavli t, int kohde, int ampuja, Span<int> ulos)
        {
            if (t.Omat(1 - ampuja, kohde) >= 2 || t.Omat(ampuja, kohde) > 0) return -1;
            int n = 0;
            for (int x = 0; x < Pisteita; x++) if (t.Omat(ampuja, x) > 0 && Matka(ampuja, x, kohde) > 0) ulos[n++] = x;
            return n == 0 && t.palkki[ampuja] == 0 ? -1 : n;
        }

        static bool Osuu(Tavli t, int kohde, int ampuja, int a, int b, ReadOnlySpan<int> lahdot)
        {
            int B = t.palkki[ampuja];
            if (a != b)
            {
                if (B >= 2) return Sisaantulopiste(ampuja, a) == kohde || Sisaantulopiste(ampuja, b) == kohde;
                if (B == 1)
                {
                    for (int k = 0; k < 2; k++)
                    {
                        int sis = k == 0 ? a : b, muu = k == 0 ? b : a;
                        int e = Sisaantulopiste(ampuja, sis);
                        if (t.Suljettu(ampuja, e)) continue;
                        if (e == kohde) return true;
                        if (Matka(ampuja, e, kohde) == muu) return true;
                        foreach (int x in lahdot) if (Matka(ampuja, x, kohde) == muu) return true;
                    }
                    return false;
                }
                foreach (int x in lahdot)
                {
                    int d = Matka(ampuja, x, kohde);
                    if (d == a || d == b) return true;
                    if (d == a + b && (!t.Suljettu(ampuja, Askella(ampuja, x, a)) || !t.Suljettu(ampuja, Askella(ampuja, x, b)))) return true;
                }
                return false;
            }
            int siirtoja = 4, sisaan = -100;
            if (B > 0)
            {
                int e = Sisaantulopiste(ampuja, a);
                if (t.Suljettu(ampuja, e)) return false;
                if (e == kohde) return true;
                if (B >= 4) return false;
                siirtoja -= B;
                sisaan = e;
            }
            for (int i = -1; i < lahdot.Length; i++)
            {
                int lahto = i < 0 ? sisaan : lahdot[i];
                if (lahto < 0) continue;
                int d = Matka(ampuja, lahto, kohde);
                if (d <= 0 || d % a != 0 || d / a > siirtoja) continue;
                bool auki = true;
                for (int k = 1; k < d / a && auki; k++) if (t.Suljettu(ampuja, Askella(ampuja, lahto, a * k))) auki = false;
                if (auki) return true;
            }
            return false;
        }

        /// <summary>Etäisyys lähteestä kohteeseen ampujan kulkusuunnassa (≤ 0 = kohde ei ole edessä).</summary>
        static int Matka(int ampuja, int lahto, int kohde) => ampuja == 0 ? lahto - kohde : kohde - lahto;
        static int Askella(int p, int x, int d) => p == 0 ? x - d : x + d;

        /// <summary>Sisääntulon onnistumiset 36:sta, kun k sisääntulopistettä on suljettu: 36 − k² (= 1 − (k/6)²).</summary>
        public static int SisaantuloTodennakoisyys(int suljettuja)
        {
            if (suljettuja < 0 || suljettuja > 6) throw new ArgumentOutOfRangeException(nameof(suljettuja));
            return 36 - suljettuja * suljettuja;
        }

        /// <summary>Montako pelaajan sisääntulopistettä (vastustajan kotialue) on suljettu.</summary>
        public int SuljetutSisaantulot(int pelaaja)
        {
            int n = 0;
            for (int d = 1; d <= 6; d++) if (Suljettu(pelaaja, Sisaantulopiste(pelaaja, d))) n++;
            return n;
        }

        /// <summary>Pelaajan yksinäiset nappulat ja montako 36:sta vastustajan heitosta osuu kuhunkin (pisteen mukaan).</summary>
        public List<(int Piste, int Osumat)> Yksinaiset(int pelaaja)
        {
            var l = new List<(int, int)>();
            for (int x = 0; x < Pisteita; x++)
                if (Omat(pelaaja, x) == 1) l.Add((x, OsumaTodennakoisyys(this, x, 1 - pelaaja)));
            return l;
        }

        /// <summary>Tilarivi pelaajalle: sisääntulo palkilta ja yksinäisten osumariski, esim.
        /// "Sisääntulo 27/36 (75 %) · a7 osuma 11/36 (31 %)". Tyhjä, jos ei kerrottavaa.</summary>
        public string Todennakoisyysrivi(int pelaaja)
        {
            var osat = new List<string>();
            if (palkki[pelaaja] > 0) osat.Add("Sisääntulo " + Murtoluku(SisaantuloTodennakoisyys(SuljetutSisaantulot(pelaaja))));
            foreach (var (piste, osumat) in Yksinaiset(pelaaja))
                if (osumat > 0) osat.Add(PisteenNimi(piste) + " osuma " + Murtoluku(osumat));
            return string.Join(" · ", osat);
        }

        public static string Murtoluku(int n36) => $"{n36}/36 ({(int)Math.Round(n36 * 100.0 / 36)} %)";
    }
}
