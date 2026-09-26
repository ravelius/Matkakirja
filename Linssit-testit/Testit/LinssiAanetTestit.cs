// Linssien äänten kytkennät: keksintölinssi soittaa kilahduksen ja vuosinaksahduksen ILinssiYmparisto.Tehoste-kutsulla
// kuten web (js/aikajana.js sytyta → keksinnonAani, naytaVuosi → naksahda, AIKAJANA_NAKSU_VALI_MS), ja astronautin kamera
// soittaa huminan ILinssiYmparisto.Taustaaani-kutsulla (web js/linssit/satelliitti-aani.js).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class LinssiAanetTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);

        static KeksinnotAineisto Aineisto() => KeksinnotAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(Polku("paketti/keksinnot.json"))));

        /// <summary>Ajaa kaaren; palauttaa tehosteet ja niiden ajat (s). Välinäytös jatkuu heti.</summary>
        static List<(double t, string nimi)> Aja(KeksinnotLinssi l, ValeYmparisto y, double sekuntia)
        {
            var tehosteet = new List<(double, string)>();
            double loppu = y.Kello + sekuntia;
            while (y.Kello < loppu && !l.Ajo.Paattynyt)
            {
                int ennen = y.Loki.Count;
                y.Kello += 1 / 60.0;
                l.Paivita();
                if (l.Ajo.ValinaytosAuki) l.JatkaValinaytoksesta();
                foreach (var r in y.Loki.Skip(ennen).Where(r => r.StartsWith("tehoste ")))
                    tehosteet.Add((y.Kello, r.Split(' ')[1]));
            }
            return tehosteet;
        }

        [Testi] static void KeksintolinssiKilahtaaJaNaksahtaaKutenWeb()
        {
            var a = Aineisto();
            var y = new ValeYmparisto();
            var l = new KeksinnotLinssi(a, null);
            l.Avaa(y);
            Oleta.Tosi(!y.Loki.Any(r => r.StartsWith("tehoste")), "avaus on hiljainen");
            l.Kaynnista();
            var t = Aja(l, y, 2000);
            Oleta.Tosi(l.Ajo.Paattynyt, "kaari loppui");
            int keksintoja = a.Pysakit.Count(p => !p.Paalu && !p.Hiljainen);
            Oleta.Sama(keksintoja, t.Count(x => x.nimi == KeksintojenAanet.Keksinto), "kilahdus jokaisella keksinnöllä, ei paalulla");
            Oleta.Sama(keksintoja, l.Aanet.Kilahduksia);
            var naksut = t.Where(x => x.nimi == KeksintojenAanet.Vuosi).Select(x => x.t).ToList();
            Oleta.Tosi(naksut.Count > 50, "naksuja " + naksut.Count);
            Oleta.Sama(naksut.Count, l.Aanet.Naksuja);
            for (int i = 1; i < naksut.Count; i++)
                Oleta.Tosi(naksut[i] - naksut[i - 1] >= 0.125 - 1e-9, $"väli {naksut[i] - naksut[i - 1]:F3} s");
            double vuosia = a.Pysakit[a.Pysakit.Count - 1].Vuosi - a.Alku;
            Oleta.Tosi(naksut.Count <= vuosia, "enintään yksi naksu vuotta kohden");
        }

        [Testi] static void SelausJaTaukoOvatHiljaisia()
        {
            var y = new ValeYmparisto();
            var l = new KeksinnotLinssi(Aineisto(), null);
            l.Avaa(y);
            l.Kaynnista();
            Aja(l, y, 20);
            int ennen = y.Loki.Count(r => r.StartsWith("tehoste"));
            l.Ajo.Siirry(12);
            l.Ajo.Siirry(3);
            l.NapautaValoa(20);
            Oleta.Sama(ennen, y.Loki.Count(r => r.StartsWith("tehoste")), "selaus rullaa vuoden hiljaa");
            l.Ajo.Tauko();
            for (int i = 0; i < 120; i++) { y.Kello += 1 / 60.0; l.Paivita(); }
            Oleta.Sama(ennen, y.Loki.Count(r => r.StartsWith("tehoste")), "tauolla hiljaa");
            // Jatko: pysäkin tauolla ykkösrulla hiipii alle vuoden, joten naksu tulee vasta liikkeestä.
            l.Ajo.Jatka();
            var t = Aja(l, y, 1);
            Oleta.Sama(0, t.Count, "pysäkin tauko on hiljainen");
        }

        [Testi] static void AlustaEiNaksahda()
        {
            var y = new ValeYmparisto();
            var l = new KeksinnotLinssi(Aineisto(), null);
            l.Avaa(y);
            l.Kaynnista();
            Aja(l, y, 40);
            int naksuja = l.Aanet.Naksuja;
            l.Ajo.Alusta(1765);
            y.Kello += 1 / 60.0;
            l.Paivita();
            Oleta.Sama(naksuja, l.Aanet.Naksuja, "hyppy alkuun ei ole elävä vaihdos");
        }

        [Testi] static void VahennettyLiikeHarventaa()
        {
            // Vähennetty liike: 25 vuotta sekunnissa lineaarisesti → naksu enintään joka 125 ms.
            var y = new ValeYmparisto { Vahennetty = true };
            var l = new KeksinnotLinssi(Aineisto(), null);
            l.Avaa(y);
            l.Kaynnista();
            var t = Aja(l, y, 30);
            Oleta.Tosi(l.Aanet.Harvennettuja > 0, "harvennettuja " + l.Aanet.Harvennettuja);
            var naksut = t.Where(x => x.nimi == KeksintojenAanet.Vuosi).Select(x => x.t).ToList();
            for (int i = 1; i < naksut.Count; i++) Oleta.Tosi(naksut[i] - naksut[i - 1] >= 0.125 - 1e-9, "väli");
        }

        // ── Astronautin kameran humina ─────────────────────────────────────────────────────────────────

        [Testi] static void AstronautinHuminaSoiLinssinAjan()
        {
            string P(string x) => Polku("paketti/" + x);
            var a = AstronauttiAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(P("satelliitti-data.json"))),
                MiniJson.Jasenna(File.ReadAllText(P("astronaut-kysymykset.json"))));
            var y = new ValeYmparisto();
            var l = new AstronauttiLinssi(a, new ValeAstronautinNakyma());
            l.Avaa(y);
            int pito = y.Loki.IndexOf("musiikki True"), humina = y.Loki.IndexOf("taustaääni " + AstronauttiLinssi.Humina);
            Oleta.Tosi(pito >= 0 && humina > pito, "humina muiden vaientamisen jälkeen");
            l.Sulje();
            int pois = y.Loki.IndexOf("taustaääni pois"), vapaa = y.Loki.IndexOf("musiikki False");
            Oleta.Tosi(pois > humina && vapaa > pois, "humina pois ennen kuin pito vapautuu");
            Oleta.Sama("astro-humina", AstronauttiLinssi.Humina, "Pelikoodarin taulun tunnus");
        }

        sealed class ValeAstronautinNakyma : IAstronautinNakyma
        {
            public void Avaus(AvauksenVaihe v) { }
            public void Kohteet(IReadOnlyList<Havaintokohde> k) { }
            public void Nimet(bool n) { }
            public void Pilvet(double p, double k) { }
            public void Sumu(double p) { }
            public void Tahdet(double p) { }
            public void Iss(LatLon p, IReadOnlyList<LatLon> k) { }
            public void Kuva(Havaintokohde k, int i) { }
            public void KuvaPois() { }
            public void Pois() { }
        }
    }
}
