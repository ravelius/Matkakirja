// Ajattelijat: data Resources/Ajattelijat/*.json (webistä tyokalut/ajattelijat-natiiviin.mjs), webin tarkistaAjattelija,
// aikajana ja taustavirran arvonta webin luvuin (odotetut arvot laskettu webin ajattelija.js:n kaavoilla nodella 2.10.).
// v14 (3.10.2026, web 088b64d0c): Sokrates on aikajana-tilassa (kierrokset eivät ole käytössä), joten kierrosmoottorin
// testit ajetaan Marcuksella (natiivin Marcus on vielä v11-datassa: samat ruudut ja avaimet kuin Sokrateen v11).
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Ajattelijat;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class AjattelijatTestit
    {
        const string Kansio = "../Assets/Matkakirja/Linssit/Resources/Ajattelijat/";

        static AjattelijaData Lue(string tunnus)
        {
            var (d, virhe) = AjattelijaData.Jasenna(File.ReadAllText(Kansio + tunnus + ".json"));
            Oleta.Tosi(d != null, tunnus + ": " + virhe);
            return d;
        }

        [Testi] static void KaikkiAjattelijatKelpaavat()
        {
            var tiedostot = Directory.GetFiles(Kansio, "*.json");
            Oleta.Tosi(tiedostot.Length >= 2, "vähintään Sokrates ja Marcus");
            foreach (var f in tiedostot)
            {
                var o = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(f)));
                var puuttuu = AjattelijaData.Tarkista(o);
                Oleta.Tosi(puuttuu.Count == 0, Path.GetFileName(f) + ": " + string.Join(", ", puuttuu));
                var d = AjattelijaData.Lue(o);
                Oleta.Sama(Path.GetFileNameWithoutExtension(f), d.Tunnus, "tiedostonimi = tunnus");
                Oleta.Tosi(File.Exists(Kansio + Path.GetFileName(d.Atlas.Tiedosto) + ".bytes"), "atlas " + d.Atlas.Tiedosto);
                int lisa = d.Aikajana != null ? d.Aikajana.Tykit.Count : d.Kierrokset?.Lista.Count ?? 0;
                Oleta.Sama(1 + d.Taustavirta.Rivit.Count + lisa, d.Atlas.Paikat.Count, "atlaksen rivit");
            }
        }

        [Testi] static void TarkistusHylkaaVajaanKutenWeb()
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Kansio + "sokrates.json")));
            o.Remove("kysymys");
            ((System.Collections.Generic.Dictionary<string, object>)o["taustavirta"]).Remove("nopeus");   // web #3891: nopeus.mms > 0
            ((System.Collections.Generic.Dictionary<string, object>)o["kaiku"]).Remove("kamera");
            o["pulunKysymykset"] = new System.Collections.Generic.List<object>();
            var puuttuu = AjattelijaData.Tarkista(o);
            Oleta.Tosi(puuttuu.SequenceEqual(new[] { "kysymys", "taustavirta", "kaiku", "pulunKysymykset" }), string.Join(", ", puuttuu));
            Oleta.Sama("tunnus", AjattelijaData.Tarkista(null).Single());
        }

        [Testi] static void SokratesLuetaanWebinLuvuin()
        {
            var a = Lue("sokrates");
            Oleta.Sama("Tutkimaton elämä ei ole elämisen arvoinen ihmiselle.", a.Paalause.Fi);
            Oleta.Sama("Platon, Puolustuspuhe 38a", a.Paalause.Viite);
            Oleta.Sama(1352.0, a.Ajat.Pito);   // v14: v12 − 540 (käytössä vain ilman aikajanaa)
            Oleta.Sama(75.0, a.Prologi.Loppu);   // v14: 2,5 s
            Oleta.Sama(3, a.Prologi.Valot.Count);   // v14: kolmas reunavalo päälaelle
            Oleta.Sama(6, a.IntroOtokset.Count);
            Oleta.Sama(7, a.Elama.Count);
            Oleta.Sama(5, a.PulunKysymykset.Count);
            Oleta.Tosi(a.Kaiku != null && a.Kaiku.KameraMatka[1] == 0.14, "kaiun kamera");
            Oleta.Sama("Sokrates", a.NimiRivit.Single());
            Oleta.Sama(2, Lue("marcus").NimiRivit.Count);
        }

        [Testi] static void SiemenlukuOnWebinMulberry32()
        {
            var s = AjattelijaAikajana.Siemenluku(38);
            foreach (var odotettu in new[] { 0.720611231169, 0.848281288985, 0.066060572164 })
                Oleta.Tosi(Math.Abs(s() - odotettu) < 1e-11, "mulberry32(38)");
        }

        [Testi] static void TaustavirtaOnWebinArvonta()
        {
            var v = AjattelijaAikajana.Taustavirta(Lue("sokrates"));
            Oleta.Sama(20, v.Count);
            // (rivi, korkeus, kirkkaus, vM, kulma, nopeus uv/ruutu, mm/s) webin asetaVirta (088b64d0c, v14: riviKoko 0,6,
            // riviTila 2, 80 px:n nauha) nodella natiivin atlaksen paikoista 3.10.; kirkkaudet ja asettelu ennallaan (sama siemen).
            var odotetut = new[]
            {
                (0, 0.009, 0.267322949637, -0.101083351336, -0.0578257875064, -0.00393099719785575, 27.1710526316),
                (4, 0.0054, 0.106924289309, 0.0607134358166, -0.120095068305, -0.01926632807423652, 22.8289473684),
                (7, 0.0054, 0.117068000645, -0.0373129654754, 0.106374477445, 0.02242714805677388, 24.8026315789),
                (19, 0.0054, 0.18325603181, 0.0497238574733, 0.0350482896975, 0.0064564804662118275, 26.7763157895),
            };
            foreach (var (i, k, kir, vm, ku, n, mms) in odotetut)
            {
                var r = v[i];
                Oleta.Tosi(r.I == i + 1 && Math.Abs(r.Korkeus - k) < 1e-12 && Math.Abs(r.Kirkkaus - kir) < 1e-10 && Math.Abs(r.VM - vm) < 1e-10
                    && Math.Abs(r.Kulma - ku) < 1e-10 && Math.Abs(r.Nopeus - n) < 1e-13 && Math.Abs(r.Mms - mms) < 1e-9,
                    $"rivi {i}: {r.Korkeus} {r.Kirkkaus} {r.VM} {r.Kulma} {r.Nopeus} {r.Mms}");
            }
            // Lähes sama tahti pinnalla: 21,25–28,75 mm/s (v10:n 0,0007 × 1,18^k teki 4,5–102 mm/s).
            Oleta.Tosi(Math.Abs(v.Min(r => r.Mms) - 21.25) < 1e-9 && Math.Abs(v.Max(r => r.Mms) - 28.75) < 1e-9, "25 mm/s ±15 %");
            var a = Lue("sokrates");
            Oleta.Tosi(a.Taustavirta.Mms == 25 && a.Taustavirta.Vaihtelu == 0.15, "nopeus { mms: 25, vaihtelu: 0.15 }");
            // Kierroksen 3 siemen 49 ja Marcus (eri koot → eri uv-nopeus, sama mm/s).
            var r49 = AjattelijaAikajana.Taustavirta(Lue("marcus"), 49)[4];
            Oleta.Tosi(Math.Abs(r49.Mms - 28.75) < 1e-9, "siemen 49: " + r49.Mms);
            var m7 = AjattelijaAikajana.Taustavirta(Lue("marcus"))[7];
            Oleta.Tosi(m7.Korkeus == 0.012 && Math.Abs(m7.Nopeus - 0.00322950932018) < 1e-13, "Marcus rivi 7: " + m7.Nopeus);
            // Projektorit 6 + 5 + 3 + 3 + 3 riviä.
            Oleta.Sama(6, v.Count(r => r.Projektori == 0));
            Oleta.Sama(3, v.Count(r => r.Projektori == 4));
        }

        [Testi] static void AikajanaVaiheet()
        {
            var a = Lue("marcus");   // kierrosmoottori (v11-data; Sokrates on v14:stä lähtien aikajana-tilassa)
            Oleta.Sama(0.0, AjattelijaAikajana.Hehku(a.Prologi, 29));
            Oleta.Sama(1.0, AjattelijaAikajana.Hehku(a.Prologi, 60));
            Oleta.Tosi(AjattelijaAikajana.Hehku(a.Prologi, 44) is var h && h > 0.15 && h < 0.4, "hehkulanka");
            Oleta.Sama(KameraVaihe.Intro, AjattelijaAikajana.Kamera(a, 1).Vaihe);
            Oleta.Sama(2, AjattelijaAikajana.Kamera(a, 57).Otos);
            Oleta.Sama(5, AjattelijaAikajana.Kamera(a, 270).Otos);
            Oleta.Sama(KameraVaihe.Rembrandt, AjattelijaAikajana.Kamera(a, 320).Vaihe);
            var l = AjattelijaAikajana.Kamera(a, 508.5);
            Oleta.Tosi(l.Vaihe == KameraVaihe.Lahesty && Math.Abs(l.K - 0.5) < 1e-9, "lähestymisen puoliväli");
            var k = AjattelijaAikajana.Kamera(a, 965);
            Oleta.Tosi(k.Vaihe == KameraVaihe.Kaari && k.Osuus == 1, "kaaren loppu");
            var kk = AjattelijaAikajana.Kamera(a, 1100);
            Oleta.Tosi(kk.Vaihe == KameraVaihe.Kaiku && kk.K == 1 && kk.Osuus > 0.18 && kk.Osuus < 0.22, "kaiku " + kk.Osuus);
            // Tekstit, vinjetti, hiipuminen, vieritys ja virta.
            Oleta.Sama(0.0, AjattelijaAikajana.Nakyvyys(281, a.Ajat.Nimi));
            Oleta.Sama(1.0, AjattelijaAikajana.Nakyvyys(320, a.Ajat.Nimi));
            Oleta.Tosi(AjattelijaAikajana.Vinjetti(a.Ajat, 470) && !AjattelijaAikajana.Vinjetti(a.Ajat, 482), "vinjetti");
            Oleta.Sama(0.0, AjattelijaAikajana.Hiipuu(a, 1100));
            Oleta.Sama(1.0, AjattelijaAikajana.Hiipuu(a, 900));
            Oleta.Sama(0.0, AjattelijaAikajana.VieritysTeho(a.Ajat, 524));
            Oleta.Sama(1.0, AjattelijaAikajana.VieritysTeho(a.Ajat, 700));
            Oleta.Tosi(Math.Abs(AjattelijaAikajana.VieritysSiirto(a.Ajat, 710, 0.8)) < 1e-9, "vierityksen puoliväli");
            Oleta.Sama(1.0, AjattelijaAikajana.VirtaVoima(a.Taustavirta, 700));
            Oleta.Sama(0.0, AjattelijaAikajana.VirtaVoima(a.Taustavirta, 950));
            var g = AjattelijaAikajana.Globaali(a, 120 + 3330);
            Oleta.Tosi(!g.prologi && g.ruutu == 3330 && g.loppu, "kierrosten loppu → lappu");
            Oleta.Tosi(AjattelijaAikajana.Globaali(a, 60).prologi, "prologi");
            var s = AjattelijaAikajana.AuringonSuunta(a, 282);
            var r = AjattelijaAikajana.Normaali(a.AvainSuunta);
            Oleta.Tosi(Math.Abs(s[0] - r[0]) + Math.Abs(s[1] - r[1]) + Math.Abs(s[2] - r[2]) < 1e-9, "intron lopussa Rembrandt");
        }

        // ── Kierrokset 2– (web #3884, tests/ajattelija-kierrokset.test.mjs) ──────────────────────────────

        [Testi] static void KierroksetLuetaanJsonista()
        {
            var kr = Lue("sokrates").Kierrokset;
            Oleta.Tosi(kr != null, "Sokrateen kierrokset");
            Oleta.Sama(3232.0, kr.Loppu);   // v14: v12 − 540 (aikajana-tilassa ei käytössä)
            Oleta.Tosi(kr.Lista.Select(k => k.PaalauseAvain).SequenceEqual(new[] { "21d", "49b" }), "päälauseet");
            Oleta.Tosi(kr.Lista.Select(k => k.Vieritys).SequenceEqual(new[] { new[] { 1382.0, 1657 }, new[] { 2232.0, 2497 } }, new Vertaa()), "vieritys");
            Oleta.Tosi(kr.Lista.Select(k => k.Kaiku.Ruudut).SequenceEqual(new[] { new[] { 1772.0, 2202 }, new[] { 2557.0, 3152 } }, new Vertaa()), "kaiut");
            Oleta.Tosi(kr.Lista.Select(k => k.Siemen).SequenceEqual(new uint[] { 21, 49 }), "siemenet");
            Oleta.Tosi(kr.Lista.Select(k => k.AtlasRivi).SequenceEqual(new[] { 21, 22 }), "atlasrivit taustavirran jälkeen");
            Oleta.Sama(1352.0, kr.Kamera[0].R);
            Oleta.Sama(11, kr.Kamera.Count);
            Oleta.Tosi(kr.Puhe.EndsWith("kierrokset-puhe.mp3") && kr.Syke.EndsWith("syke-kierrokset.json"), "kierrosten raidat");
            // 21d poskelle edestä, 49b kasvojen sivulle säteellä sivulta (sokrates_bysti.py sivulta(-0.08, 0.375)).
            var l21 = kr.Lista[0].Lause; var l49 = kr.Lista[1].Lause;
            Oleta.Tosi(l21.Sade.SequenceEqual(new[] { -0.055, 0.352 }) && l21.Sivulta == null, "21d edestä");
            Oleta.Tosi(l49.Sivulta.SequenceEqual(new[] { -0.08, 0.375 }) && l49.Sade == null, "49b sivulta");
            Oleta.Sama("Platon, Kriton 49b", l49.Viite);
            var k2 = kr.Lista[0].Kaiku; var k3 = kr.Lista[1].Kaiku;
            Oleta.Tosi(k2.KohdeSade.SequenceEqual(new[] { 0.040, 0.374 }) && k2.KohdeSivulta == null && k2.Voima == 15, "kylix silmämunaan");
            Oleta.Tosi(k3.KohdeSivulta.SequenceEqual(new[] { -0.08, 0.375 }) && k3.TayteSuunta[1] == 0.75, "David kasvojen sivulle");
            // Valinnaiset kentät puuttuvat (blend, sävy) → kierroksen 1 kaiusta näyttämöllä.
            Oleta.Tosi(double.IsNaN(k2.Blend) && k2.Savy == null, "blend ja sävy kierroksen 1 kaiusta");
        }

        sealed class Vertaa : System.Collections.Generic.IEqualityComparer<double[]>
        {
            public bool Equals(double[] x, double[] y) => x.SequenceEqual(y);
            public int GetHashCode(double[] x) => x.Length;
        }

        [Testi] static void KierrostenTarkistusKutenWeb()
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Kansio + "sokrates.json")));
            var kr = (System.Collections.Generic.Dictionary<string, object>)o["kierrokset"];
            var lista = (System.Collections.Generic.List<object>)kr["lista"];
            ((System.Collections.Generic.Dictionary<string, object>)lista[0])["paalause"] = "puuttuu";
            ((System.Collections.Generic.Dictionary<string, object>)lista[1]).Remove("virta");
            Oleta.Tosi(AjattelijaData.Tarkista(o).SequenceEqual(new[] { "kierrokset.lista[0].paalause", "kierrokset.lista[1].virta" }),
                string.Join(", ", AjattelijaData.Tarkista(o)));
            kr["loppu"] = 1300.0;   // ennen pitoa (v14: 1352); kameran viimeinen avain ei ole loppu
            var p = AjattelijaData.Tarkista(o);
            Oleta.Tosi(p.Contains("kierrokset.aani/loppu") && p.Contains("kierrokset.kamera"), string.Join(", ", p));
            o.Remove("kierrokset");   // aikajana-tilassa atlaksen lisärivit ovat lainauksia, joten kierroksia ei tarvita
            Oleta.Tosi(AjattelijaData.Tarkista(o).Count == 0, string.Join(", ", AjattelijaData.Tarkista(o)));
            o.Remove("aikajana");   // ilman aikajanaa atlakseen jää viisi ylimääräistä riviä
            Oleta.Tosi(AjattelijaData.Tarkista(o).SequenceEqual(new[] { "atlas" }), string.Join(", ", AjattelijaData.Tarkista(o)));
        }

        [Testi] static void KierrosRuudulle()
        {
            var a = Lue("marcus");   // kierrosmoottori (Marcuksen v11-kierrokset: samat ruudut kuin Sokrateen v11)
            // Kierros vaihtuu kierroksen virran alussa (web kierrosRuudussa: r ≥ alku).
            Oleta.Sama(0, AjattelijaAikajana.KierrosRuudussa(a, 1449));
            Oleta.Sama(1, AjattelijaAikajana.KierrosRuudussa(a, 1450));
            Oleta.Sama(1, AjattelijaAikajana.KierrosRuudussa(a, 2299.9));
            Oleta.Sama(2, AjattelijaAikajana.KierrosRuudussa(a, 2300));
            Oleta.Sama(2, AjattelijaAikajana.KierrosRuudussa(a, 3330));
            // Kohtaus jatkuu pidosta loppuun; lappu vasta lopussa (web LOPPU).
            var g = AjattelijaAikajana.Globaali(a, 120 + 1450);
            Oleta.Tosi(!g.prologi && g.ruutu == 1450 && !g.loppu, "pito ei ole enää loppu");
            g = AjattelijaAikajana.Globaali(a, 120 + 4000);
            Oleta.Tosi(g.ruutu == 3330 && g.loppu, "loppu 3330 → lappu");
            Oleta.Tosi(!AjattelijaAikajana.Globaali(a, 120 + 3329).loppu, "ennen loppua");
            // Kamera: pito kuuluu kierrokseen 1, sen jälkeen avaimet.
            Oleta.Sama(KameraVaihe.Kaiku, AjattelijaAikajana.Kamera(a, 1450).Vaihe);
            Oleta.Sama(KameraVaihe.Kierrokset, AjattelijaAikajana.Kamera(a, 1451).Vaihe);
            // Aurinko hiipuu jokaisen kaiun ajaksi (45 ruutua kummassakin päässä); kierroksen 1 kaiku ennallaan.
            Oleta.Sama(1.0, AjattelijaAikajana.Hiipuu(a, 1500));
            Oleta.Sama(0.0, AjattelijaAikajana.Hiipuu(a, 1100));
            Oleta.Sama(0.0, AjattelijaAikajana.Hiipuu(a, 2000));
            Oleta.Tosi(Math.Abs(AjattelijaAikajana.Hiipuu(a, 1870 + 22.5) - 0.5) < 1e-12, "kylixin häivytys");
            Oleta.Tosi(Math.Abs(AjattelijaAikajana.Hiipuu(a, 3250 - 9) - 0.8) < 1e-12, "Davidin häivytys");
            Oleta.Sama(1.0, AjattelijaAikajana.Hiipuu(a, 2300));
            // Kierroksen ajat: vieritys, virta ja kaiun liuku.
            var k3 = a.Kierrokset.Lista[1];
            Oleta.Sama(0.0, AjattelijaAikajana.VieritysTeho(k3.Vieritys, 2329));
            Oleta.Sama(1.0, AjattelijaAikajana.VieritysTeho(k3.Vieritys, 2400));
            Oleta.Sama(1.0, AjattelijaAikajana.VirtaVoima(k3.Virta, 2400));
            Oleta.Sama(0.0, AjattelijaAikajana.VirtaVoima(k3.Virta, 2650));
            Oleta.Tosi(Math.Abs(AjattelijaAikajana.KaikuSiirto(k3.Kaiku.Liuku, k3.Kaiku.Ruudut, 2952.5)) < 1e-12, "kaiun liu'un puoliväli");
            // Taustavirta kierroksen siemenellä: samat 20 riviä, eri asettelu.
            var v1 = AjattelijaAikajana.Taustavirta(a);
            var v3 = AjattelijaAikajana.Taustavirta(a, k3.Siemen);
            Oleta.Tosi(v3.Count == 20 && v1.Zip(v3, (x, y) => x.Rivi == y.Rivi && x.Projektori == y.Projektori).All(b => b), "samat rivit");
            Oleta.Tosi(v1.Zip(v3, (x, y) => x.Kulma != y.Kulma).Any(b => b), "eri siemen");
        }

        static AjattelijaOtos Avain(double r, double x, double mm) => new AjattelijaOtos { R = r, Paikka = new[] { x, 0, 0 }, Katse = new[] { 0.0, 0, 0 }, Mm = mm };

        [Testi] static void KamerakayraHermiteAutoClamped()
        {
            // Webin testi sellaisenaan.
            var k = AjattelijaAikajana.Kamerakayra(new[] { Avain(0, 0, 35), Avain(10, 1, 18), Avain(20, 1, 18), Avain(30, 3, 50) });
            Oleta.Sama(0.0, k(0).Paikka[0]);
            Oleta.Sama(18.0, k(10).Mm);
            Oleta.Sama(1.0, k(20).Paikka[0]);
            Oleta.Sama(1.0, k(15).Paikka[0]);   // kaksi samaa avainta → ei ylitystä
            Oleta.Tosi(k(5).Paikka[0] > 0 && k(5).Paikka[0] < 1, "nousu");
            Oleta.Sama(3.0, k(40).Paikka[0]);   // lopun jälkeen viimeinen avain
            // Ääriarvossa ja päissä vaaka; muualla naapurien välinen kulmakerroin (3 − 0) / 20.
            var h = AjattelijaAikajana.Kamerakayra(new[] { Avain(0, 0, 35), Avain(10, 2, 35), Avain(20, 1, 35), Avain(30, 3, 35) });
            double D(Func<double, AjattelijaOtos> f, double r) => (f(r + 1e-5).Paikka[0] - f(r - 1e-5).Paikka[0]) / 2e-5;
            Oleta.Tosi(Math.Abs(D(h, 10)) < 1e-6 && Math.Abs(D(h, 20)) < 1e-6, "ääriarvot vaakana " + D(h, 10) + " " + D(h, 20));
            Oleta.Tosi(Math.Abs(D(h, 1e-5)) < 1e-3 && Math.Abs(D(h, 30 - 1e-5)) < 1e-3, "päät vaakana");
            var m = AjattelijaAikajana.Kamerakayra(new[] { Avain(0, 0, 35), Avain(10, 1, 35), Avain(20, 3, 35) });
            Oleta.Tosi(Math.Abs(D(m, 10) - 0.15) < 1e-6, "kulmakerroin " + D(m, 10));
            // Sokrateen avaimet: avaimissa tarkka, paluu Rembrandt-otokseen ja webin arvot välillä (node, web cb61902f0 v11-avaimet;
            // v14:n avaimet ovat samat 98 ruutua aiemmin: v12 + 442, v14 − 540).
            var a = Lue("sokrates");
            var s = AjattelijaAikajana.Kamerakayra(a.Kierrokset.Kamera);
            foreach (var av in a.Kierrokset.Kamera)
            {
                var o = s(av.R);
                Oleta.Tosi(o.Paikka.Zip(av.Paikka, (x, y) => Math.Abs(x - y)).Max() < 1e-12 && o.Katse.Zip(av.Katse, (x, y) => Math.Abs(x - y)).Max() < 1e-12
                    && Math.Abs(o.Mm - av.Mm) < 1e-12, "avain " + av.R);
            }
            Oleta.Tosi(s(3232).Paikka.SequenceEqual(a.Rembrandt.Paikka), "paluu Rembrandt-otokseen");
            var webista = new (double r, double[] paikka, double[] katse, double mm)[]
            {
                (1480, new[] { -0.0341, -0.20935, 0.36595 }, new[] { -0.02995, -0.1156, 0.385 }, 26.5),
                (2000, new[] { 0.06048316415728251, -0.18519287658665917, 0.38110597957874587 }, new[] { 0.04, -0.1083, 0.374 }, 50),
                (2330, new[] { 0.07897418367346938, -0.1584851020408163, 0.3268 }, new[] { 0.05376642857142857, -0.09611214285714287, 0.3745 }, 34),
                (3280, new[] { -0.05565901639344262, -0.59205, 0.29464999999999997 }, new[] { 0.006200000000000004, -0.06800409836065574, 0.3875 }, 35),
            };
            foreach (var (r, p, q, mm) in webista)
            {
                var o = s(r - 98);
                Oleta.Tosi(o.Paikka.Zip(p, (x, y) => Math.Abs(x - y)).Max() < 1e-12 && o.Katse.Zip(q, (x, y) => Math.Abs(x - y)).Max() < 1e-12
                    && Math.Abs(o.Mm - mm) < 1e-12, $"ruutu {r}: {string.Join(", ", o.Paikka)} / {string.Join(", ", o.Katse)} / {o.Mm}");
            }
        }

        // ── v11 (web #3892, Linnanrakentaja d7b51a99f) ja Marcuksen kierrokset ─────────────────────────────

        [Testi] static void V11AlkukuvatVarjopuolelta()
        {
            foreach (var t in new[] { "marcus" })   // Sokrateen v14-intro: tests V14Aikajana
            {
                var a = Lue(t);
                // Introkamera valon vastapuolella: x = min(−|x|, −0,22) (Sokrates ruutu 57, Marcus 51 → −0,22).
                Oleta.Tosi(a.IntroOtokset.All(o => o.Paikka[0] <= -0.22), t + ": introkamera varjopuolella");
                Oleta.Sama(-0.22, a.IntroOtokset[2].Paikka[0], t + " x-raja");
                Oleta.Tosi(a.IntroValo[0].Suunta.SequenceEqual(new[] { 1.0, -0.35, 0.45 }) && a.IntroValo[1].Suunta.SequenceEqual(new[] { 1.0, 0.05, 0.5 }),
                    t + ": intro.valo");
                Oleta.Sama(282.0, a.IntroValo[a.IntroValo.Count - 1].R);
                Oleta.Sama(0.2, a.IntroTayte);
                Oleta.Tosi(a.Kaiku.Lev == 0.07 && a.Kaiku.KameraMatka.SequenceEqual(new[] { 0.15, 0.14 }), t + ": kaiku 1 lähempänä");
                // Maailman täyte: intro.tayte alkukuvissa (r < nimi), sen jälkeen täysi (web maailma.intensity).
                Oleta.Sama(0.2, AjattelijaAikajana.MaailmaKerroin(a, a.Ajat.Nimi[0] - 1));
                Oleta.Sama(1.0, AjattelijaAikajana.MaailmaKerroin(a, a.Ajat.Nimi[0]));
            }
            var s = Lue("sokrates");
            Oleta.Tosi(s.Kierrokset.Kamera.First(k => k.R == 2602).Paikka.SequenceEqual(new[] { 0.205, -0.1767, 0.337 }), "sokrates-luvut-v11.json (v14 −98)");
            // Puuttuva intro.tayte = 1 (web ?? 1).
            var o = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Kansio + "sokrates.json")));
            ((System.Collections.Generic.Dictionary<string, object>)o["intro"]).Remove("tayte");
            Oleta.Sama(1.0, AjattelijaData.Lue(o).IntroTayte);
        }

        [Testi] static void MarcuksenKierrokset()
        {
            var m = Lue("marcus");
            var kr = m.Kierrokset;
            Oleta.Tosi(kr != null && kr.Loppu == 3330, "Marcuksen kierrokset");
            Oleta.Tosi(kr.Lista.Select(k => k.PaalauseAvain).SequenceEqual(new[] { "itselleen-4-49", "itselleen-2-11" }), "päälauseet");
            Oleta.Tosi(kr.Lista[0].Lause.Sade.SequenceEqual(new[] { -0.035, 0.360 }) && kr.Lista[1].Lause.Sivulta != null, "4.49 poskella, 2.11 sivulla");
            Oleta.Tosi(kr.Lista.Select(k => k.Kaiku.Kuva.Split('/').Last()).SequenceEqual(new[] { "kaiku-uhri.png", "kaiku-kuolema.png" }), "kaikukuvat");
            Oleta.Tosi(kr.Puhe.StartsWith("ajattelijat/marcus/v1/") && kr.Syke == "ajattelijat/marcus/v1/syke-kierrokset.json", "Marcuksen raidat");
            Oleta.Tosi(kr.Lista.Select(k => k.AtlasRivi).SequenceEqual(new[] { 21, 22 }) && m.Atlas.Paikat.Count == 23, "atlasrivit");
            Oleta.Tosi(AjattelijaAikajana.Kamerakayra(kr.Kamera)(3330).Paikka.SequenceEqual(m.Rembrandt.Paikka), "paluu Rembrandt-otokseen");
            Oleta.Tosi(AjattelijaAikajana.Globaali(m, 120 + 3330).loppu && !AjattelijaAikajana.Globaali(m, 120 + 1450).loppu, "lappu kierrosten lopussa");
        }
        // ── v14 aikajana (web 088b64d0c; odotetut arvot webin funktioilla nodella 3.10.2026) ─────────────────

        static bool Lahella(double[] x, double[] y, double eps = 1e-12) => x.Length == y.Length && x.Zip(y, (p, q) => Math.Abs(p - q)).Max() < eps;

        [Testi] static void V14AikajanaLuetaanJsonista()
        {
            var a = Lue("sokrates");
            var aj = a.Aikajana;
            Oleta.Tosi(aj != null, "Sokrates aikajana-tilassa");
            Oleta.Sama(2938.0, aj.Loppu);
            Oleta.Sama(2938.0, AjattelijaAikajana.Loppu(a));
            // Kertoja 12,0 s linssin ajassa: prologi 75 ruutua (2,5 s) + 9,5 s.
            Oleta.Sama(12.0, a.Prologi.Loppu / 30 + 9.5);
            Oleta.Tosi(a.Prologi.Kytkin == 30 && a.Prologi.Taysi == 58, "kytkin 30, täysi 58");
            Oleta.Tosi(a.Prologi.Valot[2].Paikka.SequenceEqual(new[] { 0.0, 0.35, 0.95 }) && a.Prologi.Valot[2].Teho == 60, "reuna-y päälaelle");
            Oleta.Tosi(a.Ajat.Nimi.SequenceEqual(new[] { 184.0, 249 }) && a.Ajat.Kysymys.SequenceEqual(new[] { 250.0, 338 }), "nimi 184, kysymys 250");
            // Leikkaukset iskuihin: 61 / 118 / 136 / 154 / 184 (2,0 / 3,9 / 4,5 / 5,1 / 6,1 s musiikin ajassa).
            var leikkaukset = aj.Kamera.Where(k => !k.Ajo && k.R > 60 && k.R <= 184).Select(k => k.R).ToArray();
            Oleta.Tosi(leikkaukset.SequenceEqual(new[] { 61.0, 118, 136, 154, 184 }), string.Join(" ", leikkaukset));
            Oleta.Tosi(aj.Tykit.Select(t => t.PaalauseAvain).SequenceEqual(new[] { "38a", "21d", "30e", "49b", "kysymys" }), "lainaukset");
            Oleta.Tosi(aj.Tykit.Select(t => t.AtlasRivi).SequenceEqual(new[] { 21, 22, 23, 24, 25 }), "lainausten atlasrivit taustavirran jälkeen");
            Oleta.Tosi(aj.Tykit.All(t => t.Kiintea) && aj.Tykit[0].Leveys == 0.11 && aj.Tykit[4].Leveys == 0.10522, "kortit, leveys luvuista");
            Oleta.Tosi(aj.Kortti && aj.KorttiMerkkeja == 24 && aj.KorttiLeveys == 0.11 && aj.KorttiSiirto == 0, "lauseKortti");
            Oleta.Tosi(aj.Porrastus && aj.PorrasAlku == 286 && aj.PorrasVali == 15 && aj.PorrasHaivytys == 9 && aj.PorrasRintama == 4 && aj.PorrasReuna == 0.35, "virtaPorrastus");
            Oleta.Sama(0.1, aj.VirtaVoima);
            Oleta.Tosi(aj.TykkiVari.SequenceEqual(new[] { 1.0, 1, 1 }), "tekstiprojektorit värittömiä");
            Oleta.Tosi(aj.Puhe == "ajattelijat/sokrates/v4/v14-puhe.mp3" && aj.Musiikki == "ajattelijat/sokrates/v4/v14-musiikki.mp3"
                && aj.Syke == "ajattelijat/sokrates/v4/syke-v14.json", "v4-raidat");
            Oleta.Tosi(aj.Kaiut.Count == 4 && aj.Kaiut[0].Lev == 0.1 && aj.Kaiut[0].Kork == 0.1104, "kaiut");
            Oleta.Sama(9, aj.Vaisto.Count);   // kaiut 4 + lainaukset 4 + kysymys
            Oleta.Tosi(aj.SavuKuva == "ajattelijat/sokrates/v3/savu-atlas-v5.png" && aj.SavuVahvuus == 0.95 && aj.SavuRuutuja == 240, "savu v5");
            Oleta.Tosi(aj.Rako.Count == 7 && aj.Rako[2].R == 118 && aj.Rako[2].Energia == 0.004 && aj.Rako[2].KokoY == 0.02 && aj.Rako[2].Spread == 2.2, "rakovalo");
            Oleta.Tosi(aj.Ymparisto.Select(x => x[1]).SequenceEqual(new[] { 1.0, 1, 0, 0, 1 }), "ympäristö 0 silmä- ja partakuvissa");
            Oleta.Tosi(aj.VarjolevyRuudut.SequenceEqual(new[] { 136.0, 153 }) && aj.VarjolevyKeski[2] == 0.197, "varjolevy");
            var tv = a.Taustavirta;
            Oleta.Tosi(tv.Sumeus == 0.15 && tv.RiviTila == 2 && tv.RiviKorkeus == 80 && tv.RiviKoko == 0.6, "taustavirran pehmeys");
            Oleta.Tosi(tv.Projektorit.Select(p => p.Pehmeys).SequenceEqual(new[] { 1.0, 1, 1.5, 1.3, 1.3 }), "kauemmat pehmeämpiä");
            // Kortit atlaksessa: monirivinen laatta ilman sumeaa paria.
            var kortti = a.Atlas.Paikat[21];
            Oleta.Tosi(!kortti.Sumea && kortti.Korkeus > 300 && kortti.Lev < 700, $"38a-kortti {kortti.Lev}×{kortti.Korkeus}");
            // Tarkistus kuten web: aikajanan aani ja lainauksen päälause pakollisia; atlaksen rivit lainauksista.
            var o = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Kansio + "sokrates.json")));
            var ajo = (System.Collections.Generic.Dictionary<string, object>)o["aikajana"];
            ((System.Collections.Generic.Dictionary<string, object>)ajo["aani"]).Remove("musiikki");
            ((System.Collections.Generic.Dictionary<string, object>)((System.Collections.Generic.List<object>)ajo["tykit"])[1])["paalause"] = "puuttuu";
            var p0 = AjattelijaData.Tarkista(o);
            Oleta.Tosi(p0.SequenceEqual(new[] { "aikajana.aani", "aikajana.tykit[1]" }), string.Join(", ", p0));
        }

        [Testi] static void V14KameraJaAurinkoKutenWeb()
        {
            var aj = Lue("sokrates").Aikajana;
            var k = AjattelijaAikajana.AikajanaKamera(aj.Kamera);
            var odotetut = new (double r, double[] p, double[] q, double mm)[]
            {
                (1, new[] { -0.85, 0.3, 0.52 }, new[] { 0.0, -0.04, 0.38 }, 35),
                (30, new[] { -0.8256355323572517, 0.20254212942900687, 0.5005084258858014 }, new[] { 0.0, -0.04487289352854966, 0.38 }, 35),
                (100, new[] { -0.72, -0.08, 0.35 }, new[] { 0.0, -0.08, 0.34 }, 45),   // leikkaus 61 pitää 118:aan
                (118, new[] { 0.22, -0.55, 0.445 }, new[] { 0.03, -0.12, 0.412 }, 50),
                (300, new[] { -0.29847501363442464, -1.1127996846533077, 0.26629596688712937 },
                    new[] { -0.06058908814048047, -0.06384290982920521, 0.3861570901707948 }, 37.88218237190391),
                (1065, new[] { -0.1375, -0.834, 0.4764 }, new[] { 0.0, -0.07, 0.4 }, 50),
                (1200, new[] { 0.1623910971102968, -0.5337244475722264, 0.393637188435794 },
                    new[] { 0.03474605328109611, -0.09876294992107612, 0.37455697147564526 }, 50),
            };
            foreach (var (r, p, q, mm) in odotetut)
            {
                var o = k(r);
                Oleta.Tosi(Lahella(o.Paikka, p) && Lahella(o.Katse, q) && Math.Abs(o.Mm - mm) < 1e-9, $"kamera {r}: {string.Join(", ", o.Paikka)} {o.Mm}");
            }
            var au = AjattelijaAikajana.AikajanaAurinko(aj.AurinkoKohde, aj.Aurinko);
            var aurinko = new (double r, double[] p, double e)[]
            {
                (100, new[] { 1.1294, -0.5682, 0.8253 }, 65),
                (220, new[] { 1.085549216350131, -0.4027786938571731, 1.0332113065710036 }, 95),
                (1563, new[] { 1.1156550273711683, -0.011276914294904239, 1.0482958113271146 }, 6.284999999999999),
            };
            foreach (var (r, p, e) in aurinko)
            {
                var x = au(r);
                Oleta.Tosi(Lahella(x.paikka, p) && Math.Abs(x.energia - e) < 1e-9 && x.vari.SequenceEqual(new[] { 1.0, 0.95, 0.88 }), $"aurinko {r}: {string.Join(", ", x.paikka)} {x.energia}");
            }
            // Virtakerroin ja askelavaimet (ympäristö, rako) leikkausruuduissa.
            Oleta.Tosi(Math.Abs(AjattelijaAikajana.AvainArvo(aj.Virta, 300) - 0.4666666666666667) < 1e-12 && AjattelijaAikajana.AvainArvo(aj.Virta, 1569) == 1.6
                && AjattelijaAikajana.AvainArvo(aj.Virta, 2900) == 1.8, "virtakerroin");
            Oleta.Sama(1.0, AjattelijaAikajana.AskelAvain(aj.Ymparisto, 117)[1]);
            Oleta.Sama(0.0, AjattelijaAikajana.AskelAvain(aj.Ymparisto, 118)[1]);
            Oleta.Sama(1.0, AjattelijaAikajana.AskelAvain(aj.Ymparisto, 154)[1]);
            Oleta.Sama(0.004, AjattelijaAikajana.AskelAvain(aj.Rako, 120).Energia);
            Oleta.Sama(0.03, AjattelijaAikajana.AskelAvain(aj.Rako, 140).Energia);
            Oleta.Sama(0.0, AjattelijaAikajana.AskelAvain(aj.Rako, 160).Energia);
        }

        [Testi] static void V14PorrastettuLahto()
        {
            var a = Lue("sokrates");
            var v = AjattelijaAikajana.Taustavirta(a);
            double loppu = AjattelijaAikajana.Porrastus(v, 286, 15, 9, a.Ajat.Kysymys[1]);
            Oleta.Sama(595.0, loppu);
            // Webin lähtöruudut (rivi → ruutu) ja puolet: ensimmäinen kasvojen etupuolelta 286 (12,0 s), sitten vasen, oikea, ...
            var lahdot = new[] { 286.0, 331, 391, 376, 436, 451, 466, 481, 496, 511, 526, 541, 556, 571, 301, 346, 406, 316, 361, 421 };
            Oleta.Tosi(v.Select(x => x.Lahto).SequenceEqual(lahdot), string.Join(" ", v.Select(x => x.Lahto)));
            var puolet = "AAAYYYYYYYYYYYVVVOOO";
            Oleta.Tosi(new string(v.Select(x => "AVOY"[(int)x.Puoli]).ToArray()) == puolet, "puolet");
            // Ylärivit vasta kysymyksen (250–338) jälkeen.
            Oleta.Tosi(v.Where(x => x.Puoli == VirtaPuoli.Yla).All(x => x.Lahto >= 338), "ylärivit kysymyksen jälkeen");
            // Rintama ja häivytys (web asetaAikajana): rivi 0 ja 7, 5 ja 40 ruutua lähdöstä.
            var t0 = AjattelijaAikajana.PorrasTila(v[0], 286 + 5, 9, 4, 0.35, 0, false);
            Oleta.Tosi(Math.Abs(t0.siirto - -0.019654985989278752) < 1e-15 && Math.Abs(t0.rintama - -10.03438596491228) < 1e-12
                && Math.Abs(t0.voima - 0.5555555555555556) < 1e-12, $"rivi 0: {t0}");
            var t7 = AjattelijaAikajana.PorrasTila(v[7], 481 + 40, 9, 4, 0.35, 0.5, false);
            Oleta.Tosi(Math.Abs(t7.siirto - 0.8970859222709553) < 1e-12 && Math.Abs(t7.rintama - 9.913219298245615) < 1e-12 && t7.voima == 1,
                $"rivi 7: {t7}");
            // Ennen lähtöä pimeä; kaikkien lähdettyä aikajanan kerroin sellaisenaan (myös alle 1).
            Oleta.Tosi(AjattelijaAikajana.PorrasTila(v[0], 286, 9, 4, 0.35, 1, false) == (0, 0, 0), "ennen lähtöä");
            Oleta.Sama(0.5, AjattelijaAikajana.PorrasTila(v[0], 700, 9, 4, 0.35, 0.5, true).voima);
            // Rintama sammuu, kun se on kulkenut keilan yli (etu ≤ −ala / 2).
            Oleta.Sama(0.0, AjattelijaAikajana.PorrasTila(v[0], 286 + 2000, 9, 4, 0.35, 1, true).rintama);
        }

        [Testi] static void V14KortinRivitys()
        {
            Oleta.Tosi(AjattelijaAikajana.KorttiRivit("Tutkimaton elämä ei ole elämisen arvoinen ihmiselle.", 24)
                .SequenceEqual(new[] { "Tutkimaton elämä ei", "ole elämisen arvoinen", "ihmiselle." }), "38a");
            Oleta.Tosi(AjattelijaAikajana.KorttiRivit("Olen kuin paarma, jonka jumala on kiinnittänyt suureen ja laiskaan hevoseen herättämään sitä.", 24)
                .SequenceEqual(new[] { "Olen kuin paarma, jonka", "jumala on kiinnittänyt", "suureen ja laiskaan", "hevoseen herättämään sitä." }), "30e");
            Oleta.Tosi(AjattelijaAikajana.KorttiRivit("Miten pitäisi elää?", 24).SequenceEqual(new[] { "Miten pitäisi elää?" }), "kysymys yhdellä rivillä");
            // Atlaksen kortit ovat webin piirraAtlas-kuvia samoista riveistä (tyokalut/ajattelijat-natiiviin.mjs).
            var a = Lue("sokrates");
            var ajo = (System.Collections.Generic.Dictionary<string, object>)MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Kansio + "sokrates.json")))["atlas"];
            var paikat = (System.Collections.Generic.List<object>)ajo["paikat"];
            for (int j = 0; j < a.Aikajana.Tykit.Count; j++)
            {
                var rivit = ((System.Collections.Generic.List<object>)((System.Collections.Generic.Dictionary<string, object>)paikat[21 + j])["kortti"]).Cast<string>();
                Oleta.Tosi(rivit.SequenceEqual(AjattelijaAikajana.KorttiRivit(a.Aikajana.Tykit[j].Lause.Fi, 24)), "atlaksen kortti " + j);
            }
        }

        [Testi] static void V14RakovalonJalanjalki()
        {
            // Silmäkaista (118–135): 0,34 × 0,02 m, spread 2,2°; partakuva (136–153): 0,12 × 0,12 m, spread 12°.
            var s = AjattelijaAikajana.Rako(0.34, 0.02, 2.2);
            Oleta.Tosi(Math.Abs(s.Kx - 0.3745617656339023) < 1e-12 && Math.Abs(s.Ky - 0.054561765633902304) < 1e-12 && Math.Abs(s.Puoli - 0.2060089710986463) < 1e-12
                && Math.Abs(s.Kulma - 0.22502231737654058) < 1e-12 && Math.Abs(s.Sumeus - 0.008640441408475575) < 1e-12 && Math.Abs(s.Kerroin - 1189.0343859773413) < 1e-8,
                $"silmä: {s.Kx} {s.Ky} {s.Puoli} {s.Kulma} {s.Sumeus} {s.Kerroin}");
            var p = AjattelijaAikajana.Rako(0.12, 0.12, 12);
            Oleta.Tosi(Math.Abs(p.Kx - 0.3091876234782176) < 1e-12 && Math.Abs(p.Kulma - 0.18674639733662968) < 1e-12 && Math.Abs(p.Sumeus - 0.04729690586955441) < 1e-12
                && Math.Abs(p.Kerroin - 254.1921130214939) < 1e-8, $"parta: {p.Kx} {p.Kulma} {p.Sumeus} {p.Kerroin}");
            // E = P / A': sama teho leveämmälle jalanjäljelle → pienempi säteilytys.
            Oleta.Tosi(AjattelijaAikajana.Rako(0.34, 0.02, 1.2).Kerroin > s.Kerroin, "kapeampi spread kirkkaampi");
        }

        [Testi] static void V14AikajananApufunktiot()
        {
            var a = Lue("sokrates");
            var aj = a.Aikajana;
            // Lainaus ruudussa: käynnissä oleva, muuten seuraava; lopun jälkeen ensimmäinen (sammuksissa).
            Oleta.Sama(0, AjattelijaAikajana.TykkiRuudussa(aj.Tykit, 500));
            Oleta.Sama(0, AjattelijaAikajana.TykkiRuudussa(aj.Tykit, 1000));
            Oleta.Sama(1, AjattelijaAikajana.TykkiRuudussa(aj.Tykit, 1200));
            Oleta.Sama(4, AjattelijaAikajana.TykkiRuudussa(aj.Tykit, 2900));
            Oleta.Sama(0, AjattelijaAikajana.TykkiRuudussa(aj.Tykit, 2930));
            // Kaikupaikat vuorotellen: 0 = jumala/oraakkeli, 1 = sotilas/kuolema.
            Oleta.Sama(0, AjattelijaAikajana.KaikuPaikassa(aj.Kaiut, 0, 100));
            Oleta.Sama(2, AjattelijaAikajana.KaikuPaikassa(aj.Kaiut, 0, 1100));
            Oleta.Sama(1, AjattelijaAikajana.KaikuPaikassa(aj.Kaiut, 1, 900));
            Oleta.Sama(3, AjattelijaAikajana.KaikuPaikassa(aj.Kaiut, 1, 2600));
            // Väistökehä kasvaa 15 ruudussa; savun ruutu 8 s:n silmukassa (ruutu 4 → laatta 1, kanava 0).
            Oleta.Sama(0.0, AjattelijaAikajana.VaistoSade(0.1, new[] { 100.0, 200 }, 100));
            Oleta.Tosi(Math.Abs(AjattelijaAikajana.VaistoSade(0.1, new[] { 100.0, 200 }, 107.5) - 0.05) < 1e-12, "kasvu");
            Oleta.Sama(0.1, AjattelijaAikajana.VaistoSade(0.1, new[] { 100.0, 200 }, 150));
            Oleta.Tosi(AjattelijaAikajana.SavuRuutu(4, 8, 30, 240) == (0.125, 0.0, 0), "savu ruutu 4");
            Oleta.Tosi(AjattelijaAikajana.SavuRuutu(240 + 4 * 9 + 2, 8, 30, 240) == (0.125, 0.125, 2), "savu silmukka");
            // Vinjetti nimestä kysymyksen loppuun + 20; lappu aikajanan lopussa.
            Oleta.Tosi(AjattelijaAikajana.VinjettiAikajana(a.Ajat, 184) && AjattelijaAikajana.VinjettiAikajana(a.Ajat, 357) && !AjattelijaAikajana.VinjettiAikajana(a.Ajat, 358), "vinjetti");
            var g = AjattelijaAikajana.Globaali(a, 75 + 2938);
            Oleta.Tosi(!g.prologi && g.ruutu == 2938 && g.loppu, "lappu aikajanan lopussa");
            Oleta.Tosi(AjattelijaAikajana.Globaali(a, 75).prologi && !AjattelijaAikajana.Globaali(a, 76).prologi, "prologi 75 ruutua");
        }
    }
}
