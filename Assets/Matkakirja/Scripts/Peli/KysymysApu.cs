// Kysymysnäkymän data ja sen rakentaminen pelin tilasta (Pelikoodari, erä 4).
// Ei UnityEngineä: käännetään myös Peli-testeissä (kaanna.sh). Rajapinta
// IKysymysNakyma on NakymaSopimukset.cs:ssä; näkymät (UGUI-vara
// KysymysDialogi, Natiivi-UI:n UI Toolkit) saavat vain KysymysNaytto-olion.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    /// <summary>Kysymyksen muoto näkymälle (Peli.KysymysMuoto ilman pelilogiikan riippuvuutta).</summary>
    public enum KysymysLaji { Visa, Vaite, Kuva, Lippu, Tapahtuma, Pulma, Kaksintaistelu, Tapahtumakortti }

    /// <summary>
    /// Avoimen kysymyksen näytettävä tila. Ohjain rakentaa tämän uudelleen jokaisen
    /// teon jälkeen ja kutsuu Nayta uudestaan (sama olio ei muutu näkymän alla).
    /// </summary>
    public sealed class KysymysNaytto
    {
        public KysymysLaji Laji;
        /// <summary>Esim. "Pariisi · aarrekysymys", "Kohtaaminen", "Kaupungin tutkiminen".</summary>
        public string Otsikko;
        /// <summary>Kysyjä ja tilanne kursiivilla, esim. "kahvilan tarjoilija kysyy".</summary>
        public string Kehys;
        public string Kysymys;
        /// <summary>Väittämän paikka (Vaite), muuten null.</summary>
        public string Paikka;
        /// <summary>Kuvan tai lipun osoite (Kuva, Lippu), muuten null. https-osoite.</summary>
        public string KuvaUrl;
        /// <summary>Kuvan lähde/attribuutio pienellä, tai null.</summary>
        public string KuvaLahde;
        public List<string> Vaihtoehdot = new List<string>();
        /// <summary>50:50:n piilottamat vaihtoehdot (indeksit Vaihtoehdot-listaan).</summary>
        public List<int> Piilotetut = new List<int>();

        /// <summary>Ostettu vihje, tai null.</summary>
        public string Vihje;
        /// <summary>Vihjenappi näkyvissä (vihje olemassa, ei ostettu, ei vastattu).</summary>
        public bool VihjeTarjolla;
        public int VihjeHinta;
        /// <summary>50:50-nappi näkyvissä (neljä vaihtoehtoa, ei käytetty, ei vastattu).</summary>
        public bool PuolitusTarjolla;
        public int PuolitusHinta;
        /// <summary>Puolitusnapin teksti; null = "50:50 {hinta} £" (kaksintaistelussa "Helpotus (rosvo vie X p)").</summary>
        public string PuolitusTeksti;
        /// <summary>Puolitusnappi näkyy mutta harmaana (kaksintaistelun helpotukset käytetty).</summary>
        public bool PuolitusHarmaa;
        /// <summary>Lisärivi vaihtoehtojen alla ennen vastausta (esim. "Rosvo on vienyt 150 puntaa."), tai null.</summary>
        public string Huomautus;

        // --- pulma (Laji Pulma) ---
        /// <summary>Pulman tunniste (web puzzleId), piirroksen valintaan.</summary>
        public string PulmaId;
        /// <summary>Piirroksen data (web sketchData, MiniJson-muoto: Dictionary/List/double/string/bool), tai null.</summary>
        public Dictionary<string, object> Luonnos;
        /// <summary>Vaihtoehtojen kuvat (https) samassa järjestyksessä kuin Vaihtoehdot, tai null.</summary>
        public List<string> VaihtoehtoKuvat;
        /// <summary>Pelaajan raha (napit harmaana, jos ei riitä; ohjain kertoo virheen Viestinä).</summary>
        public int Raha;
        public string Valuutta = "£";
        /// <summary>Aikaraja sekunteina tai null (ei aikarajaa, esim. pulma). Jäljellä tulee PaivitaAika-kutsuilla.</summary>
        public int? Sekunnit;

        // --- tulos (Vastattu = true) ---
        public bool Vastattu;
        /// <summary>Valittu indeksi; -1 = aika loppui.</summary>
        public int Valittu = -1;
        public int Oikea;
        public bool Oikein;
        public bool AikaLoppui;
        public string Fakta;
        public List<string> Lahteet = new List<string>();
        /// <summary>Löytö tai palkkio yhdellä rivillä ("Löysit: Kätketty matka-arkku, 640 £"), tai null.</summary>
        public string Loyto;
        /// <summary>Jatka-napin teksti tuloksen jälkeen.</summary>
        public string JatkaTeksti = "Jatka matkaa";

        /// <summary>Hetkellinen ilmoitus (esim. "Rahat eivät riitä"), tai null.</summary>
        public string Viesti;

        // --- kohtaaminen (web visa.js: KOHTAAMISET ja TARINAKAARI) ---
        /// <summary>Hahmon tervehdys ennen kysymystä (kaaren kohtaaminen tai kaupungin tervehdys), tai null.</summary>
        public string Tervehdys;
        /// <summary>Hahmon repliikki vastauksen jälkeen (löytö, tyhjä tai väärin), tai null.</summary>
        public string Repliikki;
        /// <summary>Repliikki on löytörepliikki (luetaan ääneen, web lueKertojana).</summary>
        public bool RepliikkiLoyto;
        /// <summary>Kohtaamisen tuloslaji: loyto, tyhja tai vaarin (web tuloslaji), tai null.</summary>
        public string Tuloslaji;
        /// <summary>Kohtaamiskuva (https) tervehdyssivulle ja pieneksi kysymyssivulle, tai null.</summary>
        public string MuotokuvaUrl;
        public string MuotokuvaAlt;
        /// <summary>Lyhyt kuvateksti kortille; pitkä avatulle kuvalle (web js/kuvatekstit.js).</summary>
        public string MuotokuvaLyhyt, MuotokuvaKuvateksti;
        /// <summary>
        /// Tervehdyssivu (web visa.js SIVU 1): näytä muotokuva, tervehdys, Varoitus ja
        /// AloitaTeksti-nappi (KysymysToiminnot.Aloita); kysymys, vaihtoehdot ja aika
        /// vasta sen jälkeen. Aika ei kulu tervehdyssivulla.
        /// </summary>
        public bool TervehdysVaihe;
        public string AloitaTeksti;
        /// <summary>Viimeisen yrityksen varoitus tervehdyssivulla, tai null.</summary>
        public string Varoitus;
        /// <summary>Kohtaamisen yritys "n/kaikki" otsikkoriville (web kaariYritysLuku), tai null.</summary>
        public int? Yritys, Yrityksia;

        // --- tulos ---
        /// <summary>Löydön näyttönimi, fakta ja kuva (manner- ja maakohtainen, web aarreTyyppi), tai null.</summary>
        public string LoytoNimi, LoytoFakta, LoytoKuvaUrl;
        /// <summary>Kätkökuva kaaren aarretekstin yhteydessä (web kohtaaminen-katko.jpg), tai null.</summary>
        public string KatkoKuvaUrl;
        /// <summary>Käännetyn laatan tyyppi (Laattatyypit: star, mannerAarre, isoAarre, pieniAarre, robber; "pollo"), tai null.</summary>
        public string LoytoTyyppi;
        /// <summary>Rivi "Vuoro vaihtuu — seuraavalla vuorolla saat uuden kysymyksen." (web: väärä vastaus).</summary>
        public bool VuoroVaihtuu;
        /// <summary>
        /// Tuloksen ajoitus (web: tuomio 0,9 s, sitten paljastus): 0 = vastaamatta,
        /// 1 = vain tuomio (Oikein!/Väärin./Aika loppui) ja värit, 2 = kaikki
        /// (fakta, repliikki, löytö, Jatka). Ohjain vaihtaa 1 → 2 ja kutsuu Nayta uudelleen.
        /// </summary>
        public int TulosVaihe;
    }

    /// <summary>Kysymysnäkymän takaisinkutsut (ohjain kutsuu pelilogiikkaa).</summary>
    public sealed class KysymysToiminnot
    {
        public Action<int> Vastaa;
        public Action Vihje;
        public Action Puolita;
        /// <summary>Tuloksen jälkeen: sulkee kysymyksen.</summary>
        public Action Jatka;
        /// <summary>Tervehdyssivun "Aloita peli": kysymys ja aika alkavat.</summary>
        public Action Aloita;
    }

    /// <summary>Kaupungin kohtaamistekstit (kokoelmat kohtaamiset ja tarinakaari).</summary>
    public sealed class Kohtaaminen
    {
        public string Tervehdys, Loyto, Tyhja, Vaarin;
        /// <summary>Hahmon nimi ja napin teksti (web KOHTAAMISET[id].hahmo, .nappi).</summary>
        public string Hahmo, Nappi;
        /// <summary>Sisällön tunnetagit (web kohtaamisenTunnetagi): laji → (tunne, voimakkuus).</summary>
        public readonly Dictionary<string, (string Tunne, double Voimakkuus)> Tunteet = new Dictionary<string, (string, double)>();
        /// <summary>Kohtaamiskuvat (kokoelma kohtaamiskuvat): tarinakaaren henkilö ja tavallinen kohtaaminen.</summary>
        public Kohtaamiskuva KaariKuva, TavallinenKuva;
        /// <summary>Tarinakaaren henkilön kohtaaminen ja aarreteksti (TARINAKAARI[id].kohtaaminen, .aarre).</summary>
        public string KaariKohtaaminen, KaariAarre;
    }

    public sealed class Kohtaamiskuva { public string Url, Alt, Lyhyt, Kuvateksti; }

    /// <summary>Laattatyypin näyttötiedot (web TOKEN_TYPES / mannerTypes / paikallisaarre).</summary>
    public sealed class Aarre { public string Nimi, Fakta, KuvaUrl; }

    /// <summary>
    /// Löytöjen nimet kuten web game.aarreMantereella: pohja = mantereen tyyppi
    /// (laatat.mannerTypes[manner][tyyppi]) tai laudan tyyppi (laatat.types), ja
    /// pieni/iso paikallisaarre korvautuu maan omalla (kokoelma paikallisaarteet).
    /// </summary>
    public sealed class Aarrenimet
    {
        readonly Dictionary<string, Aarre> tyypit = new Dictionary<string, Aarre>();
        readonly Dictionary<string, Dictionary<string, Aarre>> mantereet = new Dictionary<string, Dictionary<string, Aarre>>();
        readonly Dictionary<string, Dictionary<string, Aarre>> maat = new Dictionary<string, Dictionary<string, Aarre>>();

        /// <summary>Repopolku assets/aarteet/… → ämpäri (media.matkakirja.app/kohtaamiset/aarteet/…).</summary>
        public static string KuvaUrl(string polku)
        {
            if (string.IsNullOrEmpty(polku)) return null;
            if (polku.StartsWith("http", StringComparison.Ordinal)) return polku;
            const string etuliite = "assets/aarteet/";
            return polku.StartsWith(etuliite, StringComparison.Ordinal)
                ? "https://media.matkakirja.app/kohtaamiset/aarteet/" + polku.Substring(etuliite.Length)
                : "https://matkakirja.app/" + polku;
        }

        static Aarre Lue(object o, string url = null)
        {
            var d = o as Dictionary<string, object>;
            if (d == null) return null;
            return new Aarre { Nimi = MiniJson.Teksti(d, "name"), Fakta = MiniJson.Teksti(d, "fakta"), KuvaUrl = url ?? KuvaUrl(MiniJson.Teksti(d, "kuva")) };
        }

        static void Taulu(Dictionary<string, Aarre> kohde, object o)
        {
            if (!(o is Dictionary<string, object> d)) return;
            foreach (var kv in d) { var a = Lue(kv.Value); if (a != null) kohde[kv.Key] = a; }
        }

        /// <summary>Kokoelma laatat (alkio "tokens": data.types, data.mannerTypes).</summary>
        public void LueLaatat(string json)
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(juuri, "alkiot")))
            {
                var d = MiniJson.Kentta(MiniJson.Objekti(a), "data") as Dictionary<string, object>;
                if (d == null) continue;
                Taulu(tyypit, MiniJson.Kentta(d, "types"));
                if (MiniJson.Kentta(d, "mannerTypes") is Dictionary<string, object> m)
                    foreach (var kv in m) { var t = new Dictionary<string, Aarre>(); Taulu(t, kv.Value); mantereet[kv.Key] = t; }
            }
        }

        /// <summary>Kokoelma paikallisaarteet: maa (ISO3), data.pieniAarre/isoAarre {name, kuva, fakta}, kuvat.*.url.</summary>
        public void LuePaikallisaarteet(string json)
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(juuri, "alkiot")))
            {
                var o = MiniJson.Objekti(a);
                var maa = MiniJson.Teksti(o, "maa") ?? MiniJson.Teksti(o, "id");
                var d = MiniJson.Kentta(o, "data") as Dictionary<string, object>;
                var kuvat = MiniJson.Kentta(o, "kuvat") as Dictionary<string, object>;
                if (maa == null || d == null) continue;
                var t = new Dictionary<string, Aarre>();
                foreach (var tyyppi in new[] { Laattatyypit.PieniAarre, Laattatyypit.IsoAarre })
                {
                    var url = (MiniJson.Kentta(kuvat, tyyppi) as Dictionary<string, object>) is Dictionary<string, object> k ? MiniJson.Teksti(k, "url") : null;
                    var aarre = Lue(MiniJson.Kentta(d, tyyppi), url);
                    if (aarre != null) t[tyyppi] = aarre;
                }
                maat[maa] = t;
            }
        }

        /// <summary>Mantereet laatat.mannerTypes-järjestyksessä (Aarnin luettelo, web aarreLuettelo).</summary>
        public IEnumerable<string> Mantereet => mantereet.Keys;

        /// <summary>Web aarreMantereella(tyyppi, manner, maa): null, jos tyyppiä ei tunneta.</summary>
        public Aarre Hae(string tyyppi, string manner, string maa)
        {
            if (tyyppi == null) return null;
            Aarre pohja = null;
            if (manner != null && mantereet.TryGetValue(manner, out var m)) m.TryGetValue(tyyppi, out pohja);
            if (pohja == null) tyypit.TryGetValue(tyyppi, out pohja);
            if ((tyyppi == Laattatyypit.PieniAarre || tyyppi == Laattatyypit.IsoAarre) && maa != null
                && maat.TryGetValue(maa, out var t) && t.TryGetValue(tyyppi, out var oma))
                return new Aarre { Nimi = oma.Nimi ?? pohja?.Nimi, Fakta = oma.Fakta ?? pohja?.Fakta, KuvaUrl = oma.KuvaUrl ?? pohja?.KuvaUrl };
            return pohja;
        }
    }

    /// <summary>Kohtaamistekstit kaupungeittain.</summary>
    public sealed class Kohtaamiset
    {
        public readonly Dictionary<string, Kohtaaminen> Kaupungit = new Dictionary<string, Kohtaaminen>();
        /// <summary>Kätkökuva (saannot KATKOKUVA.url; oletus Pages-kopio).</summary>
        public string KatkoKuvaUrl = "https://matkakirja.app/assets/kohtaamiset/kohtaaminen-katko.jpg";

        Kohtaaminen Hae(string k)
        {
            if (!Kaupungit.TryGetValue(k, out var x)) Kaupungit[k] = x = new Kohtaaminen();
            return x;
        }

        static IEnumerable<(string Kaupunki, Dictionary<string, object> Data)> Alkiot(string json)
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(juuri, "alkiot")))
            {
                var o = MiniJson.Objekti(a);
                var d = MiniJson.Kentta(o, "data") as Dictionary<string, object>;
                var k = MiniJson.Teksti(o, "kaupunki") ?? MiniJson.Teksti(o, "id");
                if (d != null && k != null) yield return (k, d);
            }
        }

        /// <summary>Kokoelma kohtaamiset (web KOHTAAMISET): tervehdys, loyto, tyhja, vaarin.</summary>
        public void LueKohtaamiset(string json)
        {
            foreach (var (k, d) in Alkiot(json))
            {
                var x = Hae(k);
                x.Tervehdys = MiniJson.Teksti(d, "tervehdys");
                x.Loyto = MiniJson.Teksti(d, "loyto");
                x.Tyhja = MiniJson.Teksti(d, "tyhja");
                x.Vaarin = MiniJson.Teksti(d, "vaarin");
                x.Hahmo = MiniJson.Teksti(d, "hahmo");
                x.Nappi = MiniJson.Teksti(d, "nappi");
                Tunne(x, d, "tunneTervehdys", "tervehdys");
                Tunne(x, d, "tunneLoyto", "loyto");
                Tunne(x, d, "tunneTyhja", "tyhja");
                Tunne(x, d, "tunneVaarin", "vaarin");
            }
        }

        /// <summary>Web kuvaAvain: diakriitit pois, pienet kirjaimet, vain a–z ja 0–9 ("Pariisi" = "pariisi").</summary>
        public static string KuvaAvain(string nimi)
        {
            if (string.IsNullOrEmpty(nimi)) return "";
            var sb = new System.Text.StringBuilder();
            foreach (var c in nimi.Normalize(System.Text.NormalizationForm.FormD).ToLowerInvariant())
                if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')) sb.Append(c);
            return sb.ToString();
        }

        /// <summary>
        /// Kokoelma kohtaamiskuvat (web kohtaamiskuvat-data.js): vain tila
        /// 'tarkistettu' ja aktiivinen ≠ false; kaytto 'tavallinen' → tavallisen
        /// kohtaamisen kuva, muuten tarinakaaren. Avain kuvaAvain(kohde ?? kaupunki);
        /// myöhempi alkio voittaa (JS Map).
        /// </summary>
        public void LueKohtaamiskuvat(string json)
        {
            var avaimet = new Dictionary<string, string>();
            foreach (var k in Kaupungit.Keys) avaimet[KuvaAvain(k)] = k;
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(juuri, "alkiot")))
            {
                var o = MiniJson.Objekti(a);
                var d = MiniJson.Kentta(o, "data") as Dictionary<string, object>;
                var url = MiniJson.Teksti(o, "url");
                if (d == null || string.IsNullOrEmpty(url)) continue;
                if (MiniJson.Teksti(d, "tila") != "tarkistettu" || MiniJson.Kentta(d, "aktiivinen") is bool b && !b) continue;
                var avain = KuvaAvain(MiniJson.Teksti(d, "kohde") ?? MiniJson.Teksti(d, "kaupunki"));
                var kaupunki = avaimet.TryGetValue(avain, out var id) ? id : MiniJson.Teksti(o, "kaupunki");
                if (string.IsNullOrEmpty(kaupunki)) continue;
                var kuva = new Kohtaamiskuva
                {
                    Url = url, Alt = MiniJson.Teksti(d, "alt"),
                    Lyhyt = MiniJson.Teksti(d, "lyhyt"), Kuvateksti = MiniJson.Teksti(d, "kuvateksti"),
                };
                var x = Hae(kaupunki);
                if (MiniJson.Teksti(d, "kaytto") == "tavallinen") x.TavallinenKuva = kuva; else x.KaariKuva = kuva;
            }
        }

        /// <summary>Kokoelma tarinakaari (web TARINAKAARI): kohtaaminen ja aarre.</summary>
        public void LueTarinakaari(string json)
        {
            foreach (var (k, d) in Alkiot(json))
            {
                var x = Hae(k);
                x.KaariKohtaaminen = MiniJson.Teksti(d, "kohtaaminen");
                x.KaariAarre = MiniJson.Teksti(d, "aarre");
                Tunne(x, d, "tunneKohtaaminen", "kaari-tervehdys");
                Tunne(x, d, "tunneAarre", "aarre");
            }
        }

        static void Tunne(Kohtaaminen x, Dictionary<string, object> d, string kentta, string laji)
        {
            if (MiniJson.Kentta(d, kentta) is Dictionary<string, object> t && MiniJson.Teksti(t, "tunne") is string tunne)
                x.Tunteet[laji] = (tunne, MiniJson.Luku(t, "voimakkuus") ?? 0.5);
        }

        /// <summary>Web KOHTAAMISEN_OLETUSTUNTEET.</summary>
        public static readonly IReadOnlyDictionary<string, (string Tunne, double Voimakkuus)> OletusTunteet =
            new Dictionary<string, (string, double)>
            {
                ["tervehdys"] = ("lammin", 0.5), ["loyto"] = ("ilo", 0.7), ["tyhja"] = ("miettiva", 0.45),
                ["vaarin"] = ("hammentynyt", 0.4), ["aarre"] = ("ilo", 0.7),
            };

        /// <summary>
        /// Web kohtaamisenTunnetagi(laji, {kohtaaminen, kaariTarina}): sisällön tagi tai
        /// oletus. laji: tervehdys, loyto, tyhja, vaarin, aarre; kaari = tarinakaaren kohtaaminen.
        /// </summary>
        public (string Tunne, double Voimakkuus)? Tunne(string kaupunki, string laji, bool kaari)
        {
            var x = Kaupunki(kaupunki);
            string avain = laji == "tervehdys" && kaari ? "kaari-tervehdys" : laji;
            if (x != null && x.Tunteet.TryGetValue(avain, out var t)) return t;
            return OletusTunteet.TryGetValue(laji, out var o) ? o : ((string, double)?)null;
        }

        public Kohtaaminen Kaupunki(string k) => k != null && Kaupungit.TryGetValue(k, out var x) ? x : null;
    }

    /// <summary>AvoinKysymys → KysymysNaytto (PeliOhjain kutsuu jokaisen teon jälkeen).</summary>
    public static class KysymysApu
    {
        /// <summary>Web visa.js UUSI_YRITYS_OHJE (kohtaamisen ensimmäinen väärä vastaus).</summary>
        /// <summary>Web VIIMEISEN_YRITYKSEN_VAROITUS ja _NAPPI.</summary>
        public const string ViimeisenYrityksenVaroitus = "Tämä on viimeinen mahdollisuutesi. "
            + "Jos vastaus menee nyt väärin, aarre jää ikuisiksi ajoiksi piiloon.";
        public const string ViimeisenYrityksenNappi = "Yritä viimeistä kertaa";
        public const string VuoroVaihtuuRivi = "Vuoro vaihtuu — seuraavalla vuorolla saat uuden kysymyksen.";

        public const string UusiYritysOhje = "Yksi yritys on vielä jäljellä: voit tavata hänet "
            + "uudelleen. Jos toinenkin vastaus menee väärin, aarre jää ikuisiksi ajoiksi piiloon.";

        /// <summary>
        /// Kohtaamisen tekstit näkymään (web visa.js renderQuiz): tervehdys ennen
        /// vastausta (kaaren kohtaaminen aina, kaupungin tervehdys vain kerran —
        /// tervehdysNahty kertoo, onko se jo nähty), repliikki vastauksen jälkeen,
        /// kaaren aarreteksti oikeasta vastauksesta ja uuden yrityksen ohje.
        /// Palauttaa true, jos kaupungin tavallinen tervehdys näytettiin nyt.
        /// </summary>
        public static bool LisaaKohtaaminen(KysymysNaytto d, AvoinKysymys q, Kohtaamiset kohtaamiset, bool tervehdysNahty)
        {
            if (kohtaamiset == null || q == null) return false;
            var x = kohtaamiset.Kaupunki(q.Kaupunki);
            if (x == null) return false;
            bool visa = q.Laji == KysymysMuoto.Visa;
            var kaari = q.Kaari ? x : null;
            bool tervehdysNyt = false;
            if (!q.Valittu.HasValue)
            {
                if (kaari != null) d.Tervehdys = kaari.KaariKohtaaminen;
                else if (visa && !tervehdysNahty && !string.IsNullOrEmpty(x.Tervehdys)) { d.Tervehdys = x.Tervehdys; tervehdysNyt = true; }
                var kuva = d.Tervehdys == null ? null : kaari != null ? x.KaariKuva : x.TavallinenKuva;
                if (kuva != null)
                {
                    d.MuotokuvaUrl = kuva.Url; d.MuotokuvaAlt = kuva.Alt;
                    d.MuotokuvaLyhyt = kuva.Lyhyt; d.MuotokuvaKuvateksti = kuva.Kuvateksti;
                }
                return tervehdysNyt;
            }
            bool oikein = q.OikeinVastattu == true;
            if (visa)
            {
                bool loyto = oikein && (q.Tutkimus || q.Loyto != null);
                d.Repliikki = !oikein ? x.Vaarin : loyto ? x.Loyto : x.Tyhja;
                d.Tuloslaji = !oikein ? "vaarin" : loyto ? "loyto" : "tyhja";
                d.RepliikkiLoyto = loyto && !string.IsNullOrEmpty(d.Repliikki);
            }
            if (kaari != null && oikein && !string.IsNullOrEmpty(kaari.KaariAarre)) d.KatkoKuvaUrl = kohtaamiset.KatkoKuvaUrl;
            if (kaari != null && oikein && !string.IsNullOrEmpty(kaari.KaariAarre)) d.Repliikki = kaari.KaariAarre + (d.Repliikki != null ? "\n" + d.Repliikki : "");
            if (q.Kaari && !oikein && q.AarreLukittui != true) d.Loyto = (d.Loyto != null ? d.Loyto + "\n" : "") + UusiYritysOhje;
            return false;
        }

        /// <summary>
        /// Tervehdyssivu, yritysluku ja viimeisen yrityksen varoitus (web visa.js avaus).
        /// aloitettu = pelaaja on jo painanut Aloita peli tälle kysymykselle.
        /// </summary>
        public static void LisaaVaiheet(KysymysNaytto d, Kysely kysely, AvoinKysymys q, bool aloitettu)
        {
            if (q.Kaari)
            {
                var luku = kysely.KaariYritysLuku(q.Kaupunki);
                if (luku.HasValue) { d.Yritys = luku.Value.Nyt; d.Yrityksia = luku.Value.Kaikki; }
            }
            bool viimeinen = d.Yritys.HasValue && d.Yritys >= d.Yrityksia;
            if (!q.Valittu.HasValue && !string.IsNullOrEmpty(d.Tervehdys) && !aloitettu)
            {
                d.TervehdysVaihe = true;
                d.AloitaTeksti = viimeinen ? ViimeisenYrityksenNappi : "Aloita peli";
                d.Varoitus = viimeinen ? ViimeisenYrityksenVaroitus : null;
            }
        }

        /// <summary>Commons-tiedoston osoite halutulla leveydellä (web commonsUrl; PNG-pienennös myös SVG:stä).</summary>
        public static string CommonsUrl(string tiedosto, int leveys) =>
            "https://commons.wikimedia.org/wiki/Special:FilePath/" + Koodaa(tiedosto) + "?width=" + leveys;

        /// <summary>Web encodeURIComponent (UTF-8, varatut merkit A–Z a–z 0–9 - _ . ! ~ * ' ( )).</summary>
        public static string Koodaa(string s)
        {
            var sb = new System.Text.StringBuilder();
            foreach (var b in System.Text.Encoding.UTF8.GetBytes(s))
            {
                char c = (char)b;
                if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || "-_.!~*'()".IndexOf(c) >= 0) sb.Append(c);
                else sb.Append('%').Append(b.ToString("X2"));
            }
            return sb.ToString();
        }

        public static KysymysLaji Laji(KysymysMuoto m) => (KysymysLaji)(int)m;

        /// <summary>Web TOKEN_TYPES[type].name (yleisnimet; maakohtaiset paikallisaarteet myöhemmin).</summary>
        public static string LaatanNimi(string tyyppi)
        {
            switch (tyyppi)
            {
                case Laattatyypit.Paaaarre: return "Unohdettu aarre";
                case Laattatyypit.MannerAarre: return "Mantereen aarre";
                case Laattatyypit.IsoAarre: return "Kätketty matka-arkku";
                case Laattatyypit.PieniAarre: return "Kourallinen hopeakolikoita";
                case Laattatyypit.Ryostaja: return "Ryöstäjä";
                default: return null;
            }
        }

        /// <summary>Laatan kääntö yhdellä rivillä; null, jos laattaa ei käännetty.</summary>
        public static string LoytoTeksti(Loyto l, string valuutta = "£", Aarrenimet nimet = null)
        {
            if (l == null) return null;
            if (l.Pollo) return "Laatan alta lehahti pöllö!";
            if (l.Kaksintaistelu) return "Laatan alla odotti ryöstäjä!";
            var nimi = (l.Tyyppi != Laattatyypit.Tyhja ? nimet?.Hae(l.Tyyppi, l.Manner, l.Maa)?.Nimi : null) ?? LaatanNimi(l.Tyyppi);
            if (nimi == null) return "Laatta oli tyhjä.";
            var osat = new List<string> { "Löysit: " + nimi };
            if (l.RahaLisays != 0) osat.Add($"+{l.RahaLisays} {valuutta}");
            if (l.TahtiLisays != 0) osat.Add("+" + l.TahtiLisays + " ◈");
            return string.Join(" · ", osat);
        }

        static string Iso(string s) => string.IsNullOrEmpty(s) ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);

        /// <summary>
        /// Rakentaa näytettävän tilan. osoitteet = kuva- tai lipputiedoston nimi →
        /// valmis https-osoite (kokoelmat kuvakysymykset ja lippumaat); puuttuva
        /// nimi → Commons Special:FilePath. loyto = tämän kysymyksen aikana käännetty
        /// laatta (Matka.Loysi) tai null; lisat = muut palkkiorivit (Kysely.Tapahtui);
        /// viesti = epäonnistuneen teon virhe.
        /// </summary>
        public static KysymysNaytto Nakyma(Kysely kysely, AvoinKysymys q, Loyto loyto = null,
            IEnumerable<string> lisat = null, string viesti = null, IReadOnlyDictionary<string, string> osoitteet = null,
            Aarrenimet nimet = null)
        {
            var m = kysely.Matka;
            var p = m.Tila.Pelaaja;
            string kaupunki = q.Kaupunki != null && m.Verkko.Kaupungit.TryGetValue(q.Kaupunki, out var k) ? k.Nimi : q.Kaupunki;
            string laji = q.Laji == KysymysMuoto.Pulma ? "pulma"
                : q.Kaari ? "kohtaaminen"
                : q.Tutkimus ? "kaupungin tutkiminen"
                : q.Vaikea ? "vaikea aarrekysymys"
                : "aarrekysymys";
            bool vastattu = q.Valittu.HasValue;
            var d = new KysymysNaytto
            {
                Laji = Laji(q.Laji),
                Otsikko = string.IsNullOrEmpty(kaupunki) ? Iso(laji) : kaupunki + " · " + laji,
                Kehys = Iso(q.Kehys),
                Kysymys = q.Kysymys,
                Paikka = q.Laji == KysymysMuoto.Vaite ? q.Paikka : null,
                Vaihtoehdot = new List<string>(q.Vaihtoehdot),
                Piilotetut = new List<int>(q.Piilotetut),
                Vihje = q.VihjeNaytetty ? q.Vihje : null,
                VihjeTarjolla = !vastattu && !q.VihjeNaytetty && !string.IsNullOrEmpty(q.Vihje),
                VihjeHinta = KysymysVakiot.VihjeHinta,
                PuolitusTarjolla = !vastattu && q.Piilotetut.Count == 0 && q.Vaihtoehdot.Count >= 4,
                PuolitusHinta = KysymysVakiot.PuolitusHinta,
                Raha = p.Raha,
                Sekunnit = q.Sekunnit.HasValue ? KysymysVakiot.Sekunnit : (int?)null,
                Vastattu = vastattu,
                Valittu = q.Valittu ?? -1,
                Oikea = q.Oikea,
                Oikein = q.OikeinVastattu == true,
                AikaLoppui = q.AikaLoppui,
                Viesti = viesti,
            };
            string Osoite(string tiedosto, int leveys) =>
                tiedosto.StartsWith("http", StringComparison.Ordinal) ? tiedosto
                : osoitteet != null && osoitteet.TryGetValue(tiedosto, out var u) && !string.IsNullOrEmpty(u) ? u
                : CommonsUrl(tiedosto, leveys);
            if (q.Laji == KysymysMuoto.Kuva && !string.IsNullOrEmpty(q.KuvaTiedosto)) d.KuvaUrl = Osoite(q.KuvaTiedosto, 640);
            else if (q.Laji == KysymysMuoto.Lippu && !string.IsNullOrEmpty(q.LippuTiedosto)) d.KuvaUrl = Osoite(q.LippuTiedosto, 320);
            // Kuvan tekijä kerrotaan faktassa vastauksen jälkeen (web: vastaus paljastaisi paikan).
            if (d.KuvaUrl != null) d.KuvaLahde = q.Laji == KysymysMuoto.Lippu ? "Lippu: Wikimedia Commons" : null;
            if (q.Laji == KysymysMuoto.Pulma && q.PulmaTiedot != null)
            {
                var t = q.PulmaTiedot;
                if (!string.IsNullOrEmpty(t.Otsikko)) d.Otsikko = string.IsNullOrEmpty(kaupunki) ? t.Otsikko : kaupunki + " · " + t.Otsikko;
                d.Kehys = Iso(t.Selite) ?? d.Kehys;
                d.PulmaId = q.PulmaId;
                d.Luonnos = t.Luonnos;
                if (t.Kuvat != null)
                {
                    d.VaihtoehtoKuvat = t.Kuvat.Select(x => string.IsNullOrEmpty(x?.Tiedosto) ? null : CommonsUrl(x.Tiedosto, 480)).ToList();
                    d.KuvaLahde = t.KuvaLahteet;
                }
            }

            if (vastattu)
            {
                d.Fakta = q.Fakta;
                d.Lahteet = new List<string>(q.Lahteet ?? new List<string>());
                var rivit = new List<string>();
                var lt = LoytoTeksti(loyto, "£", nimet);
                var aarre = loyto != null && !loyto.Pollo && !loyto.Kaksintaistelu ? nimet?.Hae(loyto.Tyyppi, loyto.Manner, loyto.Maa) : null;
                if (aarre != null) { d.LoytoNimi = aarre.Nimi; d.LoytoFakta = aarre.Fakta; d.LoytoKuvaUrl = aarre.KuvaUrl; }
                if (lt != null) rivit.Add(lt);
                if (lisat != null) rivit.AddRange(lisat.Where(s => !string.IsNullOrEmpty(s)));
                if (q.AarreLukittui == true) rivit.Add("Kätkö sulkeutui — tämän kaupungin aarre on menetetty.");
                d.Loyto = rivit.Count > 0 ? string.Join("\n", rivit) : null;
                d.JatkaTeksti = loyto != null && loyto.Kaksintaistelu ? "Kohtaa ryöstäjä" : "Jatka matkaa";
                d.LoytoTyyppi = loyto?.WebTulos;
                d.VuoroVaihtuu = q.OikeinVastattu != true && q.Laji != KysymysMuoto.Pulma;
            }
            return d;
        }
        /// <summary>Rosvon kaksintaistelu näkymäksi (web visa.js renderDuel): 8 vaihtoehtoa, helpotus, 45 s.</summary>
        public static KysymysNaytto Kaksintaistelu(Kaksintaistelu rosvo, string valuutta = "£")
        {
            var d = rosvo.Avoin;
            var p = rosvo.Matka.Tila.Pelaaja;
            bool vastattu = d.Valittu.HasValue;
            int hinta = rosvo.HelpotuksenHinta;
            var n = new KysymysNaytto
            {
                Laji = KysymysLaji.Kaksintaistelu,
                Otsikko = "Rosvon kaksintaistelu — " + p.Nimi,
                Kehys = "Ryöstäjä tukkii tien. Väärä vastaus vie kaikki rahasi.",
                Kysymys = d.Kysymys,
                Vaihtoehdot = new List<string>(d.Vaihtoehdot),
                Piilotetut = new List<int>(d.Piilotetut),
                PuolitusTarjolla = !vastattu,
                PuolitusHarmaa = d.Helpotukset >= KaksintaisteluVakiot.Helpotukset || hinta <= 0,
                PuolitusHinta = 0,
                PuolitusTeksti = d.Helpotukset >= KaksintaisteluVakiot.Helpotukset ? "Helpotukset käytetty" : $"Helpotus (rosvo vie {hinta} {valuutta})",
                Huomautus = d.Helpotukset > 0 ? $"Rosvo on vienyt {d.Viety} puntaa." : null,
                Raha = p.Raha,
                Valuutta = valuutta,
                Sekunnit = KaksintaisteluVakiot.Sekunnit,
                Vastattu = vastattu,
                Valittu = d.Valittu ?? -1,
                Oikea = d.Oikea,
                Oikein = d.OikeinVastattu == true,
                AikaLoppui = d.AikaLoppui,
                JatkaTeksti = "Jatka matkaa",
            };
            if (vastattu)
            {
                n.Fakta = d.Fakta;
                n.Lahteet = new List<string>(d.Lahteet ?? new List<string>());
                n.Loyto = d.OikeinVastattu == true
                    ? (d.Saalis.HasValue ? $"Voitit rosvon — saalis {d.Saalis.Value} puntaa!" : "Voitit rosvon — loput rahat säilyvät.")
                    : (d.AikaLoppui ? "Aika loppui. " : "") + $"Rosvo vei rahat — oikea vastaus oli \"{d.Vaihtoehdot[d.Oikea]}\".";
            }
            return n;
        }

        /// <summary>Tapahtumakortti näkymäksi: teksti ja Jatka (ei vaihtoehtoja, ei aikarajaa).</summary>
        public static KysymysNaytto Tapahtumakortti(Matka m, Tapahtumakortti kortti)
        {
            string kaupunki = kortti.Kaupunki != null && m.Verkko.Kaupungit.TryGetValue(kortti.Kaupunki, out var k) ? k.Nimi : kortti.Kaupunki;
            string vaikutus = null;
            if (kortti.Vaikutus?.Laji == TapahtumaVaikutus.Raha && kortti.Vaikutus.Maara.HasValue)
                vaikutus = kortti.Vaikutus.Maara.Value >= 0 ? $"+{kortti.Vaikutus.Maara.Value} puntaa" : $"{kortti.Vaikutus.Maara.Value} puntaa";
            else if (kortti.Vaikutus?.Laji == TapahtumaVaikutus.Kyyti) vaikutus = "Kyyti naapurikaupunkiin";
            else if (kortti.Vaikutus?.Laji == TapahtumaVaikutus.Viive) vaikutus = "Menetät vuoron";
            return new KysymysNaytto
            {
                Laji = KysymysLaji.Tapahtumakortti,
                Otsikko = string.IsNullOrEmpty(kaupunki) ? "Tapahtuma" : kaupunki + " · tapahtuma",
                Kysymys = kortti.Teksti,
                Raha = m.Tila.Pelaaja.Raha,
                Vastattu = true,
                Oikein = true,
                Loyto = vaikutus,
                JatkaTeksti = "Jatka",
            };
        }

        static string J(string s)
        {
            if (s == null) return "null";
            var sb = new System.Text.StringBuilder("\"");
            foreach (var c in s)
            {
                if (c == '"' || c == '\\') sb.Append('\\').Append(c);
                else if (c < ' ') sb.Append("\\u").Append(((int)c).ToString("x4"));
                else sb.Append(c);
            }
            return sb.Append('"').ToString();
        }

        /// <summary>Näkymätila JSONina testikomentojen tilaraporttiin (peli-tila.json); null → "null".</summary>
        public static string Json(KysymysNaytto d, float jaljella)
        {
            if (d == null) return "null";
            string I(int x) => x.ToString(System.Globalization.CultureInfo.InvariantCulture);
            string B(bool b) => b ? "true" : "false";
            return "{\"laji\":" + J(d.Laji.ToString()) + ",\"otsikko\":" + J(d.Otsikko) + ",\"kysymys\":" + J(d.Kysymys)
                + ",\"vaihtoehdot\":[" + string.Join(",", d.Vaihtoehdot.Select(J)) + "]"
                + ",\"piilotetut\":[" + string.Join(",", d.Piilotetut.Select(I)) + "]"
                + ",\"kuva\":" + J(d.KuvaUrl) + ",\"vihje\":" + J(d.Vihje)
                + ",\"vihjeTarjolla\":" + B(d.VihjeTarjolla) + ",\"puolitusTarjolla\":" + B(d.PuolitusTarjolla)
                + ",\"sekunnit\":" + (d.Sekunnit.HasValue ? I(d.Sekunnit.Value) : "null")
                + ",\"jaljella\":" + I((int)Math.Ceiling(Math.Max(0, jaljella)))
                + ",\"vastattu\":" + B(d.Vastattu) + ",\"valittu\":" + I(d.Valittu) + ",\"oikea\":" + (d.Vastattu ? I(d.Oikea) : "null")
                + ",\"oikein\":" + B(d.Oikein) + ",\"aikaLoppui\":" + B(d.AikaLoppui)
                + ",\"loyto\":" + J(d.Loyto) + ",\"loytoTyyppi\":" + J(d.LoytoTyyppi) + ",\"viesti\":" + J(d.Viesti)
                + ",\"tervehdysVaihe\":" + B(d.TervehdysVaihe) + ",\"tulosVaihe\":" + I(d.TulosVaihe)
                + ",\"yritys\":" + (d.Yritys.HasValue ? I(d.Yritys.Value) : "null") + ",\"muotokuva\":" + J(d.MuotokuvaUrl) + "}";
        }
    }
}
