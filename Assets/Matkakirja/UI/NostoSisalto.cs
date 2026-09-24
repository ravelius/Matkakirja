// NOSTOKORTTIEN SISÄLTÖ (Natiivi-UI): karttavalon id → kortin data sisältöpaketista.
//
//   "skandaali:<id>"   kokoelma skandaalit       (otsikko, paikka, vuosi, kortti, teksti, kuvat|kuva, visa)
//   "hetki:<id>"       kokoelma historianHetket  (otsikko, paikka, paivays, teksti, kuvat[tiedosto], visa)
//   "elaintaky:<ISO>"  kokoelma elaintayt        (elain, otsikko, teksti, kuva | kuvat[url])
//   "kohde:<id>[~n]"   moduulit fokuskohteet-/maastokohteet-/hahmotelma-<iso> (maa karttavaloista;
//                      testeissä "kohde:<id>@ISO"); kentästä ihme "Koe ihme" / kadonneen ihmeen kuva
//                      ensimmäiseksi, ja "Livian leikekirja", jos pelaajan kaupungin täkypooli nimeää
//                      kohteen (web nostoKohteelle). Napakohteet (lahde napakohde, web napanostonRivi →
//                      avaaFokuskohde): sama kohdekortti moduulista maastokohteet-ata/-ark; arktisen
//                      valon maa on tyhjä, joten maa luetaan tunnuksen etuliitteestä ("ark-…" → ARK).
//   "nosto:<id>"       karttavalon täkynosto ja maalehtinosto (skeema 1.24, lahde takynosto |
//                      maalehtinosto): kokoelma takynostot (web NOSTO_MAAT); web avaaNosto →
//                      avaaNostonKortti, eli maalehtinostokin avaa noston kortin eikä maalehteä.
//   "takynosto:<id>[@kaupunki]"  sama; kokoelma takynostot ensin, vara fokusvirrat → virta.takynostot
//                      (kaupungin oma pooli, esim. Sevilla ja Edinburgh; myös webin merkkitunnus "nosto-<id>")
//   "syvennys:<kaupunki>-<täky>" kokoelma fokusvirrat → virta.takyt + moduuli syvennyspaikat
//                      (web js/syvennys.js; myös "syvennys:<kaupunki>:<täky>" ja "syvennys-<kaupunki>-<täky>")
// Täkypooli (web nostoKaupunginPooli): kaupungin oma virta.takynostot voittaa, muuten maan NOSTO_MAAT;
// kokoelman takynostot kenttä kaupungit kertoo valmiiksi, minkä kaupunkien pooliin nosto kuuluu (Pooli).
// Täkynoston "Katso X kartalla" lukee kohteen nimen ja paikan karttavaloista (kohde:<id>).
// Lisäkaupunki (web js/kaupunkinosto.js latoLisakaupunginKortti, PAATOKSET 16): aiheen "kaupungit"
// kohdevalo, jonka kohde on moduulissa nakyvat-kaupungit-<iso> lipulla kaupunkikortti →
// HaeLisakaupunki (herokuva, esittely ja yksi kaupunkiin ankkuroitu nosto).
// Kuvan osoite: suora https-osoite sellaisenaan; paketin omat tiedostot (hetkikuvat,
// assets/elaimet/…) media.json:n viitteistä; muut Commons-nimet Kuvat.Hae-reitillä.
// Kokoelmat ja moduulit haetaan kerran ja pidetään muistissa (media.json jäsennetään
// taustasäikeessä, siitä pidetään vain muut kuin Commons-viitteet).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public enum NostoLaji { Kohde, Skandaali, Hetki, Elain, Takynosto, Syvennys }

    public sealed class NostoKuva
    {
        /// <summary>https-osoite tai tiedosto-/Commons-nimi (NostoSisalto.HaeKuva ratkaisee).</summary>
        public string Lahde;
        public string Lyhyt, Selite, Tekija;
        /// <summary>Lähderivi: lähde · lisenssi.</summary>
        public string LahdeRivi;
        /// <summary>Matkakirjan ihmeen kulmanauha (web KOHDE_IHMENAUHA "Unohdettu aarre"), muuten null.</summary>
        public string Nauha;
        /// <summary>Suurennoksen reaktiorivin tunniste ja otsikko (web kuva.reaktio "ihme:&lt;nimi&gt;"), muuten null.</summary>
        public string Reaktio, ReaktioOtsikko;
        /// <summary>Lyhyt on eläintäyn vakioselite (web vakioselite): karusellissa ja suurennoksessa, ei vaiheen 1 kuvassa.</summary>
        public bool LyhytVara;
    }

    public sealed class NostoVisa
    {
        public string Kysymys, Fakta;
        /// <summary>Datan oma otsake ja vihjerivi (web visa.otsake, visa.vihje), muuten null.</summary>
        public string Otsake, Vihje;
        public List<string> Vaihtoehdot = new List<string>();
        public int Oikea;
    }

    public sealed class Nosto
    {
        public NostoLaji Laji;
        public string Id, Iso;
        public string Luokka;           // ylärivin luokka versaalina ("SKANDAALIT")
        public string Otsikko, Meta, Ingressi, Teksti;
        public List<NostoKuva> Kuvat = new List<NostoKuva>();
        public NostoVisa Visa;
        public List<string> Kysymykset = new List<string>();
        /// <summary>Kohteen korostukset "perus|näkyvä" (web fokuskohteet korostukset): sana → "Kysy pululta lisää".</summary>
        public List<string> Korostukset = new List<string>();
        public List<(string Nappi, string Url)> Kierrokset = new List<(string, string)>();
        /// <summary>Minitehtävän avain (Kaupat.Minitehtava(kaupunki, aihe)) ja palkkio.</summary>
        public string VisaKaupunki, VisaAihe;
        public int VisaPalkkio;
        /// <summary>Kukkaroleiman alarivi (web toast sub), null = pelin oletus.</summary>
        public string VisaRahaSyy;
        /// <summary>Oikea vastaus kasvattaa nostotehtävälaskuria (web kirjaaNostotehtava).</summary>
        public bool VisaNostotehtava;
        /// <summary>Oikea vastaus myöntää tämän kaupungin julisteen (web syvennys kaupunginJuliste).</summary>
        public string VisaJuliste;

        /// <summary>Lööppitaitto: nimiö LISÄLEHTI ja päiväysrivi (skandaali aina, täkynosto taitto 'lehti').</summary>
        public bool Looppi;
        /// <summary>Täkynoston ja syvennyksen kaupunki (fokusvirta).</summary>
        public string Kaupunki;
        /// <summary>Täkynosto: "näin se löytyi" -kuva tekstin alle ja isoisän karttaliite.</summary>
        public NostoKuva Valokuva, Karttaliite;
        /// <summary>Täkynosto: äänet (web lisaaNostonNapit) — aani, musiikkiNayte ja Apple Music -linkit.</summary>
        public string Aani, MusiikkiNayte, MusiikkiNayteNimi;
        public List<(string Nimi, string Url)> Musiikkilinkit = new List<(string, string)>();
        /// <summary>Täkynosto: kartan kohde (web nosto.kohde) nimineen ja paikkoineen; null = ei nappia.</summary>
        public string KohdeId, KohdeNimi, KohdeIso;
        public double KohdeLat, KohdeLon;
        /// <summary>Kohde: säilyneen ihmeen kuva "Koe ihme" -napin takana (kadonneen kuva on Kuvat[0]).</summary>
        public NostoKuva Ihme;
        public string IhmeNappi;
        /// <summary>Kohde: kohteen nimeävä täkynosto (web piirraKohteenNosto) — otsikko ja valo-id.</summary>
        public string LeikekirjaOtsikko, LeikekirjaValo;
    }

    /// <summary>Lisäkaupungin kortti (web kohde.kaupunkikortti): kuva, esittely, yksi nosto.</summary>
    public sealed class Lisakaupunki
    {
        public string Id, Iso, Nimi, Esittely, NostoOtsikko, NostoTeksti;
        /// <summary>Herokuva (null = paikkamerkki, web kaupunkipopup-heropaikka).</summary>
        public NostoKuva Hero;
    }

    public static class NostoSisalto
    {
        static readonly Dictionary<string, Dictionary<string, Dictionary<string, object>>> kokoelmat =
            new Dictionary<string, Dictionary<string, Dictionary<string, object>>>();
        static readonly Dictionary<string, object> moduulit = new Dictionary<string, object>();
        /// <summary>Karttavalo (kokoelma karttavalot): kohdekortin maa, lisäkaupungin aihe, täkynoston
        /// "Katso X kartalla" ja napakohteen laji.</summary>
        sealed class Valo
        {
            public string Maa, Aihe, Nimi, Lahde;
            public double Lat, Lon;
        }

        /// <summary>Karttavalot id:n mukaan.</summary>
        static Dictionary<string, Valo> valot;
        static Dictionary<string, string> media;
        static bool mediaHaussa;
        static readonly List<Action> mediaOdottajat = new List<Action>();

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static string T(Dictionary<string, object> o, string k) => MiniJson.Teksti(o, k);

        // --- haku --------------------------------------------------------------------------

        /// <summary>Hakee kortin datan valon id:llä (null = ei löytynyt tai paketissa ei ole).</summary>
        public static IEnumerator Hae(string valoId, Action<Nosto> valmis)
        {
            Nosto n = null;
            valoId = Normalisoi(valoId);
            int i = valoId?.IndexOf(':') ?? -1;
            string laji = i > 0 ? valoId.Substring(0, i) : "", tunnus = i > 0 ? valoId.Substring(i + 1) : "";
            switch (laji)
            {
                case "skandaali":
                {
                    Dictionary<string, object> d = null; string iso = null;
                    yield return Alkio("skandaalit", tunnus, (x, m) => { d = x; iso = m; });
                    if (d != null) n = Skandaali(tunnus, iso, d);
                    break;
                }
                case "hetki":
                {
                    Dictionary<string, object> d = null; string iso = null;
                    yield return Alkio("historianHetket", tunnus, (x, m) => { d = x; iso = m; });
                    if (d != null) n = Hetki(tunnus, iso ?? T(d, "iso"), d);
                    break;
                }
                case "elaintaky":
                {
                    Dictionary<string, object> d = null;
                    yield return Alkio("elaintayt", tunnus, (x, _) => d = x);
                    if (d != null) n = Elain(tunnus, d);
                    break;
                }
                case "kohde":
                {
                    string iso = null;
                    int at = tunnus.IndexOf('@');
                    if (at > 0) { iso = tunnus.Substring(at + 1); tunnus = tunnus.Substring(0, at); }
                    if (iso == null)
                    {
                        yield return ValojenMaat();
                        valot.TryGetValue("kohde:" + tunnus, out var valo);
                        iso = valo?.Maa;
                        // Arktiksen napakohteella ei ole maata (kokoelma maat): moduuli maastokohteet-ark
                        // tunnuksen etuliitteestä ("ark-pohjoisnapa").
                        if (iso == null && (valo == null || valo.Lahde == "napakohde") && tunnus.Length > 4 && tunnus[3] == '-')
                            iso = tunnus.Substring(0, 3);
                    }
                    int tilde = tunnus.IndexOf('~');
                    if (tilde > 0) tunnus = tunnus.Substring(0, tilde);
                    if (string.IsNullOrEmpty(iso)) break;
                    Dictionary<string, object> d = null;
                    foreach (var (tiedosto, vienti) in new[] { ("fokuskohteet", "FOKUSKOHTEET"), ("maastokohteet", "MAASTOKOHTEET"), ("hahmotelma", "HAHMOTELMA") })
                    {
                        List<object> lista = null;
                        yield return Moduuli($"moduulit/js/packs/{tiedosto}-{iso.ToLowerInvariant()}.json", $"{vienti}_{iso.ToUpperInvariant()}", l => lista = l);
                        d = lista?.Select(Ob).FirstOrDefault(x => x != null && T(x, "id") == tunnus);
                        if (d != null) break;
                    }
                    if (d != null) n = Kohde(tunnus, iso.ToUpperInvariant(), d);
                    if (n != null) yield return Leikekirja(n);
                    break;
                }
                case "takynosto":
                {
                    string kaupunki = null;
                    int at = tunnus.IndexOf('@');
                    if (at > 0) { kaupunki = tunnus.Substring(at + 1).ToLowerInvariant(); tunnus = tunnus.Substring(0, at); }
                    yield return Odota(Fokusvirrat.Lataa);
                    yield return Odota(UiSisalto.Lataa);
                    // Skeema 1.24: kokoelma takynostot (web NOSTO_MAAT, myös maalehtinostot) ensin.
                    Dictionary<string, object> d = null;
                    string iso = null;
                    yield return Alkio("takynostot", tunnus, (x, m) => { d = x; iso = m; });
                    if (d != null)
                    {
                        var kaupungit = Kaupungit(d);
                        if (kaupunki == null || !kaupungit.Contains(kaupunki))
                            kaupunki = kaupungit.Contains(PeliOhjain.Instanssi?.PelaajanKaupunki ?? "")
                                ? PeliOhjain.Instanssi.PelaajanKaupunki : kaupungit.FirstOrDefault() ?? kaupunki;
                    }
                    else
                    {
                        // Vara: kaupungin oma pooli fokusvirrasta (vanha paketti; Sevilla, Edinburgh).
                        foreach (var v in Fokusvirrat.Kaikki)
                        {
                            if (kaupunki != null && v.Kaupunki != kaupunki) continue;
                            d = v.Takynostot?.Select(Ob).FirstOrDefault(x => x != null && T(x, "id") == tunnus);
                            if (d != null) { kaupunki = v.Kaupunki; break; }
                        }
                        if (d == null) break;
                        iso = UiSisalto.Kaupunki(kaupunki)?.Maa;
                    }
                    Dictionary<string, object> luokat = null;
                    yield return ModuuliArvo("moduulit/js/fokusnosto-symbolit.json", "NOSTOSYM_LUOKAT", x => luokat = Ob(x));
                    n = Takynosto(tunnus, kaupunki, iso ?? UiSisalto.Kaupunki(kaupunki)?.Maa, d, luokat);
                    if (n.KohdeId != null)
                    {
                        yield return ValojenMaat();
                        if (valot.TryGetValue("kohde:" + n.KohdeId, out var valo))
                        {
                            n.KohdeNimi = valo.Nimi;
                            n.KohdeIso = valo.Maa ?? n.Iso;
                            n.KohdeLat = valo.Lat;
                            n.KohdeLon = valo.Lon;
                        }
                        // Web nostonKarttakohde: nappi vain, jos kohteeseen oikeasti pääsee.
                        if (n.KohdeNimi == null || double.IsNaN(n.KohdeLat)) n.KohdeId = null;
                    }
                    break;
                }
                case "syvennys":
                {
                    // "<kaupunki>-<täky>" tai "<kaupunki>:<täky>": kaupunkitunnuksissa ei ole viivaa.
                    int e = tunnus.IndexOfAny(new[] { '-', ':' });
                    if (e <= 0) break;
                    string kaupunki = tunnus.Substring(0, e).ToLowerInvariant(), taky = tunnus.Substring(e + 1);
                    yield return Odota(Fokusvirrat.Lataa);
                    yield return Odota(UiSisalto.Lataa);
                    var d = Fokusvirrat.Hae(kaupunki)?.Takyt?.Select(Ob).FirstOrDefault(x => x != null && T(x, "id") == taky);
                    if (d == null) break;
                    Dictionary<string, object> paikat = null, luokat = null;
                    yield return ModuuliArvo("moduulit/js/packs/syvennyspaikat.json", "SYVENNYSPAIKAT", x => paikat = Ob(x));
                    yield return ModuuliArvo("moduulit/js/fokusnosto-symbolit.json", "NOSTOSYM_LUOKAT", x => luokat = Ob(x));
                    var tiedot = Ob(MiniJson.Kentta(Ob(MiniJson.Kentta(paikat, kaupunki)), taky));
                    n = Syvennys(taky, kaupunki, UiSisalto.Kaupunki(kaupunki)?.Maa, d, T(tiedot, "symboli"), luokat);
                    break;
                }
            }
            valmis(n);
        }

        /// <summary>
        /// Webin merkkitunnukset ("nosto-<id>", "syvennys-<kaupunki>-<täky>") ja karttavalon "nosto:<id>"
        /// natiivin valo-id:iksi (takynosto:, syvennys:).
        /// </summary>
        static string Normalisoi(string valoId)
        {
            if (string.IsNullOrEmpty(valoId)) return valoId;
            if (valoId.StartsWith("nosto-")) return "takynosto:" + valoId.Substring(6);
            // Skeema 1.24: karttavalon täkynosto ja maalehtinosto ("nosto:sofia-korut", "nosto:maalehti-peilisali").
            if (valoId.StartsWith("nosto:")) return "takynosto:" + valoId.Substring(6);
            if (valoId.StartsWith("syvennys-")) return "syvennys:" + valoId.Substring(9);
            return valoId;
        }

        /// <summary>Odottaa takaisinkutsulla latautuvan aineiston (UiSisalto.Lataa, Fokusvirrat.Lataa).</summary>
        static IEnumerator Odota(Action<Action> lataa)
        {
            bool valmis = false;
            lataa(() => valmis = true);
            while (!valmis) yield return null;
        }

        /// <summary>
        /// Web piirraKohteenNosto + nostoKohteelle: täkynosto, jonka kohde on tämä kohde, avautuu kohdekortin
        /// "Livian leikekirja" -napista. Pooli on pelaajan kaupungin täkypooli (web nostoPooli: reitillä
        /// tyhjä); kokoelman takynostot kenttä kaupungit kertoo jäsenyyden (Kreikka: Delfoin Kastrin kylä,
        /// Olympoksen huippu ja Antikytheran kone Ateenassa ja Kreetalla). Ilman peliä (testikomento)
        /// kelpaa kohteen maan nosto. Vara vanhalle paketille: fokusvirtojen takynostot maan mukaan.
        /// </summary>
        static IEnumerator Leikekirja(Nosto n)
        {
            var ohjain = PeliOhjain.Instanssi;
            bool peli = ohjain?.Matka != null;
            string oma = peli ? ohjain.PelaajanKaupunki : null;
            if (peli && oma == null) yield break;
            yield return Odota(Fokusvirrat.Lataa);
            yield return Odota(UiSisalto.Lataa);
            // Kaupungin oma pooli voittaa (web nostoKaupunginPooli): sen nostot ovat fokusvirrassa.
            var omaVirta = oma != null ? Fokusvirrat.Hae(oma)?.Takynostot : null;
            if (omaVirta == null || omaVirta.Count == 0)
            {
                yield return LataaKokoelma("takynostot");
                if (kokoelmat.TryGetValue("takynostot", out var taulu) && taulu.Count > 0)
                {
                    foreach (var d in taulu.Values)
                    {
                        if (T(d, "kohde") != n.Id || T(d, "otsikko") == null) continue;
                        var kaupungit = Kaupungit(d);
                        if (oma != null ? !kaupungit.Contains(oma) : T(d, "$maa") != n.Iso) continue;
                        n.LeikekirjaOtsikko = T(d, "otsikko");
                        n.LeikekirjaValo = "takynosto:" + T(d, "id") + ((oma ?? kaupungit.FirstOrDefault()) is string k ? "@" + k : "");
                        yield break;
                    }
                    yield break;
                }
            }
            foreach (var v in Fokusvirrat.Kaikki)
            {
                if (v.Takynostot == null) continue;
                if (oma != null ? v.Kaupunki != oma : UiSisalto.Kaupunki(v.Kaupunki)?.Maa != n.Iso) continue;
                var d = v.Takynostot.Select(Ob).FirstOrDefault(x => x != null && T(x, "kohde") == n.Id && T(x, "otsikko") != null);
                if (d == null) continue;
                n.LeikekirjaOtsikko = T(d, "otsikko");
                n.LeikekirjaValo = "takynosto:" + T(d, "id") + "@" + v.Kaupunki;
                yield break;
            }
        }

        /// <summary>Täkynoston kaupungit (kokoelma takynostot: poolin jäsenyys), tyhjä ilman kenttää.</summary>
        static List<string> Kaupungit(Dictionary<string, object> d) =>
            (MiniJson.Kentta(d, "kaupungit") as List<object>)?.OfType<string>().ToList() ?? new List<string>();

        /// <summary>
        /// Kaupungin täkypooli (web nostoKaupunginPooli): valo-id:t "takynosto:&lt;id&gt;@kaupunki". Kaupungin
        /// oma virta.takynostot voittaa, muuten kokoelman takynostot, joiden kaupungit sisältää kaupungin.
        /// </summary>
        public static IEnumerator Pooli(string kaupunki, Action<List<string>> valmis)
        {
            var tulos = new List<string>();
            yield return Odota(Fokusvirrat.Lataa);
            var omat = Fokusvirrat.Hae(kaupunki)?.Takynostot;
            if (omat != null && omat.Count > 0)
                tulos.AddRange(omat.Select(Ob).Where(x => T(x, "id") != null).Select(x => "takynosto:" + T(x, "id") + "@" + kaupunki));
            else
            {
                yield return LataaKokoelma("takynostot");
                if (kokoelmat.TryGetValue("takynostot", out var taulu))
                    foreach (var d in taulu.Values)
                        if (Kaupungit(d).Contains(kaupunki)) tulos.Add("takynosto:" + T(d, "id") + "@" + kaupunki);
            }
            valmis(tulos);
        }

        static IEnumerator Alkio(string kokoelma, string id, Action<Dictionary<string, object>, string> valmis)
        {
            yield return LataaKokoelma(kokoelma);
            kokoelmat[kokoelma].TryGetValue(id, out var d);
            valmis(d, d != null ? T(d, "$maa") : null);
        }

        /// <summary>Kokoelma kerran muistiin (id → data; maa talteen kenttään $maa).</summary>
        static IEnumerator LataaKokoelma(string kokoelma)
        {
            if (!kokoelmat.TryGetValue(kokoelma, out var taulu))
            {
                string teksti = null;
                yield return Sisalto.HaeTeksti(kokoelma, t => teksti = t, valinnainen: true);
                taulu = new Dictionary<string, Dictionary<string, object>>();
                try
                {
                    var alkiot = MiniJson.Kentta(Ob(MiniJson.Jasenna(teksti ?? "{}")), "alkiot") as List<object>;
                    foreach (var a in alkiot ?? new List<object>())
                    {
                        var o = Ob(a);
                        var aid = T(o, "id");
                        if (aid == null) continue;
                        // Maa talteen dataan (skandaalin ja hetken minitehtävän avain).
                        // Päätaso ensin; tyypitetty kuva-olio jää pois (raaka data.kuva on merkkijono, url → $kuvaUrl).
                        var data = Rakenne.Paatasolta(o, "kuva", "id");
                        if (T(o, "maa") != null && !data.ContainsKey("$maa")) data["$maa"] = T(o, "maa");
                        // Skeema 1.20+: tyypitetty kuva.url on valmis osoite (esim. elaintayt: tunnus tai
                        // assets/elaimet/… → kohtaamiset/elaimet/…); data.kuva on vain raaka arvo.
                        if (T(Ob(MiniJson.Kentta(o, "kuva")), "url") is string url && !data.ContainsKey("$kuvaUrl")) data["$kuvaUrl"] = url;
                        // Täkynosto ja kohde lukevat kuvan oliona (lyhyt, tekijä, lähde): tyypitetty kuva talteen (pariteetti
                        // b12-2 #26: Roquefortin pääkuva puuttui, ja karuselli 1/2 jäi yhteen galleriakuvaan).
                        if (MiniJson.Kentta(o, "kuva") is Dictionary<string, object> ko && !data.ContainsKey("$kuva")) data["$kuva"] = ko;
                        taulu[aid] = data;
                    }
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui nostot: " + kokoelma + ": " + e.Message); }
                kokoelmat[kokoelma] = taulu;
            }
        }

        static IEnumerator ValojenMaat()
        {
            if (valot != null) yield break;
            string teksti = null;
            yield return Sisalto.HaeTeksti("karttavalot", t => teksti = t, valinnainen: true);
            var m = new Dictionary<string, Valo>();
            try
            {
                foreach (var a in MiniJson.Kentta(Ob(MiniJson.Jasenna(teksti ?? "{}")), "alkiot") as List<object> ?? new List<object>())
                    if (Ob(a) is Dictionary<string, object> o && T(o, "id") is string id)
                        m[id] = new Valo
                        {
                            Maa = T(o, "maa"), Aihe = T(o, "aihe"), Nimi = T(o, "nimi"), Lahde = T(o, "lahde"),
                            Lat = MiniJson.Luku(o, "lat") ?? double.NaN, Lon = MiniJson.Luku(o, "lon") ?? double.NaN,
                        };
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui nostot: karttavalot: " + e.Message); }
            valot = m;
        }

        /// <summary>
        /// Lisäkaupungin kortti valon id:llä ("kohde:<id>[@ISO]"), tai null. Vain aiheen "kaupungit" valot
        /// (tai @ISO-testitunnus) katsotaan, jottei jokainen kohde hae maan lisäkaupunkimoduulia turhaan.
        /// </summary>
        public static IEnumerator HaeLisakaupunki(string valoId, Action<Lisakaupunki> valmis)
        {
            Lisakaupunki tulos = null;
            if (valoId != null && valoId.StartsWith("kohde:", StringComparison.Ordinal))
            {
                string tunnus = valoId.Substring(6), iso = null;
                int at = tunnus.IndexOf('@');
                if (at > 0) { iso = tunnus.Substring(at + 1); tunnus = tunnus.Substring(0, at); }
                bool kaupunki = iso != null;
                if (iso == null)
                {
                    yield return ValojenMaat();
                    if (valot.TryGetValue(valoId, out var valo)) { iso = valo.Maa; kaupunki = valo.Aihe == "kaupungit"; }
                }
                int tilde = tunnus.IndexOf('~');
                if (tilde > 0) tunnus = tunnus.Substring(0, tilde);
                if (kaupunki && !string.IsNullOrEmpty(iso))
                {
                    List<object> lista = null;
                    yield return Moduuli($"moduulit/js/packs/nakyvat-kaupungit-{iso.ToLowerInvariant()}.json", $"NAKYVAT_KAUPUNGIT_{iso.ToUpperInvariant()}", l => lista = l);
                    var d = lista?.Select(Ob).FirstOrDefault(x => x != null && T(x, "id") == tunnus && MiniJson.Totuus(x, "kaupunkikortti"));
                    if (d != null) tulos = LuoLisakaupunki(tunnus, iso.ToUpperInvariant(), d);
                }
            }
            valmis(tulos);
        }

        static Lisakaupunki LuoLisakaupunki(string id, string iso, Dictionary<string, object> d)
        {
            var l = new Lisakaupunki { Id = id, Iso = iso, Nimi = T(d, "nimi"), Esittely = T(d, "esittely")?.Trim() };
            // Herokuva: pelkkä osoite (vanha muoto) tai kuvaolio (osoite, lyhyt, selite, lahde).
            var hero = MiniJson.Kentta(d, "herokuva");
            if (hero is string hs && hs.Length > 0) l.Hero = new NostoKuva { Lahde = hs };
            else if (Ob(hero) is Dictionary<string, object> h && (T(h, "osoite") ?? T(h, "url")) is string osoite)
                l.Hero = new NostoKuva
                {
                    Lahde = osoite, Lyhyt = T(h, "lyhyt") ?? T(h, "selite"), Selite = T(h, "selite") ?? T(h, "lyhyt"),
                    Tekija = T(h, "tekija"), LahdeRivi = T(h, "lahde"),
                };
            // Yksi kaupunkiin ankkuroitu nosto: otsikko ja teksti (maalehtinostolla lunastus-kappaleet).
            var nosto = Ob(MiniJson.Kentta(d, "korttiNosto"));
            if (nosto != null)
            {
                string teksti = T(nosto, "teksti");
                if (teksti == null && MiniJson.Kentta(nosto, "lunastus") is object lunastus)
                    teksti = lunastus is List<object> kk
                        ? string.Join("\n\n", kk.Select(x => (x?.ToString() ?? "").Trim()).Where(x => x.Length > 0))
                        : lunastus as string;
                if (!string.IsNullOrEmpty(T(nosto, "otsikko")) && !string.IsNullOrEmpty(teksti))
                {
                    l.NostoOtsikko = T(nosto, "otsikko");
                    l.NostoTeksti = teksti;
                }
            }
            return l;
        }

        /// <summary>
        /// Maan karttakohteiden nimet (web KOHDE_MAAT[iso] → nimi) pöllön sähkehakemistoon: sillä nimellä
        /// kohdekortti otsikoidaan ja pelaaja sen muistaa. Tyhjä lista, jos maalla ei ole fokuskohteita.
        /// </summary>
        public static IEnumerator Karttakohteet(string iso, Action<List<string>> valmis)
        {
            List<object> lista = null;
            if (!string.IsNullOrEmpty(iso))
                yield return Moduuli($"moduulit/js/packs/fokuskohteet-{iso.ToLowerInvariant()}.json", $"FOKUSKOHTEET_{iso.ToUpperInvariant()}", l => lista = l);
            valmis(lista?.Select(Ob).Where(x => x != null).Select(x => T(x, "nimi")).Where(n => !string.IsNullOrEmpty(n)).ToList() ?? new List<string>());
        }

        static IEnumerator Moduuli(string polku, string vienti, Action<List<object>> valmis)
        {
            object arvo = null;
            yield return ModuuliArvo(polku, vienti, x => arvo = x);
            valmis(arvo as List<object>);
        }

        /// <summary>Moduulin vienti (taulukko tai olio) kerran muistiin; kääre {arvo} puretaan taulukolta.</summary>
        static IEnumerator ModuuliArvo(string polku, string vienti, Action<object> valmis)
        {
            string avain = polku + "#" + vienti;
            if (!moduulit.TryGetValue(avain, out var arvo))
            {
                string teksti = null;
                yield return Sisalto.HaePaketista(polku, t => teksti = t, true);
                try
                {
                    var v = Ob(MiniJson.Kentta(Ob(MiniJson.Jasenna(teksti ?? "{}")), "exportit"));
                    arvo = MiniJson.Kentta(v, vienti);
                    if (Ob(arvo) is Dictionary<string, object> kaare && MiniJson.Kentta(kaare, "arvo") is List<object> l) arvo = l;
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui nostot: " + polku + ": " + e.Message); }
                moduulit[avain] = arvo;
            }
            valmis(arvo);
        }

        // --- muunnos ----------------------------------------------------------------------

        static Nosto Skandaali(string id, string iso, Dictionary<string, object> d)
        {
            var n = new Nosto
            {
                Laji = NostoLaji.Skandaali, Id = id, Iso = iso, Luokka = "SKANDAALIT",
                Otsikko = T(d, "otsikko"), Meta = Liita(T(d, "paikka"), T(d, "vuosi")),
                Ingressi = T(d, "kortti"), Teksti = T(d, "teksti"),
                VisaKaupunki = iso, VisaAihe = "skandaali:" + id, VisaPalkkio = 50, Looppi = true,
            };
            Kuvat(n, MiniJson.Kentta(d, "kuvat") ?? MiniJson.Kentta(d, "kuva"), "osoite");
            n.Visa = Visa(d);
            return n;
        }

        static Nosto Hetki(string id, string iso, Dictionary<string, object> d)
        {
            var n = new Nosto
            {
                Laji = NostoLaji.Hetki, Id = id, Iso = iso, Luokka = "HISTORIAN HETKET",
                Otsikko = T(d, "otsikko"), Meta = Liita(T(d, "paikka"), T(d, "paivays")), Teksti = T(d, "teksti"),
                VisaKaupunki = iso, VisaAihe = "hetki:" + id, VisaPalkkio = 50,
            };
            // Hetken kuvat[].url on lähdesivu, ei kuva: kuva on aina tiedostonimi (media.json).
            Kuvat(n, MiniJson.Kentta(d, "kuvat"), "tiedosto");
            n.Visa = Visa(d);
            return n;
        }

        static Nosto Elain(string iso, Dictionary<string, object> d)
        {
            var n = new Nosto
            {
                Laji = NostoLaji.Elain, Id = iso, Iso = iso, Luokka = "ELÄIMET",
                Otsikko = T(d, "otsikko"), Teksti = T(d, "teksti"),
            };
            string elain = T(d, "elain");
            string vara = elain == null ? null : char.ToUpperInvariant(elain[0]) + elain.Substring(1)
                + (UiSisalto.Maa(iso)?.Nimi is string maa ? ", " + maa : "");
            if (MiniJson.Kentta(d, "kuvat") is List<object> kk && kk.Count > 0) Kuvat(n, kk, "url");
            else if ((T(d, "$kuvaUrl") ?? T(d, "kuva")) is string k) n.Kuvat.Add(new NostoKuva { Lahde = k });
            foreach (var x in n.Kuvat) { x.LyhytVara = x.Lyhyt == null; x.Lyhyt ??= vara; x.Selite ??= x.Lyhyt; }
            return n;
        }

        static readonly Dictionary<string, string> Tyypit = new Dictionary<string, string>
        {
            { "kaupunki", "KAUPUNGIT" }, { "historia", "HISTORIA" }, { "luonto", "LUONTO" }, { "vuori", "LUONTO · VUORI" },
            { "joki", "LUONTO · JOKI" }, { "jarvi", "LUONTO · JÄRVI" }, { "elain", "ELÄIMET" }, { "kulttuuri", "KULTTUURI" },
            { "kauppa", "KAUPPA" }, { "ihme", "IHMEET" }, { "nahtavyys", "NÄHTÄVYYDET" }, { "saari", "LUONTO · SAARI" },
        };

        static Nosto Kohde(string id, string iso, Dictionary<string, object> d)
        {
            string tyyppi = T(d, "symboli") ?? T(d, "tyyppi") ?? "";
            var n = new Nosto
            {
                Laji = NostoLaji.Kohde, Id = id, Iso = iso,
                Luokka = Tyypit.TryGetValue(tyyppi, out var l) ? l : tyyppi.ToUpperInvariant(),
                Otsikko = T(d, "nimi"), Teksti = T(d, "teksti"),
                VisaKaupunki = "nosto", VisaAihe = id, VisaPalkkio = 25,
            };
            var kuvat = new List<object>();
            if ((MiniJson.Kentta(d, "kuva") ?? MiniJson.Kentta(d, "$kuva")) is object k1) kuvat.Add(k1);
            if (MiniJson.Kentta(d, "kuvat") is List<object> kk) kuvat.AddRange(kk);
            Kuvat(n, kuvat, "osoite");
            n.Kuvat = n.Kuvat.GroupBy(x => x.Lahde).Select(g => g.First()).ToList();
            n.Visa = Visa(d);
            if (MiniJson.Kentta(d, "kysymykset") is List<object> q) n.Kysymykset = q.OfType<string>().Take(2).ToList();
            if (MiniJson.Kentta(d, "korostukset") is List<object> kor) n.Korostukset = kor.OfType<string>().ToList();
            var kierrokset = MiniJson.Kentta(d, "kierrokset") as List<object> ?? (MiniJson.Kentta(d, "kierros") is object yksi ? new List<object> { yksi } : null);
            foreach (var x in kierrokset?.Select(Ob).Where(x => x != null) ?? Enumerable.Empty<Dictionary<string, object>>())
                if (T(x, "url") is string url) n.Kierrokset.Add((T(x, "nappi") ?? "Kierros", url));
            // Matkakirjan ihme (web kohteenIhmekuva): kadonneen kuva kortin ensimmäiseksi, säilyneen
            // "Koe ihme" -napin taakse. Nauha on pelin piirtämä, ei kuvatiedoston.
            var ihme = Ob(MiniJson.Kentta(d, "ihme"));
            if (T(ihme, "osoite") is string ihmeOsoite)
            {
                var k = new NostoKuva
                {
                    Lahde = ihmeOsoite, Lyhyt = T(ihme, "lyhyt") ?? T(ihme, "selite"), Selite = T(ihme, "selite") ?? T(ihme, "lyhyt"),
                    LahdeRivi = T(ihme, "lahde"), Nauha = IhmeNauha,
                    // Ihme on oma sisältönsä: suurennos saa oman reaktiorivin (web ihmeReaktioTunniste).
                    Reaktio = string.IsNullOrEmpty(n.Otsikko) ? null : "ihme:" + n.Otsikko, ReaktioOtsikko = n.Otsikko,
                };
                if (MiniJson.Totuus(ihme, "kadonnut"))
                {
                    n.Kuvat.RemoveAll(x => x.Lahde == k.Lahde);
                    n.Kuvat.Insert(0, k);
                }
                else
                {
                    n.Ihme = k;
                    n.IhmeNappi = T(ihme, "nappi") ?? "Koe ihme";
                }
            }
            return n;
        }

        /// <summary>Ihmekuvan nauhan teksti (web KOHDE_IHMENAUHA, pelin alaotsikko).</summary>
        public const string IhmeNauha = "Unohdettu aarre";

        /// <summary>Kortin ylärivin luokka aihesymbolista (web nostosymKortinYlarivi: tuntematon → huuto).</summary>
        static string Ylarivi(string symboli, Dictionary<string, object> luokat)
        {
            string s = symboli != null && MiniJson.Kentta(luokat, symboli) != null ? symboli : "huuto";
            return (T(luokat, s) ?? "Skandaalit").ToUpperInvariant();
        }

        /// <summary>
        /// Web js/fokusnosto.js piirraNostonSisus: lunastus (kappaleiden taulukko) tekstiksi, kuva + galleria,
        /// valokuva, karttaliite, äänet, minikysymys (+25, "nosto"/id, kerran maksava) ja pulun kysymykset (3).
        /// Lööppitaitto, kun taitto = 'lehti' (nimiö, päiväys, ingressi).
        /// </summary>
        static Nosto Takynosto(string id, string kaupunki, string iso, Dictionary<string, object> d, Dictionary<string, object> luokat)
        {
            string teksti = T(d, "teksti");
            if (teksti == null && MiniJson.Kentta(d, "lunastus") is object lunastus)
                teksti = lunastus is List<object> kappaleet
                    ? string.Join("\n\n", kappaleet.Select(k => k?.ToString().Trim()).Where(k => !string.IsNullOrEmpty(k)))
                    : lunastus.ToString();
            bool looppi = T(d, "taitto") == "lehti";
            var n = new Nosto
            {
                Laji = NostoLaji.Takynosto, Id = id, Iso = iso, Kaupunki = kaupunki,
                Luokka = Ylarivi(T(d, "symboli") ?? T(d, "kategoria"), luokat),
                Otsikko = T(d, "otsikko"), Teksti = teksti, Looppi = looppi,
                Meta = looppi ? T(d, "paivays") ?? Liita(T(Ob(MiniJson.Kentta(d, "paikka")), "nimi"), T(d, "vuosi")) : null,
                Ingressi = looppi ? T(d, "ingressi") : null,
                VisaKaupunki = "nosto", VisaAihe = id, VisaPalkkio = 25,
                VisaRahaSyy = "Lukijan kysymys ratkesi", VisaNostotehtava = true,
                KohdeId = T(d, "kohde"),
                // Fokusvirrassa osoitteet ovat merkkijonoja, kokoelmassa takynostot olioita {url, nimi, …}.
                Aani = Osoite(MiniJson.Kentta(d, "aani")), MusiikkiNayte = Osoite(MiniJson.Kentta(d, "musiikkiNayte")),
                MusiikkiNayteNimi = T(d, "musiikkiNayteNimi") ?? T(Ob(MiniJson.Kentta(d, "musiikkiNayte")), "nimi"),
            };
            var kuvat = new List<object>();
            if ((MiniJson.Kentta(d, "kuva") ?? MiniJson.Kentta(d, "$kuva")) is object k1) kuvat.Add(k1);
            if (MiniJson.Kentta(d, "galleria") is List<object> gal) kuvat.AddRange(gal);
            Kuvat(n, kuvat, "url");
            n.Valokuva = Yksi(MiniJson.Kentta(d, "valokuva"));
            n.Karttaliite = Yksi(MiniJson.Kentta(d, "kartta"));
            n.Visa = Visa(d);
            if (MiniJson.Kentta(d, "kysymykset") is List<object> q)
                n.Kysymykset = q.Select(x => x?.ToString().Trim()).Where(x => !string.IsNullOrEmpty(x)).Take(3).ToList();
            // Web nostonMusiikkilinkit: merkkijono = yksi "Apple Music" -linkki, taulukko = nimetyt linkit.
            var musiikki = MiniJson.Kentta(d, "musiikki");
            if (musiikki is string url) n.Musiikkilinkit.Add(("Apple Music", url));
            else if (musiikki is List<object> linkit)
                foreach (var l in linkit.Select(Ob).Where(l => l != null))
                    if (T(l, "url") is string u && u.Length > 0) n.Musiikkilinkit.Add((T(l, "nimi") ?? T(l, "nakyva") ?? "Apple Music", u));
            return n;
        }

        /// <summary>Äänen osoite: merkkijono sellaisenaan tai olion url (null = ei ääntä).</summary>
        static string Osoite(object arvo)
        {
            string u = arvo as string ?? T(Ob(arvo), "url");
            return string.IsNullOrEmpty(u) ? null : u;
        }

        /// <summary>
        /// Web js/syvennys.js piirraSyvennysSisus: otsikko (tai napin teksti), yksi kuva, tarina ja
        /// minivisa (+50, avain &lt;kaupunki&gt;:fokus:&lt;täky&gt;; oikea vastaus myöntää kaupungin julisteen).
        /// </summary>
        static Nosto Syvennys(string id, string kaupunki, string iso, Dictionary<string, object> d, string symboli, Dictionary<string, object> luokat)
        {
            var n = new Nosto
            {
                Laji = NostoLaji.Syvennys, Id = id, Iso = iso, Kaupunki = kaupunki,
                Luokka = Ylarivi(symboli, luokat),
                Otsikko = T(d, "otsikko") ?? T(d, "nappi"), Teksti = T(d, "teksti"),
                VisaKaupunki = kaupunki, VisaAihe = "fokus:" + id, VisaPalkkio = 50,
                VisaRahaSyy = "Livian täky ratkesi", VisaJuliste = kaupunki,
            };
            if (Yksi(MiniJson.Kentta(d, "kuva")) is NostoKuva k) n.Kuvat.Add(k);
            n.Visa = Visa(d);
            return n;
        }

        static NostoKuva Yksi(object arvo)
        {
            if (arvo == null) return null;
            var apu = new Nosto();
            Kuvat(apu, new List<object> { arvo }, "url");
            return apu.Kuvat.FirstOrDefault();
        }

        static void Kuvat(Nosto n, object arvo, string ensisijainen)
        {
            var lista = arvo as List<object> ?? (arvo != null ? new List<object> { arvo } : new List<object>());
            foreach (var a in lista)
            {
                if (a is string s) { n.Kuvat.Add(new NostoKuva { Lahde = s }); continue; }
                var o = Ob(a);
                if (o == null) continue;
                string lahde = T(o, ensisijainen) ?? T(o, "osoite") ?? T(o, "tiedosto") ?? T(o, "arvo");
                if (ensisijainen != "tiedosto") lahde ??= T(o, "url");
                if (string.IsNullOrEmpty(lahde)) continue;
                n.Kuvat.Add(new NostoKuva
                {
                    Lahde = lahde,
                    Lyhyt = T(o, "lyhyt") ?? T(o, "selite") ?? T(o, "kuvateksti"),
                    Selite = T(o, "selite") ?? T(o, "kuvateksti") ?? T(o, "lyhyt"),
                    Tekija = T(o, "tekija"),
                    LahdeRivi = Liita(T(o, "lahde"), T(o, "lisenssi")),
                });
            }
        }

        static NostoVisa Visa(Dictionary<string, object> d)
        {
            var v = Ob(MiniJson.Kentta(d, "visa"));
            if (v == null || !(MiniJson.Kentta(v, "vaihtoehdot") is List<object> vv) || vv.Count == 0) return null;
            var tulos = new NostoVisa { Kysymys = T(v, "kysymys"), Fakta = T(v, "fakta"), Otsake = T(v, "otsake"), Vihje = T(v, "vihje"), Vaihtoehdot = vv.Select(x => x?.ToString() ?? "").ToList() };
            var oikea = MiniJson.Kentta(v, "oikea");
            if (oikea is string os) tulos.Oikea = Math.Max(0, tulos.Vaihtoehdot.IndexOf(os));
            else tulos.Oikea = (int)(MiniJson.Luku(v, "oikea") ?? 0);
            return tulos.Kysymys == null ? null : tulos;
        }

        static string Liita(params string[] osat)
        {
            var l = osat.Where(x => !string.IsNullOrEmpty(x)).ToList();
            return l.Count == 0 ? null : string.Join(" · ", l);
        }

        // --- kuvat ------------------------------------------------------------------------

        /// <summary>Kuva tekstuurina: https suoraan, paketin tiedostot media.json:sta, muut Commonsista.</summary>
        public static void HaeKuva(string lahde, Action<Texture2D> valmis)
        {
            if (string.IsNullOrEmpty(lahde)) { valmis(null); return; }
            if (lahde.StartsWith("http")) { Natiivi.Kuvat.Hae(lahde, valmis); return; }
            Media(() => Natiivi.Kuvat.Hae(media != null && media.TryGetValue(lahde, out var url) ? url : lahde, valmis));
        }

        /// <summary>Kuva pienennettynä leveys × korkeus -ruutuun (peittäen, keskeltä), esim. sisällyksen pikkukuvat.</summary>
        public static void HaeKuvaPienena(string lahde, int leveys, int korkeus, Action<Texture2D> valmis)
        {
            if (string.IsNullOrEmpty(lahde)) { valmis(null); return; }
            if (lahde.StartsWith("http")) { Natiivi.Kuvat.HaePienena(lahde, leveys, korkeus, 0.5f, valmis); return; }
            Media(() => Natiivi.Kuvat.HaePienena(media != null && media.TryGetValue(lahde, out var url) ? url : lahde, leveys, korkeus, 0.5f, valmis));
        }

        static void Media(Action valmis)
        {
            if (media != null) { valmis(); return; }
            mediaOdottajat.Add(valmis);
            if (mediaHaussa) return;
            mediaHaussa = true;
            UiKerros.Hae().StartCoroutine(Sisalto.HaePaketista("media.json", t =>
            {
                // Jäsennys taustasäikeessä (~20 000 viitettä); muistiin vain muut kuin Commons-kuvat.
                Task.Run(() =>
                {
                    var m = new Dictionary<string, string>();
                    try
                    {
                        foreach (var a in MiniJson.Kentta(Ob(MiniJson.Jasenna(t ?? "{}")), "viitteet") as List<object> ?? new List<object>())
                        {
                            var o = Ob(a);
                            if (o == null || T(o, "laji") == "kuva-commons") continue;
                            if (T(o, "arvo") is string arvo && T(o, "url") is string url) m[arvo] = url;
                        }
                    }
                    catch (Exception) { }
                    return m;
                }).ContinueWith(tt => UiKerros.PaaSaikeessa(() =>
                {
                    media = tt.Result ?? new Dictionary<string, string>();
                    mediaHaussa = false;
                    var o = mediaOdottajat.ToList();
                    mediaOdottajat.Clear();
                    foreach (var a in o) a();
                }));
            }, true));
        }
    }
}
