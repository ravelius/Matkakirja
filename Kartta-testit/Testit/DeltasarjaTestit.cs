// DELTASARJA (Natiiviseppä 29.9.2026, Karttasepän speksi; web js/deltasarja.js laattaMuuttunut + js/pallo.js pallonLaatta):
// laatat.json:n delta-kenttä, bittikartta (LSB ensin, rivi · sarakkeita + sarake), yli-indeksi → perus, null-taso → uusi,
// ilman deltaa ennallaan, polun ohjaus (DeltaRekisteri.Ohjaa) ja laattapaketin jako uusiin/perussarjan laattoihin.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class DeltasarjaTestit
    {
        const string Uusi = "julisteet/pallo/laatat/2026-09-30-pohja/";
        const string Perus = "julisteet/pallo/laatat/2026-09-27-pohja/";

        static string B64(params byte[] b) => Convert.ToBase64String(b);

        // Taso 3 (8 × 8 laattaa): (x 1, y 0) = bitti 1, (x 0, y 1) = bitti 8, (x 7, y 7) = bitti 63.
        static string Json(string muuttuneet) => "{\"tasot\":{\"min\":0,\"max\":8},\"delta\":{\"perus\":\"2026-09-27-pohja\",\"muuttuneet\":" + muuttuneet + "}}";
        static string Taso3() => B64(0x02, 0x01, 0, 0, 0, 0, 0, 0x80);

        [Testi]
        static void BittijarjestysLsbEnsinJaRiviKertaSarakkeita()
        {
            var d = Deltasarja.Lue(Json("{\"3\":\"" + Taso3() + "\"}"));
            Oleta.Tosi(d != null, "delta luettu");
            Oleta.Sama("2026-09-27-pohja", d.Perus);
            Oleta.Sama(Perus, d.PerusKansio);
            Oleta.Sama(true, d.Muuttunut(3, 1, 0, 8), "bitti 1 = tavu 0 bitti 1 (LSB ensin)");
            Oleta.Sama(true, d.Muuttunut(3, 0, 1, 8), "bitti 8 = tavu 1 bitti 0: rivi 1 · 8 + sarake 0");
            Oleta.Sama(true, d.Muuttunut(3, 7, 7, 8), "bitti 63 = tavu 7 bitti 7 (MSB)");
            Oleta.Sama(false, d.Muuttunut(3, 0, 0, 8), "bitti 0 = perus");
            Oleta.Sama(false, d.Muuttunut(3, 2, 0, 8), "bitti 2 = perus (0x02 vain bitti 1)");
            // Rivi ja sarake eivät ole vaihdettavissa: (x 0, y 1) muuttunut, (x 1, y 0) muuttunut, mutta (x 1, y 1) = bitti 9 ei.
            Oleta.Sama(false, d.Muuttunut(3, 1, 1, 8), "bitti 9");
            Oleta.Sama(false, d.Muuttunut(3, 6, 7, 8), "bitti 62");
        }

        [Testi]
        static void MuuTavuBittiMonellaTavulla()
        {
            // 0b1010_0000 tavussa 2: bitit 21 ja 23 (LSB ensin: bitti 5 → 16 + 5, bitti 7 → 16 + 7).
            var d = Deltasarja.Lue(Json("{\"3\":\"" + B64(0, 0, 0xA0, 0, 0, 0, 0, 0) + "\"}"));
            var muuttuneet = new List<int>();
            for (int i = 0; i < 64; i++) if (d.Muuttunut(3, i % 8, i / 8, 8)) muuttuneet.Add(i);
            Oleta.Sama("21,23", string.Join(",", muuttuneet));
        }

        [Testi]
        static void YliIndeksiOnPerus()
        {
            // Kartta vain 2 tavua (16 laattaa), taso 3 tarvitsisi 8: laatat yli kartan = perussarjasta (bitti 0).
            var d = Deltasarja.Lue(Json("{\"3\":\"" + B64(0xFF, 0xFF) + "\"}"));
            Oleta.Sama(true, d.Muuttunut(3, 7, 1, 8), "bitti 15 kartan sisällä");
            Oleta.Sama(false, d.Muuttunut(3, 0, 2, 8), "bitti 16 heti kartan yli");
            Oleta.Sama(false, d.Muuttunut(3, 7, 7, 8), "bitti 63 kartan yli");
            Oleta.Sama(Perus, d.Kansio(Uusi, 3, 0, 2));
            Oleta.Sama(Uusi, d.Kansio(Uusi, 3, 7, 1));
        }

        [Testi]
        static void NullTasoJaPuuttuvaTasoUudessa()
        {
            var d = Deltasarja.Lue(Json("{\"0\":null,\"1\":null,\"3\":\"" + Taso3() + "\"}"));
            Oleta.Sama(true, d.Muuttunut(0, 0, 0, 1), "null-taso");
            Oleta.Sama(true, d.Muuttunut(1, 1, 1, 2), "null-taso");
            Oleta.Sama(true, d.Muuttunut(5, 17, 3, 32), "taso puuttuu taulusta");
            Oleta.Sama(false, d.TasollaKartta(0));
            Oleta.Sama(true, d.TasollaKartta(3));
            Oleta.Sama(Uusi, d.Kansio(Uusi, 5, 17, 3));
            Oleta.Sama(1.0, d.MuuttuneidenOsuus(0));
            Oleta.Sama(3.0 / 64, d.MuuttuneidenOsuus(3), "kolme bittiä kuudestakymmenestäneljästä");
            // Rikkinäinen base64 = koko taso uudessa (kuten web).
            var r = Deltasarja.Lue(Json("{\"2\":\"!!!ei-base64\"}"));
            Oleta.Sama(true, r.Muuttunut(2, 1, 1, 4));
            // Tyhjä muuttuneet-taulu: kaikki uudessa.
            Oleta.Sama(true, Deltasarja.Lue(Json("{}")).Muuttunut(4, 3, 3, 16));
        }

        [Testi]
        static void IlmanDeltaaEnnallaan()
        {
            Oleta.Sama(null, Deltasarja.Lue("{\"tasot\":{\"min\":0,\"max\":8}}"), "ei delta-kenttää");
            Oleta.Sama(null, Deltasarja.Lue("{\"delta\":null}"));
            Oleta.Sama(null, Deltasarja.Lue("{\"delta\":{\"muuttuneet\":{}}}"), "perus puuttuu");
            Oleta.Sama(null, Deltasarja.Lue("ei json"));
            Oleta.Sama(null, Deltasarja.Lue(""));
            DeltaRekisteri.Nollaa();
            string p = Uusi + "5/17/3.jpg";
            Oleta.Sama(p, DeltaRekisteri.Ohjaa(p), "tuntematon kansio");
            DeltaRekisteri.Aseta(Uusi, null);
            Oleta.Sama(true, DeltaRekisteri.Tunnettu(Uusi));
            Oleta.Sama(p, DeltaRekisteri.Ohjaa(p), "täysi sarja (ei deltaa)");
            Oleta.Sama(0, DeltaRekisteri.PerusKansiot().Count);
            DeltaRekisteri.Nollaa();
        }

        [Testi]
        static void JuurenaKelpaaPelkkaDeltaObjekti()
        {
            // Karttasepän delta-pohja.json: perus + muuttuneet suoraan juuressa.
            var d = Deltasarja.Lue("{\"perus\":\"2026-09-27-pohja\",\"muuttuneet\":{\"3\":\"" + Taso3() + "\"}}");
            Oleta.Tosi(d != null && d.Muuttunut(3, 1, 0, 8) && !d.Muuttunut(3, 0, 0, 8), "juuri = delta");
        }

        [Testi]
        static void PolunJasennysJaOhjaus()
        {
            Oleta.Tosi(DeltaRekisteri.Jasenna(Uusi + "3/1/0.jpg?v=2", out var k, out int z, out int x, out int y, out var pa), "jäsennys");
            Oleta.Sama(Uusi, k);
            Oleta.Sama("3/1/0", z + "/" + x + "/" + y);
            Oleta.Sama(".jpg?v=2", pa);
            Oleta.Tosi(!DeltaRekisteri.Jasenna(Uusi + "laatat.json", out _, out _, out _, out _, out _), "laatat.json ei ole laatta");
            Oleta.Tosi(!DeltaRekisteri.Jasenna("julisteet/pallo/laatat/3/1/0.jpg", out _, out _, out _, out _, out _), "kansion nimi puuttuu");
            Oleta.Tosi(!DeltaRekisteri.Jasenna("julisteet/pallo/kerma/v1/GR/3/1/0.webp", out _, out _, out _, out _, out _), "muu sarja");
            Oleta.Tosi(!DeltaRekisteri.Jasenna(null, out _, out _, out _, out _, out _));

            DeltaRekisteri.Nollaa();
            DeltaRekisteri.Aseta(Uusi, Deltasarja.Lue(Json("{\"3\":\"" + Taso3() + "\"}")));
            Oleta.Sama(Uusi + "3/1/0.jpg", DeltaRekisteri.Ohjaa(Uusi + "3/1/0.jpg"), "muuttunut pysyy uudessa");
            Oleta.Sama(Perus + "3/0/0.jpg", DeltaRekisteri.Ohjaa(Uusi + "3/0/0.jpg"), "muuttumaton → perus");
            Oleta.Sama(Perus + "3/0/0.jpg?v=2", DeltaRekisteri.Ohjaa(Uusi + "3/0/0.jpg?v=2"), "kysely säilyy");
            Oleta.Sama(Uusi + "4/9/9.jpg", DeltaRekisteri.Ohjaa(Uusi + "4/9/9.jpg"), "taso 4 puuttuu kartasta → uusi");
            Oleta.Sama(Perus + "3/0/0.jpg", DeltaRekisteri.Ohjaa(Perus + "3/0/0.jpg"), "idempotentti");
            Oleta.Sama(Uusi + "laatat.json", DeltaRekisteri.Ohjaa(Uusi + "laatat.json"), "luettelo aina uudesta");
            Oleta.Sama("julisteet/pallo/laatat/muu/3/0/0.jpg", DeltaRekisteri.Ohjaa("julisteet/pallo/laatat/muu/3/0/0.jpg"), "muu kansio");
            Oleta.Sama(1, DeltaRekisteri.PerusKansiot().Count);
            Oleta.Sama(Perus, DeltaRekisteri.PerusKansiot()[0]);
            DeltaRekisteri.Nollaa();
        }

        [Testi]
        static void PakettiJakaaUudetJaPerus()
        {
            var d = Deltasarja.Lue(Json("{\"0\":null,\"1\":null,\"2\":null,\"3\":\"" + Taso3() + "\"}"));
            var uudet = new List<string>();
            var perus = new List<string>();
            Laattapaketti.DeltaPolut(d, Uusi, ".jpg", 0, 3, uudet, perus);
            // Z0–Z2 kaikki uudessa (1 + 4 + 16), Z3: bitit 1, 8 ja 63 uudessa, loput 61 perussarjasta.
            Oleta.Sama(21 + 3, uudet.Count);
            Oleta.Sama(61, perus.Count);
            Oleta.Tosi(uudet.Contains(Uusi + "3/1/0.jpg") && uudet.Contains(Uusi + "3/0/1.jpg") && uudet.Contains(Uusi + "3/7/7.jpg"));
            Oleta.Tosi(perus.Contains(Perus + "3/0/0.jpg") && !perus.Contains(Perus + "3/1/0.jpg"));
            var ilman = new List<string>();
            var eiPerus = new List<string>();
            Laattapaketti.DeltaPolut(null, Uusi, ".jpg", 0, 3, ilman, eiPerus);
            Oleta.Sama(1 + 4 + 16 + 64, ilman.Count, "ilman deltaa kaikki uudessa");
            Oleta.Sama(0, eiPerus.Count);
        }

        // Oikea aineisto (valinnainen): Karttasepän pyramidi 27 → 30 -delta. DELTA_KOE=<delta-pohja.json>
        // (oletus /Users/Shared/Claude/pyramidi-poltto/delta-koe/delta-pohja.json; puuttuva tiedosto ohitetaan).
        [Testi]
        static void OikeaAineistoMuuttuneidenOsuus()
        {
            string polku = Environment.GetEnvironmentVariable("DELTA_KOE") ?? "/Users/Shared/Claude/pyramidi-poltto/delta-koe/delta-pohja.json";
            if (!File.Exists(polku)) { Console.WriteLine("      (ohitettu: ei " + polku + ")"); return; }
            var d = Deltasarja.Lue(File.ReadAllText(polku));
            Oleta.Tosi(d != null, "delta luettu");
            long kaikki = 0, muuttuneet = 0;
            for (int z = 0; z <= 8; z++)
            {
                double osuus = d.MuuttuneidenOsuus(z);
                long n = 1L << (2 * z);
                kaikki += n;
                muuttuneet += (long)Math.Round(osuus * n);
                Console.WriteLine($"      z{z}: {osuus * 100:0.0} % muuttunut ({(long)Math.Round(osuus * n)}/{n})");
            }
            Console.WriteLine($"      z0–z8 yhteensä: {100.0 * muuttuneet / kaikki:0.0} % muuttunut ({muuttuneet}/{kaikki}), perus {d.Perus}");
            Oleta.Sama(1.0, d.MuuttuneidenOsuus(2), "z0–z2 null = koko taso uudessa");
            double z8 = d.MuuttuneidenOsuus(8);
            Oleta.Tosi(z8 > 0.01 && z8 < 0.10, "z8:n muuttuneiden osuus on muutama prosentti, oli " + z8);
        }
    }
}
