// 3D-SYMBOLINOSTOJEN ARKKITYYPIT (löydös 160, kohta 11): nosto → arkkityyppi (ArkkityyppiKartoitus) Pelikoodarin
// ehdotuksen mukaan (proto-3d/lokit/loydos160-arkkityypit.txt): kiinteä tason 1 taulu, nimisääntö, lajin oletus, merkkikivi.
// Paketin jakauma (valinnainen): KARTTAVALOT=<karttavalot.json> tai oletus /Users/Shared/Claude/sisalto-koe-2/v12/kokoelmat.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja;
using Matkakirja.Peli;

namespace Matkakirja.Kartta.Testit
{
    static class ArkkityyppiKartoitusTestit
    {
        static Arkkityyppi K(string id, string nimi, string kategoria, string laji, out ArkkityyppiKartoitus.Peruste p) =>
            ArkkityyppiKartoitus.Kartoita(id, nimi, kategoria, laji, out p);

        [Testi]
        static void Taso1TauluJaKasinKorjatut()
        {
            Oleta.Sama(185, ArkkityyppiKartoitus.TaulunRiveja, "tason 1 rivit");
            Oleta.Sama(Arkkityyppi.Temppeli, K("kohde:akropolis", "Akropolis", "historia", null, out var p), "Akropolis");
            Oleta.Sama(ArkkityyppiKartoitus.Peruste.Taulu, p);
            // Pelikoodarin käsin korjaamat (sääntö osui väärin).
            Oleta.Sama(Arkkityyppi.Temppeli, K("kohde:delfoi", "Delfoi", "historia", null, out _), "Delfoi");
            Oleta.Sama(Arkkityyppi.Raunio, K("kohde:knossos", "Knossoksen palatsi", "historia", null, out _), "Knossos ei linna");
            Oleta.Sama(Arkkityyppi.Raunio, K("kohde:olympia", "Olympia", "kulttuuri", null, out _), "Olympia");
            Oleta.Sama(Arkkityyppi.Vuori, K("kohde:santorini", "Santoríni", "luonto", null, out _), "Santorini");
            Oleta.Sama(Arkkityyppi.Luostari, K("kohde:hahmotelma-meteora", "Meteora", "kulttuuri", null, out _), "Meteora");
            // Uudet arkkityypit taulussa (Natiivisepän tarkennus).
            Oleta.Sama(Arkkityyppi.Mylly, K("kohde:hahmotelma-kinderdijk", "Kinderdijkin myllyt", "kauppa", null, out _), "Kinderdijk");
            Oleta.Sama(Arkkityyppi.Silta, K("kohde:mostar", "Mostar", "kaupunki", null, out _), "Mostar");
            Oleta.Sama(Arkkityyppi.Luola, K("kohde:hahmotelma-postojna", "Postojnan luola", "luonto", null, out _), "Postojna");
            // Taulu voittaa nimen: Knossoksen "palats" osuisi linnaan.
            Oleta.Sama(Arkkityyppi.Linna, K("kohde:ei-taulussa", "Knossoksen palatsi", "historia", null, out p), "sama nimi taulun ulkopuolella");
            Oleta.Sama(ArkkityyppiKartoitus.Peruste.Nimi, p);
        }

        [Testi]
        static void NimisaantoJarjestyksessa()
        {
            (string nimi, Arkkityyppi odotus)[] tapaukset =
            {
                ("Uspenskin katedraali", Arkkityyppi.Kirkko),
                ("Valamon luostari", Arkkityyppi.Luostari),
                ("Suomenlinna", Arkkityyppi.Linna),
                ("Hangon majakka", Arkkityyppi.Majakka),           // majakka ennen satamaa
                ("Vanha satama", Arkkityyppi.Satama),
                ("Kaarlen silta", Arkkityyppi.Silta),
                ("Tower Bridge", Arkkityyppi.Silta),
                ("Kultainen portti", Arkkityyppi.Kaupunginmuuri),
                ("Zaanse Schans windmill", Arkkityyppi.Mylly),
                ("Karhuluola", Arkkityyppi.Luola),
                ("Vapaudenpatsas", Arkkityyppi.Muistomerkki),
                ("Rooman forum", Arkkityyppi.Raunio),
                ("Tukholman raatihuone", Arkkityyppi.Kaupunkitalo),
                ("Etnan kraatteri", Arkkityyppi.Vuori),
                ("Zeuksen temppeli", Arkkityyppi.Temppeli),       // temppeli ennen muita
                ("Kristiansand", Arkkityyppi.Merkkikivi),         // \bristi ei osu sanan keskeltä
                ("Mostarin kaupunki", Arkkityyppi.Merkkikivi),    // \bmost\b ei osu Mostariin
            };
            foreach (var (nimi, odotus) in tapaukset)
                Oleta.Sama(odotus, K("kohde:x", nimi, "kulttuuri", null, out _), nimi);
        }

