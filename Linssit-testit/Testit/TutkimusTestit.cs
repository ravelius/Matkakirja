// Ihmisen matkan tutkimusvaihe ja linssin muisti (web ihmisen-matka-tutkimus.js,
// ihmisen-matka-muisti.js, aikajana.js tallennaMuisti/jatkaMuistista). Nostojen virrat ja
// vanojen rajaukset webin koodista (kultaiset/tutkimus.json, tee-nostot.mjs).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Virrat;
using Matkakirja.Peli;
using LatLon = Matkakirja.Linssit.Aikajana.LatLon;

namespace Matkakirja.Linssit.Testit
{
    public static class TutkimusTestit
    {
        sealed class ValeVarasto : ILinssiVarasto
        {
            public readonly Dictionary<string, string> D = new Dictionary<string, string>();
            public string Lue(string a) => D.TryGetValue(a, out var v) ? v : null;
            public void Kirjoita(string a, string v) => D[a] = v;
            public void Poista(string a) => D.Remove(a);
        }

        sealed class ValeTutkimus : ITutkimuksenNakyma
        {
            public IReadOnlyList<TutkimusNosto> Nostot;
            public bool Napit;
            public string Valittu;
            public int Valintoja;
            void ITutkimuksenNakyma.Nostot(IReadOnlyList<TutkimusNosto> n) => Nostot = n;
            void ITutkimuksenNakyma.Napit(bool t) => Napit = t;
            void ITutkimuksenNakyma.Valittu(Virta v) { Valittu = v?.Tunnus; Valintoja++; }
        }

        static string Polku(string n) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n);
        static object Lue(string n) => MiniJson.Jasenna(File.ReadAllText(Polku(n)));

        static VirtaAineisto virrat;
        static VanatTulos vanat;
        static (VirtaAineisto, VanatTulos) Virrat()
        {
            if (vanat != null) return (virrat, vanat);
            var moduuli = (Dictionary<string, object>)Lue("paketti/ihmisen-matka.json");
            virrat = AineistonLukija.LueLinssista(((Dictionary<string, object>)moduuli["exportit"])["LINSSI"]);
            vanat = IhmisenMatkaLinssi.Laske(virrat);
            return (virrat, vanat);
        }

        static JsonElement Web() => JsonDocument.Parse(File.ReadAllText(Polku("tutkimus.json"))).RootElement;

        [Testi] static void NostojenVirratKutenWebissa()
        {
            var (v, t) = Virrat();
            var nostot = Tutkimusvaihe.KokoaNostot(NostoKentatTestit.Aineisto(), t.Vanat, v.Virrat);
            var web = Web();
            var odotettu = web.GetProperty("nostot").EnumerateArray().ToDictionary(n => n.GetProperty("tunnus").GetString(),
                n => n.GetProperty("virta").GetString());
            Oleta.Sama(40, nostot.Count);
            foreach (var n in nostot) Oleta.Sama(odotettu[n.Tunnus], n.Virta, n.Tunnus);
            var varit = web.GetProperty("virrat").EnumerateArray().ToDictionary(x => x.GetProperty("tunnus").GetString(),
                x => x.GetProperty("rintama").GetString());
            foreach (var n in nostot) Oleta.Sama(varit[n.Virta], n.Vari, n.Tunnus + " väri");
            Oleta.Sama(0, nostot[0].Indeksi);
            Oleta.Sama(-1, nostot.Last().Indeksi, "lisänosto");
        }

        [Testi] static void NappiKaantaaKokoVanaanKutenWebissa()
        {
            var (v, t) = Virrat();
            foreach (var suhde in new[] { 0.46, 1.6 })
            {
                var y = new ValeYmparisto { Kuvasuhde = suhde };
                var n = new ValeTutkimus();
                int tallennuksia = 0;
                var tv = new Tutkimusvaihe(NostoKentatTestit.Aineisto(), t.Vanat, v.Virrat, y, n, () => tallennuksia++);
                tv.Aloita();
                Oleta.Sama(40, n.Nostot.Count);
                Oleta.Tosi(n.Napit, "napit toimintaan");
                foreach (var w in Web().GetProperty("virrat").EnumerateArray())
                {
                    string tunnus = w.GetProperty("tunnus").GetString();
                    Oleta.Sama(tunnus, tv.Valitse(tunnus), "valinta");
                    Oleta.Sama(tunnus, n.Valittu);
                    var r = w.GetProperty("rajaus");
                    var ajo = tv.ViimeisinAjo.Value;
                    Lahella(r.GetProperty("lat").GetDouble(), ajo.keskus.Lat, tunnus + " lat");
                    Lahella(r.GetProperty("lon").GetDouble(), ajo.keskus.Lon, tunnus + " lon");
                    double leveys = w.GetProperty(suhde < 1 ? "leveys046" : "leveys16").GetDouble();
                    Lahella(Kameramatikka.LeveysAsteina(leveys), ajo.leveysAst, tunnus + " leveys " + suhde);
                    Lahella(1.5, y.AjonKesto, "1,5 s");
                    Lahella(y.KorkeusLeveydelle(ajo.leveysAst), y.Ajo.Value.Korkeus, "korkeus");
                }
                int ajot = y.Loki.Count(r => r == "ajo");
                Oleta.Sama(null, tv.Valitse("tyynimeri"), "sama nappi palauttaa kaikki");
                Oleta.Sama(null, n.Valittu);
                Oleta.Sama(ajot, y.Loki.Count(r => r == "ajo"), "palautus ei aja kameraa");
                Oleta.Tosi(tallennuksia >= 6, "muisti seuraa valintaa");
                tv.Pura();
                Oleta.Sama(null, n.Nostot);
                Oleta.Sama(false, n.Napit, "napit takaisin legendaksi");
            }
        }

