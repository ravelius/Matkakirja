// LINSSIEN TESTIKOMENNOT (Natiivi-UI): "ui linssi …" -rivit UiKomennoista
// (Documents/ui-komento.txt). Näyttävät linssien UI-osat ilman linssiä tai
// pelisilmukkaa esimerkkiaineistolla; oikeat linssit avataan Linssisepän
// komennoilla (Documents/linssi-komento.txt: "linssi <id>").
//
//   ui linssi valitsin                    valitsin auki (ilman LinssiOhjainta esimerkkilinssit)
//   ui linssi peite [pois]                odotuspeite päälle / pois
//   ui linssi selite [pois]               selitekortti esimerkkiriveillä
//   ui linssi astro [musta|otsikko|paljastus|pois]  avaus; ilman vaihetta koko sarja oikeassa ajassa
//   ui linssi kuva [tunnus] [pulu]        astronautin kuvanäkymä: aineiston kohde (oletus ensimmäinen);
//                                         pulu = minipulun kysymyskortti auki
//                                         tai Commonsin esimerkkikuvat, jos aineisto ei lataudu
//   ui linssi sumu p                      avaruussumun peitto 0…1 (0 = pois)
//   ui linssi vertailu [arkki|taynna]     alapalkki esimerkkimailla / vertailuarkki / täyden listan ilmoitus
//   ui linssi vertailu FIN SWE [ITA JPN]  vertailuarkki näillä mailla (2–4 × ISO3) ja maakäyrät
//                                         paketin maakayrat.json:sta (arkki = FIN ITA JPN)
//   ui linssi vertailu latautuu|verkko    arkin käyrät hakutilassa ("Haetaan tilastoja…") /
//                                         verkkoyhteysrivillä
//   ui linssi maa [ISO3]                  maatietojen maakyltti (oletus ITA; napautus avaa maalehden)
//   ui linssi keksinnot [esittely|pysakki i|valinaytos [i]|loppu]
//   ui linssi matka [aloitus|musta|valot|jakso i|kuva i|loppu]
//   ui linssi radio [hiljaa|viritys|soi|linkki|virhe|pois]  maailmanradion kotelo keksityllä
//                                         RadioTilalla (oletus soi; asteikon nimi ajaa virityssarjan)
//   ui linssi tiedeliite [i]                 keksintölinssin tiedeliite (ensimmäinen sivullinen pysäkki)
//   ui linssi valikko [keksinnot|matka] [kiinni|alusta]
//                                         aikajanan ylärivi esimerkillä ja sen hampurilaisvalikko
//                                         auki (Poistu, Aloita alusta, Kertoja, Taustamusiikki);
//                                         kiinni = vain nappi, alusta = valikon Aloita alusta -teko
//   ui linssi varusteet [id|ei] [paalla]  matkalaukun Varusteet esimerkkilinsseillä: ilman id:tä
//                                         lohko kertoo päällä olevasta; id = ruutu napautettu
//                                         (esikatselu + Aktivoi), ei = "Ei linssiä" napautettu,
//                                         paalla = napautettu linssi on päällä ("Ota pois")
//   ui linssi sulje                       auki oleva linssi kiinni (Rekisteri.Sulje)
//   ui linssi pois                        kaikki linssien testinäkymät pois
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class LinssiKomennot
    {
        public const string Ohje = "ui linssi valitsin|peite|selite|astro|kuva|sumu|vertailu|maa|keksinnot|matka|radio|valikko|varusteet|sulje|pois";

        public static string Aja(UiNakymat ui, string loput)
        {
            var l = ui.Linssit;
            var osat = loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
            string k = osat.Length > 0 ? osat[0].ToLowerInvariant() : "";
            string a1 = osat.Length > 1 ? osat[1] : "";
            string a2 = osat.Length > 2 ? osat[2] : "";
            int Luku(string s, int oletus) => int.TryParse(s, NumberStyles.Integer, CultureInfo.InvariantCulture, out var n) ? n : oletus;
            switch (k)
            {
                case "valitsin":
                    if (LinssiUi.Rekisteri != null) { l.Valitsin.Avaa(); return null; }
                    l.Valitsin.Testaa(Esimerkkilinssit());
                    return "ei LinssiOhjainta: esimerkkilinssit";
                case "peite":
                    l.Peite.Aseta(a1 != "pois");
                    return null;
                case "selite":
                    if (a1 == "pois") { l.Selite.Piilota(); return null; }
                    l.Selite.Nayta("Topografia", Esimerkkiselite());
                    return null;
                case "astro":
                    switch (a1)
                    {
                        case "musta": l.Astronautti.Avaus(AvauksenVaihe.Musta); return null;
                        case "otsikko": l.Astronautti.Avaus(AvauksenVaihe.OtsikkoPois); return null;
                        case "paljastus": l.Astronautti.Avaus(AvauksenVaihe.MustaPois); return null;
                        case "pois": l.Astronautti.Avaus(AvauksenVaihe.Pois); return null;
                        default: l.Astronautti.TestaaAvaus(); return null;
                    }
                case "kuva":
                    UiKerros.Hae().StartCoroutine(AvaaKuva(l, a1 == "pulu" ? "" : a1, a1 == "pulu" || a2 == "pulu"));
                    return "ladataan aineistoa…";
                case "sumu":
                    l.Astronautti.Sumu.Aseta(float.TryParse(a1, NumberStyles.Float, CultureInfo.InvariantCulture, out var p) ? p : 0.62f);
                    return null;
                case "vertailu":
                    if (a1 == "taynna") { l.Maat.TestaaTaynna(); return null; }
                    if (a1 == "latautuu" || a1 == "verkko") { l.Maat.TestaaVertailu(true, null, a1); return null; }
                    if (a1.Length == 3)
                    {
                        var isot = new List<string>();
                        for (int i = 1; i < osat.Length; i++) isot.Add(osat[i].ToUpperInvariant());
                        l.Maat.TestaaVertailu(true, isot);
                        return "maakäyrät: " + string.Join(" ", isot);
                    }
                    l.Maat.TestaaVertailu(a1 == "arkki");
                    return null;
                case "maa":
                    l.Maat.TestaaKyltti(a1.Length > 0 ? a1.ToUpperInvariant() : "ITA");
                    return null;
                case "keksinnot":
                    return l.Aikajana.TestaaKeksinnot(a1.Length > 0 ? a1 : "pysakki", Luku(a1 == "pysakki" || a1 == "valinaytos" ? a2 : a1, a1 == "valinaytos" ? -1 : 0));
                case "matka":
                    return l.Aikajana.TestaaIhminen(a1.Length > 0 ? a1 : "jakso", Luku(a2, 0));
                case "radio":
                    return l.Radio.Testaa(a1);
                case "tiedeliite":
                {
                    // Keksintölinssi auki (ui linssi keksinnot tai valitsimesta): tiedeliitteen sivu pysäkille i.
                    var kl = LinssiUi.Keksinnot;
                    if (kl == null) return "keksintölinssi ei ole auki";
                    int i = Luku(a1, -1);
                    if (i < 0) for (int j = 0; j < 400 && i < 0; j++) if (kl.Tiedeliite(j) != null) i = j;
                    return kl.AvaaJuttu(i) ? null : "pysäkillä " + i + " ei ole tiedeliitettä";
                }
                case "valikko":
                {
                    bool matka = a1 == "matka";
                    string teko = matka || a1 == "keksinnot" ? a2 : a1;
                    if (matka) l.Aikajana.TestaaIhminen("kuva", 0);
                    else l.Aikajana.TestaaKeksinnot("pysakki", 0);
                    var v = l.Aikajana.Valikko;
                    // Ylärivi saa mittansa vasta asettelussa: valikko auki seuraavissa ruuduissa.
                    v.Nappi.schedule.Execute(() =>
                    {
                        if (teko == "alusta") l.Aikajana.AloitaAlusta();
                        else if (teko != "kiinni") v.Avaa();
                    }).StartingIn(300);
                    return matka ? "ihmisen matka: valikko" : "keksinnöt: valikko";
                }
                case "varusteet":
                {
                    var linssit = new List<LinssiTiedot>(Esimerkkilinssit())
                    {
                        new LinssiTiedot { Id = "vertailu", Nimi = "Vertailu", Lyhyt = "Maat rinnakkain: väkiluku, pinta-ala ja elinajanodote.", Jarjestys = 40 },
                    };
                    bool ei = a1 == "ei";
                    string id = ei || a1.Length == 0 ? null : a1;
                    string auki = a2 == "paalla" ? id : null;
                    ui.Matkalaukku.TestaaVarusteet(linssit, auki, ei || id != null, id);
                    return null;
                }
                case "sulje":
                    l.SuljeLinssi();
                    return null;
                case "pois":
                    l.Valitsin.Sulje();
                    l.Aikajana.Valikko.Sulje();
                    l.Peite.Aseta(false);
                    if (LinssiUi.Rekisteri?.Auki == null)
                    {
                        l.Selite.Piilota();
                        l.Astronautti.Vaihtui(false);
                        l.Aikajana.Pois();
                    }
                    l.Maat.TestiPois();
                    l.Radio.TestiPois();
                    return null;
                default:
                    return Ohje;
            }
        }

        static System.Collections.IEnumerator AvaaKuva(LinssiUi l, string tunnus, bool pulu)
        {
            string data = null, kysymykset = null;
            yield return LinssiSisalto.Hae("moduulit/js/linssit/satelliitti-data.json", t => data = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/astronaut-kysymykset.json", t => kysymykset = t);
            Havaintokohde kohde = null;
            if (data != null)
            {
                try
                {
                    var a = AstronauttiAineisto.Lue(MiniJson.Jasenna(data), kysymykset == null ? null : MiniJson.Jasenna(kysymykset));
                    if (AstronauttiLinssi.AstronauttiTiedot.Lahde == null) AstronauttiLinssi.AstronauttiTiedot.Lahde = a.Lahde;
                    kohde = string.IsNullOrEmpty(tunnus) ? (a.Kohteet.Count > 0 ? a.Kohteet[0] : null) : a.Kohteet.Find(x => x.Tunnus == tunnus);
                }
                catch (System.Exception e) { Debug.LogWarning("MATKAKIRJA ui linssi kuva: " + e.Message); }
            }
            kohde ??= Kuvanakyma.Esimerkki();
            l.Astronautti.Kuva.Avaa(kohde, kohde.OletusIndeksi);
            if (pulu) l.Astronautti.Kuva.AvaaPulukortti();
        }

        static IReadOnlyList<SeliteRivi> Esimerkkiselite() => new[]
        {
            new SeliteRivi("#5b8a5a", "alanko, alle 200 m"),
            new SeliteRivi("#a7b36b", "200–500 m"),
            new SeliteRivi("#c9a86a", "500–1500 m"),
            new SeliteRivi("#9b7654", "1500–3000 m"),
            new SeliteRivi("#f2efe9", "yli 3000 m"),
        };

        static IReadOnlyList<LinssiTiedot> Esimerkkilinssit() => new[]
        {
            new LinssiTiedot { Id = "topografia", Nimi = "Topografia", Lyhyt = "Vuoret, ylängöt ja alangot korkeusväreinä.", Jarjestys = 10 },
            new LinssiTiedot { Id = "ihmisen-matka", Nimi = "Ihmisen matka", Lyhyt = "Ihmisen matka Afrikasta koko maapallolle: kello juoksee, valot syttyvät.", Jarjestys = 26 },
            new LinssiTiedot { Id = "satelliitti", Nimi = "Astronautin kamera", Lyhyt = "Maa avaruudesta: astronauttien valokuvat kiertoradalta.", Jarjestys = 27, Ikoni = Ikonit.Viiva["satelliitti"] },
        };
    }
}
