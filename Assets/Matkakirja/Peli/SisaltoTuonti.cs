// Siirtosepän sisältöpaketin tuonti (skeema 1.1): kokoelmat kaupungit.json
// ja reitit.json → Kaupunki- ja Reitti-oliot. Näytteet: Kultaiset/paketti/.
//
// Kokoelman runko: {"$skeema","nimi","lahde","kuvaus","viittaukset","alkiot":[...]}.
// Reittien alkiot: {id, laji ('maa'|'sea'|'lento'), a, b, data:{a,b,steps,type?,fee?,via?}}.
// Askeleet ja maksu luetaan data-kentästä, koska se on laudan raakadata
// sellaisenaan (js/packs/maailmankartta.js edges ja airRoutes).
using System;
using System.Collections.Generic;
using System.IO;

namespace Matkakirja.Peli
{
    public static class SisaltoTuonti
    {
        /// <summary>Kokoelman alkiot ("alkiot"-taulukko objekteina).</summary>
        static IEnumerable<Dictionary<string, object>> Alkiot(string json, string odotettuNimi)
        {
            var runko = MiniJson.Objekti(MiniJson.Jasenna(json));
            var nimi = MiniJson.Teksti(runko, "nimi");
            if (nimi != null && nimi != odotettuNimi)
                throw new FormatException($"odotettiin kokoelmaa '{odotettuNimi}', saatiin '{nimi}'");
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(runko, "alkiot")))
                yield return MiniJson.Objekti(a);
        }

        /// <summary>Kaupungit paketin järjestyksessä (sama kuin laudan cities).</summary>
        public static List<Kaupunki> LueKaupungit(string json)
        {
            var tulos = new List<Kaupunki>();
            foreach (var o in Alkiot(json, "kaupungit"))
            {
                tulos.Add(new Kaupunki
                {
                    Id = MiniJson.Teksti(o, "id") ?? throw new FormatException("kaupungilta puuttuu id"),
                    Nimi = MiniJson.Teksti(o, "nimi"),
                    Maa = MiniJson.Teksti(o, "maa"),
                    Maa2 = MiniJson.Teksti(o, "maa2"),
                    Manner = MiniJson.Teksti(o, "manner"),
                    Lat = MiniJson.Luku(o, "lat") ?? 0,
                    Lon = MiniJson.Luku(o, "lon") ?? 0,
                    Saari = MiniJson.Totuus(o, "saari"),
                    Lentokentta = MiniJson.Totuus(o, "lentokentta"),
                    Aloitus = MiniJson.Totuus(o, "aloitus"),
                    Tyyppi = MiniJson.Teksti(o, "tyyppi"),
                });
            }
            return tulos;
        }

        /// <summary>
        /// Reitit paketin järjestyksessä: maa/meri laudan edges-järjestyksessä
        /// (adj-listojen järjestys riippuu tästä, ja findMoves-polkujen
        /// tasapelit ratkeavat sen mukaan) ja lennot airRoutes-järjestyksessä.
        /// </summary>
        public static List<Reitti> LueReitit(string json)
        {
            var tulos = new List<Reitti>();
            foreach (var o in Alkiot(json, "reitit"))
            {
                var laji = MiniJson.Teksti(o, "laji");
                // Päätaso (skeema 1.26: a, b, askelia, laji); vanhan paketin varareitti Paataso.Nakyma.
                var n = Paataso.Nakyma(o, Paataso.Reitti);
                var a = MiniJson.Teksti(n, "a");
                var b = MiniJson.Teksti(n, "b");
                if (a == null || b == null) throw new FormatException($"reitiltä {MiniJson.Teksti(o, "id")} puuttuu pää");

                // Maksu päätasolta (skeema 1.30, kaikilla reiteillä webin kaavalla). Puuttuva kenttä (≤ 1.29,
                // tuotanto v11): web buildBoard fee = type === 'sea' ? (raw.fee ?? SEA_FEE) : 0, raw.fee vain
                // Paataso-varareitillä.
                var maksu = MiniJson.Luku(o, "maksu");
                if (laji == "lento")
                {
                    tulos.Add(new Reitti { Id = "lento:" + a + "|" + b, A = a, B = b, Laji = ReitinLaji.Lento, Askeleet = 0, Maksu = (int)(maksu ?? 0) });
                    continue;
                }
                if (laji != "maa" && laji != "sea") throw new FormatException($"tuntematon reitin laji '{laji}'");

                // Web buildBoard: type = raw.type ?? 'land'; fee = type === 'sea' ? (raw.fee ?? SEA_FEE) : 0.
                // Päätason laji = raw.type ("sea") tai "maa" (raw.type puuttuu = 'land').
                bool meri = laji == "sea";
                var askeleet = MiniJson.Luku(n, "askelia") ?? throw new FormatException($"reitiltä {a}|{b} puuttuu askelia");
                tulos.Add(new Reitti
                {
                    Id = a + "|" + b,
                    A = a,
                    B = b,
                    Laji = meri ? ReitinLaji.Meri : ReitinLaji.Maa,
                    Askeleet = (int)askeleet,
                    Maksu = (int)(maksu ?? (meri ? MiniJson.Luku(Paataso.Raaka(o), "fee") ?? Vakiot.MeriHinta : 0)),
                });
            }
            return tulos;
        }

        /// <summary>Lukee paketin kansiosta (…/kokoelmat/) kaupungit.json ja reitit.json.</summary>
        public static Reittiverkko LueKansiosta(string kansio) =>
            new Reittiverkko(
                LueKaupungit(File.ReadAllText(Path.Combine(kansio, "kaupungit.json"))),
                LueReitit(File.ReadAllText(Path.Combine(kansio, "reitit.json"))));
    }
}
