// ELÄVÄN KAUPUNGIN PAIKKAÄÄNET (Linssiseppä 9.10.2026; PT junaan 173, Pelikoodarin aanet/pallo-kaupunki-v1, Ydin PalloKaupunkiAanet):
// puhdas logiikka, joka päättää kehys kerrallaan kameran paikasta (paketin ENU, korkeus maasta), paikallisesta kellosta ja OSM-pisteistä
// (elava-<id>.json: tyokalut/elava_aanipisteet.py ja elava_ihmiset.py), mitä soi. Unity (ElavaKaupunki) soittaa kerta-äänet
// 3D-poolista, suihkulähteet 3D-silmukoina ja taustat 2D-stereona. Kaikki valinnat siemenestä (deterministinen, testit toistuvat).
//  KIRKONKELLOT: lähin kirkko alle KirkkoLahinM ja kamera alle KorkeusRajaM (sama kuin IHMISET); väli KelloValiMinS–KelloValiMaxS ja
//    lisäksi kerran tasatunnin jälkeen (paikallinen kello; KaupunkiAanimaisemaSoitin lyö ensin tunnin lyönnit, heiluvat kellot alkavat
//    LyontienJalkeenS:n päästä, ettei päällekkäin). Ei samaa näytettä peräkkäin; taso täysi KirkkoTaysiM, hiljaa KirkkoHiljaM (3D).
//  SUIHKULÄHTEET: enintään SuihkujaEnintaan lähintä alle SuihkuM:n soivat silmukkana pisteessä (iso/pieni pisteen siemenestä);
//    valinnan vaihtuessa häivytys SuihkuHaivytysS lineaarisesti sisään ja ulos (ei hyppyä).
//  KAHVILAT: kamera alle KorkeusRajaM ja kahviloita ≥ KahvilaVahintaan alle KahvilaSadeM:n → tausta kahvila-baari (baareja enemmistö
//    tai kello ≥ BaariTunti tai < 4) tai kahvila-rauhallinen; taso tiheydestä ja korkeudesta. Maitovaahdotin lähimmästä cafésta
//    alle MaitoM (3D), väli MaitoValiMinS–MaitoValiMaxS.
//  TORI: aukio (tori = 1 tai ala > ToriAlaM2) tai ulkotori (halli k = 0, marketplace) alle ToriM → tori-ulko etäisyyden mukaan;
//    −6 dB, kun IHMISET soittaa sorinaa (ei päällekkäin liian kovaa).
//  HALLIT: katettu halli alle HalliM ja kamera alle HalliKorkeusM → kauppahalli (marketplace) tai kauppakeskus (mall), −12 dB.
//  Taustojen tasot liukuvat TaustaLiukuS:n aikavakiolla (≥ 2 s, ei hyppyjä). Kaikki tasot ennen maisemaa, väistöä ja mikseriä.
// Puhdas C#: KaupunkiAanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Elava
{
    public sealed class KaupunkiAanet
    {
        public const double KorkeusRajaM = IhmisAanet.KorkeusRajaM;
        public const double KirkkoLahinM = 400, KirkkoTaysiM = 80, KirkkoHiljaM = 450, KelloValiMinS = 180, KelloValiMaxS = 360, KelloKorkeusM = 25;
        public const double SuihkuM = 120, SuihkuTaysiM = 15, SuihkuHiljaM = 170, SuihkuHaivytysS = 1.0;
        public const int SuihkujaEnintaan = 2, KahvilaVahintaan = 3;
        public const double KahvilaSadeM = 150, KahvilaTaysiKorkeusM = 20, BaariTunti = 18, MaitoM = 100, MaitoTaysiM = 15, MaitoValiMinS = 120, MaitoValiMaxS = 240;
        public const double ToriM = 120, ToriAlaM2 = 2000, ToriTaysiM = 40, ToriHiljaM = 160;
        public const double HalliM = 60, HalliKorkeusM = 80, HalliTaysiM = 25, HalliHiljaM = 100;
        public const double TaustaLiukuS = 2.5;

        /// <summary>2D-taustat (stereo) tässä järjestyksessä: Tausta[i] on liu'utettu taso.</summary>
        public static readonly string[] TaustaTunnukset =
            { PalloKaupunkiAanet.KahvilaBaari, PalloKaupunkiAanet.KahvilaRauhallinen, PalloKaupunkiAanet.ToriUlko, PalloKaupunkiAanet.Kauppahalli, PalloKaupunkiAanet.Kauppakeskus };
        const int Baari = 0, Rauhallinen = 1, Tori = 2, Halli = 3, Keskus = 4;

        public sealed class Kerta { public string Tunnus; public double X, Y, Z, Taso, EtaisyysM; public bool Tasatunti; }
        public sealed class Suihku { public int Piste; public string Tunnus; public double X, Z, Osuus, Taso; }

        public readonly List<(double X, double Z)> Kirkot = new List<(double, double)>(), Suihkulahteet = new List<(double, double)>(), Torit = new List<(double, double)>();
        public readonly List<(double X, double Z, bool Baari)> Kahvilat = new List<(double, double, bool)>();
        public readonly List<(double X, double Z, bool Katettu, bool Keskus)> Hallit = new List<(double, double, bool, bool)>();

        /// <summary>Kehyksen uudet kerta-äänet (kirkonkello, maitovaahdotin); tyhjenee joka Paivita-kutsussa.</summary>
        public readonly List<Kerta> Kerrat = new List<Kerta>();
        /// <summary>Soivat suihkulähteet (Osuus > 0, myös häipyvät).</summary>
        public readonly List<Suihku> Suihkut = new List<Suihku>();
        public readonly double[] Tausta = new double[TaustaTunnukset.Length];
        // Diagnoosi (opas kaupunkiaanet tila).
        public double LahinKirkkoM = double.NaN, LahinToriM = double.NaN, LahinHalliM = double.NaN, KorkeusM = double.NaN;
        public int KahviloitaLahella, BaarejaLahella;

        readonly Random rnd; readonly int siemen;
        Ruudukko kirkkoR, suihkuR, kahvilaR, toriR, halliR;
        double seuraavaKello = double.NaN, tasaKello = double.NaN, seuraavaMaito = double.NaN, nytS;
        int edTunti = -1; string edKello;
        readonly List<int> hae = new List<int>(), pois = new List<int>();
        readonly List<(int I, double D)> valitut = new List<(int, double)>();
        readonly Dictionary<int, Suihku> suihkut = new Dictionary<int, Suihku>();
        readonly double[] tavoite = new double[TaustaTunnukset.Length];

        public KaupunkiAanet(int siemen) { this.siemen = siemen; rnd = new Random(siemen); }

        /// <summary>Pisteet elävän kaupungin paketista: "kirkot" [{x, z}], "suihkulahteet" [{x, z}], "kahvilat" [{x, z, l}],
        /// "hallit" [{x, z, k, t}] ja "aukiot" [{x, z, ala, tori}]. Puuttuvat kentät ohitetaan.</summary>
        public static KaupunkiAanet Lue(string json, int siemen)
        {
            var e = new KaupunkiAanet(siemen);
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            IEnumerable<Dictionary<string, object>> Oliot(string kentta)
            {
                foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, kentta))) { var d = MiniJson.ObjektiTaiNull(o); if (d != null) yield return d; }
            }
            double X(Dictionary<string, object> d) => MiniJson.Luku(d, "x") ?? 0;
            double Z(Dictionary<string, object> d) => MiniJson.Luku(d, "z") ?? 0;
            foreach (var d in Oliot("kirkot")) e.Kirkot.Add((X(d), Z(d)));
            foreach (var d in Oliot("suihkulahteet")) e.Suihkulahteet.Add((X(d), Z(d)));
            foreach (var d in Oliot("kahvilat")) e.Kahvilat.Add((X(d), Z(d), (MiniJson.Luku(d, "l") ?? 0) != 0));
            foreach (var d in Oliot("hallit"))
            {
                bool katettu = (MiniJson.Luku(d, "k") ?? 0) != 0, keskus = (MiniJson.Luku(d, "t") ?? 0) != 0;
                e.Hallit.Add((X(d), Z(d), katettu, keskus));
                if (!katettu && !keskus) e.Torit.Add((X(d), Z(d)));   // ulkotori (marketplace ilman rakennusta)
            }
            foreach (var d in Oliot("aukiot"))
                if ((MiniJson.Luku(d, "tori") ?? 0) != 0 || (MiniJson.Luku(d, "ala") ?? 0) > ToriAlaM2) e.Torit.Add((X(d), Z(d)));
            e.Indeksoi();
            return e;
        }

        /// <summary>Hakuruudukot (kutsutaan Luessa; testit voivat täyttää listat ja kutsua itse).</summary>
        public void Indeksoi()
        {
            kirkkoR = new Ruudukko(); for (int i = 0; i < Kirkot.Count; i++) kirkkoR.Lisaa(i, Kirkot[i].X, Kirkot[i].Z);
            suihkuR = new Ruudukko(); for (int i = 0; i < Suihkulahteet.Count; i++) suihkuR.Lisaa(i, Suihkulahteet[i].X, Suihkulahteet[i].Z);
            kahvilaR = new Ruudukko(); for (int i = 0; i < Kahvilat.Count; i++) kahvilaR.Lisaa(i, Kahvilat[i].X, Kahvilat[i].Z);
            toriR = new Ruudukko(); for (int i = 0; i < Torit.Count; i++) toriR.Lisaa(i, Torit[i].X, Torit[i].Z);
            halliR = new Ruudukko(); for (int i = 0; i < Hallit.Count; i++) halliR.Lisaa(i, Hallit[i].X, Hallit[i].Z);
        }

        /// <summary>Suihkulähteen ääni pisteen siemenestä (iso tai pieni, sama joka kerta).</summary>
        public string SuihkuTunnus(int piste) => ((uint)(piste * 2654435761u ^ (uint)siemen) >> 13 & 1) == 0 ? PalloKaupunkiAanet.SuihkuIso : PalloKaupunkiAanet.SuihkuPieni;

        /// <summary>Tasatunnin heiluvat kellot alkavat lyöntien jälkeen (KaupunkiAanimaisema.TasatunninLyonnit: 2,6 s välein, kirkoittain
        /// enintään ~7 s porrastettuna).</summary>
        public static double LyontienJalkeenS(int tunti) { int n = ((tunti % 12) + 12) % 12; if (n == 0) n = 12; return n * 2.6 + 8; }

        /// <summary>Testi- ja kuuntelukomento: seuraava kirkonkello tai maitovaahdotin heti, kun ehdot täyttyvät.</summary>
        public void Pakota(string mita) { if (mita == "kello") seuraavaKello = double.NegativeInfinity; else if (mita == "maito") seuraavaMaito = double.NegativeInfinity; }

        /// <summary>Joka kehys: kamera paketin ENU:ssa (vaaka), korkeus maasta (NaN = ei tiedossa → vain häivytykset), paikallinen
        /// tunti 0–24 (NaN = ei kelloa → ei tasatunnin kelloja), soiko IHMISTEN sorina juuri nyt.</summary>
        public void Paivita(double nyt, double dt, double kx, double kz, double korkeus, double tunti, bool sorinaSoi)
        {
            nytS = nyt; KorkeusM = korkeus;
            Kerrat.Clear();
            if (double.IsNaN(seuraavaKello)) { seuraavaKello = nyt + 30 + 90 * rnd.NextDouble(); seuraavaMaito = nyt + 40 + 80 * rnd.NextDouble(); }
            bool tiedossa = !double.IsNaN(korkeus), matala = tiedossa && korkeus <= KorkeusRajaM;
            double k2 = tiedossa ? korkeus * korkeus : 0;
            Array.Clear(tavoite, 0, tavoite.Length);

            // ---- kirkonkellot ----
            if (!double.IsNaN(tunti))
            {
                int h = (int)Math.Floor(tunti);
                if (edTunti >= 0 && h != edTunti) tasaKello = nyt + LyontienJalkeenS(h);
                edTunti = h;
            }
            if (!double.IsNaN(tasaKello) && nyt > tasaKello + 60) tasaKello = double.NaN;   // kerran: ehdot eivät täyttyneet minuutissa
            int kirkko = Lahin(kirkkoR, Kirkot.Count, i => Kirkot[i], kx, kz, KirkkoLahinM, out double dk);
            LahinKirkkoM = kirkko >= 0 ? dk : double.NaN;
            if (matala && kirkko >= 0)
            {
                bool tasa = !double.IsNaN(tasaKello) && nyt >= tasaKello;
                if (tasa || nyt >= seuraavaKello)
                {
                    if (tasa) { tasaKello = double.NaN; seuraavaKello = Math.Max(seuraavaKello, nyt + KelloValiMinS); }
                    else seuraavaKello = nyt + KelloValiMinS + (KelloValiMaxS - KelloValiMinS) * rnd.NextDouble();
                    edKello = ElavaValinta.Vaihtoehto(PalloKaupunkiAanet.Kirkonkello, rnd, edKello);
                    double d3 = Math.Sqrt(dk * dk + k2);
                    var (x, z) = Kirkot[kirkko];
                    Kerrat.Add(new Kerta { Tunnus = edKello, X = x, Y = KelloKorkeusM, Z = z, EtaisyysM = d3, Tasatunti = tasa,
                        Taso = PalloKaupunkiAanet.KirkkoTaso * PalloElavaAanet.Etaisyystaso(d3, KirkkoTaysiM, KirkkoHiljaM) });
                }
            }

            // ---- suihkulähteet: enintään kaksi lähintä, lineaarinen häivytys ----
            valitut.Clear();
            if (tiedossa)
            {
                hae.Clear(); suihkuR?.Hae(kx, kz, SuihkuM, hae);
                foreach (int i in hae)
                {
                    double dx = Suihkulahteet[i].X - kx, dz = Suihkulahteet[i].Z - kz, d = Math.Sqrt(dx * dx + dz * dz);
                    if (d < SuihkuM) valitut.Add((i, d));
                }
                valitut.Sort((a, b) => a.D != b.D ? a.D.CompareTo(b.D) : a.I.CompareTo(b.I));
                if (valitut.Count > SuihkujaEnintaan) valitut.RemoveRange(SuihkujaEnintaan, valitut.Count - SuihkujaEnintaan);
            }
            foreach (var (i, _) in valitut)
                if (!suihkut.ContainsKey(i)) suihkut[i] = new Suihku { Piste = i, Tunnus = SuihkuTunnus(i), X = Suihkulahteet[i].X, Z = Suihkulahteet[i].Z };
            Suihkut.Clear();
            pois.Clear();
            foreach (var s in suihkut.Values)
            {
                bool valittu = false; foreach (var v in valitut) valittu |= v.I == s.Piste;
                double askel = Math.Max(0, dt) / SuihkuHaivytysS;
                s.Osuus = valittu ? Math.Min(1, s.Osuus + askel) : Math.Max(0, s.Osuus - askel);
                if (s.Osuus <= 0 && !valittu) { pois.Add(s.Piste); continue; }
                double dx = s.X - kx, dz = s.Z - kz, d3 = Math.Sqrt(dx * dx + dz * dz + k2);
                s.Taso = PalloKaupunkiAanet.SuihkuTaso * s.Osuus * (tiedossa ? PalloElavaAanet.Etaisyystaso(d3, SuihkuTaysiM, SuihkuHiljaM) : 0);
                Suihkut.Add(s);
            }
            foreach (int i in pois) suihkut.Remove(i);
            Suihkut.Sort((a, b) => a.Piste.CompareTo(b.Piste));

            // ---- kahvilat: tausta tiheydestä, maitovaahdotin lähimmästä cafésta ----
            KahviloitaLahella = BaarejaLahella = 0;
            int cafe = -1; double dCafe = double.MaxValue;
            if (matala)
            {
                hae.Clear(); kahvilaR?.Hae(kx, kz, KahvilaSadeM, hae);
                foreach (int i in hae)
                {
                    double dx = Kahvilat[i].X - kx, dz = Kahvilat[i].Z - kz, d = Math.Sqrt(dx * dx + dz * dz);
                    if (d >= KahvilaSadeM) continue;
                    KahviloitaLahella++; if (Kahvilat[i].Baari) BaarejaLahella++;
                    if (!Kahvilat[i].Baari && (d < dCafe || (d == dCafe && i < cafe))) { cafe = i; dCafe = d; }
                }
                if (KahviloitaLahella >= KahvilaVahintaan)
                {
                    bool baari = BaarejaLahella * 2 > KahviloitaLahella || Ilta(tunti);
                    double tiheys = Math.Min(1, 0.4 + 0.6 * (KahviloitaLahella - KahvilaVahintaan) / 9.0);
                    tavoite[baari ? Baari : Rauhallinen] = PalloKaupunkiAanet.KahvilaTaso * tiheys * PalloElavaAanet.Etaisyystaso(korkeus, KahvilaTaysiKorkeusM, KorkeusRajaM);
                }
                if (cafe >= 0)
                {
                    double d3 = Math.Sqrt(dCafe * dCafe + k2);
                    if (d3 < MaitoM && nyt >= seuraavaMaito)
                    {
                        seuraavaMaito = nyt + MaitoValiMinS + (MaitoValiMaxS - MaitoValiMinS) * rnd.NextDouble();
                        Kerrat.Add(new Kerta { Tunnus = PalloKaupunkiAanet.Maitovaahdotin, X = Kahvilat[cafe].X, Y = 1.2, Z = Kahvilat[cafe].Z, EtaisyysM = d3,
                            Taso = PalloKaupunkiAanet.MaitoTaso * PalloElavaAanet.Etaisyystaso(d3, MaitoTaysiM, MaitoM) });
                    }
                }
            }

            // ---- tori ja hallit ----
            int tori = Lahin(toriR, Torit.Count, i => Torit[i], kx, kz, ToriM, out double dt0);
            LahinToriM = tori >= 0 ? dt0 : double.NaN;
            if (matala && tori >= 0)
                tavoite[Tori] = PalloKaupunkiAanet.ToriTaso * PalloElavaAanet.Etaisyystaso(Math.Sqrt(dt0 * dt0 + k2), ToriTaysiM, ToriHiljaM) * (sorinaSoi ? PalloKaupunkiAanet.ToriSorinaKerroin : 1);
            int halli = -1; double dh = double.MaxValue;
            hae.Clear(); halliR?.Hae(kx, kz, HalliM, hae);
            foreach (int i in hae)
            {
                if (!Hallit[i].Katettu) continue;
                double dx = Hallit[i].X - kx, dz = Hallit[i].Z - kz, d = Math.Sqrt(dx * dx + dz * dz);
                if (d < HalliM && (d < dh || (d == dh && i < halli))) { halli = i; dh = d; }
            }
            LahinHalliM = halli >= 0 ? dh : double.NaN;
            if (tiedossa && korkeus <= HalliKorkeusM && halli >= 0)
                tavoite[Hallit[halli].Keskus ? Keskus : Halli] = PalloKaupunkiAanet.HalliTaso * PalloElavaAanet.Etaisyystaso(Math.Sqrt(dh * dh + k2), HalliTaysiM, HalliHiljaM);

            for (int i = 0; i < Tausta.Length; i++) Tausta[i] = PalloElavaAanet.Liuku(Tausta[i], tavoite[i], dt, TaustaLiukuS);
        }

        static bool Ilta(double tunti) => !double.IsNaN(tunti) && (tunti >= BaariTunti || tunti < 4);

        int Lahin(Ruudukko r, int n, Func<int, (double X, double Z)> p, double kx, double kz, double sade, out double dMin)
        {
            dMin = double.MaxValue; int paras = -1;
            if (r == null || n == 0) return -1;
            hae.Clear(); r.Hae(kx, kz, sade, hae);
            foreach (int i in hae)
            {
                var (x, z) = p(i); double dx = x - kx, dz = z - kz, d = Math.Sqrt(dx * dx + dz * dz);
                if (d < sade && (d < dMin || (d == dMin && i < paras))) { paras = i; dMin = d; }
            }
            return paras;
        }

        /// <summary>Diagnoosi (`opas kaupunkiaanet tila`).</summary>
        public string Tila()
        {
            string M(double d) => double.IsNaN(d) ? "-" : $"{d:F0} m";
            var t = new List<string>();
            for (int i = 0; i < Tausta.Length; i++) if (Tausta[i] > 0.001) t.Add($"{TaustaTunnukset[i]} {Tausta[i]:F2}");
            var s = new List<string>(); foreach (var x in Suihkut) s.Add($"{x.Tunnus}#{x.Piste} {x.Taso:F2}");
            return $"kaupunkiäänet: pisteet kirkot {Kirkot.Count}, suihkulähteet {Suihkulahteet.Count}, kahvilat {Kahvilat.Count}, torit {Torit.Count}, hallit {Hallit.Count}; " +
                $"korkeus {M(KorkeusM)}, lähin kirkko {M(LahinKirkkoM)} (seuraava kello {Math.Max(0, seuraavaKello - nytS):F0} s{(double.IsNaN(tasaKello) ? "" : $", tasatunti {Math.Max(0, tasaKello - nytS):F0} s")}), " +
                $"kahviloita {KahviloitaLahella} ({BaarejaLahella} baaria, maito {Math.Max(0, seuraavaMaito - nytS):F0} s), tori {M(LahinToriM)}, halli {M(LahinHalliM)}; " +
                $"suihkut [{string.Join(", ", s)}], taustat [{string.Join(", ", t)}]";
        }

        /// <summary>Kevyt hakuruudukko (200 m:n solut): pisteet säteen sisältä ilman koko listan läpikäyntiä joka kehys.</summary>
        sealed class Ruudukko
        {
            const double S = 200;
            readonly Dictionary<long, List<int>> solut = new Dictionary<long, List<int>>();
            static long Avain(long i, long j) => (i << 32) ^ (j & 0xffffffffL);
            public void Lisaa(int i, double x, double z)
            {
                long a = Avain((long)Math.Floor(x / S), (long)Math.Floor(z / S));
                if (!solut.TryGetValue(a, out var l)) solut[a] = l = new List<int>();
                l.Add(i);
            }
            public void Hae(double x, double z, double r, List<int> ulos)
            {
                long i0 = (long)Math.Floor((x - r) / S), i1 = (long)Math.Floor((x + r) / S), j0 = (long)Math.Floor((z - r) / S), j1 = (long)Math.Floor((z + r) / S);
                for (long i = i0; i <= i1; i++)
                    for (long j = j0; j <= j1; j++)
                        if (solut.TryGetValue(Avain(i, j), out var l)) ulos.AddRange(l);
            }
        }
    }
}