        [Testi]
        static void LajinOletusJaMerkkikivi()
        {
            Oleta.Sama(Arkkityyppi.Vuori, K("kohde:x", "Olympos", "luonto", "vuori", out var p), "laji vuori");
            Oleta.Sama(ArkkityyppiKartoitus.Peruste.Laji, p);
            Oleta.Sama(Arkkityyppi.Satama, K("kohde:x", "Pireus", "kauppa", "merenkulku", out _), "laji merenkulku");
            // Laji puuttuu (nykyinen karttavalot.json): kategoria oletuksena.
            Oleta.Sama(Arkkityyppi.Raunio, K("kohde:x", "Mykene", "historia", null, out p), "kategoria historia");
            Oleta.Sama(ArkkityyppiKartoitus.Peruste.Kategoria, p);
            Oleta.Sama(Arkkityyppi.Kaupunkitalo, K("kohde:x", "Thessaloniki", "kaupunki", null, out _), "kategoria kaupunki");
            // Laji voittaa kategorian.
            Oleta.Sama(Arkkityyppi.Vuori, K("kohde:x", "Parnassos", "historia", "vuori", out _), "laji ennen kategoriaa");
            Oleta.Sama(Arkkityyppi.Merkkikivi, K("kohde:x", "Saimaa", "luonto", "jarvi", out p), "muu → merkkikivi");
            Oleta.Sama(ArkkityyppiKartoitus.Peruste.Oletus, p);
            Oleta.Sama(Arkkityyppi.Merkkikivi, K(null, null, null, null, out _), "tyhjä nosto");
        }

        /// <summary>Paketin jakauma tasoittain ja perusteittain lokiin; tason 1 id:t kaikki taulussa.</summary>
        [Testi]
        static void PaketinJakauma()
        {
            string polku = Environment.GetEnvironmentVariable("KARTTAVALOT") ?? "/Users/Shared/Claude/sisalto-koe-2/v12/kokoelmat/karttavalot.json";
            if (!File.Exists(polku)) { Console.WriteLine("      (ohitettu: " + polku + " puuttuu)"); return; }
            var alkiot = MiniJson.Alkiot(File.ReadAllText(polku)).ToList();
            var jakauma = new SortedDictionary<string, int>();
            var perusteet = new SortedDictionary<string, int>();
            int taso1 = 0, puuttuu = 0;
            foreach (var a in alkiot)
            {
                if (a.GetValueOrDefault("paakartalla") is bool pk && !pk) continue;
                int taso = NostoSaannot.Taso(MiniJson.Luku(a, "taso"));
                string id = MiniJson.Teksti(a, "id");
                var t = ArkkityyppiKartoitus.Kartoita(id, MiniJson.Teksti(a, "nimi"), MiniJson.Teksti(a, "kategoria"),
                    MiniJson.Teksti(a, "laji") ?? MiniJson.Teksti(a, "symLaji"), out var p);
                string k = "taso " + taso + " " + t;
                jakauma[k] = jakauma.GetValueOrDefault(k) + 1;
                perusteet["taso " + taso + " " + p] = perusteet.GetValueOrDefault("taso " + taso + " " + p) + 1;
                if (taso == 1) { taso1++; if (!ArkkityyppiKartoitus.Taulussa(id)) { puuttuu++; Console.WriteLine("      taulusta puuttuu " + id); } }
            }
            Console.WriteLine("      " + polku + ": " + alkiot.Count + " alkiota");
            Console.WriteLine("      perusteet: " + string.Join(", ", perusteet.Select(x => x.Key + " " + x.Value)));
            Console.WriteLine("      jakauma: " + string.Join(", ", jakauma.Select(x => x.Key + " " + x.Value)));
            Oleta.Sama(0, puuttuu, "tason 1 id:t taulussa (" + taso1 + ")");
        }
    }
}
