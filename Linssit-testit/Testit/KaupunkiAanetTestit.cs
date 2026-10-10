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
            Oleta.Sama(4 + 9, m.Aanet.Count, "tyhjä tunnus ohitetaan, satama-vesi ja kaupunki-pisteet-v1:n 9 liitetään");
            Oleta.Sama("https://media.matkakirja.app/aanet/kaupunki-pisteet-v1/pyoran-kello-02.mp3", m.Aanet["pisteet-pyoran-kello-02"].Osoite, "pisteäänen oma tunnus, tiedosto pankista");
            Oleta.Sama("https://media.matkakirja.app/aanet/sonniss-aanet-v4/satama-vesi.mp3", m.Aanet[PalloKaupunkiAanet.SatamaVesi].Osoite, "erillinen ääni omasta juuresta");
            Oleta.Tosi(m.Aanet[PalloKaupunkiAanet.SatamaVesi].Silmukka, "satama-vesi silmukka");
            Oleta.Sama("x.mp3", PalloKaupunkiAanet.Lue("{\"aanet\":[{\"tunnus\":\"satama-vesi\",\"aani\":\"x.mp3\"}]}").Aanet[PalloKaupunkiAanet.SatamaVesi].Polku, "manifestin rivi voittaa");
            Oleta.Tosi(m.Aanet["tori-ulko"].Silmukka && !m.Aanet["kirkonkello-01"].Silmukka, "silmukka-kenttä");
            Oleta.Sama(PalloKaupunkiAanet.Juuri + "tori-ulko.mp3", m.Aanet["tori-ulko"].Osoite);
            Oleta.Sama("tehosteet", m.Aanet["kahvila-maitovaahdotin"].Ryhma);
            var kaikki = new HashSet<string>(PalloKaupunkiAanet.Tunnukset());
            Oleta.Sama(17 + 9, kaikki.Count, "manifestin 17 ääntä − vaki-sisatila-sorina + satama-vesi + kaupunki-pisteet-v1 (6 astiaa, 3 pyörän kelloa)");
            Oleta.Tosi(!kaikki.Contains(PalloKaupunkiAanet.SisatilaSorina), "sisätilan sorina ei ladata");
            foreach (var t in kaikki)
            {
                Oleta.Sama(t == PalloKaupunkiAanet.Maitovaahdotin || System.Array.IndexOf(PalloKaupunkiAanet.KahvilaAstiat, t) >= 0 ? "tehosteet" : "maisema", PalloKaupunkiAanet.MikseriAani(t).Ryhma, t);
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
            Oleta.Sama(2, mk.AanetRyhmassa("pallo", "tehosteet").Count);
            Oleta.Sama(9 + 1, mk.AanetRyhmassa("pallo", "maisema").Count, "+ pyörän kello (lisä)");
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
            Oleta.Sama(PalloKaupunkiAanet.KirkkoTaso, PalloKaupunkiAanet.KirkkoTaso * PalloElavaAanet.Etaisyystaso(45, KaupunkiAanet.KirkkoTaysiM, KaupunkiAanet.KirkkoHiljaM), "täysi 50 m:ssä");
            Oleta.Tosi(PalloElavaAanet.Etaisyystaso(250, KaupunkiAanet.KirkkoTaysiM, KaupunkiAanet.KirkkoHiljaM) == 0, "hiljaa 250 m:ssä");
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
            double odotus = 180 + KaupunkiAanet.LyontienJalkeenS(12, PalloSoundlyAanet.LyontiVali(60, 0, 9));
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
            for (int i = 0; i < kahviloita; i++) a.Kahvilat.Add((20 + 6 * i, 30, i < baareja));   // 6 m:n välein: yhdeksän mahtuu 80 m:n säteelle
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
                        Oleta.Tosi(Math.Abs(k.X - (20 + 6 * 3)) < 1e-9 && k.EtaisyysM < KaupunkiAanet.MaitoM && k.Taso > 0, $"lähin café ({k.X}, {k.EtaisyysM:F0} m)");
                    }
            }
            Oleta.Tosi(ajat.Count >= 14 && ajat.Count <= 31, $"tunnissa {ajat.Count} maitovaahdotinta");
            for (int i = 1; i < ajat.Count; i++) Oleta.Tosi(ajat[i] - ajat[i - 1] >= KaupunkiAanet.MaitoValiMinS - 1e-6 && ajat[i] - ajat[i - 1] <= KaupunkiAanet.MaitoValiMaxS + Dt, "väli 2–4 min");
            var b = Kahvilat(6, 6);
            for (double t = 0; t < 1200; t += Dt) { b.Paivita(t, Dt, 0, 0, 20, 12, false); foreach (var k in b.Kerrat) Oleta.Tosi(k.Tunnus != PalloKaupunkiAanet.Maitovaahdotin, "baarista ei maitovaahdotinta"); }
        }

        // Kahvilan astiat (kaupunki-pisteet-v1, Pelikoodari 10.10.): lähimmästä cafésta alle 40 m, väli 25–70 s, ei samaa peräkkäin;
        // kauempaa (52 m) ei astioita, mutta maitovaahdotin soi kuten ennen.
        [Testi] static void KahvilanAstiatLahelta()
        {
            var a = Kahvilat(0, 6); var ajat = new List<double>(); string ed = null;
            for (double t = 0; t < 3600; t += Dt)
            {
                a.Paivita(t, Dt, 20, 0, 10, 12, false);
                foreach (var k in a.Kerrat)
                {
                    if (Array.IndexOf(PalloKaupunkiAanet.KahvilaAstiat, k.Tunnus) < 0) continue;
                    ajat.Add(t);
                    Oleta.Tosi(k.EtaisyysM < KaupunkiAanet.AstiaM && k.Taso > 0 && k.Taso <= PalloKaupunkiAanet.AstiaTaso + 1e-9, $"astia lähellä ({k.EtaisyysM:F0} m)");
                    Oleta.Tosi(k.Tunnus != ed, "ei samaa astiaa peräkkäin"); ed = k.Tunnus;
                }
            }
            Oleta.Tosi(ajat.Count >= 45 && ajat.Count <= 150, $"tunnissa {ajat.Count} astiaääntä");
            for (int i = 1; i < ajat.Count; i++) Oleta.Tosi(ajat[i] - ajat[i - 1] >= KaupunkiAanet.AstiaValiMinS - 1e-6, "väli ≥ 25 s");
            var kaukana = Kahvilat(3, 6); int astioita = 0, maitoja = 0;
            for (double t = 0; t < 1800; t += Dt)
            {
                kaukana.Paivita(t, Dt, 0, 0, 20, 12, false);
                foreach (var k in kaukana.Kerrat) { if (Array.IndexOf(PalloKaupunkiAanet.KahvilaAstiat, k.Tunnus) >= 0) astioita++; if (k.Tunnus == PalloKaupunkiAanet.Maitovaahdotin) maitoja++; }
            }
            Oleta.Sama(0, astioita, "52 m:n päästä ei astioita");
            Oleta.Tosi(maitoja >= 6, "maitovaahdotin ennallaan");
            Oleta.Tosi(Array.IndexOf(Matkakirja.Linssit.Elava.IhmisAanet.PyoranKellot, PalloKaupunkiAanet.PyoranKelloPisteet[2]) >= 0, "pisteiden pyörän kellot IhmisAanetin sarjassa");
            var ih = Matkakirja.Linssit.Elava.IhmisAanet.Lue("{\"kadut\":[{\"p\":[[0,0],[100,0]]}]}", 3);
            ih.Paivita(0, 50, 5, 10); ih.Pakota("pyora");
            var pk = ih.Paivita(1, 50, 5, 10);
            Oleta.Tosi(pk != null && Array.IndexOf(PalloKaupunkiAanet.PyoranKelloPisteet, pk.Tunnus) >= 0, "pakotettu pyörän kello pisteistä: " + pk?.Tunnus);
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

        /// <summary>
        /// KERTOJAN ALLA (PT 9.10.: "uudet pisteäänet asettuvat kertojan alle samoin kuin 3058fb964:ssä"): pahin tapaus (lähde täydellä
        /// tasolla, puhe soi → väistö) mitatuista leikevoimakkuuksista (kultaiset/pallo-kaupunkiaanet-tasot-20261009.json) ja ketjusta
        /// OpasAanitasot.Maisema × lähteen taso. Tapahtumat (kello, vene, maitovaahdotin) momentaarihuippu ≥ 6 dB ja taustat
        /// integroitu ≥ 10 dB kertojan alla, kuten PalloKaupungitTestit.AanitasotKaikissaKaupungeissa.
        /// </summary>
        [Testi] static void KertojanAllaKutenMuutPallonAanet()
        {
            string Polku(string n) => System.IO.Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n);
            var g = (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna(System.IO.File.ReadAllText(Polku("pallo-kaupunkiaanet-tasot-20261009.json")));
            var k = (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna(System.IO.File.ReadAllText(Polku("pallo-aanitasot-20261008.json")));
            double L(Dictionary<string, object> d, string lahde, string kentta) => Convert.ToDouble(((Dictionary<string, object>)d[lahde])[kentta], System.Globalization.CultureInfo.InvariantCulture);
            double Db(double x) => 20 * Math.Log10(Math.Max(1e-9, x));
            double kertoja = L(k, "kertoja", "integroitu_lufs") + Db(OpasAanitasot.Kertoja(0.9));
            double ihm = 1 + IhmisAanet.Vaihtelu;   // IhmisAanet: taso ±5 %
            var tapahtumat = new[] { ("kirkonkello", PalloKaupunkiAanet.KirkkoTaso), ("vene_ohi", PalloKaupunkiAanet.VeneTaso), ("maitovaahdotin", PalloKaupunkiAanet.MaitoTaso),
                // Soundly-erä 1 (juna 173); lyönnit soivat päällekkäin edellisen soimisen kanssa → varaus LyontiPaallekkainDb.
                ("lokki_huuto", PalloSoundlyAanet.LokkiTaso), ("kyyhky_kujerrus", PalloSoundlyAanet.KujerrusTaso), ("kyyhky_siivet", PalloSoundlyAanet.SiivetTaso),
                ("kello_lyonti", PalloSoundlyAanet.LyontiTaso * Math.Pow(10, PalloSoundlyAanet.LyontiPaallekkainDb / 20)), ("raitiovaunu_kello", PalloSoundlyAanet.RaitioKelloTaso),
                ("pyora_kello", IhmisAanet.KelloTaso * ihm), ("laivan_torvi", IhmisAanet.TorviTaso * ihm) };
            var taustat = new[] { ("lokki_parvi", PalloSoundlyAanet.LokkiParviTaso), ("kahvila", PalloKaupunkiAanet.KahvilaTaso), ("tori", PalloKaupunkiAanet.ToriTaso), ("suihkulahde", PalloKaupunkiAanet.SuihkuTaso), ("satama", PalloKaupunkiAanet.SatamaTaso), ("halli", PalloKaupunkiAanet.HalliTaso) };
            foreach (var (n, taso) in tapahtumat)
            {
                double m = kertoja - (L(g, n, "momentaari_max_lufs") + Db(OpasAanitasot.Maisema(taso, true)));
                Console.WriteLine($"      {n}: {m:F1} dB kertojan alla (tapahtuma, ≥ 6)");
                Oleta.Tosi(m >= 6, $"{n}: {m:F1} dB kertojan alla (≥ 6)");
            }
            foreach (var (n, taso) in taustat)
            {
                double m = kertoja - (L(g, n, "integroitu_lufs") + Db(OpasAanitasot.Maisema(taso, true)));
                Console.WriteLine($"      {n}: {m:F1} dB kertojan alla (tausta, ≥ 10)");
                Oleta.Tosi(m >= 10, $"{n}: {m:F1} dB kertojan alla (≥ 10)");
            }
        }
        // ---- SOUNDLY-ERÄ 1 (juna 173) ----

        [Testi] static void SoundlyManifestiJaTunnukset()
        {
            var m = PalloSoundlyAanet.Lue("{\"aanet\":[{\"tunnus\":\"laivan-torvi-01\",\"aani\":\"laivan-torvi-01.mp3\",\"silmukka\":false,\"aihe\":\"laivan-torvi\",\"tyyppi\":\"pisteaani\"}," +
                "{\"tunnus\":\"lokki-parvi\",\"aani\":\"lokki-parvi.mp3\",\"silmukka\":true,\"kesto_s\":25},{\"tunnus\":\"pyora-kello-04\",\"aani\":\"pyora-kello-04.mp3\"}]}");
            Oleta.Tosi(m.Aanet.ContainsKey("soundly-laivan-torvi-01") && !m.Aanet.ContainsKey("laivan-torvi-01"), "v2:n kanssa päällekkäinen tunnus etuliitteellä");
            Oleta.Sama(PalloSoundlyAanet.Juuri + "laivan-torvi-01.mp3", m.Aanet["soundly-laivan-torvi-01"].Osoite, "tiedosto alkuperäisellä nimellä");
            Oleta.Tosi(m.Aanet["lokki-parvi"].Silmukka && m.Aanet.ContainsKey("pyora-kello-04"), "muut sellaisenaan");
            var kaikki = new HashSet<string>(PalloSoundlyAanet.Tunnukset());
            Oleta.Sama(28, kaikki.Count, "28 ääntä");
            var muut = new HashSet<string>(PalloElavaAanet.Tunnukset()); muut.UnionWith(PalloKaupunkiAanet.Tunnukset());
            foreach (var t in kaikki) { Oleta.Tosi(!muut.Contains(t), "ei päällekkäin: " + t); Oleta.Sama("maisema", PalloSoundlyAanet.MikseriAani(t).Ryhma, t); }
            Oleta.Sama("elava.pyoran-kello", PalloSoundlyAanet.MikseriAani("pyora-kello-02").Id, "pyörän kello samaan ääneen kuin v2");
            Oleta.Sama("elava.laivan-torvi", PalloSoundlyAanet.MikseriAani("soundly-laivan-torvi-03").Id);
            Oleta.Sama("kaupunki.kello", PalloSoundlyAanet.MikseriAani("kello-lyonti-c-01").Id, "lyönnit kaupungin kellonlyönteihin");
        }

        [Testi] static void TuntilyonnitNKertaaKirkonKellolla()
        {
            const int S = 9;
            foreach (var (alku, n) in new[] { (14.95, 3), (11.95, 12), (0.95, 1) })
            {
                var a = Tyhja(S); a.Kirkot.Add((60, 0)); a.Indeksoi();
                var l = new List<(double T, KaupunkiAanet.Kerta K)>(); double heiluva = double.NaN;
                for (double t = 0; t < 300; t += Dt)
                {
                    a.Paivita(t, Dt, 0, 0, 30, alku + t / 3600, false);
                    foreach (var k in a.Kerrat)
                    {
                        if (k.Lyonti > 0) l.Add((t, k));
                        else if (k.Tasatunti) heiluva = t;
                    }
                }
                double vali = PalloSoundlyAanet.LyontiVali(60, 0, S);
                Oleta.Sama(n, l.Count, $"klo {alku + 0.05:F0}: {n} lyöntiä");
                for (int i = 0; i < l.Count; i++)
                {
                    Oleta.Sama(i + 1, l[i].K.Lyonti);
                    Oleta.Sama(PalloSoundlyAanet.KirkonKello(60, 0, S), l[i].K.Tunnus, "kirkon oma kello");
                    Oleta.Tosi(l[i].K.X == 60 && l[i].K.Taso > 0, "lähimmästä kirkosta");
                    if (i > 0) Oleta.Tosi(Math.Abs(l[i].T - l[i - 1].T - vali) <= Dt + 1e-9, $"väli {l[i].T - l[i - 1].T:F2} s (kirkon {vali:F2} s)");
                }
                Oleta.Tosi(vali >= 2.5 && vali <= 3.0, "väli 2,5–3 s");
                Oleta.Tosi(heiluva >= l[l.Count - 1].T + KaupunkiAanet.LyontiSoiS - 3 * vali - Dt && heiluva > l[l.Count - 1].T, $"heiluvat kellot lyöntien jälkeen ({heiluva:F1} s)");
            }
            var kaukana = Tyhja(S); kaukana.Kirkot.Add((60, 0)); kaukana.Indeksoi();
            for (double t = 0; t < 300; t += Dt) { kaukana.Paivita(t, Dt, 400, 0, 30, 11.95 + t / 3600, false); foreach (var k in kaukana.Kerrat) Oleta.Tosi(k.Lyonti == 0, "kirkko yli 250 m: ei lyöntejä"); }
            // Kello a–d paikan siemenestä: kaikki neljä esiintyvät, sama kirkko = sama kello.
            var kellot = new Dictionary<string, int>();
            for (int i = 0; i < 200; i++) { string k = PalloSoundlyAanet.KirkonKello(i * 137.3, -i * 71.9, S); kellot[k] = kellot.TryGetValue(k, out var c) ? c + 1 : 1; Oleta.Sama(k, PalloSoundlyAanet.KirkonKello(i * 137.3, -i * 71.9, S)); }
            Oleta.Sama(4, kellot.Count, "kellot a–d");
            foreach (var kv in kellot) Oleta.Tosi(kv.Value >= 25, $"{kv.Key}: {kv.Value}/200");
        }

        static (List<(double, double, double)> L, List<(double, double)> A) Linnut => (new List<(double, double, double)> { (0, 90, 2), (2000, 0, 2) }, new List<(double, double)> { (20, -10), (3000, 0) });

        static List<(double T, SoundlyAanet.Tapahtuma E)> AjaLinnut(int siemen, double korkeus, Func<double, (double X, double Y, double Z, bool K)?> parvi, Func<double, (double X, double Z)?> raitio = null, double kesto = 1800)
        {
            var (l, a) = Linnut; var s = new SoundlyAanet(siemen, l, a); var tul = new List<(double, SoundlyAanet.Tapahtuma)>();
            for (double t = 0; t < kesto; t += Dt)
            {
                s.Aloita(t, 0, korkeus, 0, korkeus);
                var p = parvi(t); if (p.HasValue) s.Parvi(7, p.Value.X, p.Value.Y, p.Value.Z, p.Value.K);
                var r = raitio?.Invoke(t); if (r.HasValue) s.Raitio(3, r.Value.X, 0, r.Value.Z);
                s.Valitse(Dt);
                foreach (var e in s.Kerrat) tul.Add((t, e));
            }
            return tul;
        }

        static void Valit(List<(double T, SoundlyAanet.Tapahtuma E)> l, double min, double max, string nimi)
        {
            string ed = null;
            for (int i = 0; i < l.Count; i++)
            {
                if (i > 0) Oleta.Tosi(l[i].T - l[i - 1].T >= min - 1e-6 && l[i].T - l[i - 1].T <= max + Dt, $"{nimi}: väli {l[i].T - l[i - 1].T:F1} s");
                Oleta.Tosi(l[i].E.Tunnus != ed && l[i].E.Taso > 0, $"{nimi}: ei samaa peräkkäin, taso"); ed = l[i].E.Tunnus;
            }
        }

        [Testi] static void LokkihuudotParvissaJaLaitureilla()
        {
            // Lokkiparvi kiertää 80 m:n päässä 30 m:n korkeudella: huudot parvessa (Avain), väli 6–20 s.
            var p = AjaLinnut(5, 20, t => (80 * Math.Cos(t / 30), 30, 80 * Math.Sin(t / 30), false));
            var lokit = p.FindAll(x => x.E.Laji == SoundlyAanet.Laji.Lokki);
            Oleta.Tosi(lokit.Count >= 90 && lokit.Count <= 300, $"30 min: {lokit.Count} huutoa");
            Valit(lokit, SoundlyAanet.LokkiValiMinS, SoundlyAanet.LokkiValiMaxS, "lokki");
            foreach (var (_, e) in lokit) Oleta.Tosi(e.Avain == 7 && Array.IndexOf(PalloSoundlyAanet.LokkiHuuto, e.Tunnus) >= 0, "parvessa");
            // Ei parvea: laiturilla (0, 90), vain matalalla; korkealla ja kaukana ei mitään.
            var la = AjaLinnut(5, 20, t => null).FindAll(x => x.E.Laji == SoundlyAanet.Laji.Lokki);
            Oleta.Tosi(la.Count >= 90 && la.TrueForAll(x => x.E.Avain == -1 && x.E.X == 0 && x.E.Z == 90), $"laiturilla {la.Count}");
            Oleta.Sama(0, AjaLinnut(5, 200, t => null, null, 600).Count, "kamera 200 m: ei lintuja");
            Oleta.Sama(0, AjaLinnut(5, 20, t => (900.0, 30.0, 0.0, false), null, 600).FindAll(x => x.E.Laji == SoundlyAanet.Laji.Lokki && x.E.Avain == 7).Count, "parvi 900 m: ei huutoja parvesta");
            // lokki-parvi-tausta: matalalla veden äärellä hiljaa, korkealla ei.
            var (l, a) = Linnut;
            foreach (var (k, odotus) in new[] { (20.0, true), (120.0, false) })
            {
                var s = new SoundlyAanet(5, l, a); double ed = 0, maxAskel = 0;
                for (double t = 0; t < 20; t += Dt) { s.Aloita(t, 0, k, 0, k); s.Valitse(Dt); maxAskel = Math.Max(maxAskel, Math.Abs(s.LokkiParvi - ed)); ed = s.LokkiParvi; }
                Oleta.Tosi(odotus ? s.LokkiParvi > 0.05 && s.LokkiParvi <= PalloSoundlyAanet.LokkiParviTaso : s.LokkiParvi == 0, $"lokki-parvi {k} m: {s.LokkiParvi:F3}");
                Oleta.Tosi(maxAskel <= Dt / KaupunkiAanet.TaustaLiukuS + 1e-9, "liukuu");
            }
        }

        [Testi] static void KyyhkytAukioillaJaParvissa()
        {
            var au = AjaLinnut(8, 15, t => null).FindAll(x => x.E.Laji == SoundlyAanet.Laji.Kyyhky);
            Oleta.Tosi(au.Count >= 50 && au.Count <= 150, $"aukio 30 min: {au.Count}");
            Valit(au, SoundlyAanet.KyyhkyValiMinS, SoundlyAanet.KyyhkyValiMaxS, "kyyhky");
            int siivet = au.FindAll(x => Array.IndexOf(PalloSoundlyAanet.KyyhkySiivet, x.E.Tunnus) >= 0).Count;
            Oleta.Tosi(au.TrueForAll(x => x.E.Avain == -1 && x.E.X == 20) && siivet > 0 && siivet < au.Count / 2, $"aukiolla, kujerrus useimmiten ({siivet}/{au.Count} siivet)");
            var pa = AjaLinnut(8, 15, t => (5.0, 8.0, 10.0, true)).FindAll(x => x.E.Laji == SoundlyAanet.Laji.Kyyhky);
            int ps = pa.FindAll(x => Array.IndexOf(PalloSoundlyAanet.KyyhkySiivet, x.E.Tunnus) >= 0).Count;
            Oleta.Tosi(pa.TrueForAll(x => x.E.Avain == 7) && ps > siivet * pa.Count / (double)au.Count, $"parvessa siivet useammin ({ps}/{pa.Count})");
            Oleta.Sama(0, AjaLinnut(8, 80, t => null).FindAll(x => x.E.Laji == SoundlyAanet.Laji.Kyyhky).Count, "kamera 80 m: ei kyyhkyjä");
        }

        [Testi] static void RaitiovaununKelloHarvoin()
        {
            // Raitiovaunu kulkee edestakaisin 40 m:n päässä; kello 1–3 min välein, vain alle 150 m.
            var r = AjaLinnut(2, 20, t => null, t => (300 * Math.Sin(t / 60), 40.0), 3600).FindAll(x => x.E.Laji == SoundlyAanet.Laji.Raitio);
            Oleta.Tosi(r.Count >= 12 && r.Count <= 70, $"tunnissa {r.Count} raitiovaunun kelloa");
            for (int i = 1; i < r.Count; i++) Oleta.Tosi(r[i].T - r[i - 1].T >= SoundlyAanet.RaitioValiMinS - 1e-6, "väli ≥ 1 min");
            foreach (var (_, e) in r) Oleta.Tosi(e.Avain == 3 && e.EtaisyysM < SoundlyAanet.RaitioKelloM && Array.IndexOf(PalloSoundlyAanet.RaitioKello, e.Tunnus) >= 0, "näkyvässä raitiovaunussa, lähellä");
            Oleta.Sama(0, AjaLinnut(2, 20, t => null, t => (400.0, 0.0), 1200).FindAll(x => x.E.Laji == SoundlyAanet.Laji.Raitio).Count, "400 m: ei kelloa");
        }

        [Testi] static void TorvetHarvoinJaIsoVesiPyoranKellot()
        {
            string json = "{\"kadut\":[{\"t\":\"tertiary\",\"p\":[[0,-50],[300,-50]]}],\"reitit\":[" +
                "{\"tyyppi\":\"saaristolaiva\",\"kiertava\":false,\"p\":[[0,100,1],[20000,100,1]]},{\"tyyppi\":\"lautta\",\"kiertava\":false,\"p\":[[-100,0,1],[-900,0,1]]}]}";
            var h = IhmisAanet.Lue(json, 4);
            Oleta.Sama(2, h.IsoVesi.Count, "saaristolaivan reitin päät isoa vettä");
            var torvet = new List<(double T, IhmisAanet.Tapahtuma E)>(); int soundlyKello = 0, kelloja = 0;
            for (double t = 0; t < 4 * 3600; t += 0.5)
            {
                var e = h.Paivita(t, 0, 0, 50); if (e == null) continue;
                if (Array.IndexOf(IhmisAanet.TorvetIso, e.Tunnus) >= 0) torvet.Add((t, e));
                if (Array.IndexOf(IhmisAanet.PyoranKellot, e.Tunnus) >= 0) { kelloja++; if (Array.IndexOf(PalloSoundlyAanet.PyoraKello, e.Tunnus) >= 0) soundlyKello++; }
            }
            Oleta.Tosi(torvet.Count >= 6 && torvet.Count <= 24, $"4 h: {torvet.Count} torvea");
            for (int i = 1; i < torvet.Count; i++) Oleta.Tosi(torvet[i].T - torvet[i - 1].T >= IhmisAanet.TorviValiMinS - 1e-6, "torvi ≥ 10 min välein");
            foreach (var (_, e) in torvet)
                if (Array.IndexOf(PalloSoundlyAanet.TorviIso, e.Tunnus) >= 0) Oleta.Tosi(e.Z == 100, "torvet 01–02 vain isolla vedellä");
            Oleta.Tosi(torvet.Exists(x => Array.IndexOf(PalloSoundlyAanet.TorviIso, x.E.Tunnus) >= 0), "iso torvi kuuluu");
            Oleta.Tosi(soundlyKello > 0 && soundlyKello < kelloja, $"pyörän kellot sekaisin ({soundlyKello}/{kelloja} Soundly)");
            var s = IhmisAanet.Lue(json, 4); s.Saatavilla = t => !t.StartsWith(PalloSoundlyAanet.Etuliite) && !t.StartsWith("pyora-");
            for (double t = 0; t < 3600; t += 0.5) { var e = s.Paivita(t, 0, 0, 50); if (e != null) Oleta.Tosi(!e.Tunnus.StartsWith(PalloSoundlyAanet.Etuliite) && !e.Tunnus.StartsWith("pyora-"), "lataamaton suodatetaan: " + e.Tunnus); }
        }

        [Testi] static void SoundlyDeterministinen()
        {
            string Kulku(int siemen)
            {
                var sb = new System.Text.StringBuilder();
                foreach (var (t, e) in AjaLinnut(siemen, 15, x => (60 * Math.Cos(x / 20), 25, 60 * Math.Sin(x / 20), (int)(x / 300) % 2 == 0), x => (200 * Math.Sin(x / 40), 30.0), 1200))
                    sb.Append($"{t:F1}:{e.Tunnus}@{e.Avain}:{e.Taso:F4};");
                return sb.ToString();
            }
            string a = Kulku(31), b = Kulku(31), c = Kulku(32);
            Oleta.Tosi(a.Length > 200 && a == b && a != c, "sama siemen → sama kulku, eri siemen → eri");
        }
    }
}
