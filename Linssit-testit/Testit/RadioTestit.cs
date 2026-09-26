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
        public void Tauko(bool p) => Loki.Add("tauko " + p);
        public string Esikuunneltu;
        public void Esikuuntele(string url) { Loki.Add("esikuuntele " + (url ?? "-")); Esikuunneltu = url; }
    }

    public sealed class ValeViritin : IViritin
    {
        public readonly List<string> Loki = new List<string>();
        public bool Soi;
        public float V = -1;
        public float Voimakkuus { set => V = value; }
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
        public static RadioAineisto SallittuAineisto() => S();
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

        [Testi] static void KoepaketinV17RiviYksiSoi()
        {
            // v17 (skeema 1.16): 115 maata, rivi 1 soi aina; 17 kiellettyä yleisradiota rivinä 2.
            var a = RadioAineisto.Lue(Paketti("radiot-kokoelma-v17.json"), null, Paketti("kaupungit-radio.json"));
            Oleta.Sama(115, a.Asemat.Count);
            Oleta.Tosi(a.Asemat.Values.All(x => x.Jarjestys == 1 && x.Id == x.Iso3), "kanava on rivi 1");
            Oleta.Tosi(a.Asemat.Values.All(x => RadioLinssi.ToimintoAsemalle(x) == RadioLinssi.Toiminto.Soita), "kaikki kanavat soivat");
            Oleta.Sama(17, a.Vaihtoehdot.Count);
            Oleta.Tosi(a.Vaihtoehdot.Values.SelectMany(v => v).All(x => x.Luokka == "kielletty" && x.Id.EndsWith(":yleisradio")
                && RadioLinssi.ToimintoAsemalle(x) == RadioLinssi.Toiminto.Linkki), "yleisradio linkkinä");
            Oleta.Sama("ByteFM", a.Asemat["DEU"].Nimi);
            Oleta.Sama("sallittu", a.Asemat["CHE"].Luokka);
        }

        [Testi] static void KoepaketinV24ToimimatonEiSoi()
        {
            // v24: Siirtosepän kättelytarkistus; NGA Metro FM toimii false, CHE = Radio Vostok.
            var a = RadioAineisto.Lue(Paketti("radiot-kokoelma-v24.json"), null, Paketti("kaupungit-radio.json"));
            Oleta.Sama(115, a.Asemat.Count);
            Oleta.Sama(false, a.Asemat["NGA"].Toimii);
            Oleta.Sama(RadioLinssi.Toiminto.Ei, RadioLinssi.ToimintoAsemalle(a.Asemat["NGA"]));
            Oleta.Sama("Radio Vostok", a.Asemat["CHE"].Nimi);
            Oleta.Sama(114, a.Asemat.Values.Count(x => RadioLinssi.ToimintoAsemalle(x) == RadioLinssi.Toiminto.Soita));
        }

        [Testi] static void ToimivaRiviVoittaaToimimattoman()
        {
            var a = RadioAineisto.Lue(MiniJson.Jasenna("{\"alkiot\":[" +
                "{\"id\":\"FIN\",\"iso3\":\"FIN\",\"jarjestys\":1,\"nimi\":\"Rikki\",\"url\":\"https://x\",\"luokka\":\"epaselva\",\"toimii\":false}," +
                "{\"id\":\"FIN:2\",\"iso3\":\"FIN\",\"jarjestys\":2,\"nimi\":\"Ehjä\",\"url\":\"https://y\",\"luokka\":\"epaselva\",\"toimii\":true}," +
                "{\"id\":\"SWE\",\"iso3\":\"SWE\",\"nimi\":\"Tarkistamatta\",\"url\":\"https://z\",\"luokka\":\"sallittu\"}]}"),
                null, Paketti("kaupungit-radio.json"));
            Oleta.Sama("Ehjä", a.Asemat["FIN"].Nimi);
            Oleta.Sama("Rikki", a.Vaihtoehdot["FIN"].Single().Nimi);
            Oleta.Sama(null, a.Asemat["SWE"].Toimii);
            Oleta.Sama(RadioLinssi.Toiminto.Soita, RadioLinssi.ToimintoAsemalle(a.Asemat["SWE"]), "tarkistamaton soi");
        }

        [Testi] static void PieninJarjestysVoittaaRivienJarjestyksesta()
        {
            var a = RadioAineisto.Lue(MiniJson.Jasenna("{\"alkiot\":[" +
                "{\"id\":\"FIN:yleisradio\",\"iso3\":\"FIN\",\"jarjestys\":2,\"nimi\":\"Yle\",\"luokka\":\"kielletty\",\"sivu\":\"https://yle.fi/\"}," +
                "{\"id\":\"FIN\",\"iso3\":\"FIN\",\"jarjestys\":1,\"nimi\":\"Radio Helsinki\",\"url\":\"https://rh/live\",\"luokka\":\"epaselva\"}]}"),
                null, Paketti("kaupungit-radio.json"));
            Oleta.Sama("Radio Helsinki", a.Asemat["FIN"].Nimi);
            Oleta.Sama("Yle", a.Vaihtoehdot["FIN"].Single().Nimi);
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

        [Testi] static void OmatNapitKutenWebinRadiotila()
        {
            // web radio.js pallonNapit: yksi nappi per näkyvä kaupunki, kanavaton katkoviivalla,
            // soiva punaisena; "kaikki muu toiminto häviää" → pelin merkit ja nappula piiloon.
            var y = new ValeYmparisto();
            var k = new ValeRadioKartta();
            var l = new RadioLinssi(S(), new ValeVirta(), new ValeViritin(), k, Fontti()) { OmatNapit = true };
            int muutoksia = 0;
            l.NapitMuuttuivat += () => muutoksia++;
            Oleta.Sama(0, l.Napit.Count, "kiinni: ei nappeja");
            l.Avaa(y);
            Oleta.Sama(false, y.PelikerroksetNakyvissa, "pelin kerrokset piiloon");
            Oleta.Sama(0, k.Vain.Count, "kaupunkimerkit piiloon");
            Oleta.Sama(118, l.Napit.Count);
            Oleta.Sama(l.Asteikko.Count, l.Napit.Count(n => n.OnKanava), "kanavalliset = asteikko");
            Oleta.Tosi(l.Napit.All(n => !n.Soi), "mikään ei soi");
            Oleta.Tosi(muutoksia >= 1, "avaus ilmoittaa");
            l.SoitaKaupunki("helsinki");
            Oleta.Sama("helsinki", l.Napit.Single(n => n.Soi).Kaupunki);
            int ennen = muutoksia;
            l.Keskeyta();
            Oleta.Tosi(muutoksia > ennen && l.Napit.All(n => !n.Soi), "STOP sammuttaa");
            l.Sulje();
            Oleta.Sama(true, y.PelikerroksetNakyvissa, "kerrokset takaisin");
            Oleta.Sama(0, l.Napit.Count);
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
            // Web radiosoitin rivit(): virittäessä [VIRITTÄÄ..., asema].
            Oleta.Sama("VIRITTÄÄ...", l.Tila.Rivi1);
            Oleta.Tosi(l.Tila.Rivi2.Length > 0 && l.Tila.Rivi2 == l.Tila.Naytto.ToUpperInvariant(), "rivi 2 = asema: " + l.Tila.Rivi2);
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
            Oleta.Sama(l.Tila.Naytto.ToUpperInvariant(), l.Tila.Rivi1);
            Oleta.Sama("HELSINKI · SUOMI", l.Tila.Rivi2, "soidessa [asema, KAUPUNKI · MAA]");
            Aja(l, y, 1);
            Oleta.Tosi(Math.Abs(v.V - RadioLinssi.OletusAani) < 1e-4, "täysi voimakkuus: " + v.V);
        }

        [Testi] static void ViivaimenVetoRahinallaJaLukitus()
        {
            // Radiouudistus (suunnitelma luku 7): veto → rahina asteikkoetäisyyden mukaan, irrotus lukitsee.
            var (l, y, v, w, k, tilat) = Luo();
            k.Napauta("helsinki");
            v.Kuuluu = true;
            Aja(l, y, 3.5);
            Oleta.Sama(RadioVaihe.Soi, l.Tila.Vaihe);
            l.VetoAlkaa();
            Oleta.Tosi(w.Soi && w.V == 0, "rahina käyntiin mykkänä");
            l.Veto(0);
            Oleta.Tosi(Math.Abs(v.V - RadioLinssi.OletusAani) < 1e-4 && w.V < 1e-4, "asemalla lähetys täysi");
            l.Veto(0.25);
            Oleta.Tosi(v.V < 1e-4 && Math.Abs(w.V - RadioLinssi.OletusAani) < 1e-4, "puolivälissä pelkkä rahina");
            Aja(l, y, 1);
            Oleta.Tosi(v.V < 1e-4, "Paivita ei nosta lähetystä vedon aikana");
            l.Veto(0.1);
            float kesken = v.V;
            Oleta.Tosi(kesken > 0 && kesken < RadioLinssi.OletusAani, "osittain: " + kesken);
            // Irrotus samalle asemalle: taso jatkaa rampilla eikä hyppää.
            l.VetoLoppuu("helsinki");
            Oleta.Tosi(!w.Soi, "rahina väistyy");
            Aja(l, y, 1 / 60.0);
            Oleta.Tosi(Math.Abs(v.V - kesken) < 0.05, $"ei hyppyä: {kesken} → {v.V}");
            Aja(l, y, 1);
            Oleta.Tosi(Math.Abs(v.V - RadioLinssi.OletusAani) < 1e-4, "täysi taas");
            // Irrotus toiselle asemalle: tavallinen viritys, rahina jatkuu.
            l.VetoAlkaa();
            l.Veto(0.02);
            l.VetoLoppuu("tukholma");
            Oleta.Sama(RadioVaihe.Viritys, l.Tila.Vaihe);
            Oleta.Sama("tukholma", l.Tila.KaupunkiId);
            Oleta.Tosi(w.Soi && Math.Abs(w.V - RadioLinssi.OletusAani) < 1e-4, "rahina täysillä virityksessä");
            Oleta.Sama(ViritysVaihe.Haku, l.Tila.Viritys, "siirtymä jää pois: sormi teki sen");
            v.Kuuluu = true;
            Aja(l, y, 1.1);
            Oleta.Sama(ViritysVaihe.Lukittuu, l.Tila.Viritys, "lukitus hakuajan jälkeen, ei 2,28 s");
            Aja(l, y, 0.4);
            Oleta.Sama(RadioVaihe.Soi, l.Tila.Vaihe);
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

        [Testi] static void TaukoSeisooJaJatkuu()
        {
            var (l, y, v, w, k, tilat) = Luo();
            k.Napauta("helsinki");
            Aja(l, y, 1.0);
            l.Tauko(true);
            Oleta.Tosi(l.Tauolla && l.Tila.Tauolla && v.Loki.Last() == "tauko True", "tauko virralle ja tilaan");
            Aja(l, y, 20);   // yli aikakatkaisun: ajastimet seisovat
            Oleta.Sama(RadioVaihe.Viritys, l.Tila.Vaihe, "ei aikakatkaisua tauolla");
            l.Tauko(false);
            Oleta.Tosi(!l.Tauolla && v.Loki.Last() == "tauko False");
            v.Kuuluu = true;
            Aja(l, y, 1.3);   // 1,0 + 1,3 = 2,3 s virityksen omaa aikaa > 2,28 s
            Oleta.Sama(ViritysVaihe.Lukittuu, l.Tila.Viritys);
            Aja(l, y, 0.4);
            Oleta.Sama(RadioVaihe.Soi, l.Tila.Vaihe);
            l.Tauko(true);
            Oleta.Sama(RadioVaihe.Soi, l.Tila.Vaihe, "tila säilyy");
            // Uusi asema purkaa tauon.
            k.Napauta(l.Asteikko.First(id => id != "helsinki"));
            Oleta.Tosi(!l.Tauolla && !l.Tila.Tauolla, "uusi asema soi");
            Oleta.Sama("FIN", l.Kaupunki("helsinki").Iso3);
            Oleta.Sama("Suomi", l.MaanNimi("FIN"));
        }

        [Testi] static void VirheJaKanavatonMaa()
        {
            var (l, y, v, w, k, tilat) = Luo();
            k.Napauta("helsinki");
            v.Virhe = "Lähetys katkesi";
            Aja(l, y, 0.1);
            Oleta.Sama(RadioVaihe.Virhe, l.Tila.Vaihe);
            Oleta.Sama("EI KUULU", l.Tila.Rivi1);
            Oleta.Sama(l.Tila.Naytto.ToUpperInvariant(), l.Tila.Rivi2, "virheessä [EI KUULU, asema]");
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

        // ---- Esikuuntelu (ESILATAUSPOLITIIKKA kohta 6: nykyinen ja seuraava asema puskuroituna) ----

        static string AsemanOsoite(RadioLinssi l, string kaupunki) => S().MaanAsema(S().Kaupunki(kaupunki)?.Iso3)?.Url;

        /// <summary>Soita asteikon kohta i lukitukseen asti (nopea asema).</summary>
        static void Soita(RadioLinssi l, ValeYmparisto y, ValeVirta v, int i)
        {
            l.SoitaKaupunki(l.Asteikko[i]);
            v.Kuuluu = true;
            Aja(l, y, 3.2);
            Oleta.Sama(RadioVaihe.Soi, l.Tila.Vaihe, "soi");
        }

        [Testi] static void EsikuunteleeSeuraavanKunAsemaOnSoinutKolmeSekuntia()
        {
            var (l, y, v, w, k, tilat) = Luo();
            int i = l.Asteikko.Count / 2;
            Soita(l, y, v, i);   // soi ~0,6 s (lukitus 2,28 s + 0,32 s)
            Aja(l, y, 2.0);
            Oleta.Tosi(v.Esikuunneltu == null, "ei vielä: nykyinen puskuroi ensin yksin");
            Aja(l, y, 0.6);
            Oleta.Sama(AsemanOsoite(l, l.Asteikko[i + 1]), v.Esikuunneltu, "oletussuunta ylös asteikolla");
            Oleta.Sama(v.Esikuunneltu, l.Esikuunneltu);
            int ennen = v.Loki.Count(x => x.StartsWith("esikuuntele "));
            Aja(l, y, 70);
            Oleta.Sama(ennen, v.Loki.Count(x => x.StartsWith("esikuuntele ")), "kerran asemaa kohden, ei uudelleen 60 s:n jälkeen");
        }

        [Testi] static void SuuntaSeuraaViimeistaVaihtoaJaVaihtoEiSuljeEsikuuntelua()
        {
            var (l, y, v, w, k, tilat) = Luo();
            int i = l.Asteikko.Count / 2;
            Soita(l, y, v, i);
            Soita(l, y, v, i - 1);   // alas asteikolla
            Aja(l, y, 3.1);
            string seuraava = AsemanOsoite(l, l.Asteikko[i - 2]);
            Oleta.Sama(seuraava, v.Esikuunneltu, "suunta alas");
            v.Loki.Clear();
            l.SoitaKaupunki(l.Asteikko[i - 2]);
            Oleta.Tosi(!v.Loki.Contains("esikuuntele -"), "vaihto esikuunneltuun ei sulje sitä ennen Avaa-kutsua: " + string.Join(", ", v.Loki));
            Oleta.Sama(seuraava, v.Auki, "Avaa samalla osoitteella (liitännäinen ottaa esikuuntelun käyttöön)");
            Oleta.Tosi(l.Esikuunneltu == null, "merkintä nollattu");
        }

        [Testi] static void TaukoKuumuusJaStopSulkevatEsikuuntelun()
        {
            var (l, y, v, w, k, tilat) = Luo();
            Soita(l, y, v, 3);
            Aja(l, y, 3.1);
            Oleta.Tosi(v.Esikuunneltu != null, "esikuuntelu alkoi");
            l.Tauko(true);
            Oleta.Tosi(v.Esikuunneltu == null, "tauko sulkee");
            l.Tauko(false);
            Aja(l, y, 3.2);
            Oleta.Tosi(v.Esikuunneltu != null, "jatkon jälkeen uudelleen");
            bool kuuma = true;
            l.EsikuunteluSallittu = () => !kuuma;
            Aja(l, y, 0.1);
            Oleta.Tosi(v.Esikuunneltu == null, "kuumuus sulkee");
            kuuma = false;
            Aja(l, y, 3.2);
            Oleta.Tosi(v.Esikuunneltu != null, "viilennyttyä uudelleen");
            l.Keskeyta();
            Oleta.Tosi(v.Esikuunneltu == null, "STOP sulkee");
        }

        [Testi] static void VetoUusiiVanhentuneenEsikuuntelun()
        {
            var (l, y, v, w, k, tilat) = Luo();
            Soita(l, y, v, 4);
            Aja(l, y, 3.1);
            string eka = v.Esikuunneltu;
            Oleta.Tosi(eka != null, "esikuuntelu");
            int ennen = v.Loki.Count(x => x.StartsWith("esikuuntele "));
            l.VetoAlkaa();
            Oleta.Sama(ennen, v.Loki.Count(x => x.StartsWith("esikuuntele ")), "tuore esikuuntelu jää");
            l.VetoLoppuu(l.Asteikko[4]);
            Aja(l, y, 61);
            l.VetoAlkaa();
            Oleta.Sama(ennen + 1, v.Loki.Count(x => x.StartsWith("esikuuntele ")), "60 s:n jälkeen veto uusii");
            Oleta.Sama(eka, v.Esikuunneltu);
        }
    }
}
