// Keksintöjen pysäkkiluennat: paketin osoitteet webin tiedostonimisääntöä vasten
// (kultaiset/luennat.json, tee-luennat.mjs; paketti/linssiaineisto.json, keksinnot.json)
// ja luentojen kulku linssissä vale-soitinta vasten.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public sealed class ValeSoitin : ILuentaSoitin
    {
        public readonly List<string> Loki = new List<string>();
        public string Nyt;
        public bool Soi { get; set; }
        public void Soita(string url, double viiveMs)
        {
            Loki.Add($"soita {Path.GetFileName(url)} {viiveMs}");
            Nyt = url;
            Soi = true;
        }
        public void Lopeta() { Loki.Add("lopeta"); Nyt = null; Soi = false; }
    }

    public static class KeksintoLuennatTestit
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
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("luennat.json"))).RootElement;
        static object Paketti(string nimi) => MiniJson.Jasenna(File.ReadAllText(Polku("paketti/" + nimi)));

        static KeksintoLuennat L() => KeksintoLuennat.Lue(Paketti("linssiaineisto.json"));
        static KeksinnotAineisto A() => KeksinnotAineisto.Lue(Paketti("keksinnot.json"));

        [Testi] static void OsoitteetKutenWebissa()
        {
            var k = K();
            var l = L();
            var juuri = k.GetProperty("juuri").GetString();
            Oleta.Sama(juuri, l.Juuri);
            Oleta.Sama(k.GetProperty("viiveMs").GetDouble(), KeksintoLuennat.ViiveMs);
            var a = A();
            int n = 0;
            foreach (var w in k.GetProperty("pysakit").EnumerateArray())
            {
                var p = a.Pysakit.Single(x => x.Vuosi == w.GetProperty("vuosi").GetDouble() && x.Otsikko == w.GetProperty("otsikko").GetString());
                if (w.GetProperty("hiljainen").GetBoolean()) continue;
                Oleta.Sama(juuri + "/" + w.GetProperty("tiedosto").GetString(), l.Pysakille(p), p.Otsikko);
                if (w.GetProperty("valinaytos").ValueKind == JsonValueKind.String)
                    Oleta.Sama(juuri + "/" + w.GetProperty("valinaytos").GetString() + ".mp3", l.Valinaytos, "välinäytös");
                n++;
            }
            Oleta.Sama(26, n);
            Oleta.Sama(26, l.Maara);
            Oleta.Sama($"{juuri}/{k.GetProperty("esittelynRunko").GetString()}.mp3?v={k.GetProperty("esittelynVersio").GetString()}", l.Esittely);
            Oleta.Tosi(!k.GetProperty("loppupuhe").GetBoolean(), "keksintökaarella ei loppupuhetta");
        }

        [Testi] static void IlmanLuentojaEiKaadu()
        {
            Oleta.Sama(null, KeksintoLuennat.Lue(MiniJson.Jasenna("{\"alkiot\":[]}")));
            Oleta.Sama(null, L().Pysakille(new Pysakki { Vuosi = 1999, Otsikko = "Ei ole" }));
        }

        static (KeksinnotLinssi l, ValeYmparisto y, ValeSoitin s) Avaa()
        {
            var y = new ValeYmparisto();
            var s = new ValeSoitin();
            var l = new KeksinnotLinssi(A(), null, luennat: L(), soitin: s);
            l.Avaa(y);
            return (l, y, s);
        }

        static void Aja(KeksinnotLinssi l, ValeYmparisto y, double sekuntia, Func<bool> seis = null)
        {
            double loppu = y.Kello + sekuntia;
            while (y.Kello < loppu && !l.Ajo.Paattynyt && !(seis?.Invoke() ?? false))
            {
                y.Kello += 1 / 60.0;
                l.Paivita();
            }
        }

        [Testi] static void EsittelySoiJaKatkeaaKaynnistaessa()
        {
            var (l, y, s) = Avaa();
            Oleta.Sama("soita esittely.mp3?v=bd142983 350", s.Loki.Single());
            l.Kaynnista();
            Oleta.Sama("lopeta", s.Loki.Last());
            Oleta.Sama(null, l.Luenta);
        }

        [Testi] static void PysakkiSoittaaJaPidattaaKelloa()
        {
            var (l, y, s) = Avaa();
            l.Kaynnista();
            Aja(l, y, 60, () => l.Luenta != null);
            Oleta.Sama("soita 1769-james-watt.mp3 350", s.Loki.Last());
            // Luenta soi: kello pysyy pysäkillä (tauko pidätetään), vaikka aikaa kuluu.
            int i = l.Ajo.Tila.I;
            Aja(l, y, 10);
            Oleta.Sama(i, l.Ajo.Tila.I, "kello odottaa luentaa");
            s.Soi = false;   // luenta päättyi
            Aja(l, y, 30, () => l.Ajo.Tila.I != i);
            Oleta.Tosi(l.Ajo.Tila.I > i, "kello jatkoi luennan jälkeen");
        }

        [Testi] static void KattoEiJaaOdottamaan()
        {
            var (l, y, s) = Avaa();
            l.Kaynnista();
            Aja(l, y, 60, () => l.Luenta != null);
            int i = l.Ajo.Tila.I;
            // Ääni ei pääty koskaan (latautumaton tiedosto): katto 14 s vapauttaa kellon.
            Aja(l, y, 40, () => l.Ajo.Tila.I != i);
            Oleta.Tosi(l.Ajo.Tila.I > i, "katto vapautti");
        }

        [Testi] static void ValinaytosSyrjayttaaPysakkiluennan()
        {
            var (l, y, s) = Avaa();
            l.Kaynnista();
            int paalu = l.Ajo == null ? -1 : A().Pysakit.FindIndex(p => p.Valinaytos);
            // Luennat päättyvät heti, jotta kello kulkee pysäkkien ohi.
            while (!l.Ajo.ValinaytosAuki && !l.Ajo.Paattynyt) { s.Soi = false; Aja(l, y, 1); }
            Oleta.Tosi(l.Ajo.ValinaytosAuki, "välinäytös auki");
            Oleta.Sama(paalu, l.Ajo.Tila.I);
            Oleta.Sama("soita valinaytos-1873.mp3 350", s.Loki.Last());
            Oleta.Sama("soita 1873-matkakirjan-vuosi.mp3 350", s.Loki[s.Loki.Count - 2], "pysäkin luenta vaihtui samassa askeleessa");
            l.JatkaValinaytoksesta();
            Oleta.Sama("lopeta", s.Loki.Last());
            Oleta.Tosi(l.Ajo.Kaynnissa, "kello jatkaa");
        }

        [Testi] static void SelausJaSulkuHiljentavat()
        {
            var (l, y, s) = Avaa();
            l.Kaynnista();
            Aja(l, y, 60, () => l.Luenta != null);
            l.Ajo.Siirry(5);
            Oleta.Sama("lopeta", s.Loki.Last());
            l.Ajo.Jatka();
            s.Soi = false;
            Aja(l, y, 60, () => l.Luenta != null);
            Oleta.Tosi(l.Luenta != null, "seuraava pysäkki soi");
            l.Sulje();
            Oleta.Sama("lopeta", s.Loki.Last());
        }

        [Testi] static void KaynnistettyKerran()
        {
            var (l, y, s) = Avaa();
            int n = 0;
            l.Kaynnistetty += () => n++;
            Oleta.Tosi(!l.OnKaynnistetty, "ennen nappia");
            l.Kaynnista();
            l.Kaynnista();
            Oleta.Sama(1, n);
            Oleta.Tosi(l.OnKaynnistetty && l.Ajo.Kaynnissa, "käynnissä");
        }

        [Testi] static void LinssimusiikkiKutenWebissa()
        {
            // web aikajana.js: avaus aloitaMusiikki(false) = puolet, Käynnistä täyteen, tauko puoleen,
            // loppu puoleen, sulku feidaus pois.
            var y = new ValeYmparisto();
            var l = new KeksinnotLinssi(A(), new TyhjaNakyma());
            l.Avaa(y);
            Oleta.Sama("keksinnot", y.Raita);
            Oleta.Sama(0.5, y.RaidanTaso, "esittelyn alla puolet");
            l.Kaynnista();
            Oleta.Sama(1.0, y.RaidanTaso, "ajossa täysi");
            l.Ajo.Tauko();
            Oleta.Sama(0.5, y.RaidanTaso, "tauolla puolet");
            l.Ajo.Jatka();
            for (int i = 0; i < 20 && !l.Ajo.Paattynyt; i++)
            {
                Aja(l, y, 120, () => l.Ajo.ValinaytosAuki);
                if (l.Ajo.ValinaytosAuki) { Oleta.Sama(1.0, y.RaidanTaso, "välinäytös ei himmennä"); l.JatkaValinaytoksesta(); }
            }
            Oleta.Tosi(l.Ajo.Paattynyt, "kaari loppui");
            Oleta.Sama(0.5, y.RaidanTaso, "lopussa puolet");
            l.Sulje();
            Oleta.Sama(null, y.Raita, "sulku: pois");
            Oleta.Sama(1, y.Loki.Count(r => r == "raita keksinnot"), "raita aloitetaan kerran");
        }

        [Testi] static void IlmanSoitintaKutenEnnen()
        {
            var y = new ValeYmparisto();
            var l = new KeksinnotLinssi(A(), new TyhjaNakyma());
            l.Avaa(y);
            l.Kaynnista();
            Aja(l, y, 60);
            Oleta.Sama(null, l.Luenta);
        }
    }
}
