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
                Oleta.Sama(1 + d.Taustavirta.Rivit.Count, d.Atlas.Paikat.Count, "atlaksen rivit");
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
            var g = AjattelijaAikajana.Globaali(a, 120 + 1450);
            Oleta.Tosi(!g.prologi && g.ruutu == 1450 && g.loppu, "pito → lappu");
            Oleta.Tosi(AjattelijaAikajana.Globaali(a, 60).prologi, "prologi");
            var s = AjattelijaAikajana.AuringonSuunta(a, 282);
            var r = AjattelijaAikajana.Normaali(a.AvainSuunta);
            Oleta.Tosi(Math.Abs(s[0] - r[0]) + Math.Abs(s[1] - r[1]) + Math.Abs(s[2] - r[2]) < 1e-9, "intron lopussa Rembrandt");
        }
    }
}
