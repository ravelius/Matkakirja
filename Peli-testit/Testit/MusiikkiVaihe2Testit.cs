// Musiikkisuunnitelma vaihe 2 (Pelikoodari 26.9.2026, proto-3d/lokit/musiikki-vaihe2-kytkenta-maarittely.md):
// maanosat (web kaupunkimusiikki.js MAANOSAT, ALUEEN_MAANOSA, MAAN_MAANOSA, kaupunginMaanosa), saapumistunnus
// maanosittain, maanosaraita alueraidan varareittinä, kohtaamisen tilaraita (visa voittaa) ja tehtävän tulos
// (musa-ratkaisu / musa-epaonnistuminen ei-katkaisevina aiheina).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    static class MusiikkiVaihe2Testit
    {
        static string Yhdista(IEnumerable<string> l) => "[" + string.Join("|", l) + "]";
        static string P(string tunnus) => "assets/audio/" + tunnus + "-lyria.mp3";

        /// <summary>Määrittelyn MAAN_MAANOSA sanatarkasti (kohta 1).</summary>
        static readonly (string Maanosa, string Maat)[] Maarittely =
        {
            ("valimeri", "CYP"),
            ("lahi-ita", "ARE DZA EGY IRN IRQ JOR KWT LBY MAR OMN QAT SAU SDN SYR TUN YEM KAZ UZB"),
            ("saharan-etelapuoli", "AGO CMR COD ETH GHA KEN LBR MDG MLI MOZ NAM NGA SEN SHN SLE SOM SDS TCD TZA UGA ZAF ZWE"),
            ("etela-aasia", "AFG IND LKA NPL PAK MMR"),
            ("ita-aasia", "CHN HKG JPN KOR MNG TWN VNM THA PHL IDN SGP"),
            ("oseania", "AUS NZL FJI NCL NFK PNG SLB VUT TLS"),
            ("pohjois-amerikka", "USA CAN MEX CUB GTM NIC PAN PRI BMU GRL"),
            ("etela-amerikka", "ARG BOL BRA CHL COL ECU FLK GUF PER PRY URY VEN"),
        };

        [Testi] static void MaanosataulutKutenMaarittely()
        {
            var t = AaniTaulut.Oletus();
            Oleta.Sama("[lansi-eurooppa|valimeri|ita-eurooppa|lahi-ita|saharan-etelapuoli|etela-aasia|ita-aasia|pohjois-amerikka|etela-amerikka|oseania]",
                Yhdista(AaniTaulut.Maanosat), "MAANOSAT");
            Oleta.Sama("[britteinsaaret=lansi-eurooppa|pohjola=lansi-eurooppa|keski-eurooppa=lansi-eurooppa|valimeri=valimeri|balkan=valimeri|ita-eurooppa=ita-eurooppa]",
                Yhdista(t.AlueenMaanosa.Select(p => p.Key + "=" + p.Value)), "ALUEEN_MAANOSA");
            // Jokainen musiikkialue kuuluu maanosaan.
            foreach (var alue in t.Alueraidat) Oleta.Tosi(t.AlueenMaanosa.ContainsKey(alue), "alueella ei maanosaa: " + alue);
            var odotettu = Maarittely.SelectMany(r => r.Maat.Split(' ').Select(m => m + "=" + r.Maanosa)).OrderBy(x => x, StringComparer.Ordinal);
            Oleta.Sama(Yhdista(odotettu), Yhdista(t.MaanMaanosa.Select(p => p.Key + "=" + p.Value).OrderBy(x => x, StringComparer.Ordinal)), "MAAN_MAANOSA");
            Oleta.Sama(89, t.MaanMaanosa.Count, "maita ilman aluetta");
            // Alueen maat eivät ole MAAN_MAANOSASSA (kaupunkipoikkeus Marseille pätee maanosaankin).
            foreach (var m in t.AlueenMaat.Keys) Oleta.Tosi(!t.MaanMaanosa.ContainsKey(m), "alueen maa maanosataulussa: " + m);
            foreach (var m in t.MaanMaanosa.Values) Oleta.Tosi(AaniTaulut.Maanosat.Contains(m), "tuntematon maanosa " + m);
            Oleta.Sama("[lansi-eurooppa|valimeri]", Yhdista(t.Maanosaraidat.OrderBy(x => x == "valimeri" ? 1 : 0)), "MAANOSARAIDAT");
        }

        /// <summary>Määrittelyn testi: jokaisella pakan cityCountry-maalla on maanosa (koepaketti ja tuotannon kopio).</summary>
        [Testi] static void JokaisellaPakanMaallaOnMaanosa()
        {
            var valitsin = new Musiikkivalitsin(AaniTaulut.Oletus());
            var kansiot = new List<string> { KultaisetApu.Paketti };
            var tuotanto = Path.Combine(KultaisetApu.Juuri, "Kultaiset", "tuotanto");
            if (Directory.Exists(tuotanto))
                kansiot.AddRange(Directory.GetDirectories(tuotanto).Select(d => Path.Combine(d, "kokoelmat")).Where(d => File.Exists(Path.Combine(d, "kaupungit.json"))));
            int kaupunkeja = 0;
            foreach (var kansio in kansiot)
            {
                var puuttuvat = new SortedSet<string>(StringComparer.Ordinal);
                foreach (var k in SisaltoTuonti.LueKaupungit(File.ReadAllText(Path.Combine(kansio, "kaupungit.json"))))
                {
                    kaupunkeja++;
                    if (k.Maa == null) continue;
                    if (valitsin.Maanosa(k.Id, k.Maa) == null) puuttuvat.Add(k.Maa + " (" + k.Id + ")");
                }
                Oleta.Sama("[]", Yhdista(puuttuvat), kansio);
            }
            Oleta.Tosi(kaupunkeja >= 266, "kaupunkeja " + kaupunkeja);
        }

        [Testi] static void MaanosaAlueenKauttaTaiMaasta()
        {
            var v = new Musiikkivalitsin(AaniTaulut.Oletus());
            Oleta.Sama("lansi-eurooppa", v.Maanosa("lontoo", "GBR"));
            Oleta.Sama("lansi-eurooppa", v.Maanosa("pariisi", "FRA"));
            Oleta.Sama("valimeri", v.Maanosa("marseille", "FRA"), "kaupunkipoikkeus");
            Oleta.Sama("valimeri", v.Maanosa("sofia", "BGR"), "Balkan");
            Oleta.Sama("ita-eurooppa", v.Maanosa("moskova", "RUS"));
            Oleta.Sama("valimeri", v.Maanosa("nikosia", "CYP"), "maa ilman aluetta");
            Oleta.Sama("lahi-ita", v.Maanosa("kairo", "EGY"));
            Oleta.Sama(null, v.Maanosa("etusivu", null), "virtuaalipaikka");
            Oleta.Sama(null, v.Maanosa("x", "ZZZ"), "tuntematon maa");
        }

        [Testi] static void SaapumistunnusMaanosittain()
        {
            var t = AaniTaulut.Oletus();
            Oleta.Sama(10, t.Saapumistunnukset.Count, "tunnuksia");
            foreach (var m in AaniTaulut.Maanosat) Oleta.Sama(P("musa-saapuminen-" + m), t.Saapumistunnukset[m], m);
            // Edustaja jokaisesta maanosasta: UusiKaupunki soittaa maanosan tunnuksen aihekanavalle.
            var edustajat = new (string Kaupunki, string Maa, string Maanosa)[]
            {
                ("lontoo", "GBR", "lansi-eurooppa"), ("marseille", "FRA", "valimeri"), ("moskova", "RUS", "ita-eurooppa"),
                ("kairo", "EGY", "lahi-ita"), ("nairobi", "KEN", "saharan-etelapuoli"), ("delhi", "IND", "etela-aasia"),
                ("tokio", "JPN", "ita-aasia"), ("newyork", "USA", "pohjois-amerikka"), ("lima", "PER", "etela-amerikka"),
                ("sydney", "AUS", "oseania"),
            };
            foreach (var (kaupunki, maa, maanosa) in edustajat)
            {
                t.Maat[kaupunki] = maa;
                var tila = new AaniTila(t, new Satunnainen(1).Seuraava);
                tila.Paikka(kaupunki, "kaupunki");
                tila.UusiKaupunki(kaupunki);
                Oleta.Tosi(tila.Toive(Kanava.Aarre).Url?.EndsWith("/musa-saapuminen-" + maanosa + "-lyria.mp3") == true,
                    kaupunki + " → " + tila.Toive(Kanava.Aarre).Url);
            }
            // Paketin musiikkiaihe-rivi saapuminen-<maanosa> korvaa oletuksen; ratkaisu ja epäonnistuminen samoin.
            t.LueAanitaulut("{\"nimi\":\"aanitaulut\",\"alkiot\":["
                + "{\"laji\":\"musiikkiaihe\",\"nimi\":\"saapuminen-oseania\",\"tunnus\":\"musa-saapuminen-oseania-2\"},"
                + "{\"laji\":\"musiikkiaihe\",\"nimi\":\"ratkaisu\",\"tunnus\":\"musa-ratkaisu-2\"},"
                + "{\"laji\":\"musiikkiaihe\",\"nimi\":\"epaonnistuminen\",\"tunnus\":\"musa-epaonnistuminen-2\"}]}");
            Oleta.Sama(P("musa-saapuminen-oseania-2"), t.Saapumistunnukset["oseania"], "paketin tunnus");
            Oleta.Sama(P("musa-ratkaisu-2"), t.RatkaisuAihe, "paketin ratkaisu");
            Oleta.Sama(P("musa-epaonnistuminen-2"), t.EpaonnistuminenAihe, "paketin epäonnistuminen");
        }

        [Testi] static void KetjunJarjestysMaanosaAlueenJalkeen()
        {
            var v = new Musiikkivalitsin(AaniTaulut.Oletus());
            string K(string paikka, string maa, params string[] tilat) => Yhdista(v.Ketju(tilat, paikka, maa));
            Oleta.Sama(Yhdista(new[] { P("musa-kaupunki-ateena"), P("musa-kaupunki-valimeri"), P("musa-maanosa-valimeri"), P("musa-pohja") }),
                K("ateena", "GRC"), "kaupunki → alue → maanosa → pohja");
            Oleta.Sama(Yhdista(new[] { P("musa-kaupunki-keski-eurooppa"), P("musa-maanosa-lansi-eurooppa"), P("musa-pohja") }), K("pariisi", "FRA"));
            Oleta.Sama(Yhdista(new[] { P("musa-kaupunki-valimeri"), P("musa-maanosa-valimeri"), P("musa-pohja") }), K("marseille", "FRA"));
            Oleta.Sama(Yhdista(new[] { P("musa-kaupunki-ita-eurooppa"), P("musa-pohja") }), K("moskova", "RUS"), "Itä-Euroopalla ei vielä maanosaraitaa");
            Oleta.Sama(Yhdista(new[] { P("musa-maanosa-valimeri"), P("musa-pohja") }), K("nikosia", "CYP"), "maanosaraita ilman aluetta");
            Oleta.Sama(Yhdista(new[] { P("musa-pohja") }), K("kairo", "EGY"), "vaihe 3 tuo loput maanosat");
            // Tilat ennen paikkaa; kohtaaminen viimeisenä (web TILARAIDAT: lehti ja matkalaukku vievät musiikin mukanaan).
            Oleta.Sama(Yhdista(new[] { P("musa-lehti"), P("musa-matkalaukku"), P("musa-kohtaaminen"), P("musa-kaupunki-keski-eurooppa"), P("musa-maanosa-lansi-eurooppa"), P("musa-pohja") }),
                K("pariisi", "FRA", "kohtaaminen", "matkalaukku", "lehti"));
            // Visan aikana kohtaaminen odottaa ketjussa (web VISAN_ALLE_JAAVAT); lehti ei.
            Oleta.Sama(Yhdista(new[] { P("musa-lehti"), P("musa-kaupunki-keski-eurooppa"), P("musa-maanosa-lansi-eurooppa"), P("musa-pohja") }),
                Yhdista(v.Ketju(new[] { "kohtaaminen", "lehti" }, "pariisi", "FRA", visaSoi: true)));
            // Alueraidan 404 → maanosaraita (soittimen varareitti Valitse).
            var ketju = v.Ketju(null, "pariisi", "FRA");
            Oleta.Sama(P("musa-maanosa-lansi-eurooppa"), Musiikkivalitsin.Valitse(ketju, new HashSet<string> { P("musa-kaupunki-keski-eurooppa") }));
        }

        [Testi] static void KohtaaminenTilaraitanaVisaVoittaa()
        {
            var t = AaniTaulut.Oletus();
            t.Maat["pariisi"] = "FRA";
            var tila = new AaniTila(t, new Satunnainen(1).Seuraava);
            tila.Paikka("pariisi", "kaupunki");
            string Pohja() => tila.Toive(Kanava.Pohja).Url;
            Oleta.Tosi(Pohja()?.EndsWith("/musa-kaupunki-keski-eurooppa-lyria.mp3") == true, "alueraita: " + Pohja());
            tila.Kohtaaminen(true);
            Oleta.Tosi(Pohja()?.EndsWith("/musa-kohtaaminen-lyria.mp3") == true, "kohtaaminen: " + Pohja());
            Oleta.Sama("[kohtaaminen]", Yhdista(tila.Musiikkitilat));
            tila.Visa(true);
            Oleta.Tosi(tila.Toive(Kanava.Visa).Url != null, "visan oma raita soi");
            Oleta.Tosi(tila.Voimassa < 1, "pohja väistyy visan alta");
            Oleta.Tosi(Pohja()?.EndsWith("/musa-kaupunki-keski-eurooppa-lyria.mp3") == true, "visan alla ilman kohtaamista: " + Pohja());
            Oleta.Sama("[kohtaaminen]", Yhdista(tila.Musiikkitilat), "tila ei katoa visan ajaksi");
            tila.Visa(false);
            Oleta.Tosi(tila.Voimassa == 1, "väistö purkautuu");
            Oleta.Tosi(Pohja()?.EndsWith("/musa-kohtaaminen-lyria.mp3") == true, "kohtaaminen palaa: " + Pohja());
            tila.Kohtaaminen(false);
            Oleta.Tosi(Pohja()?.EndsWith("/musa-kaupunki-keski-eurooppa-lyria.mp3") == true, "paikan raita palaa: " + Pohja());

            // Koukut (web visa.js): tervehdyssivu = kohtaaminen ilman visaa, kysymyssivu = visa, tulos = kohtaaminen.
            var koukut = new Aanikoukut(tila, t);
            Aanitilanne S(bool auki, bool kohtaaminen, bool odottaa) =>
                new Aanitilanne { Valmis = true, Kaupunki = "pariisi", KysymysAuki = auki, Kohtaaminen = kohtaaminen, VisaOdottaa = odottaa };
            koukut.Paivita(S(true, true, true));
            Oleta.Tosi(!tila.VisaAuki && Pohja()?.EndsWith("/musa-kohtaaminen-lyria.mp3") == true, "tervehdyssivu: " + Pohja());
            koukut.Paivita(S(true, true, false));
            Oleta.Tosi(tila.VisaAuki && Pohja()?.EndsWith("/musa-kaupunki-keski-eurooppa-lyria.mp3") == true, "kysymyssivu: " + Pohja());
            koukut.Paivita(S(true, true, true));
            Oleta.Tosi(!tila.VisaAuki && Pohja()?.EndsWith("/musa-kohtaaminen-lyria.mp3") == true, "tulos: " + Pohja());
            koukut.Paivita(S(false, false, false));
            Oleta.Tosi(!tila.VisaAuki && !tila.Musiikkitilat.Contains("kohtaaminen"), "koukku sulkee");
            Oleta.Tosi(Pohja()?.EndsWith("/musa-kaupunki-keski-eurooppa-lyria.mp3") == true, "sulun jälkeen: " + Pohja());
            // Tavallinen visa: visa soi koko ajan, kohtaamista ei ole.
            koukut.Paivita(S(true, false, false));
            Oleta.Tosi(tila.VisaAuki && tila.Musiikkitilat.Count == 0, "tavallinen visa");
        }

        [Testi] static void TehtavanTulosEiKatkaiseAarretta()
        {
            var t = AaniTaulut.Oletus();
            var tila = new AaniTila(t, new Satunnainen(1).Seuraava);
            tila.Paikka("pariisi", "kaupunki");
            string Aihe() => tila.Toive(Kanava.Aarre).Url;
            tila.TehtavanTulos(true);
            Oleta.Tosi(Aihe()?.EndsWith("/musa-ratkaisu-lyria.mp3") == true, "ratkaisu: " + Aihe());
            tila.AarreLoppui();
            tila.TehtavanTulos(false);
            Oleta.Tosi(Aihe()?.EndsWith("/musa-epaonnistuminen-lyria.mp3") == true, "epäonnistuminen: " + Aihe());
            tila.TehtavanTulos(true);
            Oleta.Tosi(Aihe()?.EndsWith("/musa-epaonnistuminen-lyria.mp3") == true, "ei katkaise soivaa aihetta");
            tila.AarrePaljastui("pieniAarre");
            Oleta.Tosi(Aihe()?.EndsWith("/musa-aarre-lyria.mp3") == true, "aarreaihe katkaisee: " + Aihe());
            tila.TehtavanTulos(true);
            Oleta.Tosi(Aihe()?.EndsWith("/musa-aarre-lyria.mp3") == true, "ratkaisu jää pois aarteen alla");
            tila.MusiikkiPaalle(false);
            tila.AarreLoppui();
            tila.TehtavanTulos(true);
            Oleta.Sama(null, Aihe(), "musiikki pois -kytkin");
        }

        [Testi] static void VanhanPaketinTilaraidatSaavatKohtaamisen()
        {
            var t = AaniTaulut.Oletus();
            t.LueAanitaulut("{\"nimi\":\"aanitaulut\",\"alkiot\":["
                + "{\"laji\":\"tilaraita\",\"nimi\":\"lehti\",\"tunnus\":\"musa-lehti\"},"
                + "{\"laji\":\"tilaraita\",\"nimi\":\"matkalaukku\",\"tunnus\":\"musa-matkalaukku-2\"}]}");
            Oleta.Sama("[lehti=musa-lehti|matkalaukku=musa-matkalaukku-2|kohtaaminen=musa-kohtaaminen]",
                Yhdista(t.Tilaraidat.Select(r => r.Nimi + "=" + r.Tunnus)), "vanha paketti");
            var u = AaniTaulut.Oletus();
            u.LueAanitaulut("{\"nimi\":\"aanitaulut\",\"alkiot\":["
                + "{\"laji\":\"tilaraita\",\"nimi\":\"kohtaaminen\",\"tunnus\":\"musa-kohtaaminen-2\"},"
                + "{\"laji\":\"tilaraita\",\"nimi\":\"lehti\",\"tunnus\":\"musa-lehti\"},"
                + "{\"laji\":\"tilaraita\",\"nimi\":\"matkalaukku\",\"tunnus\":\"musa-matkalaukku\"}]}");
            Oleta.Sama("[kohtaaminen=musa-kohtaaminen-2|lehti=musa-lehti|matkalaukku=musa-matkalaukku]",
                Yhdista(u.Tilaraidat.Select(r => r.Nimi + "=" + r.Tunnus)), "paketin järjestys voittaa");
        }

        [Testi] static void KohtaamisenKysymysTunnistetaan()
        {
            var k = new Kohtaamiset();
            k.Kaupungit["budapest"] = new Kohtaaminen { Tervehdys = "Jó napot!" };
            k.Kaupungit["wien"] = new Kohtaaminen();
            Oleta.Tosi(KysymysApu.OnKohtaaminen(new AvoinKysymys { Kaupunki = "budapest" }, k), "hahmon visa");
            Oleta.Tosi(!KysymysApu.OnKohtaaminen(new AvoinKysymys { Kaupunki = "wien" }, k), "ei hahmoa");
            Oleta.Tosi(KysymysApu.OnKohtaaminen(new AvoinKysymys { Kaupunki = "wien", Kaari = true }, k), "tarinakaari");
            Oleta.Tosi(!KysymysApu.OnKohtaaminen(new AvoinKysymys { Kaupunki = "budapest", Laji = KysymysMuoto.Pulma }, k), "pulma pitää kehyksensä");
            Oleta.Tosi(!KysymysApu.OnKohtaaminen(null, k), "ei kysymystä");
        }
    }
}
