// Ajattelijat: data Resources/Ajattelijat/*.json (webistä tyokalut/ajattelijat-natiiviin.mjs), webin tarkistaAjattelija,
// aikajana ja taustavirran arvonta webin luvuin (odotetut arvot laskettu webin ajattelija.js:n kaavoilla nodella 2.10.).
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
                Oleta.Sama(1 + d.Taustavirta.Rivit.Count + (d.Kierrokset?.Lista.Count ?? 0), d.Atlas.Paikat.Count, "atlaksen rivit");
            }
        }

        [Testi] static void TarkistusHylkaaVajaanKutenWeb()
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Kansio + "sokrates.json")));
            o.Remove("kysymys");
            ((System.Collections.Generic.Dictionary<string, object>)o["kaiku"]).Remove("kamera");
            o["pulunKysymykset"] = new System.Collections.Generic.List<object>();
            var puuttuu = AjattelijaData.Tarkista(o);
            Oleta.Tosi(puuttuu.SequenceEqual(new[] { "kysymys", "kaiku", "pulunKysymykset" }), string.Join(", ", puuttuu));
            Oleta.Sama("tunnus", AjattelijaData.Tarkista(null).Single());
        }

        [Testi] static void SokratesLuetaanWebinLuvuin()
        {
            var a = Lue("sokrates");
            Oleta.Sama("Tutkimaton elämä ei ole elämisen arvoinen ihmiselle.", a.Paalause.Fi);
            Oleta.Sama("Platon, Puolustuspuhe 38a", a.Paalause.Viite);
            Oleta.Sama(1450.0, a.Ajat.Pito);
            Oleta.Sama(120.0, a.Prologi.Loppu);
            Oleta.Sama(6, a.IntroOtokset.Count);
            Oleta.Sama(7, a.Elama.Count);
            Oleta.Sama(5, a.PulunKysymykset.Count);
            Oleta.Tosi(a.Kaiku != null && a.Kaiku.KameraMatka[1] == 0.19, "kaiun kamera");
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
            var v = AjattelijaAikajana.Taustavirta(Lue("sokrates").Taustavirta);
            Oleta.Sama(20, v.Count);
            // (rivi, korkeus, kirkkaus, vM, kulma, nopeus) webistä.
            var odotetut = new[]
            {
                (0, 0.015, 0.267322949637, -0.101083351336, -0.0578257875064, -0.00838162352021),
                (4, 0.009, 0.106924289309, 0.0607134358166, -0.120095068305, -0.001357144432),
                (7, 0.009, 0.117068000645, -0.0373129654754, 0.106374477445, 0.00310481770141),
                (19, 0.009, 0.18325603181, 0.0497238574733, 0.0350482896975, 0.00710307077984),
            };
            foreach (var (i, k, kir, vm, ku, n) in odotetut)
            {
                var r = v[i];
                Oleta.Tosi(r.I == i + 1 && Math.Abs(r.Korkeus - k) < 1e-12 && Math.Abs(r.Kirkkaus - kir) < 1e-10 && Math.Abs(r.VM - vm) < 1e-10
                    && Math.Abs(r.Kulma - ku) < 1e-10 && Math.Abs(r.Nopeus - n) < 1e-12, $"rivi {i}: {r.Korkeus} {r.Kirkkaus} {r.VM} {r.Kulma} {r.Nopeus}");
            }
            // Projektorit 6 + 5 + 3 + 3 + 3 riviä.
            Oleta.Sama(6, v.Count(r => r.Projektori == 0));
            Oleta.Sama(3, v.Count(r => r.Projektori == 4));
        }

        [Testi] static void AikajanaVaiheet()
        {
            var a = Lue("sokrates");
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
            Oleta.Sama(3330.0, kr.Loppu);   // 111,0 s × 30
            Oleta.Tosi(kr.Lista.Select(k => k.PaalauseAvain).SequenceEqual(new[] { "21d", "49b" }), "päälauseet");
            Oleta.Tosi(kr.Lista.Select(k => k.Vieritys).SequenceEqual(new[] { new[] { 1480.0, 1755 }, new[] { 2330.0, 2595 } }, new Vertaa()), "vieritys");
            Oleta.Tosi(kr.Lista.Select(k => k.Kaiku.Ruudut).SequenceEqual(new[] { new[] { 1870.0, 2300 }, new[] { 2655.0, 3250 } }, new Vertaa()), "kaiut");
            Oleta.Tosi(kr.Lista.Select(k => k.Siemen).SequenceEqual(new uint[] { 21, 49 }), "siemenet");
            Oleta.Tosi(kr.Lista.Select(k => k.AtlasRivi).SequenceEqual(new[] { 21, 22 }), "atlasrivit taustavirran jälkeen");
            Oleta.Sama(1450.0, kr.Kamera[0].R);
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
            Oleta.Tosi(Lue("marcus").Kierrokset == null, "Marcuksella ei vielä kierroksia");
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
            kr["loppu"] = 1400.0;   // ennen pitoa; kameran viimeinen avain ei ole loppu
            var p = AjattelijaData.Tarkista(o);
            Oleta.Tosi(p.Contains("kierrokset.aani/loppu") && p.Contains("kierrokset.kamera"), string.Join(", ", p));
            o.Remove("kierrokset");   // ilman kierroksia atlakseen jää kaksi ylimääräistä riviä
            Oleta.Tosi(AjattelijaData.Tarkista(o).SequenceEqual(new[] { "atlas" }), string.Join(", ", AjattelijaData.Tarkista(o)));
        }

        [Testi] static void KierrosRuudulle()
        {
            var a = Lue("sokrates");
            // Kierros vaihtuu kierroksen virran alussa (web kierrosRuudussa: r ≥ alku).
            Oleta.Sama(0, AjattelijaAikajana.KierrosRuudussa(a, 1449));
            Oleta.Sama(1, AjattelijaAikajana.KierrosRuudussa(a, 1450));
            Oleta.Sama(1, AjattelijaAikajana.KierrosRuudussa(a, 2299.9));
            Oleta.Sama(2, AjattelijaAikajana.KierrosRuudussa(a, 2300));
            Oleta.Sama(2, AjattelijaAikajana.KierrosRuudussa(a, 3330));
            Oleta.Sama(0, AjattelijaAikajana.KierrosRuudussa(Lue("marcus"), 1450));
            // Kohtaus jatkuu pidosta loppuun; lappu vasta lopussa (web LOPPU).
            var g = AjattelijaAikajana.Globaali(a, 120 + 1450);
            Oleta.Tosi(!g.prologi && g.ruutu == 1450 && !g.loppu, "pito ei ole enää loppu");
            g = AjattelijaAikajana.Globaali(a, 120 + 4000);
            Oleta.Tosi(g.ruutu == 3330 && g.loppu, "loppu 3330 → lappu");
            Oleta.Tosi(!AjattelijaAikajana.Globaali(a, 120 + 3329).loppu, "ennen loppua");
            Oleta.Tosi(AjattelijaAikajana.Globaali(Lue("marcus"), 120 + 1450).loppu, "Marcus: lappu pidossa");
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
            var v1 = AjattelijaAikajana.Taustavirta(a.Taustavirta);
            var v3 = AjattelijaAikajana.Taustavirta(a.Taustavirta, k3.Siemen);
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
            // Sokrateen avaimet: avaimissa tarkka, paluu Rembrandt-otokseen ja webin arvot välillä (node, web #3884).
            var a = Lue("sokrates");
            var s = AjattelijaAikajana.Kamerakayra(a.Kierrokset.Kamera);
            foreach (var av in a.Kierrokset.Kamera)
            {
                var o = s(av.R);
                Oleta.Tosi(o.Paikka.Zip(av.Paikka, (x, y) => Math.Abs(x - y)).Max() < 1e-12 && o.Katse.Zip(av.Katse, (x, y) => Math.Abs(x - y)).Max() < 1e-12
                    && Math.Abs(o.Mm - av.Mm) < 1e-12, "avain " + av.R);
            }
            Oleta.Tosi(s(3330).Paikka.SequenceEqual(a.Rembrandt.Paikka), "paluu Rembrandt-otokseen");
            var webista = new (double r, double[] paikka, double[] katse, double mm)[]
            {
                (1480, new[] { -0.0289, -0.23235, 0.37415 }, new[] { -0.02995, -0.1156, 0.385 }, 26.5),
                (2000, new[] { 0.06463763727131715, -0.21125318620385883, 0.37894363512595347 }, new[] { 0.04, -0.1083, 0.374 }, 50),
                (2330, new[] { 0.08100938775510204, -0.1709341836734694, 0.32604999999999995 }, new[] { 0.05376642857142857, -0.09611214285714287, 0.3745 }, 34),
                (3280, new[] { -0.032590163934426236, -0.6091, 0.28795000000000004 }, new[] { 0.006200000000000004, -0.06800409836065574, 0.3875 }, 35),
            };
            foreach (var (r, p, q, mm) in webista)
            {
                var o = s(r);
                Oleta.Tosi(o.Paikka.Zip(p, (x, y) => Math.Abs(x - y)).Max() < 1e-12 && o.Katse.Zip(q, (x, y) => Math.Abs(x - y)).Max() < 1e-12
                    && Math.Abs(o.Mm - mm) < 1e-12, $"ruutu {r}: {string.Join(", ", o.Paikka)} / {string.Join(", ", o.Katse)} / {o.Mm}");
            }
        }
    }
}
