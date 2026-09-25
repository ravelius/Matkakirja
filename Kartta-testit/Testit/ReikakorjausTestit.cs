// Löydös 119: pallon reiät (Kartta/Reikakorjaus.cs): maastouusinnan viiveet ja luokat, laattojen rajojen marginaali.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ReikakorjausTestit
    {
        [Testi]
        static void UusintaViiveetPorrastettu()
        {
            // 0,5, 1, 2, 4, 8 s ja sitten 8 s:n välein.
            double[] odotettu = { 0.5, 1, 2, 4, 8, 8, 8 };
            for (int i = 0; i < odotettu.Length; i++)
                Oleta.Sama(odotettu[i], Reikakorjaus.UusintaViive(i + 1), $"yritys {i + 1}");
            Oleta.Sama(8.0, Reikakorjaus.UusintaViive(1000), "pitkä pito");
            Oleta.Sama(0.5, Reikakorjaus.UusintaViive(0), "0 = ensimmäinen");
            Oleta.Sama(0.5, Reikakorjaus.UusintaViive(-3), "negatiivinen = ensimmäinen");
            double summa = 0;
            for (int i = 1; i <= 5; i++) summa += Reikakorjaus.UusintaViive(i);
            Oleta.Tosi(Math.Abs(summa - 15.5) < 1e-12, $"viisi ensimmäistä odotusta 15,5 s, saatu {summa}");
        }

        [Testi]
        static void VainTilapainenUusitaan()
        {
            foreach (int k in new[] { 0, -1, 502, 500, 503, 504, 408, 425, 429 })
                Oleta.Tosi(Reikakorjaus.Uusittava(k), "tilapäinen " + k);
            foreach (int k in new[] { 404, 403, 400, 401, 410, 200 })
                Oleta.Tosi(!Reikakorjaus.Uusittava(k), "lopullinen " + k);
        }

        [Testi]
        static void UnityWebRequestinKoodi()
        {
            Oleta.Sama(404, Reikakorjaus.Koodi(true, 404), "protokollavirhe 404");
            Oleta.Sama(503, Reikakorjaus.Koodi(true, 503), "protokollavirhe 503");
            Oleta.Sama(502, Reikakorjaus.Koodi(false, 0), "yhteysvirhe tai aikakatkaisu");
            // Katkennut siirto: otsakkeet (200) tulivat, runko ei → ennen tyhjä 200 Cesiumille (reikä), nyt 502.
            Oleta.Sama(502, Reikakorjaus.Koodi(false, 200), "katkennut siirto");
            Oleta.Sama(502, Reikakorjaus.Koodi(true, 200), "outo protokollavirhe < 400");
            Oleta.Tosi(Reikakorjaus.Uusittava(Reikakorjaus.Koodi(false, 200)), "katkennut siirto uusitaan");
        }

        [Testi]
        static void PitoJaLuovutus()
        {
            Oleta.Tosi(Reikakorjaus.Pidetaanko(true, false, 3600), "verkko on: pidetään niin kauan kuin pyydetty");
            Oleta.Tosi(!Reikakorjaus.Pidetaanko(false, false, 1), "Cesium sulki yhteyden");
            Oleta.Tosi(Reikakorjaus.Pidetaanko(true, true, Reikakorjaus.OfflineRajaS - 0.1), "lyhyt katko (verkon vaihto)");
            Oleta.Tosi(!Reikakorjaus.Pidetaanko(true, true, Reikakorjaus.OfflineRajaS), "ilman verkkoa rajan yli: virhe kuten ennen");
        }

        [Testi]
        static void MaastonTunnistus()
        {
            const string m = "julisteet/maasto/2026-09-24-maailma/";
            Oleta.Tosi(Reikakorjaus.OnMaastolaatta(m + "9/512/300.terrain"), "laatta");
            Oleta.Tosi(Reikakorjaus.OnMaastolaatta(m + "9/512/300.terrain?v=1.2.0&extensions=octvertexnormals"), "kysely");
            Oleta.Tosi(!Reikakorjaus.OnMaastolaatta(m + "layer.json"), "layer.json ei ole laatta");
            Oleta.Tosi(Reikakorjaus.OnMaasto(m + "layer.json") && Reikakorjaus.OnMaasto("layer.json"), "layer.json on maastoa");
            Oleta.Tosi(!Reikakorjaus.OnMaasto("julisteet/pallo/laatat/x/3/2/1.jpg") && !Reikakorjaus.OnMaasto(null), "muu");
            Oleta.Tosi(!Reikakorjaus.OnMaastolaatta("a/b.terrain.jpg") && !Reikakorjaus.OnMaastolaatta(""), "pääte lopussa");
        }

        [Testi]
        static void LokinLuokat()
        {
            const string pohja = "julisteet/pallo/laatat/2026-09-25-pohja-20260925/";
            Oleta.Sama("maasto", Reikakorjaus.Luokka("julisteet/maasto/v/5/1/2.terrain?v=1", pohja));
            Oleta.Sama("maasto", Reikakorjaus.Luokka("julisteet/maasto/v/layer.json", pohja));
            Oleta.Sama("pohja", Reikakorjaus.Luokka(pohja + "5/10/20.jpg", pohja));
            Oleta.Sama("satelliitti", Reikakorjaus.Luokka("julisteet/satelliitti/2026-09-24/bmng/3/1/1.jpg", pohja));
            Oleta.Sama("kuva", Reikakorjaus.Luokka("julisteet/linssit/topo/4/1/1.webp", pohja));
            Oleta.Sama("kuva", Reikakorjaus.Luokka("julisteet/pallo/laatat/vanha/4/1/1.jpg", null), "ilman pohjapolkua");
            Oleta.Sama("json", Reikakorjaus.Luokka("sisalto/1/maat.geojson", pohja));
            Oleta.Sama("muu", Reikakorjaus.Luokka("x/y.bin", pohja));
            Oleta.Sama("muu", Reikakorjaus.Luokka(null, pohja));
        }

        [Testi]
        static void MarginaaliKertoimesta()
        {
            Oleta.Sama(9000.0, Reikakorjaus.Marginaali(2, Reikakorjaus.OletusKorkeusM), "oletus k = 2 → 9 km");
            Oleta.Sama(18000.0, Reikakorjaus.Marginaali(3, 9000), "k = 3 → 18 km");
            Oleta.Sama(4500.0, Reikakorjaus.Marginaali(1.5, 9000), "k = 1,5");
            Oleta.Sama(0.0, Reikakorjaus.Marginaali(1, 9000), "k = 1 → ei laajennusta");
            Oleta.Sama(0.0, Reikakorjaus.Marginaali(0.5, 9000), "k < 1");
            Oleta.Sama(0.0, Reikakorjaus.Marginaali(double.NaN, 9000), "NaN");
            Oleta.Sama(0.0, Reikakorjaus.Marginaali(2, 0), "korkeus 0");
            Oleta.Sama(0.0, Reikakorjaus.Marginaali(2, -5), "negatiivinen korkeus");
            // Varjostimen suurin nosto Everestillä (8 849 m) mahtuu oletusmarginaaliin kaikilla sallituilla kertoimilla.
            for (double k = 1.0; k <= 3.0; k += 0.25)
                Oleta.Tosi(8849.0 * (k - 1.0) <= Reikakorjaus.Marginaali(k, Reikakorjaus.OletusKorkeusM) + 1e-9, "k " + k);
        }

        [Testi]
        static void PaikallinenMarginaaliMittakaavasta()
        {
            Oleta.Sama(9000.0, Reikakorjaus.PaikallinenMarginaali(9000, 1, 1), "metrit = laatan yksiköt");
            Oleta.Sama(4500.0, Reikakorjaus.PaikallinenMarginaali(9000, 1, 2), "laatan yksikkö 2 m maailmassa");
            Oleta.Sama(18000.0, Reikakorjaus.PaikallinenMarginaali(9000, 2, 1), "georeferenssi skaalattu 2×");
            Oleta.Sama(9000.0, Reikakorjaus.PaikallinenMarginaali(9000, 0, 0), "nolla = 1");
            Oleta.Sama(9000.0, Reikakorjaus.PaikallinenMarginaali(9000, double.PositiveInfinity, double.NaN), "virheellinen = 1");
            Oleta.Sama(0.0, Reikakorjaus.PaikallinenMarginaali(-1, 1, 1), "negatiivinen = 0");
        }

        [Testi]
        static void AabbLaajeneeKaikkiinSuuntiin()
        {
            var e = Reikakorjaus.Laajenna((1000f, 20f, 3000f), 9000f);
            Oleta.Tosi(e.x == 10000f && e.y == 9020f && e.z == 12000f, $"saatu {e}");
            var n = Reikakorjaus.Laajenna((5f, 6f, 7f), 0f);
            Oleta.Tosi(n.x == 5f && n.y == 6f && n.z == 7f, "0 = ennallaan");
            var v = Reikakorjaus.Laajenna((5f, 6f, 7f), -3f);
            Oleta.Tosi(v.x == 5f && v.y == 6f && v.z == 7f, "negatiivinen marginaali = 0");
            var nan = Reikakorjaus.Laajenna((5f, 6f, 7f), float.NaN);
            Oleta.Tosi(nan.x == 5f && nan.y == 6f && nan.z == 7f, "NaN = 0");
            var abs = Reikakorjaus.Laajenna((-5f, 6f, 7f), 1f);
            Oleta.Tosi(abs.x == 6f, "puolikas itseisarvona");
            // Säteittäinen nosto d (mikä tahansa suunta, pituus ≤ m) pysyy laajennetun laatikon sisällä: |dx|, |dy|, |dz| ≤ m.
            float m = 9000f;
            var l = Reikakorjaus.Laajenna((100f, 100f, 100f), m);
            var r = new Random(119);
            for (int i = 0; i < 1000; i++)
            {
                double ax = r.NextDouble() * 2 - 1, ay = r.NextDouble() * 2 - 1, az = r.NextDouble() * 2 - 1;
                double pituus = Math.Sqrt(ax * ax + ay * ay + az * az);
                if (pituus < 1e-6) continue;
                double s = m / pituus;
                double px = r.NextDouble() * 200 - 100 + ax * s, py = r.NextDouble() * 200 - 100 + ay * s, pz = r.NextDouble() * 200 - 100 + az * s;
                Oleta.Tosi(Math.Abs(px) <= l.x + 1e-3 && Math.Abs(py) <= l.y + 1e-3 && Math.Abs(pz) <= l.z + 1e-3, $"piste {i}");
            }
        }
    }
}
