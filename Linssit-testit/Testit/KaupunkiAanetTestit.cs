// PALLON KAUPUNKIÄÄNET v1 (Linssiseppä 9.10.2026; PT junaan 173, Pelikoodarin aanet/pallo-kaupunki-v1): manifesti ja mikserin ryhmät,
// kirkonkellojen väli, etäisyys- ja korkeusehto sekä tasatunti lyöntien jälkeen, suihkulähteiden valinta ja häivytys ilman hyppyä,
// kahvilatausta (baari illalla tai baarien enemmistöllä) ja maitovaahdotin, tori-ulko −6 dB sorinan aikana, katettu halli −12 dB,
// vene-ohi huipun verran ennen lähintä kohtaa, deterministisyys siemenestä ja paketin uudet kentät (muut kentät ennallaan).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    static class KaupunkiAanetTestit
    {
        const double Dt = 0.1;

        [Testi] static void ManifestiJaMikserinRyhmat()
        {
            var m = PalloKaupunkiAanet.Lue("{\"versio\":1,\"aanet\":[{\"tunnus\":\"kirkonkello-01\",\"aani\":\"kirkonkello-01.mp3\",\"silmukka\":false,\"kesto_s\":8.0,\"LUFS\":-23.0,\"ryhma\":\"maisema\"}," +
                "{\"tunnus\":\"kahvila-maitovaahdotin\",\"aani\":\"kahvila-maitovaahdotin.mp3\",\"silmukka\":false,\"kesto_s\":6.22,\"ryhma\":\"tehosteet\"}," +
                "{\"tunnus\":\"tori-ulko\",\"aani\":\"tori-ulko.mp3\",\"silmukka\":true,\"kesto_s\":60},{\"tunnus\":\"\",\"aani\":\"x.mp3\"}]}");
            Oleta.Sama(4, m.Aanet.Count, "tyhjä tunnus ohitetaan, satama-vesi liitetään");
            Oleta.Sama("https://media.matkakirja.app/aanet/sonniss-aanet-v4/satama-vesi.mp3", m.Aanet[PalloKaupunkiAanet.SatamaVesi].Osoite, "erillinen ääni omasta juuresta");
            Oleta.Tosi(m.Aanet[PalloKaupunkiAanet.SatamaVesi].Silmukka, "satama-vesi silmukka");
            Oleta.Sama("x.mp3", PalloKaupunkiAanet.Lue("{\"aanet\":[{\"tunnus\":\"satama-vesi\",\"aani\":\"x.mp3\"}]}").Aanet[PalloKaupunkiAanet.SatamaVesi].Polku, "manifestin rivi voittaa");
            Oleta.Tosi(m.Aanet["tori-ulko"].Silmukka && !m.Aanet["kirkonkello-01"].Silmukka, "silmukka-kenttä");
            Oleta.Sama(PalloKaupunkiAanet.Juuri + "tori-ulko.mp3", m.Aanet["tori-ulko"].Osoite);
            Oleta.Sama("tehosteet", m.Aanet["kahvila-maitovaahdotin"].Ryhma);
            var kaikki = new HashSet<string>(PalloKaupunkiAanet.Tunnukset());
            Oleta.Sama(17, kaikki.Count, "manifestin 17 ääntä − vaki-sisatila-sorina + satama-vesi");
            Oleta.Tosi(!kaikki.Contains(PalloKaupunkiAanet.SisatilaSorina), "sisätilan sorina ei ladata");
            foreach (var t in kaikki)
            {
                Oleta.Sama(t == PalloKaupunkiAanet.Maitovaahdotin ? "tehosteet" : "maisema", PalloKaupunkiAanet.MikseriAani(t).Ryhma, t);
                Oleta.Sama(((string)null, (string)null), PalloElavaAanet.MikseriAani(t), "ei päällekkäin v2:n kanssa: " + t);
            }
            var v2 = new HashSet<string>(); foreach (var a in PalloElavaAanet.Mikseri) v2.Add(a.Id);
            foreach (var a in PalloKaupunkiAanet.Mikseri)
            {
                Oleta.Tosi(!v2.Contains(a.Id), "mikserin tunnus uniikki " + a.Id);
                foreach (char c in a.Id) Oleta.Tosi((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '.' || c == '-', "mikserin tunnus " + a.Id);
            }
            var mk = new Aanimikseri();
            foreach (var a in PalloKaupunkiAanet.Mikseri) mk.Rekisteroi("pallo", a.Ryhma, a.Id, a.Nimi, a.Klipit);
            Oleta.Tosi(mk.Rekisteroity("kirkonkello-05") && mk.Rekisteroity("vene-ohi-03") && mk.Rekisteroity("elava.tori-ulko"), "klipit ja tunnukset äänivahdille");
            Oleta.Sama(1, mk.AanetRyhmassa("pallo", "tehosteet").Count);
            Oleta.Sama(9, mk.AanetRyhmassa("pallo", "maisema").Count);
            Oleta.Tosi(Math.Abs(PalloKaupunkiAanet.HalliTaso / 0.5 - 0.2512) < 1e-3 && Math.Abs(PalloKaupunkiAanet.ToriSorinaKerroin - 0.5012) < 1e-3, "−12 dB ja −6 dB");
        }

        static KaupunkiAanet Tyhja(int siemen = 5) { var k = new KaupunkiAanet(siemen); return k; }

        static List<(double T, KaupunkiAanet.Kerta K)> AjaKellot(KaupunkiAanet a, double kx, double korkeus, double kesto, Func<double, double> tunti = null)
        {
            var tul = new List<(double, KaupunkiAanet.Kerta)>();
            for (double t = 0; t < kesto; t += Dt)
            {
                a.Paivita(t, Dt, kx, 0, korkeus, tunti?.Invoke(t) ?? double.NaN, false);
                foreach (var k in a.Kerrat) if (Array.IndexOf(PalloKaupunkiAanet.Kirkonkello, k.Tunnus) >= 0) tul.Add((t, k));
            }
            return tul;
        }

        [Testi] static void KirkonkellojenValiJaEtaisyys()
        {
            var a = Tyhja(); a.Kirkot.Add((100, 0)); a.Indeksoi();
            var tul = AjaKellot(a, 0, 50, 3 * 3600);
            Oleta.Tosi(tul.Count >= 30 && tul.Count <= 62, $"3 h: {tul.Count} kelloa (väli 3–6 min)");
            string ed = null;
            for (int i = 0; i < tul.Count; i++)
            {
                var (t, k) = tul[i];
                if (i > 0) Oleta.Tosi(t - tul[i - 1].T >= KaupunkiAanet.KelloValiMinS - 1e-6 && t - tul[i - 1].T <= KaupunkiAanet.KelloValiMaxS + Dt, $"väli {t - tul[i - 1].T:F0} s");
                Oleta.Tosi(k.Tunnus != ed, "sama näyte ei peräkkäin"); ed = k.Tunnus;
                Oleta.Tosi(k.X == 100 && k.Y == KaupunkiAanet.KelloKorkeusM && k.Taso > 0 && k.Taso <= PalloKaupunkiAanet.KirkkoTaso, "kirkossa, taso");
                Oleta.Tosi(Math.Abs(k.EtaisyysM - Math.Sqrt(100 * 100 + 50 * 50)) < 1e-9, "3D-etäisyys");
            }
            Oleta.Sama(PalloKaupunkiAanet.KirkkoTaso, PalloKaupunkiAanet.KirkkoTaso * PalloElavaAanet.Etaisyystaso(70, KaupunkiAanet.KirkkoTaysiM, KaupunkiAanet.KirkkoHiljaM), "täysi 80 m:ssä");
            Oleta.Tosi(PalloElavaAanet.Etaisyystaso(450, KaupunkiAanet.KirkkoTaysiM, KaupunkiAanet.KirkkoHiljaM) == 0, "hiljaa 450 m:ssä");
            var kaukana = Tyhja(); kaukana.Kirkot.Add((100, 0)); kaukana.Indeksoi();
            Oleta.Sama(0, AjaKellot(kaukana, 520, 50, 3600).Count, "kirkko 420 m:n päässä: ei kelloja");
            var korkealla = Tyhja(); korkealla.Kirkot.Add((100, 0)); korkealla.Indeksoi();
            Oleta.Sama(0, AjaKellot(korkealla, 0, KaupunkiAanet.KorkeusRajaM + 10, 3600).Count, "kamera yli korkeusrajan: ei kelloja");
            var eiMaata = Tyhja(); eiMaata.Kirkot.Add((100, 0)); eiMaata.Indeksoi();
            Oleta.Sama(0, AjaKellot(eiMaata, 0, double.NaN, 3600).Count, "korkeus ei tiedossa: ei kelloja");
        }

        [Testi] static void KirkonkelloTasatunninLyontienJalkeen()
        {
            // Tunti 11.95 → 12 kohdassa t = 180 s; tasatunnin kello lyöntien jälkeen (12 × 2,6 + 8 s), sitten väli ≥ 3 min.
            var a = Tyhja(9); a.Kirkot.Add((60, 0)); a.Indeksoi();
            var tul = AjaKellot(a, 0, 30, 900, t => 11.95 + t / 3600);
            var tasa = tul.FindAll(x => x.K.Tasatunti);
            Oleta.Sama(1, tasa.Count, "tasatunnilla kerran");
            double odotus = 180 + KaupunkiAanet.LyontienJalkeenS(12);
            Oleta.Tosi(Math.Abs(tasa[0].T - odotus) <= 2 * Dt, $"tasatunnin kello {tasa[0].T:F1} s (odotus {odotus:F1})");
            Oleta.Tosi(KaupunkiAanet.LyontienJalkeenS(12) > 12 * 2.6 && KaupunkiAanet.LyontienJalkeenS(1) < KaupunkiAanet.LyontienJalkeenS(12), "lyöntien jälkeen");
            foreach (var (t, k) in tul) if (!k.Tasatunti && t > tasa[0].T) Oleta.Tosi(t - tasa[0].T >= KaupunkiAanet.KelloValiMinS - 1e-6, "satunnainen ≥ 3 min tasatunnin jälkeen");
            // Kaukana tasatunnilla: ei kelloa myöhemminkään (kerran, enintään minuutin ehto).
            var b = Tyhja(9); b.Kirkot.Add((60, 0)); b.Indeksoi();
            for (double t = 0; t < 900; t += Dt)
            {
                double kx = t < 300 ? 2000 : 0;
                b.Paivita(t, Dt, kx, 0, 30, 11.95 + t / 3600, false);
                foreach (var k in b.Kerrat) Oleta.Tosi(!k.Tasatunti, "tasatunnin kello vanhenee minuutissa");
            }
        }

        [Testi] static void SuihkulahteidenValintaJaHaivytys()
        {
            var a = Tyhja(3);
            for (int i = 0; i < 6; i++) a.Suihkulahteet.Add((i * 50.0, 10));
            a.Indeksoi();
            var ed = new Dictionary<int, double>(); int vaihtoja = 0; var nahdyt = new HashSet<int>();
            for (double t = 0; t < 80; t += Dt)
            {
                double kx = -50 + t * 4;   // 4 m/s lähteiden ohi
                a.Paivita(t, Dt, kx, 0, 20, 12, false);
                int taysia = 0;
                Oleta.Tosi(a.Suihkut.Count <= 2 * KaupunkiAanet.SuihkujaEnintaan, "enintään 2 soi + 2 häipyy");
                var nyt = new Dictionary<int, double>();
                foreach (var s in a.Suihkut)
                {
                    nyt[s.Piste] = s.Taso; nahdyt.Add(s.Piste);
                    if (s.Osuus >= 1) taysia++;
                    Oleta.Sama(a.SuihkuTunnus(s.Piste), s.Tunnus, "tunnus pisteen siemenestä");
                    double e = ed.TryGetValue(s.Piste, out var x) ? x : 0;
                    Oleta.Tosi(Math.Abs(s.Taso - e) <= PalloKaupunkiAanet.SuihkuTaso * (Dt / KaupunkiAanet.SuihkuHaivytysS) + 0.01, $"ei hyppyä ({e:F3} → {s.Taso:F3})");
                    if (!ed.ContainsKey(s.Piste)) { vaihtoja++; Oleta.Tosi(s.Osuus <= Dt / KaupunkiAanet.SuihkuHaivytysS + 1e-9, "alkaa hiljaa"); }
                }
                foreach (var kv in ed) if (!nyt.ContainsKey(kv.Key)) Oleta.Tosi(kv.Value <= PalloKaupunkiAanet.SuihkuTaso * Dt / KaupunkiAanet.SuihkuHaivytysS + 0.01, $"loppuu hiljaa ({kv.Value:F3})");
                Oleta.Tosi(taysia <= KaupunkiAanet.SuihkujaEnintaan, "täysiä enintään kaksi");
                ed = nyt;
            }
            Oleta.Tosi(nahdyt.Count == 6 && vaihtoja >= 6, $"kaikki kuuluvat vuorollaan ({nahdyt.Count}, {vaihtoja} alkua)");
            var isot = 0; for (int i = 0; i < 40; i++) if (a.SuihkuTunnus(i) == PalloKaupunkiAanet.SuihkuIso) isot++;
            Oleta.Tosi(isot >= 8 && isot <= 32, $"iso ja pieni molemmat ({isot}/40 isoja)");
            var k = Tyhja(3); k.Suihkulahteet.Add((0, 0)); k.Indeksoi();
            for (double t = 0; t < 5; t += Dt) k.Paivita(t, Dt, 300, 0, 20, 12, false);
            Oleta.Sama(0, k.Suihkut.Count, "yli 120 m: ei suihkua");
        }

        static string Satamat => "{\"reitit\":[{\"tyyppi\":\"lautta\",\"kiertava\":false,\"p\":[[0,40,2.5],[900,40,2.5]]}," +
            "{\"tyyppi\":\"lautta\",\"kiertava\":false,\"p\":[[10,45,2.5],[60,-30,2.5],[120,-30,2.5]]},{\"tyyppi\":\"vene\",\"kiertava\":true,\"p\":[[-50,0,2],[0,90,2]]}," +
            "{\"tyyppi\":\"lautta\",\"kiertava\":false,\"p\":[[200,0,2.5],[2000,0,2.5]]}]}";

        static string AjaSatamat(int siemen, double korkeus = 30)
        {
            var a = KaupunkiAanet.Lue(Satamat, siemen);
            var ed = new Dictionary<int, double>(); var s = new System.Text.StringBuilder(); var nahdyt = new HashSet<int>();
            for (double t = 0; t < 120; t += Dt)
            {
                double kx = -100 + t * 3;   // 3 m/s laitureiden ohi
                a.Paivita(t, Dt, kx, 0, korkeus, 12, false);
                var nyt = new Dictionary<int, double>(); int taysia = 0;
                foreach (var x in a.Satamat)
                {
                    nyt[x.Piste] = x.Taso; nahdyt.Add(x.Piste); if (x.Osuus >= 1) taysia++;
                    Oleta.Sama(PalloKaupunkiAanet.SatamaVesi, x.Tunnus);
                    Oleta.Sama(a.Laiturit[x.Piste].Y, x.Y, "vesipinta paketista");
                    double e = ed.TryGetValue(x.Piste, out var v) ? v : 0;
                    Oleta.Tosi(Math.Abs(x.Taso - e) <= PalloKaupunkiAanet.SatamaTaso * Dt / KaupunkiAanet.SuihkuHaivytysS + 0.01, $"ei hyppyä ({e:F3} → {x.Taso:F3})");
                    s.Append($"{t:F1}:{x.Piste}:{x.Taso:F4};");
                }
                foreach (var kv in ed) if (!nyt.ContainsKey(kv.Key)) Oleta.Tosi(kv.Value <= PalloKaupunkiAanet.SatamaTaso * Dt / KaupunkiAanet.SuihkuHaivytysS + 0.01, "loppuu hiljaa");
                Oleta.Tosi(taysia <= KaupunkiAanet.SuihkujaEnintaan && a.Satamat.Count <= 2 * KaupunkiAanet.SuihkujaEnintaan, "enintään 2 kerrallaan");
                ed = nyt;
            }
            if (korkeus <= KaupunkiAanet.KorkeusRajaM) Oleta.Tosi(nahdyt.Count >= 3, $"laiturit vuorollaan ({nahdyt.Count})");
            return s.ToString();
        }

        [Testi] static void SatamaVesiLaitureissaJaHaivytys()
        {
            var a = KaupunkiAanet.Lue(Satamat, 1);
            Oleta.Sama(5, a.Laiturit.Count, "edestakaisten reittien päät, lähekkäiset yhdistetty (< 40 m), kiertävä ohi");
            string s1 = AjaSatamat(4), s2 = AjaSatamat(4);
            Oleta.Tosi(s1.Length > 100 && s1 == s2, "deterministinen");
            Oleta.Sama("", AjaSatamat(4, KaupunkiAanet.KorkeusRajaM + 10), "kamera yli 150 m: ei satamaa");
            var k = KaupunkiAanet.Lue(Satamat, 1);
            for (double t = 0; t < 5; t += Dt) k.Paivita(t, Dt, 500, 500, 20, 12, false);
            Oleta.Sama(0, k.Satamat.Count, "yli 120 m laiturista: ei");
        }

        static KaupunkiAanet Kahvilat(int baareja, int kahviloita)
        {
            var a = Tyhja(4);
            for (int i = 0; i < kahviloita; i++) a.Kahvilat.Add((20 + 15 * i, 30, i < baareja));
            a.Indeksoi();
            return a;
        }

        static double[] Taustat(KaupunkiAanet a, double tunti, double korkeus = 30, bool sorina = false, double kesto = 20, double kx = 0)
        {
            double maxAskel = 0; var ed = (double[])a.Tausta.Clone();
            for (double t = 0; t < kesto; t += Dt)
            {
                a.Paivita(t, Dt, kx, 0, korkeus, tunti, sorina);
                for (int i = 0; i < a.Tausta.Length; i++) { maxAskel = Math.Max(maxAskel, Math.Abs(a.Tausta[i] - ed[i])); ed[i] = a.Tausta[i]; }
            }
            Oleta.Tosi(maxAskel <= 1.0 * Dt / KaupunkiAanet.TaustaLiukuS + 1e-9, $"tausta liukuu ≥ 2 s (askel {maxAskel:F4})");
            return a.Tausta;
        }

        static int I(string tunnus) => Array.IndexOf(KaupunkiAanet.TaustaTunnukset, tunnus);

        [Testi] static void KahvilataustaBaariIllallaJaMaitovaahdotin()
        {
            var paiva = Taustat(Kahvilat(1, 6), 12);
            Oleta.Tosi(paiva[I(PalloKaupunkiAanet.KahvilaRauhallinen)] > 0.1 && paiva[I(PalloKaupunkiAanet.KahvilaBaari)] < 1e-6, "päivällä rauhallinen");
            var ilta = Taustat(Kahvilat(1, 6), 19);
            Oleta.Tosi(ilta[I(PalloKaupunkiAanet.KahvilaBaari)] > 0.1 && ilta[I(PalloKaupunkiAanet.KahvilaRauhallinen)] < 1e-6, "illalla baari");
            var baarit = Taustat(Kahvilat(4, 6), 12);
            Oleta.Tosi(baarit[I(PalloKaupunkiAanet.KahvilaBaari)] > 0.1, "baarien enemmistö: baari päivälläkin");
            var harva = Taustat(Kahvilat(0, 2), 12);
            Oleta.Sama(0.0, harva[I(PalloKaupunkiAanet.KahvilaRauhallinen)], "alle 3 kahvilaa: ei taustaa");
            var tihea = Taustat(Kahvilat(0, 9), 12)[I(PalloKaupunkiAanet.KahvilaRauhallinen)];
            Oleta.Tosi(tihea > Taustat(Kahvilat(0, 4), 12)[I(PalloKaupunkiAanet.KahvilaRauhallinen)], "tiheämpi kovempi");
            Oleta.Tosi(Taustat(Kahvilat(0, 6), 12, 120)[I(PalloKaupunkiAanet.KahvilaRauhallinen)] < Taustat(Kahvilat(0, 6), 12, 30)[I(PalloKaupunkiAanet.KahvilaRauhallinen)], "korkealta hiljempaa");
            Oleta.Tosi(Taustat(Kahvilat(0, 6), 12, 200)[I(PalloKaupunkiAanet.KahvilaRauhallinen)] == 0, "yli korkeusrajan: ei taustaa");
            // Maitovaahdotin: vain cafésta (l = 0), alle 100 m, väli 2–4 min.
            var m = Kahvilat(3, 6); var ajat = new List<double>();
            for (double t = 0; t < 3600; t += Dt)
            {
                m.Paivita(t, Dt, 0, 0, 20, 12, false);
                foreach (var k in m.Kerrat)
                    if (k.Tunnus == PalloKaupunkiAanet.Maitovaahdotin)
                    {
                        ajat.Add(t);
                        Oleta.Tosi(Math.Abs(k.X - (20 + 15 * 3)) < 1e-9 && k.EtaisyysM < KaupunkiAanet.MaitoM && k.Taso > 0, $"lähin café ({k.X}, {k.EtaisyysM:F0} m)");
                    }
            }
            Oleta.Tosi(ajat.Count >= 14 && ajat.Count <= 31, $"tunnissa {ajat.Count} maitovaahdotinta");
            for (int i = 1; i < ajat.Count; i++) Oleta.Tosi(ajat[i] - ajat[i - 1] >= KaupunkiAanet.MaitoValiMinS - 1e-6 && ajat[i] - ajat[i - 1] <= KaupunkiAanet.MaitoValiMaxS + Dt, "väli 2–4 min");
            var b = Kahvilat(6, 6);
            for (double t = 0; t < 1200; t += Dt) { b.Paivita(t, Dt, 0, 0, 20, 12, false); foreach (var k in b.Kerrat) Oleta.Tosi(k.Tunnus != PalloKaupunkiAanet.Maitovaahdotin, "baarista ei maitovaahdotinta"); }
        }

        [Testi] static void ToriHiljeneeSorinanAikanaJaHallit()
        {
            string json = "{\"aukiot\":[{\"x\":40,\"z\":0,\"ala\":0,\"tori\":1},{\"x\":-40,\"z\":0,\"ala\":800,\"tori\":0},{\"x\":0,\"z\":900,\"ala\":2500,\"tori\":0}]," +
                "\"hallit\":[{\"x\":0,\"z\":-30,\"k\":1,\"t\":1},{\"x\":2000,\"z\":0,\"k\":1,\"t\":0},{\"x\":3000,\"z\":0,\"k\":0,\"t\":0}]}";
            var a = KaupunkiAanet.Lue(json, 1);
            Oleta.Sama(3, a.Torit.Count, "tori = 1, ala > 2000 m² ja ulkotori; pieni aukio ei");
            Oleta.Sama(3, a.Hallit.Count);
            double ilman = Taustat(KaupunkiAanet.Lue(json, 1), 12)[I(PalloKaupunkiAanet.ToriUlko)];
            double sorina = Taustat(KaupunkiAanet.Lue(json, 1), 12, 30, true)[I(PalloKaupunkiAanet.ToriUlko)];
            Oleta.Tosi(ilman > 0.1, $"tori-ulko {ilman:F3}");
            Oleta.Tosi(Math.Abs(sorina / ilman - PalloKaupunkiAanet.ToriSorinaKerroin) < 0.01, $"sorinan aikana −6 dB ({20 * Math.Log10(sorina / ilman):F1} dB)");
            Oleta.Sama(0.0, Taustat(KaupunkiAanet.Lue(json, 1), 12, 30, false, 20, 500)[I(PalloKaupunkiAanet.ToriUlko)], "yli 120 m torista: ei");
            // Kauppakeskus 30 m:n päässä, kamera 30 m:ssä: −12 dB; yli 80 m:n korkeudelta ei.
            var h = Taustat(KaupunkiAanet.Lue(json, 1), 12);
            Oleta.Tosi(h[I(PalloKaupunkiAanet.Kauppakeskus)] > 0 && h[I(PalloKaupunkiAanet.Kauppakeskus)] <= PalloKaupunkiAanet.HalliTaso && h[I(PalloKaupunkiAanet.Kauppahalli)] == 0, "katettu kauppakeskus");
            Oleta.Sama(0.0, Taustat(KaupunkiAanet.Lue(json, 1), 12, 100)[I(PalloKaupunkiAanet.Kauppakeskus)], "kamera yli 80 m: ei hallia");
            var kh = Taustat(KaupunkiAanet.Lue(json, 1), 12, 30, false, 20, 2000);
            Oleta.Tosi(kh[I(PalloKaupunkiAanet.Kauppahalli)] > 0 && kh[I(PalloKaupunkiAanet.Kauppakeskus)] == 0, "katettu marketplace: kauppahalli");
            Oleta.Sama(0.0, Taustat(KaupunkiAanet.Lue(json, 1), 12, 30, false, 20, 3000)[I(PalloKaupunkiAanet.Kauppahalli)], "ulkotori ei ole halli");
            Oleta.Tosi(Taustat(KaupunkiAanet.Lue(json, 1), 12, 30, false, 20, 3000)[I(PalloKaupunkiAanet.ToriUlko)] > 0.1, "ulkotori soi tori-ulkona");
        }

        static List<(double T, Ohiajot.Ohiajo O)> AjaVeneet(int siemen, double kesto = 1800)
        {
            // Kamera (0, 60, 0); veneet joella z = 50 itään 6 m/s ja z = −80 länteen 4 m/s.
            var x = new List<(double X, double Z, double V)>();
            for (int i = 0; i < 6; i++) x.Add((-2000 + i * 700, 50, 6));
            for (int i = 0; i < 4; i++) x.Add((1800 - i * 900, -80, -4));
            var o = new Ohiajot(siemen, true); var tul = new List<(double, Ohiajot.Ohiajo)>(); double soiAsti = -1;
            for (double t = 0; t < kesto; t += Dt)
            {
                o.Aloita(t);
                for (int i = 0; i < x.Count; i++)
                {
                    var (bx, bz, v) = x[i]; bx += v * Dt; if (Math.Abs(bx) > 2200) bx = -Math.Sign(v) * 2200; x[i] = (bx, bz, v);
                    o.Ehdokas(i, false, bx, -60, bz, v, 0, 0);
                }
                var r = o.Valitse(t < soiAsti);
                if (r != null) { tul.Add((t, r)); soiAsti = t + 9; }
            }
            return tul;
        }

        [Testi] static void VeneOhiHuipunVerranEnnen()
        {
            var tul = AjaVeneet(7);
            Oleta.Tosi(tul.Count >= 12, $"30 min: {tul.Count} vene-ohia");
            string ed = null; int osuu = 0;
            for (int i = 0; i < tul.Count; i++)
            {
                var (t, o) = tul[i];
                Oleta.Sama(Ohiajot.Laji.Vene, o.Laji);
                Oleta.Tosi(Array.IndexOf(PalloKaupunkiAanet.VeneOhi, o.Tunnus) >= 0 && o.Tunnus != ed, "vene-ohi, ei samaa peräkkäin"); ed = o.Tunnus;
                Oleta.Tosi(o.AikaS <= PalloKaupunkiAanet.VeneHuippuS + 0.05 && o.AikaS >= 0, $"alkaa ennen lähintä kohtaa ({o.AikaS:F2} s)");
                if (o.AikaS >= PalloKaupunkiAanet.VeneHuippuS - 0.15) osuu++;
                Oleta.Tosi(o.Taso > 0 && o.Taso <= PalloKaupunkiAanet.VeneTaso, "taso");
                if (i > 0) Oleta.Tosi(t - tul[i - 1].T >= Ohiajot.VeneValiMinS - 1e-6, "väli ≥ 10 s");
            }
            Oleta.Tosi(osuu >= tul.Count * 0.7, $"huippu osuu ohitukseen {osuu}/{tul.Count}");
            Oleta.Tosi(Ohiajot.VeneEnnakkoS >= PalloKaupunkiAanet.VeneHuippuS, "ennakko ≥ huippu");
            var b = AjaVeneet(7);
            Oleta.Tosi(b.Count == tul.Count && b.TrueForAll(x => tul.Exists(y => y.T == x.T && y.O.Tunnus == x.O.Tunnus)), "deterministinen");
            Oleta.Tosi(Array.IndexOf(Ohiajot.VeneTyypit, "vene") >= 0 && Array.IndexOf(Ohiajot.VeneTyypit, "hoyrylaiva") < 0 && Array.IndexOf(VeneMallit.Tyypit, Ohiajot.VeneTyypit[0]) >= 0, "pienet veneet");
        }

        static string Kulku(int siemen)
        {
            var a = Tyhja(siemen);
            for (int i = 0; i < 4; i++) { a.Kirkot.Add((i * 300.0, 50)); a.Suihkulahteet.Add((i * 300.0 + 40, -20)); }
            for (int i = 0; i < 30; i++) a.Kahvilat.Add((i * 40.0, 20, i % 3 == 0));
            a.Indeksoi();
            var s = new System.Text.StringBuilder();
            for (double t = 0; t < 2400; t += Dt)
            {
                a.Paivita(t, Dt, t * 0.5, 0, 40, 17.9 + t / 3600, t % 100 < 10);
                foreach (var k in a.Kerrat) s.Append($"{t:F1}:{k.Tunnus}@{k.X:F0};");
                if (Math.Abs(t % 60) < 1e-6) { foreach (var x in a.Suihkut) s.Append($"s{x.Piste}:{x.Taso:F4};"); foreach (var x in a.Tausta) s.Append($"{x:F4},"); }
            }
            return s.ToString();
        }

        [Testi] static void DeterministinenSiemenesta()
        {
            string a = Kulku(21), b = Kulku(21), c = Kulku(22);
            Oleta.Tosi(a.Length > 200 && a == b, "sama siemen → sama kulku");
            Oleta.Tosi(a != c, "eri siemen → eri kulku");
        }

        [Testi] static void PaketeissaUudetKentatJaMuutEnnallaan()
        {
            foreach (var id in new[] { "pariisi", "tukholma" })
            {
                string polku = $"Assets/Matkakirja/Linssit/Resources/Elava/elava-{id}.json";
                string teksti = System.IO.File.ReadAllText("../" + polku);
                var a = KaupunkiAanet.Lue(teksti, 1);
                Oleta.Tosi(a.Kirkot.Count >= 150 && a.Suihkulahteet.Count >= 100 && a.Kahvilat.Count >= 800 && a.Hallit.Count >= 40 && a.Torit.Count >= 40,
                    $"{id}: kirkot {a.Kirkot.Count}, suihkut {a.Suihkulahteet.Count}, kahvilat {a.Kahvilat.Count}, hallit {a.Hallit.Count}, torit {a.Torit.Count}");
                Oleta.Tosi(a.Laiturit.Count >= 10, $"{id}: laitureita {a.Laiturit.Count}");
                int baareja = 0; foreach (var k in a.Kahvilat) if (k.Baari) baareja++;
                Oleta.Tosi(baareja > 0 && baareja < a.Kahvilat.Count, $"{id}: baareja {baareja}");
                Oleta.Tosi(teksti.EndsWith("]}") && teksti.IndexOf(",\"kirkot\":", StringComparison.Ordinal) > 0, "uudet kentät lopussa");
                // Muut kentät tavu tavulta: alku ennen ",\"kirkot\":" on sama kuin masterissa (ilman loppusulkua, jos masterissa ei vielä ole kenttiä).
                var p = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("git", $"show master:{polku}") { RedirectStandardOutput = true, UseShellExecute = false, WorkingDirectory = ".." });
                string master = p.StandardOutput.ReadToEnd(); p.WaitForExit();
                if (p.ExitCode != 0 || master.Length < 1000) { Console.WriteLine($"  (git show master:{polku} ei onnistunut, vertailu ohitettu)"); continue; }
                int mi = master.IndexOf(",\"kirkot\":", StringComparison.Ordinal), ti = teksti.IndexOf(",\"kirkot\":", StringComparison.Ordinal);
                string mAlku = mi > 0 ? master.Substring(0, mi) : master.TrimEnd().Substring(0, master.TrimEnd().Length - 1);
                Oleta.Tosi(teksti.Substring(0, ti) == mAlku, $"{id}: muut kentät ennallaan ({mAlku.Length} merkkiä)");
                foreach (var avain in new[] { "\"kadut\":", "\"reitit\":", "\"parvet\":", "\"piiput\":", "\"liput\":", "\"aukiot\":", "\"krediitti\":" })
                    Oleta.Tosi(teksti.Substring(0, ti).Contains(avain), $"{id}: {avain} tallella");
            }
        }
    }
}
