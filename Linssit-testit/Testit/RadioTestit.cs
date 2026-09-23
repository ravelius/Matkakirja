// Maailmanradio webin kultaisia arvoja vasten (kultaiset/radio.json, tee-radio.mjs;
// paketti/radiot.json, viritysaanet.json, kaupungit-radio.json, maat.json) ja virityksen
// tilakone vale-virtaa, -viritintä ja -karttaa vasten.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Radio;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public sealed class ValeVirta : IRadioVirta
    {
        public readonly List<string> Loki = new List<string>();
        public string Auki;
        public float V;
        public bool Kuuluu { get; set; }
        public string Virhe { get; set; }
        public float Voimakkuus { set => V = value; }
        public void Avaa(string url, string tyyppi) { Loki.Add("avaa " + tyyppi); Auki = url; Kuuluu = false; Virhe = null; }
        public void Sulje() { Loki.Add("sulje"); Auki = null; Kuuluu = false; }
    }

    public sealed class ValeViritin : IViritin
    {
        public readonly List<string> Loki = new List<string>();
        public bool Soi;
        public float Voimakkuus { set { } }
        public void Aloita() { Loki.Add("aloita"); Soi = true; }
        public void Lopeta(double h) { Loki.Add($"lopeta {h}"); Soi = false; }
    }

    public sealed class ValeRadioKartta : IRadioKartta
    {
        public ICollection<string> Vain;
        public string Korostettu;
        public event Action<string> KaupunkiNapautettu;
        public void NaytaVain(ICollection<string> k) => Vain = k;
        public void Korosta(string k) => Korostettu = k;
        public void Napauta(string k) => KaupunkiNapautettu?.Invoke(k);
    }

    public static class RadioTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("radio.json"))).RootElement;
        static object Paketti(string nimi) => MiniJson.Jasenna(File.ReadAllText(Polku("paketti/" + nimi)));

        static RadioAineisto aineisto;
        static RadioAineisto A() => aineisto ??= RadioAineisto.Lue(null, Paketti("radiot.json"), Paketti("kaupungit-radio.json"),
            Paketti("maat.json"), Paketti("viritysaanet.json"));
        /// <summary>Tilakoneen testeihin: sama aineisto kaikki asemat "sallittu"-luokassa.</summary>
        static RadioAineisto sallittu;
        static RadioAineisto S()
        {
            if (sallittu != null) return sallittu;
            sallittu = RadioAineisto.Lue(null, Paketti("radiot.json"), Paketti("kaupungit-radio.json"),
                Paketti("maat.json"), Paketti("viritysaanet.json"));
            foreach (var a in sallittu.Asemat.Values) a.Luokka = "sallittu";
            return sallittu;
        }

        static HashSet<char> Fontti() => K().GetProperty("fontti").GetString().ToHashSet();

        [Testi] static void VakiotKutenWebissa()
        {
            var k = K();
            Oleta.Sama(k.GetProperty("ajat").GetProperty("vahimmaisaika").GetDouble(), RadioLinssi.VahimmaisaikaMs);
            Oleta.Sama(k.GetProperty("ajat").GetProperty("siirtyma").GetDouble(), RadioLinssi.SiirtymaMs);
            Oleta.Sama(k.GetProperty("ajat").GetProperty("lukittuminen").GetDouble(), RadioLinssi.LukittuminenMs);
            Oleta.Sama(k.GetProperty("ristihaivytys").GetDouble(), RadioLinssi.RistihaivytysS);
            Oleta.Sama(k.GetProperty("lukitus").GetDouble(), RadioLinssi.LukituksenHaivytysS);
            Oleta.Sama(k.GetProperty("aikakatkaisu").GetDouble(), RadioLinssi.AikakatkaisuMs);
            Oleta.Sama(k.GetProperty("fontti").GetString(), RadioAineisto.PistefontinMerkit, "pistefontti");
            for (double x = 0; x <= 1; x += 0.1)
                Oleta.Tosi(Math.Abs(Math.Pow(RadioLinssi.Nouseva(x), 2) + Math.Pow(RadioLinssi.Vaistyva(x), 2) - 1) < 1e-12, "tasateho");
        }

        [Testi] static void AineistoPaketista()
        {
            Oleta.Sama(115, A().Asemat.Count);
            Oleta.Sama(266, A().Kaupungit.Count);
            Oleta.Tosi(A().MaanAsema("FIN") != null, "Suomen asema");
            Oleta.Tosi(A().Asemat.Values.All(a => a.Url.StartsWith("https://")), "https");
            Oleta.Sama(5, A().Viritysaanet.Count);
            Oleta.Tosi(A().Viritysaanet.All(u => u.StartsWith(RadioAineisto.ViritysJuuri)), "viritysäänten osoitteet");
            Oleta.Tosi(K().GetProperty("laudanJarjestysSama").GetBoolean(), "kaupungit.json on laudan järjestyksessä");
        }

        static RadioAineisto Hybridi() => RadioAineisto.Lue(MiniJson.Jasenna("{\"alkiot\":[" +
            "{\"id\":\"FIN\",\"iso3\":\"FIN\",\"nimi\":\"Radio Helsinki\",\"url\":\"https://rh/live\",\"tyyppi\":\"mp3\",\"luokka\":\"sallittu\"}," +
            "{\"id\":\"EST\",\"iso3\":\"EST\",\"nimi\":\"Raadio 2\",\"url\":\"https://err/r2\",\"tyyppi\":\"aac\",\"luokka\":\"epaselva\"}," +
            "{\"id\":\"SWE\",\"iso3\":\"SWE\",\"nimi\":\"P1\",\"url\":\"https://sr/p1\",\"sivu\":\"https://sverigesradio.se/p1\",\"luokka\":\"kielletty\"}," +
            "{\"id\":\"NOR\",\"iso3\":\"NOR\",\"nimi\":\"NRK P1\",\"url\":\"https://nrk/p1\",\"luokka\":\"kielletty\"}]}"),
            Paketti("radiot.json"), Paketti("kaupungit-radio.json"));

        [Testi] static void KokoelmaEnsisijainenJaLuokat()
        {
            var a = Hybridi();
            Oleta.Sama(4, a.Asemat.Count, "kokoelma voittaa moduulin");
            Oleta.Sama(RadioLinssi.Toiminto.Soita, RadioLinssi.ToimintoAsemalle(a.MaanAsema("FIN")), "sallittu soi");
            Oleta.Sama(RadioLinssi.Toiminto.Soita, RadioLinssi.ToimintoAsemalle(a.MaanAsema("EST")), "epaselva soi");
            Oleta.Sama(RadioLinssi.Toiminto.Linkki, RadioLinssi.ToimintoAsemalle(a.MaanAsema("SWE")), "kielletty = linkki");
            Oleta.Sama(RadioLinssi.Toiminto.Ei, RadioLinssi.ToimintoAsemalle(a.MaanAsema("NOR")), "kielletty ilman sivua");
            var vanha = Linssirekisteri.Kehittajatila;
            try
            {
                Linssirekisteri.Kehittajatila = true;
                Oleta.Sama(RadioLinssi.Toiminto.Ei, RadioLinssi.ToimintoAsemalle(A().MaanAsema("FIN")), "luokaton ei soi");
            }
            finally { Linssirekisteri.Kehittajatila = vanha; }
        }

        [Testi] static void LuokatonJaKiellettyEivatSoiKehittajatilassakaan()
        {
            var vanha = Linssirekisteri.Kehittajatila;
            Linssirekisteri.Kehittajatila = true;
            try
            {
                var v = new ValeVirta();
                var l = new RadioLinssi(A(), v, new ValeViritin(), new ValeRadioKartta(), Fontti());
                l.Avaa(new ValeYmparisto());
                l.Viritä("FIN");
                Oleta.Tosi(v.Auki == null, "luokaton ei soi");
                Oleta.Sama(0, l.Asteikko.Count, "luokattomat eivät näy asteikolla");
                var h = new RadioLinssi(Hybridi(), v, new ValeViritin(), new ValeRadioKartta(), Fontti());
                h.Avaa(new ValeYmparisto());
                h.Viritä("SWE");
                Oleta.Tosi(v.Auki == null && h.Tila.Vaihe == RadioVaihe.Linkki, "kielletty ei soi, linkki");
            }
            finally { Linssirekisteri.Kehittajatila = vanha; }
        }

        [Testi] static void LuokatSoittavatJaLinkittavat()
        {
            var y = new ValeYmparisto();
            var v = new ValeVirta();
            var l = new RadioLinssi(Hybridi(), v, new ValeViritin(), new ValeRadioKartta(), Fontti());
            l.Avaa(y);
            l.Viritä("SWE");
            Oleta.Sama(RadioVaihe.Linkki, l.Tila.Vaihe);
            Oleta.Sama("https://sverigesradio.se/p1", l.Tila.Sivu);
            l.Viritä("EST");
            Oleta.Sama(RadioVaihe.Viritys, l.Tila.Vaihe);
            Oleta.Sama("https://err/r2", v.Auki);
            l.Viritä("NOR");
            Oleta.Sama(RadioVaihe.Virhe, l.Tila.Vaihe);
            Oleta.Sama("Ei lähetystä", l.Tila.Viesti);
            l.Viritä("FIN");
            Oleta.Sama("https://rh/live", v.Auki);
        }

        [Testi] static void KoepaketinKokoelmaLinkkeina()
        {
            // v16: kaikki luokassa "linkki" (vanha nimi, käsitellään kuten kielletty).
            var a = RadioAineisto.Lue(Paketti("radiot-kokoelma.json"), null, Paketti("kaupungit-radio.json"));
            Oleta.Sama(115, a.Asemat.Count);
            var toiminnot = a.Asemat.Values.GroupBy(RadioLinssi.ToimintoAsemalle).ToDictionary(g => g.Key, g => g.Count());
            Oleta.Tosi(!toiminnot.ContainsKey(RadioLinssi.Toiminto.Soita), "ei suoria lähetyksiä");
            Oleta.Sama(a.Asemat.Values.Count(x => !string.IsNullOrEmpty(x.Sivu)), toiminnot[RadioLinssi.Toiminto.Linkki]);
        }

        [Testi] static void RadionKaupungitKutenWebissa()
        {
            foreach (var p in K().GetProperty("nakyvat").EnumerateObject())
            {
                var web = p.Value.EnumerateArray().Select(x => x.GetString()).ToList();
                var oma = A().RadionKaupungit(p.Name == "-" ? null : p.Name).OrderBy(x => x, StringComparer.Ordinal).ToList();
                var ero = web.Except(oma).Concat(oma.Except(web)).ToList();
                Oleta.Tosi(ero.Count == 0, $"sijainti {p.Name}: ero {string.Join(",", ero)}");
            }
        }

        [Testi] static void NimiEsiintyyOmanaSananaan()
        {
            Oleta.Tosi(RadioAineisto.NimiEsiintyy("Radio Begum (Kabul)", "Kabul"), "Kabul");
            Oleta.Tosi(!RadioAineisto.NimiEsiintyy("Gaoyang FM", "Gao"), "Gao ei osu Gaoyangiin");
            Oleta.Tosi(!RadioAineisto.NimiEsiintyy("Radio Sanaa", "Sana"), "sanaraja");
            Oleta.Tosi(RadioAineisto.NimiEsiintyy("Kilimandžaro Radio", "kilimandzaro"), "tarkkeet");
            Oleta.Tosi(!RadioAineisto.NimiEsiintyy("Radio Oo", "Oo"), "alle 3 merkkiä ei haeta");
        }

        [Testi] static void NaytonNimiKutenWebissa()
        {
            var f = Fontti();
            int n = 0;
            foreach (var p in K().GetProperty("naytto").EnumerateObject())
            {
                var asema = A().MaanAsema(p.Name);
                A().Maat.TryGetValue(p.Name, out var maa);
                Oleta.Sama(p.Value.GetString(), RadioAineisto.NaytonNimi(asema.Nimi, maa, p.Name, f), p.Name);
                n++;
            }
            Oleta.Sama(115, n);
            Oleta.Sama("Kreikka", RadioAineisto.NaytonNimi("ΕΡΤ Πρώτο Πρόγραμμα", "Kreikka", "GRC", f));
        }

        // ── Tilakone ──────────────────────────────────────────────────────

        static (RadioLinssi l, ValeYmparisto y, ValeVirta v, ValeViritin w, ValeRadioKartta k, List<RadioTila> tilat) Luo()
        {
            var y = new ValeYmparisto();
            var v = new ValeVirta();
            var w = new ValeViritin();
            var k = new ValeRadioKartta();
            var l = new RadioLinssi(S(), v, w, k, Fontti());
            var tilat = new List<RadioTila>();
            l.TilaMuuttui += t => tilat.Add(t);
            l.Avaa(y);
            return (l, y, v, w, k, tilat);
        }

        static void Aja(RadioLinssi l, ValeYmparisto y, double s, Action jokaKehys = null)
        {
            for (double t = 0; t < s; t += 1 / 60.0) { y.Kello += 1 / 60.0; jokaKehys?.Invoke(); l.Paivita(); }
        }

        [Testi] static void AvausNayttaaYhdenKaupunginMaataKohden()
        {
            var (l, y, v, w, k, tilat) = Luo();
            Oleta.Sama(118, k.Vain.Count);
            Oleta.Tosi(y.Musiikkipito, "musiikki pitoon");
            Oleta.Tosi(!RadioLinssi.LuentaSallittu, "luenta estetty radiotilassa");
            Oleta.Sama(RadioVaihe.Hiljaa, l.Tila.Vaihe);
            Oleta.Sama("RADIO POIS", l.Tila.Rivi1);
            Oleta.Tosi(l.Asteikko.Count > 80, "asteikolla kanavalliset: " + l.Asteikko.Count);
            // Asteikko lännestä itään.
            var lon = l.Asteikko.Select(id => S().Kaupunki(id).Lon).ToList();
            Oleta.Tosi(lon.Zip(lon.Skip(1), (a, b) => a <= b).All(x => x), "pituusasteen mukaan");
            l.Sulje();
            Oleta.Sama(null, k.Vain);
            Oleta.Tosi(RadioLinssi.LuentaSallittu && !y.Musiikkipito, "purettu");
        }

        [Testi] static void ViritysKolmessaVaiheessaVahimmaisajalla()
        {
            var (l, y, v, w, k, tilat) = Luo();
            k.Napauta("helsinki");
            Oleta.Sama(RadioVaihe.Viritys, l.Tila.Vaihe);
            Oleta.Sama(ViritysVaihe.Siirtyma, l.Tila.Viritys);
            Oleta.Tosi(w.Soi && v.Auki != null && v.V == 0, "kohina soi, lähetys mykkänä");
            Oleta.Sama("helsinki", k.Korostettu);
            Oleta.Sama("FIN", l.Tila.AsemaId);
            v.Kuuluu = true;   // nopea asema: kuuluu heti
            Aja(l, y, 1.3);
            Oleta.Sama(ViritysVaihe.Haku, l.Tila.Viritys);
            Aja(l, y, 0.9);    // 2,2 s: ei vielä lukitusta
            Oleta.Sama(ViritysVaihe.Haku, l.Tila.Viritys);
            Aja(l, y, 0.15);   // 2,35 s > 2,28 s
            Oleta.Sama(ViritysVaihe.Lukittuu, l.Tila.Viritys);
            Oleta.Tosi(!w.Soi, "kohina häivytetään");
            Aja(l, y, 0.4);
            Oleta.Sama(RadioVaihe.Soi, l.Tila.Vaihe);
            Oleta.Sama("HELSINKI", l.Tila.Rivi2);
            Aja(l, y, 1);
            Oleta.Tosi(Math.Abs(v.V - RadioLinssi.OletusAani) < 1e-4, "täysi voimakkuus: " + v.V);
        }

        [Testi] static void HidasAsemaJaAikakatkaisu()
        {
            var (l, y, v, w, k, tilat) = Luo();
            k.Napauta("helsinki");
            Aja(l, y, 5);
            Oleta.Sama(ViritysVaihe.Haku, l.Tila.Viritys, "haku jatkuu kunnes kuuluu");
            v.Kuuluu = true;
            Aja(l, y, 0.1);
            Oleta.Sama(ViritysVaihe.Lukittuu, l.Tila.Viritys, "lukittuu heti kun kuuluu");
            l.Keskeyta();
            Oleta.Sama(RadioVaihe.Hiljaa, l.Tila.Vaihe);
            Oleta.Tosi(v.Auki == null && !w.Soi && k.Korostettu == null, "STOP");
            k.Napauta("helsinki");
            Aja(l, y, 12.1);
            Oleta.Sama(RadioVaihe.Virhe, l.Tila.Vaihe);
            Oleta.Sama("Asema ei vastaa", l.Tila.Viesti);
            // Sama kaupunki virheen jälkeen: uusi yritys.
            k.Napauta("helsinki");
            Oleta.Sama(RadioVaihe.Viritys, l.Tila.Vaihe);
        }

        [Testi] static void VirheJaKanavatonMaa()
        {
            var (l, y, v, w, k, tilat) = Luo();
            k.Napauta("helsinki");
            v.Virhe = "Lähetys katkesi";
            Aja(l, y, 0.1);
            Oleta.Sama(RadioVaihe.Virhe, l.Tila.Vaihe);
            Oleta.Sama("EI KUULU", l.Tila.Rivi1);
            var kanavaton = l.Nakyvat.FirstOrDefault(id => S().MaanAsema(S().Kaupunki(id)?.Iso3) == null);
            Oleta.Tosi(kanavaton != null, "kanavaton kaupunki löytyy");
            k.Napauta(kanavaton);
            Oleta.Sama("Ei asemaa", l.Tila.Viesti);
        }

        [Testi] static void TaajuusJaMaanAsema()
        {
            var (l, y, v, w, k, tilat) = Luo();
            l.Taajuus(0);
            Oleta.Sama(l.Asteikko[0], l.Tila.KaupunkiId);
            Oleta.Sama(0.0, l.Tila.Taajuus);
            l.Taajuus(1);
            Oleta.Sama(l.Asteikko[^1], l.Tila.KaupunkiId);
            Oleta.Sama(1.0, l.Tila.Taajuus);
            l.Viritä("FIN");
            Oleta.Sama("FIN", l.Tila.AsemaId);
            Oleta.Tosi(l.MaanAsema("FIN") != null && l.MaanAsema("XXX") == null, "kartuscha");
            // Asemanvaihto: vanha virta suljetaan, viritys jatkuu.
            Oleta.Tosi(v.Loki.Count(x => x == "sulje") >= 2, "vanhat virrat suljettu");
        }
    }
}