        [Testi] static void MuistinSaannotKutenWebissa()
        {
            double nyt = 1_800_000_000_000;
            var tila = new LinssiMuistiTila
            {
                Vaihe = "esitys", Jakso = "chauvet", Kulunut = 1234.5, PitoMin = 42000,
                Kamera = new Nakyma(45.1, 4.4, 2_500_000), Kortti = "lascaux", Virta = "eurooppa",
            };
            var json = LinssiMuisti.Json(tila, nyt);
            Dictionary<string, object> Jasenna(string s) => (Dictionary<string, object>)MiniJson.Jasenna(s);
            var m = LinssiMuisti.Kelvollinen(Jasenna(json), nyt: nyt);
            Oleta.Sama("esitys", m.Vaihe);
            Oleta.Sama("chauvet", m.Jakso);
            Oleta.Sama(1234.5, m.Kulunut);
            Oleta.Sama(42000.0, m.PitoMin);
            Oleta.Sama(2_500_000.0, m.Kamera.Value.Korkeus);
            Oleta.Sama("eurooppa", m.Virta);
            Oleta.Sama(nyt, m.Aika);
            // Tuntemattomat pudotetaan; esitys ilman tunnettua jaksoa ei jatku.
            Oleta.Sama(null, LinssiMuisti.Kelvollinen(Jasenna(json), jaksot: new[] { "avaus" }, nyt: nyt));
            var t = LinssiMuisti.Kelvollinen(Jasenna(LinssiMuisti.Json(new LinssiMuistiTila { Vaihe = "tutkimus", Kortti = "x", Virta = "y" }, nyt)),
                new[] { "avaus" }, new[] { "lascaux" }, new[] { "eurooppa" }, nyt);
            Oleta.Tosi(t != null && t.Jakso == null && t.Kortti == null && t.Virta == null, "tutkimus ilman jaksoa kelpaa");
            // Vanha, tulevaisuuden, väärä versio ja rikkinäinen.
            Oleta.Sama(null, LinssiMuisti.Kelvollinen(Jasenna(json), nyt: nyt + LinssiMuisti.IkaMaxMs + 1));
            Oleta.Sama(null, LinssiMuisti.Kelvollinen(Jasenna(json), nyt: nyt - 60001));
            Oleta.Sama(null, LinssiMuisti.Kelvollinen(Jasenna(json.Replace("\"versio\":1", "\"versio\":2")), nyt: nyt));
            Oleta.Sama(null, LinssiMuisti.Kelvollinen(Jasenna(json.Replace("\"esitys\"", "\"muu\"")), nyt: nyt));
            var v = new ValeVarasto();
            v.D[LinssiMuisti.Avain("ihmisen-matka")] = "{rikki";
            Oleta.Sama(null, LinssiMuisti.Lue(v, "ihmisen-matka"));
            Oleta.Sama("matkakirja-linssimuisti-ihmisen-matka", LinssiMuisti.Avain("ihmisen-matka"), "webin avain");
        }

