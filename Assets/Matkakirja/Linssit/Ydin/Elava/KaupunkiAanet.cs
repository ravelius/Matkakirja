// ELÄVÄN KAUPUNGIN PAIKKAÄÄNET (Linssiseppä 9.10.2026; PT junaan 173, Pelikoodarin aanet/pallo-kaupunki-v1, Ydin PalloKaupunkiAanet):
// puhdas logiikka, joka päättää kehys kerrallaan kameran paikasta (paketin ENU, korkeus maasta), paikallisesta kellosta ja OSM-pisteistä
// (elava-<id>.json: tyokalut/elava_aanipisteet.py ja elava_ihmiset.py), mitä soi. Unity (ElavaKaupunki) soittaa kerta-äänet
// 3D-poolista, suihkulähteet 3D-silmukoina ja taustat 2D-stereona. Kaikki valinnat siemenestä (deterministinen, testit toistuvat).
//  KIRKONKELLOT: lähin kirkko alle KirkkoLahinM ja kamera alle KorkeusRajaM (sama kuin IHMISET); väli KelloValiMinS–KelloValiMaxS ja
//    lisäksi kerran tasatunnin jälkeen (paikallinen kello; KaupunkiAanimaisemaSoitin lyö ensin tunnin lyönnit, heiluvat kellot alkavat
//    LyontienJalkeenS:n päästä, ettei päällekkäin). Ei samaa näytettä peräkkäin; taso täysi KirkkoTaysiM, hiljaa KirkkoHiljaM (3D).
//  TUNTILYÖNNIT (Soundly-erä 1, PT 9.10.): tasatunnilla lähin kirkko (alle KirkkoLahinM, kamera matalalla) lyö N kertaa (1–12)
//    kirkon omalla kellolla (kello-lyonti-a…d kirkon siemenestä) ja omalla välillä 2,5–3 s, edellisen soidessa; taso etäisyydestä
//    joka iskulla. Korvaa KaupunkiAanimaisemaSoittimen 2D-lyönnit, kun Soundly-kellot ovat ladattuina (ElavaKaupunki.OmatLyonnit).
//  SUIHKULÄHTEET: enintään SuihkujaEnintaan lähintä alle SuihkuM:n soivat silmukkana pisteessä (iso/pieni pisteen siemenestä);
//    valinnan vaihtuessa häivytys SuihkuHaivytysS lineaarisesti sisään ja ulos (ei hyppyä).
//  SATAMAT (Pelikoodari 9.10., sonniss-aanet-v4/satama-vesi, kivikkorannan liplatus): vesiliikenteen edestakaisten reittien päät
//    = laiturit (kuten IhmisAanet, lähekkäiset < LaituriYhdistysM yhdistetty, Y = vesipinta); kamera alle KorkeusRajaM ja laituri alle
//    SatamaM → mono-3D-silmukka, enintään SuihkujaEnintaan kerrallaan, häivytys SuihkuHaivytysS kuten suihkulähteillä.
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
        // Kellot ja kahvila vain lähellä lähdettä (PT 9.10.): kello täysi 50 m:ssä, hiljaa 250 m:ssä; kahvilatausta 80 m:n säteeltä ja
        // vain alle 80 m:n korkeudella (ennen 450 m / 150 m: Pariisissa kello kuului 90 %:ssa kaupunkia).
        public const double KirkkoLahinM = 250, KirkkoTaysiM = 50, KirkkoHiljaM = 250, KelloValiMinS = 180, KelloValiMaxS = 360, KelloKorkeusM = 25;
        public const double SuihkuM = 120, SuihkuTaysiM = 15, SuihkuHiljaM = 170, SuihkuHaivytysS = 1.0;
        public const double SatamaM = 120, SatamaTaysiM = 20, SatamaHiljaM = 170;
        public const int SuihkujaEnintaan = 2, KahvilaVahintaan = 3;
        public const double KahvilaSadeM = 80, KahvilaTaysiKorkeusM = 20, KahvilaHiljaKorkeusM = 80, BaariTunti = 18, MaitoM = 100, MaitoTaysiM = 15, MaitoValiMinS = 120, MaitoValiMaxS = 240;
        public const double ToriM = 120, ToriAlaM2 = 2000, ToriTaysiM = 40, ToriHiljaM = 160;
        public const double HalliM = 60, HalliKorkeusM = 80, HalliTaysiM = 25, HalliHiljaM = 100;
        public const double TaustaLiukuS = 2.5;

        /// <summary>2D-taustat (stereo) tässä järjestyksessä: Tausta[i] on liu'utettu taso.</summary>
        public static readonly string[] TaustaTunnukset =
            { PalloKaupunkiAanet.KahvilaBaari, PalloKaupunkiAanet.KahvilaRauhallinen, PalloKaupunkiAanet.ToriUlko, PalloKaupunkiAanet.Kauppahalli, PalloKaupunkiAanet.Kauppakeskus };
        const int Baari = 0, Rauhallinen = 1, Tori = 2, Halli = 3, Keskus = 4;

        /// <summary>Kerta-ääni; Lyonti = tuntilyönnin järjestysnumero 1…N (0 = ei lyönti).</summary>
        public sealed class Kerta { public string Tunnus; public double X, Y, Z, Taso, EtaisyysM; public bool Tasatunti; public int Lyonti; }
        /// <summary>Silmukkapiste (suihkulähde tai laituri): Y = vesipinta paketista (laituri) tai NaN (maa haetaan soittaessa).</summary>
        public sealed class Suihku { public int Piste; public string Tunnus; public double X, Y = double.NaN, Z, Osuus, Taso; }

        public readonly List<(double X, double Z)> Kirkot = new List<(double, double)>(), Suihkulahteet = new List<(double, double)>(), Torit = new List<(double, double)>(),
            Aukiot = new List<(double, double)>();
        public readonly List<(double X, double Z, bool Baari)> Kahvilat = new List<(double, double, bool)>();
        public readonly List<(double X, double Z, bool Katettu, bool Keskus)> Hallit = new List<(double, double, bool, bool)>();

        /// <summary>Kehyksen uudet kerta-äänet (kirkonkello, maitovaahdotin); tyhjenee joka Paivita-kutsussa.</summary>
        public readonly List<Kerta> Kerrat = new List<Kerta>();
        /// <summary>Soivat suihkulähteet (Osuus > 0, myös häipyvät).</summary>
        public readonly List<Suihku> Suihkut = new List<Suihku>();
        /// <summary>Soivat satamat (laiturit, Osuus > 0, myös häipyvät).</summary>
        public readonly List<Suihku> Satamat = new List<Suihku>();
        public readonly List<(double X, double Z, double Y)> Laiturit = new List<(double, double, double)>();
        public readonly double[] Tausta = new double[TaustaTunnukset.Length];
        // Diagnoosi (opas kaupunkiaanet tila).
        public double LahinKirkkoM = double.NaN, LahinToriM = double.NaN, LahinHalliM = double.NaN, KorkeusM = double.NaN;
        public int KahviloitaLahella, BaarejaLahella;

        readonly Random rnd; readonly int siemen;
        HakuRuudukko kirkkoR, suihkuR, kahvilaR, toriR, halliR, laituriR;
        double seuraavaKello = double.NaN, tasaKello = double.NaN, seuraavaMaito = double.NaN, nytS;
        int edTunti = -1; string edKello;
        readonly Queue<(double T, int N, double X, double Z, string Tunnus)> lyonnit = new Queue<(double, int, double, double, string)>();
        /// <summary>Viimeisin tuntilyönti: kirkko, kello ja väli (diagnoosi).</summary>
        public string ViimeLyonti { get; private set; }
        readonly List<int> hae = new List<int>(), pois = new List<int>();
        readonly List<(int I, double D)> valitut = new List<(int, double)>();
        readonly Dictionary<int, Suihku> suihkut = new Dictionary<int, Suihku>(), satamat = new Dictionary<int, Suihku>();
        readonly double[] tavoite = new double[TaustaTunnukset.Length];

        public KaupunkiAanet(int siemen) { this.siemen = siemen; rnd = new Random(siemen); }

        /// <summary>Pisteet elävän kaupungin paketista: "kirkot" [{x, z}], "suihkulahteet" [{x, z}], "kahvilat" [{x, z, l}],
        /// "hallit" [{x, z, k, t}], "aukiot" [{x, z, ala, tori}] ja vesiliikenteen "reitit" (laiturit). Puuttuvat kentät ohitetaan.</summary>
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
            foreach (var d in Oliot("aukiot")) e.Aukiot.Add((X(d), Z(d)));
            foreach (var d in Oliot("aukiot"))
                if ((MiniJson.Luku(d, "tori") ?? 0) != 0 || (MiniJson.Luku(d, "ala") ?? 0) > ToriAlaM2) e.Torit.Add((X(d), Z(d)));
            // Laiturit: edestakaisten vesireittien päät [x, z, vesi], lähekkäiset yhdistetty (sama sääntö kuin IhmisAanet).
            foreach (var d in Oliot("reitit"))
            {
                if (MiniJson.Kentta(d, "kiertava") is bool kiertava && kiertava) continue;
                var p = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "p"));
                if (p.Count < 2) continue;
                foreach (var q in new[] { MiniJson.TaulukkoTaiTyhja(p[0]), MiniJson.TaulukkoTaiTyhja(p[p.Count - 1]) })
                {
                    if (q.Count < 2) continue;
                    double x = Convert.ToDouble(q[0]), z = Convert.ToDouble(q[1]), y = q.Count > 2 ? Convert.ToDouble(q[2]) : double.NaN;
                    if (!e.Laiturit.Exists(l => (l.X - x) * (l.X - x) + (l.Z - z) * (l.Z - z) < IhmisAanet.LaituriYhdistysM * IhmisAanet.LaituriYhdistysM)) e.Laiturit.Add((x, z, y));
                }
            }
            e.Indeksoi();
            return e;
        }

        /// <summary>Hakuruudukot (kutsutaan Luessa; testit voivat täyttää listat ja kutsua itse).</summary>
        public void Indeksoi()
        {
            kirkkoR = new HakuRuudukko(); for (int i = 0; i < Kirkot.Count; i++) kirkkoR.Lisaa(i, Kirkot[i].X, Kirkot[i].Z);
            suihkuR = new HakuRuudukko(); for (int i = 0; i < Suihkulahteet.Count; i++) suihkuR.Lisaa(i, Suihkulahteet[i].X, Suihkulahteet[i].Z);
            kahvilaR = new HakuRuudukko(); for (int i = 0; i < Kahvilat.Count; i++) kahvilaR.Lisaa(i, Kahvilat[i].X, Kahvilat[i].Z);
            toriR = new HakuRuudukko(); for (int i = 0; i < Torit.Count; i++) toriR.Lisaa(i, Torit[i].X, Torit[i].Z);
            halliR = new HakuRuudukko(); for (int i = 0; i < Hallit.Count; i++) halliR.Lisaa(i, Hallit[i].X, Hallit[i].Z);
            laituriR = new HakuRuudukko(); for (int i = 0; i < Laiturit.Count; i++) laituriR.Lisaa(i, Laiturit[i].X, Laiturit[i].Z);
        }

        /// <summary>Suihkulähteen ääni pisteen siemenestä (iso tai pieni, sama joka kerta).</summary>
        public string SuihkuTunnus(int piste) => ((uint)(piste * 2654435761u ^ (uint)siemen) >> 13 & 1) == 0 ? PalloKaupunkiAanet.SuihkuIso : PalloKaupunkiAanet.SuihkuPieni;

        /// <summary>Tasatunnin heiluvat kellot alkavat lyöntien jälkeen (KaupunkiAanimaisema.TasatunninLyonnit: 2,6 s välein, kirkoittain
        /// enintään ~7 s porrastettuna).</summary>
        public static int Lyonteja(int tunti) { int n = ((tunti % 12) + 12) % 12; return n == 0 ? 12 : n; }
        /// <summary>Viimeisen iskun soiminen loppuu (Soundly kello-lyonti: 5,6–9,2 s) ennen heiluvia kelloja.</summary>
        public const double LyontiSoiS = 9.5;
        public static double LyontienJalkeenS(int tunti, double vali = 3.0) => (Lyonteja(tunti) - 1) * vali + LyontiSoiS;

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

            // ---- kirkonkellot ja tuntilyönnit ----
            int kirkko = Lahin(kirkkoR, Kirkot.Count, i => Kirkot[i], kx, kz, KirkkoLahinM, out double dk);
            LahinKirkkoM = kirkko >= 0 ? dk : double.NaN;
            if (!double.IsNaN(tunti))
            {
                int h = (int)Math.Floor(tunti);
                if (edTunti >= 0 && h != edTunti)
                {
                    double vali = 3.0;
                    if (matala && kirkko >= 0)
                    {
                        var (lx, lz) = Kirkot[kirkko];
                        vali = PalloSoundlyAanet.LyontiVali(lx, lz, siemen);
                        string kello = PalloSoundlyAanet.KirkonKello(lx, lz, siemen);
                        lyonnit.Clear();
                        for (int i = 0; i < Lyonteja(h); i++) lyonnit.Enqueue((nyt + i * vali, i + 1, lx, lz, kello));
                        ViimeLyonti = $"klo {h}: {Lyonteja(h)} × {kello} {vali:F2} s välein, kirkko ({lx:F0}, {lz:F0})";
                    }
                    tasaKello = nyt + LyontienJalkeenS(h, vali);
                }
                edTunti = h;
            }
            while (lyonnit.Count > 0 && lyonnit.Peek().T <= nyt)
            {
                var l = lyonnit.Dequeue();
                if (!tiedossa) continue;
                double dx = l.X - kx, dz = l.Z - kz, d3 = Math.Sqrt(dx * dx + dz * dz + k2);
                double taso = PalloSoundlyAanet.LyontiTaso * PalloElavaAanet.Etaisyystaso(d3, KirkkoTaysiM, KirkkoHiljaM);
                if (taso > 0) Kerrat.Add(new Kerta { Tunnus = l.Tunnus, X = l.X, Y = KelloKorkeusM, Z = l.Z, EtaisyysM = d3, Taso = taso, Lyonti = l.N, Tasatunti = true });
            }
            if (!double.IsNaN(tasaKello) && nyt > tasaKello + 60) tasaKello = double.NaN;   // kerran: ehdot eivät täyttyneet minuutissa
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
                    Kerrat.Add(new Kerta { Tunnus = edKello, X = x, Y = KelloKorkeusM, Z = z, EtaisyysM = d3, Tasatunti = tasa,   // heiluvat kellot
                        Taso = PalloKaupunkiAanet.KirkkoTaso * PalloElavaAanet.Etaisyystaso(d3, KirkkoTaysiM, KirkkoHiljaM) });
                }
            }

            // ---- suihkulähteet ja satamat: enintään kaksi lähintä, lineaarinen häivytys ----
            PisteSilmukat(i => Suihkulahteet[i], suihkuR, suihkut, Suihkut, tiedossa, SuihkuM, SuihkuTaysiM, SuihkuHiljaM, PalloKaupunkiAanet.SuihkuTaso, SuihkuTunnus, i => double.NaN, kx, kz, k2, dt);
            PisteSilmukat(i => (Laiturit[i].X, Laiturit[i].Z), laituriR, satamat, Satamat, matala, SatamaM, SatamaTaysiM, SatamaHiljaM, PalloKaupunkiAanet.SatamaTaso, i => PalloKaupunkiAanet.SatamaVesi, i => Laiturit[i].Y, kx, kz, k2, dt);

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
                    tavoite[baari ? Baari : Rauhallinen] = PalloKaupunkiAanet.KahvilaTaso * tiheys * PalloElavaAanet.Etaisyystaso(korkeus, KahvilaTaysiKorkeusM, KahvilaHiljaKorkeusM);
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

        /// <summary>Enintään SuihkujaEnintaan lähintä pistettä alle sade-m:n soivat silmukkana; valinnan vaihtuessa lineaarinen
        /// häivytys SuihkuHaivytysS sisään ja ulos. Tila (Osuus) säilyy pisteittäin; ulos = soivat ja häipyvät pisteen järjestyksessä.</summary>
        void PisteSilmukat(Func<int, (double X, double Z)> xz, HakuRuudukko r, Dictionary<int, Suihku> tila, List<Suihku> ulos, bool ehto, double sade, double taysiM, double hiljaM,
            double perus, Func<int, string> tunnus, Func<int, double> y, double kx, double kz, double k2, double dt)
        {
            valitut.Clear();
            if (ehto)
            {
                hae.Clear(); r?.Hae(kx, kz, sade, hae);
                foreach (int i in hae)
                {
                    var (px, pz) = xz(i); double dx = px - kx, dz = pz - kz, d = Math.Sqrt(dx * dx + dz * dz);
                    if (d < sade) valitut.Add((i, d));
                }
                valitut.Sort((a, b) => a.D != b.D ? a.D.CompareTo(b.D) : a.I.CompareTo(b.I));
                if (valitut.Count > SuihkujaEnintaan) valitut.RemoveRange(SuihkujaEnintaan, valitut.Count - SuihkujaEnintaan);
            }
            foreach (var (i, _) in valitut)
                if (!tila.ContainsKey(i)) { var (px, pz) = xz(i); tila[i] = new Suihku { Piste = i, Tunnus = tunnus(i), X = px, Y = y(i), Z = pz }; }
            ulos.Clear(); pois.Clear();
            foreach (var s in tila.Values)
            {
                bool valittu = false; foreach (var v in valitut) valittu |= v.I == s.Piste;
                double askel = Math.Max(0, dt) / SuihkuHaivytysS;
                s.Osuus = valittu ? Math.Min(1, s.Osuus + askel) : Math.Max(0, s.Osuus - askel);
                if (s.Osuus <= 0 && !valittu) { pois.Add(s.Piste); continue; }
                double dx = s.X - kx, dz = s.Z - kz, d3 = Math.Sqrt(dx * dx + dz * dz + k2);
                s.Taso = perus * s.Osuus * (!double.IsNaN(KorkeusM) ? PalloElavaAanet.Etaisyystaso(d3, taysiM, hiljaM) : 0);
                ulos.Add(s);
            }
            foreach (int i in pois) tila.Remove(i);
            ulos.Sort((a, b) => a.Piste.CompareTo(b.Piste));
        }

        static bool Ilta(double tunti) => !double.IsNaN(tunti) && (tunti >= BaariTunti || tunti < 4);

        int Lahin(HakuRuudukko r, int n, Func<int, (double X, double Z)> p, double kx, double kz, double sade, out double dMin)
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
            var s = new List<string>(); foreach (var x in Suihkut) s.Add($"{x.Tunnus}#{x.Piste} {x.Taso:F2}"); foreach (var x in Satamat) s.Add($"{x.Tunnus}#{x.Piste} {x.Taso:F2}");
            return $"kaupunkiäänet: pisteet kirkot {Kirkot.Count}, suihkulähteet {Suihkulahteet.Count}, kahvilat {Kahvilat.Count}, torit {Torit.Count}, hallit {Hallit.Count}, laiturit {Laiturit.Count}; " +
                $"korkeus {M(KorkeusM)}, lähin kirkko {M(LahinKirkkoM)} (seuraava kello {Math.Max(0, seuraavaKello - nytS):F0} s{(double.IsNaN(tasaKello) ? "" : $", tasatunti {Math.Max(0, tasaKello - nytS):F0} s")}), " +
                $"kahviloita {KahviloitaLahella} ({BaarejaLahella} baaria, maito {Math.Max(0, seuraavaMaito - nytS):F0} s), tori {M(LahinToriM)}, halli {M(LahinHalliM)}; " +
                $"suihkut ja satamat [{string.Join(", ", s)}], taustat [{string.Join(", ", t)}]; tuntilyönti {ViimeLyonti ?? "-"}";
        }
    }

    /// <summary>Kevyt hakuruudukko (200 m:n solut): pisteet säteen sisältä ilman koko listan läpikäyntiä joka kehys.</summary>
    internal sealed class HakuRuudukko
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
