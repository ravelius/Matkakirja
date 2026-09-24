// Tiedeliite verkkopelin kultaisia arvoja vasten (kultaiset/tiedeliite.json, tee-tiedeliite.mjs:
// webin onTiedeliitteenSivu, tiedeliitteenNaapurit, tiedeliitteenKuvat, jaaKappaleiksi, kuvatekstit)
// sekä keksintölinssin avaus- ja sulkukoukut (raita pois sivun ajaksi).
using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class TiedeliiteTestit
    {
        sealed class TyhjaNakyma : IPysakkiajonNakyma
        {
            public void Kello(double v) { }
            public void Sytyta(int i) { }
            public void Selaus(int i) { }
            public void Valinaytos(int i) { }
            public void Tauolla(bool t) { }
            public void Loppu() { }
        }

        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("tiedeliite.json"))).RootElement;
        static KeksinnotAineisto A() => KeksinnotAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(Polku("paketti/keksinnot.json"))));
        static string L(JsonElement e) => string.Join(" ¶ ", e.EnumerateArray().Select(x => x.GetString()));

        [Testi] static void KappaleetKutenWebissa()
        {
            foreach (var r in K().GetProperty("kappaleet").EnumerateArray())
                Oleta.Sama(L(r[1]), string.Join(" ¶ ", Tiedeliite.Kappaleet(r[0].GetString())), "teksti: " + r[0].GetString());
        }

        [Testi] static void SivutKutenWebissa()
        {
            var a = A();
            var sivut = K().GetProperty("sivut").EnumerateArray().ToList();
            Oleta.Sama(sivut.Count, a.Pysakit.Count, "pysäkit");
            foreach (var w in sivut)
            {
                int i = w.GetProperty("i").GetInt32();
                var p = a.Pysakit[i];
                Oleta.Sama(w.GetProperty("vuosi").GetDouble(), p.Vuosi, $"järjestys {i}");
                Oleta.Sama(w.GetProperty("sivu").GetBoolean(), Tiedeliite.OnSivu(p), $"sivu {i}");
                var (e, s) = Tiedeliite.Naapurit(a.Pysakit, i);
                Oleta.Sama(w.GetProperty("naapurit").GetProperty("edellinen").GetInt32(), e, $"edellinen {i}");
                Oleta.Sama(w.GetProperty("naapurit").GetProperty("seuraava").GetInt32(), s, $"seuraava {i}");
                Oleta.Sama(w.GetProperty("paikkarivi").GetString(), Tiedeliite.Paikkarivi(p), $"paikkarivi {i}");
                var n = Tiedeliite.Sivu(a.Pysakit, i);
                if (n == null) { Oleta.Tosi(!w.GetProperty("sivu").GetBoolean()); continue; }
                Oleta.Sama(L(w.GetProperty("ingressi")), string.Join(" ¶ ", n.Ingressi), $"ingressi {i}");
                Oleta.Sama(L(w.GetProperty("juttu")), string.Join(" ¶ ", n.Juttu), $"juttu {i}");
                Oleta.Sama(L(w.GetProperty("henkilojuttu")), string.Join(" ¶ ", n.Henkilojuttu), $"henkilöjuttu {i}");
                Oleta.Sama(w.GetProperty("kasvot").GetInt32(), n.Kasvot.Count + (n.Aito != null ? 1 : 0), $"kasvot {i}");
                Oleta.Sama(w.GetProperty("aito").GetBoolean(), n.Aito != null, $"aito {i}");
                Oleta.Sama(w.GetProperty("ilmiot").GetInt32(), n.Ilmiot.Count, $"ilmiöt {i}");
                if (w.GetProperty("kuva").ValueKind == JsonValueKind.Object)
                {
                    Oleta.Sama(w.GetProperty("kuva").GetProperty("lyhyt").GetString(), p.Kuva.LyhytTeksti, $"kuvan lyhyt {i}");
                    Oleta.Sama(w.GetProperty("kuva").GetProperty("pitka").GetString(), p.Kuva.PitkaTeksti, $"kuvan pitkä {i}");
                }
            }
            Oleta.Sama(25, Tiedeliite.Sisallys(a.Pysakit).Count, "sisällys");
        }

        [Testi] static void JuttuVaimentaaRaidanJaPalauttaa()
        {
            var y = new ValeYmparisto();
            var a = A();
            var l = new KeksinnotLinssi(a, new TyhjaNakyma());
            l.Avaa(y);
            l.Kaynnista();
            int sivu = Enumerable.Range(0, a.Pysakit.Count).First(i => Tiedeliite.OnSivu(a.Pysakit[i]));
            int paalu = Enumerable.Range(0, a.Pysakit.Count).FirstOrDefault(i => !Tiedeliite.OnSivu(a.Pysakit[i]));
            Oleta.Sama(false, l.AvaaJuttu(paalu), "merkkipaalulla ei sivua");
            int pyydetty = -1;
            l.JuttuPyydetty += i => pyydetty = i;
            Oleta.Tosi(l.AvaaJuttu(sivu));
            Oleta.Sama(sivu, pyydetty);
            Oleta.Sama(null, y.Raita, "raita pois sivun ajaksi");
            Oleta.Tosi(l.Tiedeliite(sivu) != null);
            l.JuttuVaihtui(sivu + 1);
            Oleta.Sama(sivu + 1, l.JuttuAuki);
            l.JuttuSuljettu();
            Oleta.Sama("keksinnot", y.Raita, "raita palaa");
            Oleta.Sama(1.0, y.RaidanTaso, "ajossa täysi");
            Oleta.Sama(-1, l.JuttuAuki);
            Oleta.Sama(a.Pysakit.Count, l.Pysakkeja);
            Oleta.Sama(25, l.Sisallys().Count);
        }

        [Testi] static void KaarenLoppukameraKutenWebinSovitaKaareen()
        {
            // web: kaarenKameralaatikko (pysty: +50 % ylös, +28 % alas) + pallonKorkeus vara 1,06, FOV 50.
            var a = A();
            var y = new ValeYmparisto { Kuvasuhde = 1668.0 / 2420, Nakokulma = 50 };
            var l = new KeksinnotLinssi(a, new TyhjaNakyma());
            l.Avaa(y); l.Kaynnista();
            l.Ajo.Siirry(25); l.Ajo.Jatka();
            for (int i = 0; i < 600 && !l.Ajo.Paattynyt; i++) { y.Kello += 1 / 60.0; l.Paivita(); }
            Oleta.Tosi(l.Ajo.Paattynyt);
            var b = Kameramatikka.KaarenKameralaatikko(a.AlueLaudalla, pysty: true);
            var odotettu = Kameramatikka.SovitaLaatikko(b, 50, y.Kuvasuhde, 1.06).Value;
            // Kapea ruutu sovitetaan korkeuteen (web korkeuteenSovitus): lähempänä kuin molempiin suuntiin.
            Oleta.Tosi(odotettu.KorkeusSateina < Kameramatikka.PallonKorkeus(b, 50, y.Kuvasuhde, 1.06).Value.KorkeusSateina, "korkeussovitus lähempänä");
            Oleta.Tosi(y.Ajo.HasValue && Math.Abs(y.Ajo.Value.Korkeus - odotettu.KorkeusSateina * Kameramatikka.MaanSade) < 1, "loppuajo: " + y.Ajo);
            Oleta.Tosi(Math.Abs(y.Ajo.Value.Lat - odotettu.Keski.Lat) < 1e-9 && Math.Abs(y.Ajo.Value.Lon - odotettu.Keski.Lon) < 1e-9);
            // Eurooppa mahtuu ruutuun: korkeus selvästi alle koko pallon (iPadilla ennen 12 000 km).
            Oleta.Tosi(y.Ajo.Value.Korkeus < 6_000_000 && y.Ajo.Value.Korkeus > 3_000_000, "korkeus " + y.Ajo.Value.Korkeus);
        }
    }
}