        [Testi] static void LinssiMuistaaPaikkansaJaTutkimusvaiheen()
        {
            var (v, t) = Virrat();
            var a = NostoKentatTestit.Aineisto();
            var y = new ValeYmparisto();
            var varasto = new ValeVarasto();
            var n = new ValeTutkimus();
            IhmisenMatkaLinssi Uusi()
            {
                var l = new IhmisenMatkaLinssi(a, null, new EsitysAjoTestit.ValeNakyma(y), null)
                    { Varasto = varasto, TutkimuksenNakyma = n };
                return l;
            }
            void Aja(IhmisenMatkaLinssi l, double s) { for (int i = 0; i < s * 60; i++) { y.Kello += 1 / 60.0; l.Paivita(); } }

            // 1. Ensimmäinen avaus: ei muistia, esitys alusta. Musta alku ei ole muistettava paikka.
            var l1 = Uusi();
            l1.Avaa(y);
            Oleta.Sama(false, l1.JatkuuMuistista);
            l1.AsetaVanat(t, v.Virrat);
            Oleta.Sama(0, l1.Esitys.I);
            Oleta.Sama(0, varasto.D.Count, "mustassa alussa ei tallenneta");
            Aja(l1, 60);
            int jakso = l1.Esitys.I;
            Oleta.Tosi(jakso >= 2, "kohdejaksoissa: " + jakso);
            y.Asento = new Nakyma(30, 35, 3_000_000);
            l1.Sulje();
            var m = LinssiMuisti.Lue(varasto, "ihmisen-matka");
            Oleta.Tosi(m != null && m.Vaihe == "esitys" && m.Jakso == a.Kertomus[jakso].Id, "muisti: " + m?.Jakso);
            Oleta.Tosi(m.PitoMin is double p && p <= (a.Kertomus[jakso].Vuosia ?? double.MaxValue) * 2, "pidon pohja");
            Oleta.Sama(3_000_000.0, m.Kamera.Value.Korkeus, "kamera sulkuhetkeltä");

            // 2. Uusi avaus jatkaa samasta jaksosta ilman mustaa, kamera hyppää muistin paikkaan.
            var l2 = Uusi();
            l2.Avaa(y);
            Oleta.Sama(true, l2.JatkuuMuistista, "esittelylaatikko ohitetaan");
            y.Loki.Clear();
            l2.AsetaVanat(t, v.Virrat);
            Oleta.Sama(jakso, l2.Esitys.I, "sama jakso");
            Oleta.Sama(true, l2.Esitys.Muistista);
            Oleta.Sama(false, l2.Esitys.MustaPaalla);
            // Ensin muistin hyppy paikalleen, sitten jakso ajaa oman kohteensa kuten webin aloitaJakso({ hyppy }).
            Oleta.Sama("ajo", y.Loki.First(), "ensimmäinen kutsu on muistin hyppy");
            // 3. Loppuun: tutkimusvaihe alkaa itse.
            Aja(l2, 900);
            Oleta.Tosi(l2.Esitys.Paattynyt, "päättyi");
            Oleta.Tosi(l2.Tutkimus != null && l2.Tutkimus.Auki && n.Napit, "tutkimusvaihe auki");
            l2.Tutkimus.Valitse("siperia");
            l2.Tutkimus.KorttiAuki("sungir");
            l2.Sulje();
            Oleta.Sama(false, n.Napit, "sulku purkaa");
            m = LinssiMuisti.Lue(varasto, "ihmisen-matka");
            Oleta.Tosi(m.Vaihe == "tutkimus" && m.Virta == "siperia" && m.Kortti == "sungir", "tutkimuksen muisti: " + m.Vaihe + " " + m.Virta + " " + m.Kortti);

            // 4. Avaus tutkimusvaiheeseen: suoraan loppuun, virta valittuna ILMAN kameran kääntöä, kortti auki.
            var l3 = Uusi();
            string avattu = null;
            l3.TutkimusAlkoi += tv => tv.AvaaKortti += k => avattu = k;
            l3.Avaa(y);
            y.Loki.Clear();
            l3.AsetaVanat(t, v.Virrat);
            Oleta.Tosi(l3.Esitys.Paattynyt && l3.Tutkimus != null, "tutkimusvaihe heti");
            Oleta.Sama("siperia", l3.Tutkimus.Valittu);
            Oleta.Sama("siperia", n.Valittu);
            Oleta.Sama(1, y.Loki.Count(r => r == "ajo"), "vain muistin hyppy, ei vanan kääntöä eikä lopun asetusta");
            Oleta.Sama("sungir", l3.Tutkimus.Kortti);
            // AvaaKortti laukeaa Aloitan sisällä ennen TutkimusAlkoi-tilausta: UI lukee Kortti-kentän.
            Oleta.Tosi(avattu == null || avattu == "sungir");

            // 5. Aloita alusta: muisti pois, esitys avausjaksosta.
            Oleta.Tosi(l3.AloitaAlusta());
            Oleta.Sama(null, l3.Tutkimus);
            Oleta.Sama(0, l3.Esitys.I);
            Oleta.Sama(false, n.Napit);
            Oleta.Sama(null, LinssiMuisti.Lue(varasto, "ihmisen-matka"), "muisti tyhjä (musta alku ei tallennu)");
            l3.Sulje();
        }

        static void Lahella(double odotettu, double saatu, string mita, double tol = 1e-9)
        {
            if (Math.Abs(odotettu - saatu) > tol * Math.Max(1, Math.Abs(odotettu)))
                throw new Exception($"{mita}: odotettu {odotettu}, saatu {saatu}");
        }
    }
}
