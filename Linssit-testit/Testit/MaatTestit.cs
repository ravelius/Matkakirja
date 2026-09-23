// Vertailu- ja maatietolinssi verkkopelin kultaisia arvoja vasten
// (kultaiset/maat.json, tee-maat.mjs; paketti/maarajat.json, maat.json,
// kaupungit-maat.json, vertailu.json, maatiedot.json), maan osumatesti pelin
// kaupungeilla sekä linssien elinkaari vale-maakarttaa vasten.
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Maat;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public sealed class ValeMaaKartta : IMaaKartta
    {
        public readonly List<string> Loki = new List<string>();
        public bool Tila;
        public Savy? Perus;
        public readonly Dictionary<string, Savy> Korostus = new Dictionary<string, Savy>();
        public event Action<string> MaaNapautettu;
        public int Kuuntelijoita => MaaNapautettu?.GetInvocationList().Length ?? 0;

        public void MaaTila(bool p) { Loki.Add("maatila " + p); Tila = p; }
        public void MaaPerussavy(Savy s) { Loki.Add("perus"); Perus = s; }
        public void Korosta(string iso, Savy s) { Loki.Add("korosta " + iso); Korostus[iso] = s; }
        public void KorostusPois(string iso)
        {
            Loki.Add("pois " + (iso ?? "kaikki"));
            if (iso == null) Korostus.Clear(); else Korostus.Remove(iso);
        }
        public void Napauta(string iso) => MaaNapautettu?.Invoke(iso);
    }

    public sealed class ValeNimet : IMaidenNimet
    {
        public IReadOnlyList<Maa> Nakyvat;
        public void Nimet(IReadOnlyList<Maa> maat) => Nakyvat = maat;
        public void Pois() => Nakyvat = null;
    }

    public static class MaatTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("maat.json"))).RootElement;
        static object Paketti(string nimi) => MiniJson.Jasenna(File.ReadAllText(Polku("paketti/" + nimi)));

        static MaatAineisto aineisto;
        static MaatAineisto A() => aineisto ??= MaatAineisto.Lue(
            Paketti("maarajat.json"), Paketti("maat.json"), Paketti("vertailu.json"), Paketti("maatiedot.json"));

        static void SamaSavy(JsonElement web, Savy natiivi, string mita)
        {
            Oleta.Sama(Rgba.Lue(web.GetProperty("vari").GetString()), natiivi.Taytto, mita + " täyttö");
            Oleta.Sama(Rgba.Lue(web.GetProperty("reuna").GetString()), natiivi.Reuna, mita + " reuna");
        }

        [Testi] static void VakiotJaSavytKutenWebissa()
        {
            var k = K();
            Oleta.Sama(k.GetProperty("vertailuMax").GetInt32(), VertailuLinssi.VertailuMax);
            var v = k.GetProperty("vertailunSavyt");
            SamaSavy(v.GetProperty("valittu"), VertailuLinssi.SavyValittu, "vertailu valittu");
            SamaSavy(v.GetProperty("valittavissa"), VertailuLinssi.SavyValittavissa, "vertailu valittavissa");
            SamaSavy(v.GetProperty("himmea"), VertailuLinssi.SavyHimmea, "vertailu himmeä");
            var m = k.GetProperty("maatietojenSavyt");
            SamaSavy(m.GetProperty("valittu"), MaatiedotLinssi.SavyValittu, "maatiedot valittu");
            SamaSavy(m.GetProperty("valittavissa"), MaatiedotLinssi.SavyValittavissa, "maatiedot valittavissa");
            var varit = k.GetProperty("vertailuvarit").EnumerateArray().Select(x => Rgba.Lue(x.GetString())).ToList();
            Oleta.Sama(varit.Count, VertailuLinssi.Varit.Count);
            for (int i = 0; i < varit.Count; i++) Oleta.Sama(varit[i], VertailuLinssi.Varit[i], "väri " + i);
        }

        [Testi] static void RgbaLukee()
        {
            var r = Rgba.Lue("rgba(176, 58, 43, 0.3)");
            Oleta.Tosi(Math.Abs(r.R - 176 / 255f) < 1e-6 && Math.Abs(r.A - 0.3f) < 1e-6, r.ToString());
            Oleta.Sama(new Rgba(1, 0, 0), Rgba.Lue("#ff0000"));
            Oleta.Heittaa<FormatException>(() => Rgba.Lue("punainen"));
        }

        [Testi] static void AineistoKaikkiLaudanMaat()
        {
            var laudalla = K().GetProperty("laudanMaat").EnumerateArray().Select(x => x.GetString()).ToHashSet();
            Oleta.Sama(135, A().Maat.Count);
            Oleta.Tosi(laudalla.SetEquals(A().Maat.Keys), "maarajat = laudan countryShapes");
            var fin = A().Hae("FIN");
            Oleta.Sama("Suomi", fin.Nimi);
            Oleta.Sama("FI", fin.Iso2);
            Oleta.Tosi(fin.Maalehti != null && fin.LippuUrl != null, "Suomen lehti ja lippu");
            // Kaikki pisteet luettu, myös viennin { "$luku": "-0" }.
            Oleta.Sama(59333, A().Maat.Values.Sum(m => m.Renkaat.Sum(r => r.Length)), "pisteitä");
            Oleta.Tosi(A().Maat.Values.All(m => m.W <= m.E && m.S <= m.N), "laatikot");
            // Iso2 kaikilla koepaketista v11 alkaen (PR #2960); tunnus on silti ISO3.
            Oleta.Sama(0, A().Maat.Values.Count(m => m.Iso2 == null), "ilman iso2:ta");
            Oleta.Sama("RS", A().Hae("SRB").Iso2);
        }

        [Testi] static void LinssitiedotPaketista()
        {
            Oleta.Sama("vertailu", A().Vertailu.Id);
            Oleta.Sama(90, A().Vertailu.Jarjestys);
            Oleta.Sama("Vertailulinssi", A().Vertailu.Nimi);
            Oleta.Sama("maatiedot", A().Maatiedot.Id);
            Oleta.Sama(95, A().Maatiedot.Jarjestys);
            Oleta.Sama("Maiden tiedot", A().Maatiedot.Nimi);
            Oleta.Tosi(!A().Vertailu.Valokuva && !A().Maatiedot.Valokuva, "valokuva false");
            Oleta.Tosi(A().Maatiedot.Lahde?.Aineisto?.Contains("Natural Earth") == true, "lähde");
        }

        [Testi] static void TunnusluvutKutenWebissa()
        {
            var web = K().GetProperty("tunnusluvut");
            int n = 0;
            foreach (var p in web.EnumerateObject())
            {
                var rivit = p.Value.EnumerateArray().Select(r => (r[0].GetString(), r[1].GetString())).ToList();
                var oma = A().Hae(p.Name).Tunnusluvut;
                Oleta.Sama(rivit.Count, oma.Count, p.Name);
                for (int i = 0; i < rivit.Count; i++) Oleta.Sama(rivit[i], oma[i], p.Name + " " + i);
                n++;
            }
            Oleta.Sama(114, n);
            Oleta.Sama(114, A().Maat.Values.Count(m => m.Tunnusluvut.Count > 0));
        }

        [Testi] static void NimimaatKutenWebissa()
        {
            var web = K().GetProperty("nimimaat").EnumerateArray().Select(x => x.GetString()).ToHashSet();
            var oma = A().Maat.Values.Where(m => m.NimiPallolle).Select(m => m.Id).ToHashSet();
            var ero = web.Except(oma).Concat(oma.Except(web)).OrderBy(x => x).ToList();
            // Ainoa sallittu ero: Saint Helena (laudalla vain pääsaari).
            Oleta.Sama("SHN", string.Join(",", ero), "nimiehdon ero webiin");
        }

        [Testi] static void KeskuksetMaanSisalla()
        {
            var osuma = new MaaOsuma(A());
            var ulkona = A().Maat.Values.Where(m => osuma.Hae(m.KeskusLat, m.KeskusLon) != m.Id && m.NimiPallolle)
                .Select(m => m.Id).ToList();
            Oleta.Tosi(ulkona.Count == 0, "nimen paikka muussa maassa: " + string.Join(",", ulkona));
            var fin = A().Hae("FIN");
            Oleta.Tosi(fin.KeskusLat > 61 && fin.KeskusLat < 66 && fin.KeskusLon > 24 && fin.KeskusLon < 29,
                $"Suomen keskus {fin.KeskusLat:F2}, {fin.KeskusLon:F2}");
        }

        [Testi] static void OsumaKaupungeilla()
        {
            var osuma = new MaaOsuma(A());
            var kaupungit = MiniJson.Taulukko(MiniJson.Kentta(MiniJson.Objekti(Paketti("kaupungit-maat.json")), "alkiot"))
                .Select(MiniJson.Objekti).ToList();
            var vaarin = new List<string>();
            foreach (var k in kaupungit)
            {
                var maa = MiniJson.Teksti(k, "maa");
                if (A().Hae(maa) == null) continue;
                var saatu = osuma.Hae(MiniJson.Luku(k, "lat").Value, MiniJson.Luku(k, "lon").Value);
                if (saatu != maa) vaarin.Add($"{MiniJson.Teksti(k, "id")} {maa}→{saatu ?? "meri"}");
            }
            Console.WriteLine($"      osuma: {kaupungit.Count - vaarin.Count}/{kaupungit.Count} kaupunkia oikeaan maahan");
            // Rannikkokaupunki voi jäädä 0,05°:n harvennetun rannan ulkopuolelle
            // (meri), mutta väärä MAA on virhe.
            // Rajalla olevat kohteet (Alpit, Borneo, Titicaca) ja Dubrovnik
            // (Neumin kapea käytävä katoaa harvennuksessa) ovat tunnettuja.
            var tunnetut = new HashSet<string> { "alpit CHE→FRA", "dubrovnik HRV→BIH", "borneo IDN→MYS", "titicaca PER→BOL" };
            var vaaraMaa = vaarin.Where(v => !v.EndsWith("meri") && !tunnetut.Contains(v)).ToList();
            Oleta.Tosi(vaaraMaa.Count == 0, "väärä maa: " + string.Join("; ", vaaraMaa));
            // Meren puolelle jää rannikko (0,05°:n harvennus), aineistosta puuttuvan
            // maan kohde (Gao → Niger, Nikosia → Pohjois-Kypros) ja rajajoki.
            Oleta.Tosi(vaarin.Count <= kaupungit.Count * 18 / 100, "ohi: " + string.Join("; ", vaarin));
            // Napautuksen toleranssi (0,5°) tuo rannikon maahan. Loput 13: neljä
            // rajakohdetta, Gao (Niger puuttuu) ja laudalta lasketut pikkusaaret
            // (Bermuda, Norfolk, Nouméa…), joiden koordinaatti on yli 0,5° ohi.
            var ohiToleranssilla = kaupungit.Where(k => A().Hae(MiniJson.Teksti(k, "maa")) != null
                && osuma.Hae(MiniJson.Luku(k, "lat").Value, MiniJson.Luku(k, "lon").Value, 0.5) != MiniJson.Teksti(k, "maa"))
                .Select(k => MiniJson.Teksti(k, "id")).ToList();
            Console.WriteLine($"      osuma 0,5°: ohi {ohiToleranssilla.Count}: {string.Join(" ", ohiToleranssilla)}");
            Oleta.Tosi(ohiToleranssilla.Count <= 13, "toleranssilla ohi " + ohiToleranssilla.Count);
        }

        [Testi] static void OsumaTunnetutPisteet()
        {
            var o = new MaaOsuma(A());
            Oleta.Sama("FIN", o.Hae(62.0, 25.7), "Jyväskylä");
            Oleta.Sama("FRA", o.Hae(46.5, 2.5), "Keski-Ranska");
            Oleta.Sama("BRA", o.Hae(-10, -55), "Brasilia");
            Oleta.Sama("AUS", o.Hae(-25, 134), "Australia");
            Oleta.Sama(null, o.Hae(0, -30), "Atlantti");
            Oleta.Sama(null, o.Hae(0, -30, 0.5), "Atlantti toleranssilla");
            Oleta.Sama("FIN", o.Hae(60.12, 24.94, 0.5), "Helsingin edusta toleranssilla");
            Oleta.Sama(null, o.Hae(double.NaN, 0), "NaN");
            // Päivämääräraja: Tšukotka on idässä (lon < −170).
            Oleta.Sama("RUS", o.Hae(66.0, -174.0), "Tšukotka");
            Oleta.Sama("RUS", o.Hae(66.0, 186.0), "Tšukotka +360");
            Oleta.Sama("USA", o.Hae(64.0, -150.0), "Alaska");
        }

        [Testi] static void OsumaNopea()
        {
            var o = new MaaOsuma(A());
            var sw = Stopwatch.StartNew();
            int n = 0;
            for (double lat = -80; lat <= 80; lat += 4)
                for (double lon = -180; lon < 180; lon += 4) { o.Hae(lat, lon); n++; }
            sw.Stop();
            double ms = sw.Elapsed.TotalMilliseconds / n;
            Console.WriteLine($"      osuma: {ms * 1000:F0} µs / napautus ({n} pistettä)");
            Oleta.Tosi(ms < 2, $"napautus {ms:F2} ms");
        }

        // ── Vertailulinssi ────────────────────────────────────────────────

        [Testi] static void VertailuAvautuuSuomiValmiina()
        {
            var y = new ValeYmparisto();
            var k = new ValeMaaKartta();
            var nimet = new ValeNimet();
            var l = new VertailuLinssi(A(), k, nimet);
            int muutoksia = 0;
            l.Muuttui += () => muutoksia++;
            l.Avaa(y);
            Oleta.Tosi(k.Tila && !y.PelikerroksetNakyvissa, "maatila päällä, kaupungit piilossa");
            Oleta.Sama("FIN", string.Join(",", l.Valinnat));
            Oleta.Sama(VertailuLinssi.SavyValittu, k.Korostus["FIN"]);
            Oleta.Sama(VertailuLinssi.SavyValittavissa, k.Perus.Value);
            Oleta.Sama(1, k.Kuuntelijoita);
            Oleta.Sama(A().Maat.Values.Count(m => m.NimiPallolle), nimet.Nakyvat.Count, "nimet");
            Oleta.Sama(1, muutoksia);
            Oleta.Tosi(!l.VoiVerrata && !l.Vertaa(), "yksi maa ei riitä");
        }

        [Testi] static void VertailuTayttyyJaHimmenee()
        {
            var k = new ValeMaaKartta();
            var l = new VertailuLinssi(A(), k);
            int taynna = 0;
            var aanet = new List<string>();
            l.Tayttui += () => taynna++;
            l.AaniKasittelija = aanet.Add;
            l.Avaa(new ValeYmparisto());
            k.Napauta("SWE"); k.Napauta("NOR");
            Oleta.Sama(VertailuLinssi.SavyValittavissa, k.Perus.Value, "3 maata");
            k.Napauta("DNK");
            Oleta.Tosi(l.Taynna, "täynnä");
            Oleta.Sama(VertailuLinssi.SavyHimmea, k.Perus.Value, "täysi lista himmentää muut");
            Oleta.Sama(VertailuLinssi.Tulos.Taynna, l.Valitse("DEU"));
            Oleta.Sama(1, taynna);
            Oleta.Sama(4, k.Korostus.Count);
            Oleta.Sama(3, aanet.Count, "ääni vain onnistuneesta valinnasta");
            // Lapun napautus poistaa; perussävy palaa.
            Oleta.Sama(VertailuLinssi.Tulos.Poistettu, l.Valitse("NOR"));
            Oleta.Sama(VertailuLinssi.SavyValittavissa, k.Perus.Value);
            Oleta.Tosi(!k.Korostus.ContainsKey("NOR"), "NOR pois kartalta");
            Oleta.Sama("FIN,SWE,DNK", string.Join(",", l.Valinnat));
            // Värit valintajärjestyksessä.
            var laput = l.Laput;
            Oleta.Sama("Suomi", laput[0].Maa.Nimi);
            Oleta.Sama(VertailuLinssi.Varit[2], laput[2].Vari);
            Oleta.Sama(VertailuLinssi.Tulos.Tuntematon, l.Valitse("XXX"));
            k.Napauta("XXX");
            Oleta.Sama(3, l.Valinnat.Count);
        }

        [Testi] static void VertailuVertaaJaSulkeutuu()
        {
            var y = new ValeYmparisto();
            var k = new ValeMaaKartta();
            var nimet = new ValeNimet();
            var l = new VertailuLinssi(A(), k, nimet);
            IReadOnlyList<Maa> pyydetty = null;
            l.VertailuPyydetty += m => pyydetty = m;
            l.Avaa(y);
            k.Napauta("EST");
            Oleta.Tosi(l.Vertaa(), "kaksi maata riittää");
            Oleta.Sama("FIN,EST", string.Join(",", pyydetty.Select(m => m.Id)));
            l.Sulje();
            Oleta.Tosi(!k.Tila && y.PelikerroksetNakyvissa && k.Korostus.Count == 0 && nimet.Nakyvat == null, "purettu");
            Oleta.Sama(0, k.Kuuntelijoita);
            Oleta.Tosi(!l.Vertaa(), "kiinni ei vertaa");
            k.Napauta("LVA");
            Oleta.Sama(2, l.Valinnat.Count, "kiinni oleva linssi ei kuuntele");
            // Valinnat säilyvät; Suomea ei lisätä uudestaan, jos lista ei ole tyhjä.
            l.Valitse("FIN");
            l.Avaa(y);
            Oleta.Sama("EST", string.Join(",", l.Valinnat));
            Oleta.Tosi(k.Korostus.Keys.SequenceEqual(new[] { "EST" }), "korostus palautui");
        }

        [Testi] static void VertailuIlmanSuomea()
        {
            var ilman = MaatAineisto.LueRajat(Paketti("maarajat.json"));
            ilman.Maat.Remove("FIN");
            var l = new VertailuLinssi(ilman, new ValeMaaKartta());
            l.Avaa(new ValeYmparisto());
            Oleta.Sama(0, l.Valinnat.Count, "Suomi vain jos aineistossa");
        }

        // ── Maiden tiedot ─────────────────────────────────────────────────

        [Testi] static void MaatiedotKaksivaiheinen()
        {
            var y = new ValeYmparisto();
            var k = new ValeMaaKartta();
            var l = new MaatiedotLinssi(A(), k);
            var kyltti = new List<string>();
            Maa lehti = null;
            l.ValittuMuuttui += m => kyltti.Add(m?.Id ?? "-");
            l.LehtiPyydetty += m => lehti = m;
            l.Avaa(y);
            Oleta.Tosi(k.Tila && !y.PelikerroksetNakyvissa, "maatila");
            Oleta.Sama(MaatiedotLinssi.SavyValittavissa, k.Perus.Value);
            Oleta.Sama(0, k.Korostus.Count);
            Oleta.Tosi(!l.AvaaLehti(), "ei valintaa, ei lehteä");
            k.Napauta("JPN");
            Oleta.Sama("JPN", l.Valittuna);
            Oleta.Sama(MaatiedotLinssi.SavyValittu, k.Korostus["JPN"]);
            k.Napauta("KOR");
            Oleta.Tosi(k.Korostus.Keys.SequenceEqual(new[] { "KOR" }), "vain uusi korostettuna");
            Oleta.Tosi(l.AvaaLehti(), "kyltti avaa lehden");
            Oleta.Sama("KOR", lehti.Id);
            k.Napauta("KOR");
            Oleta.Sama(null, l.Valittuna);
            Oleta.Sama(0, k.Korostus.Count);
            k.Napauta("EGY");
            l.Sulje();
            Oleta.Sama("JPN,KOR,-,EGY,-", string.Join(",", kyltti));
            Oleta.Tosi(!k.Tila && y.PelikerroksetNakyvissa && k.Korostus.Count == 0, "purettu");
            l.Avaa(y);
            Oleta.Sama(null, l.Valittuna, "valinta ei säily");
        }

        [Testi] static void RekisterissaJarjestyksessa()
        {
            var y = new ValeYmparisto();
            var r = new Linssirekisteri(y);
            var k = new ValeMaaKartta();
            r.Lisaa(new MaatiedotLinssi(A(), k));
            r.Lisaa(new VertailuLinssi(A(), k));
            r.Lisaa(new Topografia());
            Oleta.Sama("topografia,vertailu,maatiedot", string.Join(",", r.Kaikki.Select(l => l.Tiedot.Id)));
            r.Valitse("vertailu");
            r.Valitse("maatiedot");
            // Vaihto: vertailun purku ennen maatietojen avausta, maatila jää päälle.
            Oleta.Tosi(k.Tila && k.Kuuntelijoita == 1, "yksi kuuntelija vaihdon jälkeen");
            Oleta.Sama(0, k.Korostus.Count, "vertailun korostukset pois");
            r.Sulje();
            Oleta.Tosi(!k.Tila && y.PelikerroksetNakyvissa, "kiinni");
        }
    }
}
